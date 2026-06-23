"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, LogOut, Package, Mail, Phone, MapPin, ExternalLink, Calendar } from "lucide-react";

interface Order {
  number: string;
  date: string;
  total: number;
  status: "Paid" | "Processing" | "Shipped" | "Delivered";
  items: string;
}

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Check for cookie sessions
    const getCookie = (name: string) => {
      const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)"));
      return match ? decodeURIComponent(match[2]) : "";
    };

    const isCustomer = getCookie("mock_customer_session") === "true";
    const isAdmin = getCookie("mock_admin_session") === "true";
    const email = getCookie("mock_user_email");
    const name = getCookie("mock_user_name") || "Valued Customer";

    if (!isCustomer && !isAdmin) {
      router.push("/login");
      return;
    }

    setUser({
      email: email || (isAdmin ? "admin@ruven.in" : "customer@ruven.in"),
      name: name
    });

    // Populate mock order history
    setOrders([
      {
        number: "RU-389271",
        date: "June 23, 2026",
        total: 2199,
        status: "Processing",
        items: "Armor of Light Heavyweight Tee (M)"
      },
      {
        number: "RU-187391",
        date: "May 10, 2026",
        total: 3774,
        status: "Delivered",
        items: "Renewal of Mind French Terry Hoodie (L)"
      }
    ]);
  }, [router]);

  const handleLogout = () => {
    // Clear cookies
    document.cookie = "mock_customer_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "mock_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "mock_user_email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "mock_user_name=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center bg-bg-warm dark:bg-zinc-950 text-text-muted text-xs font-bold uppercase tracking-widest">
        Verifying Account Session...
      </div>
    );
  }

  return (
    <div className="w-full bg-bg-warm dark:bg-zinc-950 py-12 px-6 md:px-12 lg:px-20 min-h-[calc(100vh-160px)]">
      <div className="max-w-[1200px] mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-border-warm">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-[0.15em] text-zinc-500 dark:text-zinc-400 uppercase block">Customer Dashboard</span>
            <h1 className="text-2xl font-bold tracking-tight text-text-primary uppercase flex items-center gap-2">
              <User className="w-6 h-6 text-brand-burgundy" />
              <span>Welcome back, {user.name}</span>
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-5 py-2 border border-border-warm hover:bg-bg-card rounded-none text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4 text-brand-burgundy" />
            <span>Sign Out</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left profile info */}
          <div className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-border-warm rounded-none p-6 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary pb-3 border-b border-border-warm">
              Profile Summary
            </h3>

            <div className="space-y-4 text-xs text-text-muted">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-zinc-400 dark:text-zinc-500 flex-shrink-0" />
                <div>
                  <span className="text-[8px] font-bold uppercase tracking-wider block text-text-primary">Email Address</span>
                  <span>{user.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-zinc-400 dark:text-zinc-500 flex-shrink-0" />
                <div>
                  <span className="text-[8px] font-bold uppercase tracking-wider block text-text-primary">Phone Number</span>
                  <span>+91 98765 43210</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-zinc-400 dark:text-zinc-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[8px] font-bold uppercase tracking-wider block text-text-primary">Shipping Location</span>
                  <p className="leading-relaxed text-text-primary">
                    12/A, Sector 3, Mumbai,<br />Maharashtra - 400001, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right order list */}
          <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-border-warm rounded-none p-6 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary pb-3 border-b border-border-warm">
              Order Transaction History
            </h3>

            {orders.length === 0 ? (
              <div className="py-12 text-center text-xs space-y-3">
                <Package className="w-8 h-8 text-text-muted stroke-[1] mx-auto" />
                <p className="text-text-muted">You haven't placed any storefront orders yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800 space-y-4">
                {orders.map((ord) => (
                  <div key={ord.number} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-mono font-bold text-brand-burgundy tracking-wide">{ord.number}</span>
                        <span className="text-[9px] px-2.5 py-0.5 rounded-none font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-text-muted">
                          {ord.status}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-text-primary uppercase tracking-wide">
                        {ord.items}
                      </p>
                      <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
                        <span>Placed on {ord.date}</span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-baseline sm:items-end justify-between w-full sm:w-auto gap-4">
                      <span className="text-sm font-bold text-text-primary">₹{ord.total}</span>
                      <Link
                        href={`/tracking?order_number=${ord.number}`}
                        className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-brand-burgundy transition-colors flex items-center gap-1"
                      >
                        <span>Track Cargo</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
