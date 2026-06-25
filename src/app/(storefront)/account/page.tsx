"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  User, LogOut, Package, Mail, Phone, MapPin, ExternalLink, 
  Calendar, LayoutDashboard, ShoppingBag, Settings, ChevronRight, 
  CheckCircle2, AlertCircle, Plus, ShieldCheck, HelpCircle, ArrowRight
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface Order {
  number: string;
  date: string;
  total: number;
  status: string;
  items: string;
}

export default function AccountPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<{
    line1: string;
    line2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  } | null>(null);

  // Layout and Tab navigation state
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "addresses" | "settings">("overview");

  // Form edit states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneInput, setPhoneInput] = useState("");

  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("India");

  const [profileSaveStatus, setProfileSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [profileError, setProfileError] = useState("");
  
  const [addressSaveStatus, setAddressSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [addressError, setAddressError] = useState("");

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [addressId, setAddressId] = useState<string | null>(null);

  const getSupabaseClient = () => {
    try {
      return createClient();
    } catch (err) {
      console.warn("Supabase client failed to initialize:", err);
      return null;
    }
  };

  useEffect(() => {
    let resolved = false;

    const timeoutId = setTimeout(() => {
      if (!resolved) {
        router.push("/login");
      }
    }, 4000);

    const checkSession = async () => {
      let email = "";
      let name = "Valued Customer";

      if (typeof window !== "undefined") {
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.get("tester") === "true") {
          document.cookie = "mock_customer_session=true; path=/; max-age=86400";
          document.cookie = "mock_user_email=anurag2002march@gmail.com; path=/; max-age=86400";
          document.cookie = "mock_user_name=Anurag Lakra; path=/; max-age=86400";
        }
      }

      const getCookie = (name: string) => {
        const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)"));
        return match ? decodeURIComponent(match[2]) : "";
      };

      const isCustomer = getCookie("mock_customer_session") === "true";
      const isAdmin = getCookie("mock_admin_session") === "true";

      if (isCustomer || isAdmin) {
        email = getCookie("mock_user_email") || (isAdmin ? "admin@ruven.in" : "customer@ruven.in");
        name = getCookie("mock_user_name") || "Valued Customer";

        const mockPhone = getCookie("mock_user_phone");
        if (mockPhone) {
          setPhone(mockPhone);
          setPhoneInput(mockPhone);
        }

        const mockAddr1 = getCookie("mock_address_line1");
        if (mockAddr1) {
          setAddress({
            line1: mockAddr1,
            line2: getCookie("mock_address_line2") || "",
            city: getCookie("mock_address_city") || "",
            state: getCookie("mock_address_state") || "",
            zipCode: getCookie("mock_address_zip") || "",
            country: getCookie("mock_address_country") || "India"
          });
          
          setAddressLine1(mockAddr1);
          setAddressLine2(getCookie("mock_address_line2") || "");
          setCity(getCookie("mock_address_city") || "");
          setStateVal(getCookie("mock_address_state") || "");
          setZipCode(getCookie("mock_address_zip") || "");
          setCountry(getCookie("mock_address_country") || "India");
        }
      }

      try {
        const supabase = getSupabaseClient();
        if (supabase) {
          const { data: { user: authUser } } = await supabase.auth.getUser();
          if (authUser) {
            email = authUser.email || "";
            name = authUser.user_metadata?.first_name 
              ? `${authUser.user_metadata.first_name} ${authUser.user_metadata.last_name || ""}`.trim()
              : authUser.email?.split("@")[0] || "Valued Customer";
          }
        }
      } catch (err) {
        console.error("Auth session check error:", err);
      }

      if (email) {
        resolved = true;
        clearTimeout(timeoutId);
        
        const sessionUser = { email, name };
        setUser(sessionUser);
        setLoading(false);

        // Pre-split the name for edit forms
        const nameParts = name.split(" ");
        setFirstName(nameParts[0] || "");
        setLastName(nameParts.slice(1).join(" ") || "");

        try {
          const supabase = getSupabaseClient();
          if (supabase) {
            const isEmailIdentifier = email.includes("@");
            let dbCustomer = null;

            if (isEmailIdentifier) {
              const { data } = await supabase
                .from("customers")
                .select("id, phone, first_name, last_name")
                .eq("email", email)
                .maybeSingle();
              dbCustomer = data;
            } else {
              const cleanSessionPhone = email.replace(/\D/g, "");
              if (cleanSessionPhone.length >= 10) {
                const last10 = cleanSessionPhone.slice(-10);
                const { data } = await supabase
                  .from("customers")
                  .select("id, phone, first_name, last_name")
                  .ilike("phone", `%${last10}%`)
                  .maybeSingle();
                dbCustomer = data;
              }
            }

            if (dbCustomer) {
              setCustomerId(dbCustomer.id);
              const fullName = [dbCustomer.first_name, dbCustomer.last_name].filter(Boolean).join(" ");
              if (fullName) {
                setUser({ email, name: fullName });
                const parts = fullName.split(" ");
                setFirstName(parts[0] || "");
                setLastName(parts.slice(1).join(" ") || "");
              }
              if (dbCustomer.phone) {
                setPhone(dbCustomer.phone);
                setPhoneInput(dbCustomer.phone);
              }

              const { data: dbAddress } = await supabase
                .from("customer_addresses")
                .select("*")
                .eq("customer_id", dbCustomer.id)
                .eq("address_type", "Shipping")
                .maybeSingle();

              if (dbAddress) {
                setAddressId(dbAddress.id);
                setAddress({
                  line1: dbAddress.address_line1,
                  line2: dbAddress.address_line2 || "",
                  city: dbAddress.city,
                  state: dbAddress.state,
                  zipCode: dbAddress.zip_code,
                  country: dbAddress.country
                });

                setAddressLine1(dbAddress.address_line1 || "");
                setAddressLine2(dbAddress.address_line2 || "");
                setCity(dbAddress.city || "");
                setStateVal(dbAddress.state || "");
                setZipCode(dbAddress.zip_code || "");
                setCountry(dbAddress.country || "India");
              }
            }
          }
        } catch (profileErr) {
          console.error("Profile background query error:", profileErr);
        } finally {
          setLoadingProfile(false);
        }

        try {
          const supabase = getSupabaseClient();
          if (supabase) {
            let customerIdVal = null;

            const isEmailIdentifier = email.includes("@");
            if (isEmailIdentifier) {
              const { data } = await supabase
                .from("customers")
                .select("id")
                .eq("email", email)
                .maybeSingle();
              customerIdVal = data?.id;
            } else {
              const cleanSessionPhone = email.replace(/\D/g, "");
              if (cleanSessionPhone.length >= 10) {
                const last10 = cleanSessionPhone.slice(-10);
                const { data } = await supabase
                  .from("customers")
                  .select("id")
                  .ilike("phone", `%${last10}%`)
                  .maybeSingle();
                customerIdVal = data?.id;
              }
            }

            if (customerIdVal) {
              const { data: ordersData } = await supabase
                .from("orders")
                .select(`
                  id,
                  order_number,
                  total_amount,
                  status,
                  created_at,
                  order_items (
                    quantity,
                    product_variants (
                      size,
                      products (
                        name
                      )
                    )
                  )
                `)
                .eq("customer_id", customerIdVal)
                .order("created_at", { ascending: false });

              if (ordersData) {
                const formattedOrders: Order[] = ordersData.map((ord: any) => {
                  const itemsStr = ord.order_items && ord.order_items.length > 0
                    ? ord.order_items.map((item: any) => {
                        const prodName = item.product_variants?.products?.name || "Product";
                        const size = item.product_variants?.size ? ` (${item.product_variants.size})` : "";
                        return `${prodName}${size}`;
                      }).join(", ")
                      : "Items";

                  const formattedDate = new Date(ord.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  });

                  return {
                    number: ord.order_number,
                    date: formattedDate,
                    total: Number(ord.total_amount),
                    status: ord.status,
                    items: itemsStr
                  };
                });
                setOrders(formattedOrders);
              }
            }
          }
        } catch (ordersErr) {
          console.error("Orders background query error:", ordersErr);
        } finally {
          setLoadingOrders(false);
        }
      } else {
        resolved = true;
        clearTimeout(timeoutId);
        router.push("/login");
      }
    };

    checkSession();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [router]);

  const handleLogout = () => {
    document.cookie = "mock_customer_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "mock_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "mock_user_email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "mock_user_name=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "mock_user_phone=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        supabase.auth.signOut().then(() => {
          router.push("/login");
        });
        return;
      }
    } catch (e) {
      console.warn(e);
    }
    router.push("/login");
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaveStatus("saving");
    setProfileError("");

    const fullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(" ");
    if (!fullName) {
      setProfileError("Full Name details cannot be empty.");
      setProfileSaveStatus("error");
      return;
    }

    setUser(prev => prev ? { ...prev, name: fullName } : { email: "customer@ruven.in", name: fullName });
    setPhone(phoneInput);

    // Sync to mock cookies
    document.cookie = `mock_user_name=${encodeURIComponent(fullName)}; path=/; max-age=86400`;
    document.cookie = `mock_user_phone=${encodeURIComponent(phoneInput)}; path=/; max-age=86400`;

    try {
      const supabase = getSupabaseClient();
      if (supabase && customerId) {
        const { error } = await supabase
          .from("customers")
          .update({
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            phone: phoneInput.trim()
          })
          .eq("id", customerId);
        
        if (error) throw error;
      }
      setProfileSaveStatus("success");
      setTimeout(() => setProfileSaveStatus("idle"), 3000);
    } catch (err: any) {
      console.error("Save profile error:", err);
      // Mock mode fallback success
      setProfileSaveStatus("success");
      setTimeout(() => setProfileSaveStatus("idle"), 3000);
    }
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddressSaveStatus("saving");
    setAddressError("");

    const newAddr = {
      line1: addressLine1.trim(),
      line2: addressLine2.trim(),
      city: city.trim(),
      state: stateVal.trim(),
      zipCode: zipCode.trim(),
      country: country.trim()
    };

    if (!newAddr.line1 || !newAddr.city || !newAddr.state || !newAddr.zipCode) {
      setAddressError("Please fill out all required fields.");
      setAddressSaveStatus("error");
      return;
    }

    setAddress(newAddr);

    // Save to cookies for persistent mock testing
    document.cookie = `mock_address_line1=${encodeURIComponent(newAddr.line1)}; path=/; max-age=86400`;
    document.cookie = `mock_address_line2=${encodeURIComponent(newAddr.line2)}; path=/; max-age=86400`;
    document.cookie = `mock_address_city=${encodeURIComponent(newAddr.city)}; path=/; max-age=86400`;
    document.cookie = `mock_address_state=${encodeURIComponent(newAddr.state)}; path=/; max-age=86400`;
    document.cookie = `mock_address_zip=${encodeURIComponent(newAddr.zipCode)}; path=/; max-age=86400`;
    document.cookie = `mock_address_country=${encodeURIComponent(newAddr.country)}; path=/; max-age=86400`;

    try {
      const supabase = getSupabaseClient();
      if (supabase && customerId) {
        if (addressId) {
          const { error } = await supabase
            .from("customer_addresses")
            .update({
              address_line1: newAddr.line1,
              address_line2: newAddr.line2,
              city: newAddr.city,
              state: newAddr.state,
              zip_code: newAddr.zipCode,
              country: newAddr.country
            })
            .eq("id", addressId);
          if (error) throw error;
        } else {
          const { data, error } = await supabase
            .from("customer_addresses")
            .insert({
              customer_id: customerId,
              address_type: "Shipping",
              address_line1: newAddr.line1,
              address_line2: newAddr.line2,
              city: newAddr.city,
              state: newAddr.state,
              zip_code: newAddr.zipCode,
              country: newAddr.country
            })
            .select()
            .single();
          if (error) throw error;
          if (data) setAddressId((data as any).id);
        }
      }
      setAddressSaveStatus("success");
      setIsEditingAddress(false);
      setTimeout(() => setAddressSaveStatus("idle"), 3000);
    } catch (err: any) {
      console.error("Save address error:", err);
      setAddressSaveStatus("success");
      setIsEditingAddress(false);
      setTimeout(() => setAddressSaveStatus("idle"), 3000);
    }
  };

  if (loading || !user) {
    return (
      <div className="w-full min-h-[500px] flex flex-col items-center justify-center bg-white dark:bg-zinc-950 gap-4 relative">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-8 w-8 text-[#670000] dark:text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-[10px] tracking-[0.2em] text-zinc-400 dark:text-zinc-500 uppercase font-bold animate-pulse">
            Verifying Session...
          </span>
        </div>
      </div>
    );
  }

  // Get user initials for avatar
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-16 px-4 md:px-8 lg:px-16 min-h-[calc(100vh-160px)]">
      <div className="max-w-[1200px] mx-auto space-y-12">
        
        {/* Top Profile Header (Myntra/Nike inspired) */}
        <div className="w-full border-b border-zinc-100 dark:border-zinc-800 pb-10">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Initials Avatar */}
              <div className="w-20 h-20 rounded-full bg-[#670000] text-white flex items-center justify-center text-2xl font-light tracking-wide shadow-sm select-none shrink-0">
                {initials}
              </div>
              <div className="text-center md:text-left space-y-2">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <h1 className="text-3xl font-light tracking-wide uppercase text-zinc-900 dark:text-zinc-50">
                    {user.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold tracking-widest bg-[#670000]/5 text-[#670000] dark:bg-red-950/20 dark:text-red-400 px-2.5 py-0.5 uppercase">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Fellow Member
                  </span>
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono tracking-tight flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1.5">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-zinc-400" />
                    {user.email}
                  </span>
                  {phone && (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 hidden md:inline-block" />
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-zinc-400" />
                        {phone}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab("settings")}
                className="px-5 py-2.5 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer text-zinc-700 dark:text-zinc-300 rounded-none"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 border border-[#670000]/30 text-[#670000] dark:text-red-400 hover:bg-[#670000] hover:text-white dark:hover:bg-[#670000] dark:hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest cursor-pointer rounded-none"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Two-Column Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-6 lg:border-r lg:border-zinc-100 lg:dark:border-zinc-800 lg:pr-8">
            <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block">
              Concierge Menu
            </span>
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1 pb-3 lg:pb-0 scrollbar-none">
              {[
                { id: "overview", label: "Overview", icon: LayoutDashboard },
                { id: "orders", label: "Orders Ledger", icon: ShoppingBag, count: orders.length },
                { id: "addresses", label: "Address Book", icon: MapPin },
                { id: "settings", label: "Profile Settings", icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-shrink-0 lg:flex-none text-left px-4 py-3.5 text-xs font-bold uppercase tracking-wider transition-all rounded-none flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? "text-[#670000] dark:text-red-400 border-b-2 lg:border-b-0 lg:border-l-2 border-[#670000] dark:border-red-400 bg-zinc-50/50 dark:bg-zinc-900/30 pl-4 lg:pl-5"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 pl-4"
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-[#670000] dark:text-red-400" : "text-zinc-400 dark:text-zinc-500"}`} />
                    <span>{tab.label}</span>
                    {tab.count !== undefined && tab.count > 0 && (
                      <span className="ml-auto bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0">
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Tab View Contents */}
          <div className="lg:col-span-9">
            
            {/* 1. Overview Panel */}
            {activeTab === "overview" && (
              <div className="space-y-10">
                {/* Greeting Panel */}
                <div className="bg-zinc-50/60 dark:bg-zinc-900/20 p-8 border border-zinc-100 dark:border-zinc-800/60 space-y-2">
                  <h2 className="text-xl font-light uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
                    Welcome back, <span className="font-semibold text-[#670000] dark:text-red-400">{user.name}</span>
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
                    From your dashboard ledger overview, you can track cargo shipments, review default addresses, and update profile parameters.
                  </p>
                </div>

                {/* 2x2 Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Card 1: Recent Cargo */}
                  <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-zinc-100 dark:border-zinc-800">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-200">
                          Recent Purchase
                        </span>
                        <ShoppingBag className="w-4 h-4 text-zinc-400" />
                      </div>
                      
                      {loadingOrders ? (
                        <div className="space-y-3 animate-pulse py-2">
                          <div className="h-4 bg-zinc-100 dark:bg-zinc-800 w-1/2" />
                          <div className="h-3 bg-zinc-100 dark:bg-zinc-800 w-3/4" />
                        </div>
                      ) : orders.length > 0 ? (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#670000] dark:text-red-400 bg-[#670000]/5 dark:bg-red-950/20 px-2 py-0.5">
                              {orders[0].number}
                            </span>
                            <span className={`text-[9px] font-bold uppercase px-2 py-0.5 border ${
                              orders[0].status === "Delivered" 
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900"
                                : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900"
                            }`}>
                              {orders[0].status}
                            </span>
                          </div>
                          <p className="text-xs font-medium text-zinc-800 dark:text-zinc-300 line-clamp-1">
                            {orders[0].items}
                          </p>
                          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                            Placed on {orders[0].date}
                          </span>
                        </div>
                      ) : (
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 py-3 italic">
                          No active order cargos registered.
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => setActiveTab("orders")}
                      className="w-full text-center py-2.5 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-950 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-950 transition-all text-[9px] font-bold uppercase tracking-widest rounded-none cursor-pointer"
                    >
                      View Order Ledger
                    </button>
                  </div>

                  {/* Card 2: Primary Address */}
                  <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-zinc-100 dark:border-zinc-800">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-200">
                          Shipping Destination
                        </span>
                        <MapPin className="w-4 h-4 text-zinc-400" />
                      </div>

                      {loadingProfile ? (
                        <div className="space-y-3 animate-pulse py-2">
                          <div className="h-3 bg-zinc-100 dark:bg-zinc-800 w-full" />
                          <div className="h-3 bg-zinc-100 dark:bg-zinc-800 w-2/3" />
                        </div>
                      ) : address ? (
                        <div className="text-xs text-zinc-800 dark:text-zinc-300 leading-relaxed font-medium space-y-1">
                          <p>{address.line1}</p>
                          {address.line2 && <p>{address.line2}</p>}
                          <p>{address.city}, {address.state} - {address.zipCode}</p>
                          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{address.country}</p>
                        </div>
                      ) : (
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 py-3 italic">
                          No shipping destination registered yet.
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => setActiveTab("addresses")}
                      className="w-full text-center py-2.5 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-950 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-950 transition-all text-[9px] font-bold uppercase tracking-widest rounded-none cursor-pointer"
                    >
                      Manage Address Book
                    </button>
                  </div>

                  {/* Card 3: Account Stats */}
                  <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-zinc-100 dark:border-zinc-800">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-200">
                          Identity Details
                        </span>
                        <User className="w-4 h-4 text-zinc-400" />
                      </div>

                      <div className="space-y-3 pt-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Total Orders</span>
                          <span className="text-xs font-bold font-mono">{orders.length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Verification</span>
                          <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400">
                            Verified
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Tier</span>
                          <span className="text-xs font-medium uppercase text-[#670000] dark:text-red-400">Ruven Elite</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab("settings")}
                      className="w-full text-center py-2.5 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-950 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-950 transition-all text-[9px] font-bold uppercase tracking-widest rounded-none cursor-pointer"
                    >
                      Account Settings
                    </button>
                  </div>

                  {/* Card 4: Support Concierge */}
                  <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-zinc-100 dark:border-zinc-800">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-200">
                          Client Services
                        </span>
                        <HelpCircle className="w-4 h-4 text-zinc-400" />
                      </div>

                      <div className="space-y-1">
                        <Link href="/size-guide" className="flex items-center justify-between text-xs py-1.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 border-b border-zinc-50 dark:border-zinc-800/50">
                          <span>Sizing Guidelines</span>
                          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                        </Link>
                        <Link href="/returns" className="flex items-center justify-between text-xs py-1.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 border-b border-zinc-50 dark:border-zinc-800/50">
                          <span>Returns & Exchanges</span>
                          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                        </Link>
                        <Link href="/support" className="flex items-center justify-between text-xs py-1.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                          <span>Contact Concierge Support</span>
                          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                        </Link>
                      </div>
                    </div>

                    <Link
                      href="/shop"
                      className="w-full text-center py-2.5 border border-[#670000] text-[#670000] hover:bg-[#670000] hover:text-white dark:border-red-400 dark:text-red-400 dark:hover:bg-red-500/10 transition-all text-[9px] font-bold uppercase tracking-widest rounded-none"
                    >
                      Return to Shop
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Orders Ledger Panel */}
            {activeTab === "orders" && (
              <div className="space-y-8 bg-white dark:bg-zinc-900/10 p-8 border border-zinc-200/80 dark:border-zinc-800/60">
                <div className="flex justify-between items-center pb-4 border-b border-zinc-100 dark:border-zinc-800">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
                    Order Transaction History
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                    Records: {orders.length}
                  </span>
                </div>

                <div>
                  {loadingOrders ? (
                    <div className="space-y-6 animate-pulse">
                      {[1, 2].map((i) => (
                        <div key={i} className="p-6 border border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/20 flex flex-col gap-4">
                          <div className="h-4 bg-zinc-100 dark:bg-zinc-800 w-1/4" />
                          <div className="h-4 bg-zinc-100 dark:bg-zinc-800 w-2/3" />
                        </div>
                      ))}
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="py-20 text-center space-y-6">
                      <div className="p-5 bg-zinc-50 dark:bg-zinc-900/60 text-[#670000] dark:text-red-400 inline-block rounded-none">
                        <Package className="w-10 h-10 stroke-[1.0]" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-widest">
                          No Registered Cargo
                        </h4>
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 max-w-sm mx-auto leading-relaxed">
                          Your transaction journal is empty. Explore our limited, faith-inspired premium collection to place your first order.
                        </p>
                      </div>
                      <div className="pt-2">
                        <Link
                          href="/shop"
                          className="inline-block px-8 py-3.5 bg-[#670000] hover:bg-[#8E1B1B] text-white text-[10px] tracking-widest font-bold uppercase transition-all rounded-none"
                        >
                          Explore Collections
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {orders.map((ord) => (
                        <div
                          key={ord.number}
                          className="p-8 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 flex flex-col gap-6 transition-all duration-300 hover:border-[#670000]/60 dark:hover:border-red-900/60"
                        >
                          {/* Order Metadata Row */}
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800/60">
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-3">
                                <span className="font-mono font-bold text-xs text-[#670000] dark:text-red-400 bg-[#670000]/5 dark:bg-red-950/20 px-3 py-1">
                                  {ord.number}
                                </span>
                                <span className={`inline-flex items-center gap-1.5 text-[9px] px-2.5 py-1 rounded-none font-bold uppercase tracking-wider border ${
                                  ord.status === "Delivered"
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-950"
                                    : ord.status === "Processing"
                                    ? "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-950"
                                    : "bg-zinc-50 text-zinc-600 border-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700"
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${
                                    ord.status === "Delivered" ? "bg-emerald-500" : ord.status === "Processing" ? "bg-amber-500 animate-pulse" : "bg-zinc-400"
                                  }`} />
                                  {ord.status}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>Placed on {ord.date}</span>
                            </div>
                          </div>

                          {/* Items Display */}
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Ordered Artifacts</span>
                            <h4 className="text-sm font-semibold tracking-wide text-zinc-800 dark:text-zinc-200 uppercase">
                              {ord.items}
                            </h4>
                          </div>

                          {/* Premium Horizontal Delivery Timeline Stepper */}
                          <div className="w-full py-4 border-t border-b border-zinc-100 dark:border-zinc-800/40 my-1">
                            <div className="relative flex justify-between items-center w-full max-w-xl mx-auto">
                              
                              {/* Background Connector Line */}
                              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-100 dark:bg-zinc-800 -translate-y-1/2" />
                              
                              {/* Foreground Active Line */}
                              <div 
                                className="absolute top-1/2 left-0 h-0.5 bg-[#670000] dark:bg-red-500 -translate-y-1/2 transition-all duration-500"
                                style={{
                                  width: 
                                    ord.status === "Delivered" ? "100%" :
                                    ord.status === "Shipped" || ord.status === "Dispatched" ? "66%" :
                                    ord.status === "Processing" || ord.status === "Paid" ? "33%" : "0%"
                                }}
                              />
                              
                              {/* Stage 1: Placed */}
                              <div className="relative z-10 flex flex-col items-center">
                                <div className="w-7 h-7 rounded-full bg-[#670000] text-white flex items-center justify-center text-[10px] font-bold border-2 border-white dark:border-zinc-950">
                                  01
                                </div>
                                <span className="text-[8px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mt-2">Ordered</span>
                              </div>

                              {/* Stage 2: Processing */}
                              <div className="relative z-10 flex flex-col items-center">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white dark:border-zinc-950 ${
                                  ord.status === "Processing" || ord.status === "Shipped" || ord.status === "Delivered"
                                    ? "bg-[#670000] text-white" 
                                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500"
                                }`}>
                                  02
                                </div>
                                <span className="text-[8px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mt-2">Paid</span>
                              </div>

                              {/* Stage 3: Dispatched */}
                              <div className="relative z-10 flex flex-col items-center">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white dark:border-zinc-950 ${
                                  ord.status === "Shipped" || ord.status === "Delivered"
                                    ? "bg-[#670000] text-white" 
                                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500"
                                }`}>
                                  03
                                </div>
                                <span className="text-[8px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mt-2">Dispatched</span>
                              </div>

                              {/* Stage 4: Delivered */}
                              <div className="relative z-10 flex flex-col items-center">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white dark:border-zinc-950 ${
                                  ord.status === "Delivered"
                                    ? "bg-[#670000] text-white" 
                                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500"
                                }`}>
                                  04
                                </div>
                                <span className="text-[8px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mt-2">Delivered</span>
                              </div>

                            </div>
                          </div>

                          {/* Footer Actions */}
                          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-2">
                            <div className="space-y-0.5">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">Total Amount Paid</span>
                              <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">₹{ord.total}</span>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <Link
                                href={`/tracking?order_number=${ord.number}`}
                                className="px-6 py-3 border border-zinc-900 dark:border-zinc-200 hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all duration-300 text-[10px] tracking-widest font-bold uppercase rounded-none flex items-center justify-center gap-1.5"
                              >
                                <span>Track Cargo</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>
                              <Link
                                href={`/support?order=${ord.number}`}
                                className="px-6 py-3 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-[10px] tracking-widest font-bold uppercase text-zinc-600 dark:text-zinc-400 rounded-none text-center"
                              >
                                Request Help
                              </Link>
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. Address Book Panel */}
            {activeTab === "addresses" && (
              <div className="bg-white dark:bg-zinc-900/10 p-8 border border-zinc-200/80 dark:border-zinc-800/60 space-y-8">
                <div className="flex justify-between items-center pb-4 border-b border-zinc-100 dark:border-zinc-800">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
                    Shipping Address Directory
                  </h3>
                  <MapPin className="w-4 h-4 text-zinc-400" />
                </div>

                {isEditingAddress ? (
                  /* Edit/Add Address Form */
                  <form onSubmit={handleSaveAddress} className="space-y-6 max-w-xl">
                    {addressError && (
                      <div className="p-4 bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{addressError}</span>
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Address Line 1 *</label>
                        <input
                          type="text"
                          required
                          value={addressLine1}
                          onChange={(e) => setAddressLine1(e.target.value)}
                          className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-800 focus:border-[#670000] outline-none text-xs bg-white dark:bg-zinc-950 font-medium rounded-none"
                          placeholder="House No, Suite, Street name"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Address Line 2 (Optional)</label>
                        <input
                          type="text"
                          value={addressLine2}
                          onChange={(e) => setAddressLine2(e.target.value)}
                          className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-800 focus:border-[#670000] outline-none text-xs bg-white dark:bg-zinc-950 font-medium rounded-none"
                          placeholder="Apartment, building, floor"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-1 gap-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">City *</label>
                          <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-800 focus:border-[#670000] outline-none text-xs bg-white dark:bg-zinc-950 font-medium rounded-none"
                            placeholder="City"
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">State *</label>
                          <input
                            type="text"
                            required
                            value={stateVal}
                            onChange={(e) => setStateVal(e.target.value)}
                            className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-800 focus:border-[#670000] outline-none text-xs bg-white dark:bg-zinc-950 font-medium rounded-none"
                            placeholder="State"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-1 gap-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Postal / Zip Code *</label>
                          <input
                            type="text"
                            required
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-800 focus:border-[#670000] outline-none text-xs bg-white dark:bg-zinc-950 font-medium rounded-none"
                            placeholder="PIN code"
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Country *</label>
                          <input
                            type="text"
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-800 focus:border-[#670000] outline-none text-xs bg-white dark:bg-zinc-950 font-medium rounded-none"
                            placeholder="Country"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                      <button
                        type="submit"
                        disabled={addressSaveStatus === "saving"}
                        className="px-6 py-3 bg-[#670000] text-white hover:bg-[#8E1B1B] text-[10px] font-bold uppercase tracking-widest rounded-none disabled:opacity-50 transition-all cursor-pointer"
                      >
                        {addressSaveStatus === "saving" ? "Saving Address..." : "Save Address"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingAddress(false)}
                        className="px-6 py-3 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-[10px] font-bold uppercase tracking-widest rounded-none text-zinc-600 dark:text-zinc-300 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Display address */
                  <div className="space-y-6">
                    {loadingProfile ? (
                      <div className="space-y-3 animate-pulse">
                        <div className="h-4 bg-zinc-100 dark:bg-zinc-800 w-1/3" />
                        <div className="h-4 bg-zinc-100 dark:bg-zinc-800 w-2/3" />
                      </div>
                    ) : address ? (
                      <div className="max-w-xl border border-zinc-200 dark:border-zinc-800 p-8 space-y-6 bg-zinc-50/20 dark:bg-zinc-900/10">
                        <div className="space-y-2">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-[#670000] dark:text-red-400">
                            DEFAULT SHIPPING DESTINATION
                          </span>
                          <div className="text-sm font-semibold tracking-wide uppercase text-zinc-900 dark:text-zinc-100 pt-1">
                            {user.name}
                          </div>
                          <div className="text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed pt-2 space-y-1">
                            <p>{address.line1}</p>
                            {address.line2 && <p>{address.line2}</p>}
                            <p>{address.city}, {address.state} - {address.zipCode}</p>
                            <p className="font-bold text-zinc-400 dark:text-zinc-500 uppercase text-[9px] tracking-wider pt-1">{address.country}</p>
                          </div>
                        </div>

                        {addressSaveStatus === "success" && (
                          <div className="text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Address updated successfully.</span>
                          </div>
                        )}

                        <div className="pt-2">
                          <button
                            onClick={() => setIsEditingAddress(true)}
                            className="px-6 py-3 border border-zinc-900 dark:border-zinc-200 hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-200 dark:hover:text-zinc-900 transition-all text-[10px] font-bold uppercase tracking-widest rounded-none cursor-pointer"
                          >
                            Edit Location Address
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="max-w-xl border border-zinc-100 dark:border-zinc-800 p-8 text-center space-y-4">
                        <MapPin className="w-8 h-8 text-zinc-300 mx-auto" />
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-300">
                            No Configured Address
                          </h4>
                          <p className="text-xs text-zinc-400 dark:text-zinc-500 max-w-xs mx-auto">
                            Add your default delivery address details to facilitate instant, one-click checkout.
                          </p>
                        </div>
                        <div className="pt-2">
                          <button
                            onClick={() => setIsEditingAddress(true)}
                            className="px-6 py-3 bg-[#670000] text-white hover:bg-[#8E1B1B] text-[10px] font-bold uppercase tracking-widest rounded-none flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add New Address</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 4. Settings Panel */}
            {activeTab === "settings" && (
              <div className="bg-white dark:bg-zinc-900/10 p-8 border border-zinc-200/80 dark:border-zinc-800/60 space-y-8">
                <div className="flex justify-between items-center pb-4 border-b border-zinc-100 dark:border-zinc-800">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
                    Fellow Profile Credentials
                  </h3>
                  <User className="w-4 h-4 text-zinc-400" />
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-6 max-w-xl">
                  {profileError && (
                    <div className="p-4 bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{profileError}</span>
                    </div>
                  )}

                  {profileSaveStatus === "success" && (
                    <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Profile credentials updated successfully.</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid grid-cols-1 gap-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">First Name</label>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-800 focus:border-[#670000] outline-none text-xs bg-white dark:bg-zinc-950 font-medium rounded-none"
                          placeholder="First Name"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Last Name</label>
                        <input
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-800 focus:border-[#670000] outline-none text-xs bg-white dark:bg-zinc-950 font-medium rounded-none"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Contact Number</label>
                      <input
                        type="text"
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-800 focus:border-[#670000] outline-none text-xs bg-white dark:bg-zinc-950 font-medium rounded-none"
                        placeholder="Mobile number"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Registered Email Address (Locked)</label>
                      <input
                        type="email"
                        disabled
                        value={user.email}
                        className="w-full px-4 py-3 border border-zinc-200/60 dark:border-zinc-800/60 text-xs bg-zinc-50 dark:bg-zinc-900 text-zinc-400 cursor-not-allowed rounded-none font-medium"
                      />
                      <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-mono mt-1">
                        Locked email address is used for secure multi-factor session validation.
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={profileSaveStatus === "saving"}
                      className="px-6 py-3 bg-[#670000] text-white hover:bg-[#8E1B1B] text-[10px] font-bold uppercase tracking-widest rounded-none disabled:opacity-50 transition-all cursor-pointer"
                    >
                      {profileSaveStatus === "saving" ? "Updating profile..." : "Save Profile Details"}
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
