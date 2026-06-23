"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { AlertCircle, ArrowRight } from "lucide-react";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/storefront/Header";
import { Footer } from "@/components/storefront/Footer";

function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      setIsDev(
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        window.location.port !== ""
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const isDummy = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("dummy") || !process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (mode === "signup") {
      if (isDummy) {
        setTimeout(() => {
          document.cookie = "mock_customer_session=true; path=/; max-age=86400";
          document.cookie = `mock_user_email=${email}; path=/; max-age=86400`;
          document.cookie = `mock_user_name=${name || "New User"}; path=/; max-age=86400`;
          router.push("/account");
        }, 1000);
        return;
      }
      try {
        const supabase = createClient();
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } }
        });
        if (signUpError) throw signUpError;
        document.cookie = "mock_customer_session=true; path=/; max-age=86400";
        document.cookie = `mock_user_email=${email}; path=/; max-age=86400`;
        document.cookie = `mock_user_name=${name || "New User"}; path=/; max-age=86400`;
        router.push("/account");
      } catch (err: any) {
        setError(err.message || "Registration failed. Please check credentials.");
        setLoading(false);
      }
      return;
    }

    // Sign in flow
    if (isDummy) {
      setTimeout(() => {
        if (email === "admin@ruven.in" && password === "admin123") {
          document.cookie = "mock_admin_session=true; path=/; max-age=86400";
          document.cookie = "mock_user_email=admin@ruven.in; path=/; max-age=86400";
          document.cookie = "mock_user_name=Super Admin; path=/; max-age=86400";
          router.push("/admin");
        } else if (email === "customer@ruven.in" && password === "customer123") {
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
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
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
    <main className="flex-1 flex items-center justify-center px-4 py-16 bg-bg-warm dark:bg-zinc-950">
      {/* BUG 15: Centered card layout, max-w-420px, white background, thin border */}
      <div className="w-full max-w-[420px] bg-white dark:bg-zinc-900 border border-border-warm p-8 md:p-10 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Link href="/" className="inline-block">
            <img
              src="/logo.png"
              alt="Ruven Studio Logo"
              className="h-7 w-auto object-contain dark:hidden"
            />
            <img
              src="/logo_white.png"
              alt="Ruven Studio Logo"
              className="h-7 w-auto object-contain hidden dark:block"
            />
          </Link>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-text-primary uppercase text-center">
              {mode === "signin" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-xs text-text-muted text-center mt-1.5 leading-relaxed">
              {mode === "signin"
                ? "Sign in to access your Ruven Studio account."
                : "Create your account to start shopping."}
            </p>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="border-l-2 border-brand-burgundy bg-red-50/50 dark:bg-red-950/10 p-4 flex items-start gap-3 text-xs text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "signup" && (
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary block">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-[52px] px-4 text-sm bg-bg-warm dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-brand-burgundy dark:focus:border-brand-burgundy focus:ring-0 outline-none transition-colors rounded-none text-text-primary placeholder:text-text-light-muted font-sans"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary block">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[52px] px-4 text-sm bg-bg-warm dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-brand-burgundy dark:focus:border-brand-burgundy focus:ring-0 outline-none transition-colors rounded-none text-text-primary placeholder:text-text-light-muted font-sans"
              placeholder="name@domain.com"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary block">
                Password
              </label>
              {mode === "signin" && (
                <Link href="#" className="text-[9px] uppercase font-bold text-text-muted hover:text-brand-burgundy transition-colors tracking-wider">
                  Forgot?
                </Link>
              )}
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[52px] px-4 text-sm bg-bg-warm dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-brand-burgundy dark:focus:border-brand-burgundy focus:ring-0 outline-none transition-colors rounded-none text-text-primary placeholder:text-text-light-muted font-sans"
              placeholder="••••••••"
            />
          </div>

          {mode === "signin" && (
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 accent-brand-burgundy border-zinc-300 rounded-none"
              />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                Remember Me
              </span>
            </label>
          )}

          {/* Submit — matches PDP CTA style */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[52px] bg-brand-burgundy hover:bg-brand-burgundy-light disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-burgundy/10 active:scale-[0.99]"
          >
            <span>
              {loading
                ? (mode === "signin" ? "Authenticating..." : "Creating...")
                : (mode === "signin" ? "Sign In" : "Create Account")}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Mode switcher */}
        <div className="text-center">
          {mode === "signin" ? (
            <span className="text-xs text-text-muted">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => { setMode("signup"); setError(""); }}
                className="font-semibold text-brand-burgundy hover:underline hover:text-brand-burgundy-light transition-colors"
              >
                Create Account
              </button>
            </span>
          ) : (
            <span className="text-xs text-text-muted">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => { setMode("signin"); setError(""); }}
                className="font-semibold text-brand-burgundy hover:underline hover:text-brand-burgundy-light transition-colors"
              >
                Sign In
              </button>
            </span>
          )}
        </div>

        {/* Sandbox testing box */}
        {isDev && mode === "signin" && (
          <div className="bg-bg-card dark:bg-zinc-900/60 p-5 border border-zinc-200 dark:border-zinc-800 space-y-3 text-[10px] text-text-muted leading-relaxed">
            <span className="font-bold text-text-primary uppercase tracking-wider block">
              Local Sandbox Testing Profiles:
            </span>
            <div className="space-y-2">
              <div>
                <span className="font-semibold text-brand-burgundy uppercase block tracking-wider text-[9px] mb-0.5">• Admin OS Access:</span>
                <span>email: <strong className="text-text-primary">admin@ruven.in</strong> / pass: <strong className="text-text-primary">admin123</strong></span>
              </div>
              <div>
                <span className="font-semibold text-zinc-500 dark:text-zinc-400 uppercase block tracking-wider text-[9px] mb-0.5">• Customer Storefront Access:</span>
                <span>email: <strong className="text-text-primary">customer@ruven.in</strong> / pass: <strong className="text-text-primary">customer123</strong></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function LoginPage() {
  // BUG 15: Wrap in CartProvider so Header/Footer can access cart context
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-bg-warm dark:bg-zinc-950 font-sans text-text-primary">
        <Header />
        <LoginForm />
        <Footer />
      </div>
    </CartProvider>
  );
}
