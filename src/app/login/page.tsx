"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Shield, User, Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const isDummy = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("dummy") || !process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (isDummy) {
      // Sandbox testing credentials check
      setTimeout(() => {
        if (email === "admin@ruven.in" && password === "admin123") {
          // Set mock admin session cookie (valid for 1 day)
          document.cookie = "mock_admin_session=true; path=/; max-age=86400";
          document.cookie = "mock_user_email=admin@ruven.in; path=/; max-age=86400";
          document.cookie = "mock_user_name=Super Admin; path=/; max-age=86400";
          router.push("/admin");
        } else if (email === "customer@ruven.in" && password === "customer123") {
          // Set mock customer session cookie
          document.cookie = "mock_customer_session=true; path=/; max-age=86400";
          document.cookie = "mock_user_email=customer@ruven.in; path=/; max-age=86400";
          document.cookie = "mock_user_name=John Doe; path=/; max-age=86400";
          router.push("/account");
        } else {
          setError("Invalid sandbox credentials. Use admin@ruven.in / admin123 or customer@ruven.in / customer123");
          setLoading(false);
        }
      }, 1000);
      return;
    }

    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Determine redirect path (admins have user role super admin, or let's inspect email domain/perms)
      if (email.endsWith("@ruvenstudio.in") || email.endsWith("@ruven.in")) {
        router.push("/admin");
      } else {
        router.push("/account");
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please verify credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-warm dark:bg-zinc-950 flex flex-col items-center justify-center p-6 text-text-primary">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-border-warm rounded-2xl p-8 shadow-xl space-y-8">
        {/* Brand logo */}
        <div className="text-center space-y-4">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="Ruven Studio Logo"
              width={140}
              height={60}
              className="h-[55px] w-auto object-contain mx-auto dark:invert"
            />
          </Link>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">Security Shield</span>
            <h1 className="text-xl font-bold uppercase tracking-wider text-text-primary">Sign In</h1>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-lg p-3 flex items-start gap-2 text-xs text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-text-primary block">Email Address</label>
            <div className="relative flex items-center border border-border-warm bg-transparent rounded p-2.5">
              <Mail className="w-4 h-4 text-text-muted mr-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs bg-transparent border-none p-0 focus:outline-none text-text-primary"
                placeholder="name@domain.com"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold uppercase tracking-wider text-text-primary block">Password</label>
              <a href="#" className="text-[9px] uppercase font-bold text-text-muted hover:text-brand-burgundy transition-colors">
                Forgot?
              </a>
            </div>
            <div className="relative flex items-center border border-border-warm bg-transparent rounded p-2.5">
              <Lock className="w-4 h-4 text-text-muted mr-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs bg-transparent border-none p-0 focus:outline-none text-text-primary"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-brand-burgundy hover:bg-brand-gold disabled:bg-zinc-300 disabled:dark:bg-zinc-800 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-burgundy/10"
          >
            <span>{loading ? "Authenticating session..." : "Continue"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Info Helper Box for Sandbox Review */}
        <div className="bg-bg-card dark:bg-zinc-950 p-4 rounded-lg border border-border-warm space-y-2 text-[10px] text-text-muted leading-relaxed">
          <span className="font-bold text-text-primary uppercase tracking-wider block">Local Sandbox Testing Profiles:</span>
          <div>
            <span className="font-semibold text-brand-burgundy block">• Admin OS Access:</span>
            <span>email: <strong className="text-text-primary">admin@ruven.in</strong> / pass: <strong className="text-text-primary">admin123</strong></span>
          </div>
          <div>
            <span className="font-semibold text-brand-gold block">• Customer Storefront Access:</span>
            <span>email: <strong className="text-text-primary">customer@ruven.in</strong> / pass: <strong className="text-text-primary">customer123</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
