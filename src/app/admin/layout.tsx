"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  ShoppingBag,
  FileText,
  Settings,
  LogOut,
  ArrowUpRight,
  User,
  ChevronDown
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [adminName, setAdminName] = useState("Super Admin");
  const [adminEmail, setAdminEmail] = useState("admin@ruven.in");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check for cookie sessions
    const getCookie = (name: string) => {
      const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)"));
      return match ? decodeURIComponent(match[2]) : "";
    };

    const isAdmin = getCookie("mock_admin_session") === "true";
    const email = getCookie("mock_user_email");
    const name = getCookie("mock_user_name");

    // Fallback: If not mock admin session, redirect to login
    if (!isAdmin) {
      router.push("/login");
      return;
    }

    if (email) setAdminEmail(email);
    if (name) setAdminName(name);
    setLoaded(true);
  }, [router]);

  const handleLogout = () => {
    // Clear cookies
    document.cookie = "mock_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "mock_user_email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "mock_user_name=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/login");
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products Catalog", href: "/admin/products", icon: ShoppingBag },
    { label: "Content Studio", href: "/admin/content", icon: FileText },
    { label: "Settings & RBAC", href: "/admin/settings", icon: Settings }
  ];

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-text-muted text-xs font-bold uppercase tracking-widest">
        Verifying Security Credentials...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-text-primary">
      {/* LEFT SIDEBAR */}
      <aside className="w-[260px] bg-white dark:bg-zinc-900 border-r border-border-warm flex flex-col justify-between flex-shrink-0 z-35">
        <div className="space-y-8">
          {/* Logo Brand */}
          <div className="p-6 border-b border-border-warm flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Ruven OS Logo"
              width={90}
              height={40}
              className="h-[40px] w-auto object-contain dark:invert"
            />
            <span className="text-[10px] font-bold tracking-widest uppercase bg-brand-burgundy/10 text-brand-burgundy px-2 py-0.5 rounded">
              Ruven OS
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                    isActive
                      ? "bg-brand-burgundy text-white shadow-md shadow-brand-burgundy/10"
                      : "text-text-muted hover:bg-bg-card hover:text-text-primary"
                  }`}
                >
                  <Icon className={`w-4.5 h-4.5 ${isActive ? "text-white" : "text-brand-gold"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User profile & exit */}
        <div className="p-4 border-t border-border-warm space-y-4">
          <div className="flex items-center gap-3 px-2 py-1.5">
            <div className="w-9 h-9 rounded-full bg-brand-gold text-text-primary font-bold text-sm flex items-center justify-center shadow-inner">
              {adminName.charAt(0)}
            </div>
            <div className="text-left text-xs">
              <span className="font-bold text-text-primary block">{adminName}</span>
              <span className="text-[9px] font-bold text-brand-burgundy uppercase tracking-wider block mt-0.5">
                Super Admin
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] font-bold uppercase tracking-wider">
            <Link
              href="/"
              className="flex items-center justify-center gap-1.5 py-2 border border-border-warm hover:bg-bg-card rounded-lg text-text-muted hover:text-text-primary transition-colors"
            >
              <span>Store</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 py-2 border border-red-200 dark:border-red-950/20 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg text-red-600 dark:text-red-400 transition-colors"
            >
              <span>Log out</span>
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-[70px] bg-white dark:bg-zinc-900 border-b border-border-warm flex items-center justify-between px-8 flex-shrink-0">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-text-muted">
              {pathname === "/admin" && "CEO Dashboard Analytics"}
              {pathname === "/admin/products" && "Commerce Product Catalog"}
              {pathname === "/admin/content" && "Devotional Block Editor"}
              {pathname === "/admin/settings" && "Identity Settings & RBAC"}
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-text-muted">
            <span className="flex items-center gap-1.5 bg-green-50 dark:bg-green-950/25 text-green-600 dark:text-green-500 px-3 py-1 rounded-full border border-green-200 dark:border-green-950/20">
              <span className="w-1.5 h-1.5 bg-green-600 dark:bg-green-500 rounded-full animate-pulse" />
              <span>Live Engine Connected</span>
            </span>
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
