import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer,
      cart,
      totals,
      is_mock,
      order_number
    } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const resendApiKey = process.env.RESEND_API_KEY;

    const isDummy =
      is_mock ||
      !keySecret ||
      keySecret.includes("dummy") ||
      !resendApiKey ||
      resendApiKey.includes("dummy");

    const finalOrderNumber = order_number || `RU-${Math.floor(100000 + Math.random() * 900000)}`;

    if (isDummy) {
      console.log(`[MOCK GATEWAY] Simulating order database insert for order: ${finalOrderNumber}`);
      console.log(`[MOCK EMAIL] Simulating transactional email receipt dispatch via Resend to: ${customer.email}`);

      // Try writing mock order transaction to Supabase if config is partially correct
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // 1. Create Customer
        const { data: custData, error: custErr } = await supabase
          .from("customers")
          .insert({
            email: customer.email,
            first_name: customer.firstName,
            last_name: customer.lastName,
            phone: customer.phone,
            is_verified: true
          })
          .select()
          .maybeSingle();

        const customerId = custData?.id || "c1111111-1111-1111-1111-111111111111"; // Fallback seed customer

        // 2. Create Order (Paid status triggers TG to decrement stock)
        const { data: ordData } = await supabase
          .from("orders")
          .insert({
            customer_id: customerId,
            order_number: finalOrderNumber,
            status: "Paid",
            subtotal: totals.subtotal,
            tax_amount: totals.tax,
            shipping_fee: totals.shipping,
            total_amount: totals.total
          })
          .select()
          .maybeSingle();

        if (ordData && cart) {
          // 3. Create Items
          const itemsToInsert = cart.map((item: any) => ({
            order_id: ordData.id,
            variant_id: item.variantId.includes("default")
              ? "v1111111-1111-1111-1111-111111111111"
              : item.variantId,
            quantity: item.qty,
            unit_price: item.price,
            total_price: item.price * item.qty
          }));

          await supabase.from("order_items").insert(itemsToInsert);

          // 4. Create Shipping Details
          await supabase.from("order_shipping").insert({
            order_id: ordData.id,
            carrier: "Bluedart Express",
            tracking_number: `BD${Math.floor(1000000000 + Math.random() * 9000000000)}IN`,
            shipping_address_line1: customer.addressLine1,
            shipping_address_line2: customer.addressLine2 || null,
            city: customer.city,
            state: customer.state,
            zip_code: customer.zipCode,
            country: customer.country
          });
        }
      } catch (dbErr) {
        console.warn("DB simulation bypassed during local offline testing:", dbErr);
      }

      return NextResponse.json({ success: true, order_number: finalOrderNumber });
    }

    // Real verification
    const hmac = crypto.createHmac("sha256", keySecret!);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // Insert Order details into Supabase DB
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Create or fetch customer
    let { data: dbCustomer } = await supabase
      .from("customers")
      .select("*")
      .eq("email", customer.email)
      .maybeSingle();

    if (!dbCustomer) {
      const { data: newCust, error: custErr } = await supabase
        .from("customers")
        .insert({
          email: customer.email,
          first_name: customer.firstName,
          last_name: customer.lastName,
          phone: customer.phone,
          is_verified: true
        })
        .select()
        .single();
      if (custErr) throw custErr;
      dbCustomer = newCust;
    }

    // 2. Create Order
    const { data: dbOrder, error: ordErr } = await supabase
      .from("orders")
      .insert({
        customer_id: dbCustomer.id,
        order_number: finalOrderNumber,
        status: "Paid", // paid status decrements stock automatic triggers
        subtotal: totals.subtotal,
        tax_amount: totals.tax,
        shipping_fee: totals.shipping,
        total_amount: totals.total
      })
      .select()
      .single();

    if (ordErr) throw ordErr;

    // 3. Create items
    const itemsToInsert = cart.map((item: any) => ({
      order_id: dbOrder.id,
      variant_id: item.variantId,
      quantity: item.qty,
      unit_price: item.price,
      total_price: item.price * item.qty
    }));

    const { error: itemsErr } = await supabase.from("order_items").insert(itemsToInsert);
    if (itemsErr) throw itemsErr;

    // 4. Create shipping
    const { error: shipErr } = await supabase.from("order_shipping").insert({
      order_id: dbOrder.id,
      carrier: "Bluedart Express",
      tracking_number: `BD${Math.floor(1000000000 + Math.random() * 9000000000)}IN`,
      shipping_address_line1: customer.addressLine1,
      shipping_address_line2: customer.addressLine2 || null,
      city: customer.city,
      state: customer.state,
      zip_code: customer.zipCode,
      country: customer.country
    });

    if (shipErr) throw shipErr;

    // 5. Send Transactional Receipt Email via Resend
    const resend = new Resend(resendApiKey!);
    await resend.emails.send({
      from: "Ruven Studio <fellowship@ruvenstudio.in>",
      to: customer.email,
      subject: `Order Confirmation ${finalOrderNumber} — Ruven Studio`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1C1C1C; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #670000; font-size: 24px; text-transform: uppercase;">Order Confirmed</h1>
          <p>Thank you for your purchase, ${customer.firstName}!</p>
          <p>Your order <strong>${finalOrderNumber}</strong> is paid and is being prepared for dispatch.</p>
          <hr style="border: 0; border-top: 1px solid #E8E5DD; margin: 20px 0;" />
          <h3 style="font-size: 14px; text-transform: uppercase;">Order Details:</h3>
          <p>Total Paid: <strong>₹${totals.total}</strong></p>
          <p>Carrier: <strong>Bluedart Express</strong></p>
          <p>We will send a tracking link as soon as your package leaves our South India Fulfillment Center.</p>
          <p style="margin-top: 30px; font-size: 11px; color: #6B6862;">Ruven Studio — Crafted for Conversation</p>
        </div>
      `
    });

    return NextResponse.json({ success: true, order_number: finalOrderNumber });
  } catch (err: any) {
    console.error("Order verification & creation failed:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
