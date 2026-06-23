"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";

// Inline SVG Brand Logo Mark for Ruven Studio
const LogoSVG = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="currentColor">
    <path opacity="0.9" d="M12,14.19531c-0.17551-0.00004-0.34793-0.04618-0.5-0.13379l-9-5.19726C2.02161,8.58794,1.85779,7.97612,2.13411,7.49773C2.22187,7.34579,2.34806,7.2196,2.5,7.13184l9-5.19336c0.30964-0.17774,0.69036-0.17774,1,0l9,5.19336c0.4784,0.27632,0.64221,0.88814,0.36589,1.36653C21.77813,8.65031,21.65194,8.7765,21.5,8.86426l-9,5.19726C12.34793,14.14913,12.17551,14.19527,12,14.19531z"/>
    <path opacity="0.6" d="M21.5,11.13184l-1.96411-1.13337L12.5,14.06152c-0.30947,0.17839-0.69053,0.17839-1,0L4.46411,9.99847L2.5,11.13184c-0.47839,0.27632-0.64221,0.88814-0.36589,1.36653C2.22187,12.65031,2.34806,12.7765,2.5,12.86426l9,5.19726c0.30947,0.17838,0.69053,0.17838,1,0l9-5.19726c0.4784-0.27632,0.64221-0.88814,0.36589-1.36653C21.77813,11.34579,21.65194,11.2196,21.5,11.13184z"/>
    <path opacity="0.4" d="M21.5,15.13184l-1.96411-1.13337L12.5,18.06152c-0.30947,0.17838-0.69053,0.17838-1,0l-7.03589-4.06305L2.5,15.13184c-0.47839,0.27632-0.64221,0.88814-0.36589,1.36653C2.22187,16.65031,2.34806,16.7765,2.5,16.86426l9,5.19726c0.30947,0.17838,0.69053,0.17838,1,0l9-5.19726c0.4784-0.27632,0.64221-0.88814,0.36589-1.36653C21.77813,15.34579,21.65194,15.2196,21.5,15.13184z"/>
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const isDummy = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("dummy") || !process.env.NEXT_PUBLIC_SUPABASE_URL;

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
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

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
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-bg-warm dark:bg-zinc-950 text-text-primary font-sans">
      {/* Left side: Editorial Image & Tagline (Hidden on mobile) */}
      <div className="relative hidden md:flex flex-col justify-between p-16 lg:p-20 overflow-hidden bg-zinc-900 text-white z-10 border-r border-border-warm/10">
        <div className="absolute inset-0 z-0 opacity-80">
          <img
            src="/brand_story_editorial.png"
            alt="Ruven Studio Brand Campaign"
            className="w-full h-full object-cover"
          />
          {/* Elegant lightened overlay for typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/45" />
        </div>

        {/* Elegant white SVG logo watermark in the center background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-[0.06]">
          <LogoSVG className="w-80 h-80 text-white" />
        </div>

        {/* Top brand signature */}
        <div className="relative z-20 flex items-center gap-3">
          <LogoSVG className="w-6 h-6 text-white" />
          <Link href="/" className="text-xs uppercase font-bold tracking-[0.3em] hover:opacity-80 transition-opacity">
            RUVEN STUDIO
          </Link>
        </div>

        {/* Bottom tagline */}
        <div className="relative z-20 max-w-md space-y-6">
          <h2 className="text-4xl font-extrabold tracking-tight leading-tight uppercase font-editorial">
            Faith, Woven Into Everyday Life.
          </h2>
          <p className="text-xs text-zinc-300 font-light leading-relaxed tracking-wider">
            Every garment is crafted as a physical canvas for timeless truths—designed with quiet purpose for modern creative environments.
          </p>
        </div>

        {/* Footer info */}
        <div className="relative z-20 text-[10px] text-zinc-400 tracking-wider uppercase font-semibold">
          © {new Date().getFullYear()} Ruven Studio. All rights reserved.
        </div>
      </div>

      {/* Right side: Elegant Authentication Card */}
      <div className="flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white dark:bg-zinc-950">
        <div className="w-full max-w-[420px] space-y-10">
          {/* Logo & Welcome Header */}
          <div className="space-y-8">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <LogoSVG className="w-8 h-8 text-brand-burgundy dark:text-white" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-text-primary group-hover:text-brand-burgundy transition-colors">
                RUVEN STUDIO
              </span>
            </Link>
            <div className="space-y-3">
              <h1 className="text-2xl font-bold tracking-tight text-text-primary uppercase">Welcome Back</h1>
              <p className="text-xs text-text-muted leading-relaxed">
                Sign in to continue to your Ruven Studio account.
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-none p-3.5 flex items-start gap-3 text-xs text-red-600 dark:text-red-400 transition-all">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-8">
            {/* Email Field */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-wider text-text-primary block">
                Email Address
              </label>
              <div className="relative flex items-center border border-zinc-300 dark:border-zinc-800 bg-transparent h-[52px] px-4 focus-within:border-brand-burgundy transition-colors rounded-none">
                <Mail className="w-4 h-4 text-text-muted mr-3.5 flex-shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-full text-xs bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-text-primary placeholder:text-text-light-muted font-sans"
                  placeholder="name@domain.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-primary block">
                  Password
                </label>
                <Link href="#" className="text-[9px] uppercase font-bold text-text-muted hover:text-brand-burgundy transition-colors tracking-wider">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative flex items-center border border-zinc-300 dark:border-zinc-800 bg-transparent h-[52px] px-4 focus-within:border-brand-burgundy transition-colors rounded-none">
                <Lock className="w-4 h-4 text-text-muted mr-3.5 flex-shrink-0" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-full text-xs bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-text-primary placeholder:text-text-light-muted font-sans"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Remember Me Toggle */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 accent-brand-burgundy rounded-none border-zinc-300 text-brand-burgundy focus:ring-0 focus:ring-offset-0"
                />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                  Remember Me
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[52px] bg-brand-burgundy hover:bg-brand-burgundy-light text-white text-xs font-bold uppercase tracking-widest rounded-none transition-all flex items-center justify-center gap-2 cursor-pointer active:translate-y-[1px]"
            >
              <span>{loading ? "Authenticating Session..." : "Continue"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Create Account Link / Alternative Action */}
          <div className="text-center pt-2">
            <span className="text-xs text-text-muted">
              Don't have an account?{" "}
              <Link href="#" className="font-semibold text-brand-burgundy hover:underline hover:text-brand-burgundy-light transition-colors">
                Create Account
              </Link>
            </span>
          </div>

          {/* Info Helper Box for Sandbox Review */}
          {isDev && process.env.NODE_ENV !== "production" && (
            <div className="bg-bg-card dark:bg-zinc-900/60 p-5 rounded-none border border-zinc-200 dark:border-zinc-800 space-y-3.5 text-[10px] text-text-muted leading-relaxed">
              <span className="font-bold text-text-primary uppercase tracking-wider block">
                Local Sandbox Testing Profiles:
              </span>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold text-brand-burgundy uppercase block tracking-wider text-[9px] mb-0.5">
                    • Admin OS Access:
                  </span>
                  <span>
                    email: <strong className="text-text-primary">admin@ruven.in</strong> / pass: <strong className="text-text-primary">admin123</strong>
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-zinc-500 dark:text-zinc-400 uppercase block tracking-wider text-[9px] mb-0.5">
                    • Customer Storefront Access:
                  </span>
                  <span>
                    email: <strong className="text-text-primary">customer@ruven.in</strong> / pass: <strong className="text-text-primary">customer123</strong>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
