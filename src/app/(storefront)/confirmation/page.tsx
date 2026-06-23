"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight, ShoppingBag, Truck } from "lucide-react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order_number") || "RU-738293";

  return (
    <div className="w-full bg-bg-warm dark:bg-zinc-950 py-20 px-6 text-center flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-border-warm rounded-none p-8 md:p-10 shadow-md space-y-6">
        <div className="w-16 h-16 rounded-none bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-500 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-burgundy">Order Placed Successfully</span>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary uppercase">Thank you for your purchase!</h1>
        </div>

        <p className="text-xs text-text-muted leading-relaxed">
          Your order has been authorized, paid, and queued for packaging. A confirmation receipt has been sent to your email address.
        </p>

        <div className="bg-bg-card dark:bg-zinc-950 p-4 rounded-none border border-border-warm space-y-1.5 text-xs text-text-primary">
          <span className="text-text-muted font-medium uppercase text-[9px] tracking-wider block">Order Reference</span>
          <span className="font-mono font-bold text-sm text-brand-burgundy tracking-wider">{orderNumber}</span>
        </div>

        <div className="text-left text-xs bg-bg-warm dark:bg-zinc-950/50 p-5 rounded-none border border-border-warm space-y-3">
          <h4 className="font-bold uppercase text-[10px] tracking-wide text-text-primary">What's Next?</h4>
          <ul className="space-y-2 text-text-muted list-disc pl-4">
            <li>Your order will ship from our South India Fulfillment Center within 24 hours.</li>
            <li>You will receive a tracking link via email as soon as the package is dispatched.</li>
            <li>For any updates, feel free to write to <strong className="text-text-primary">fellowship@ruvenstudio.in</strong>.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Link
            href={`/tracking?order_number=${orderNumber}`}
            className="w-full py-3 bg-brand-burgundy hover:bg-brand-burgundy-light text-white text-xs font-bold uppercase tracking-widest rounded-none transition-colors flex items-center justify-center gap-2"
          >
            <Truck className="w-4 h-4" />
            <span>Track My Order</span>
          </Link>
          <Link
            href="/shop"
            className="w-full py-3 bg-transparent border border-border-warm hover:bg-bg-card text-text-primary text-xs font-bold uppercase tracking-widest rounded-none transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-zinc-500" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen flex items-center justify-center bg-bg-warm dark:bg-zinc-950 text-text-muted text-xs font-bold uppercase tracking-widest">
        Loading Receipt Details...
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
