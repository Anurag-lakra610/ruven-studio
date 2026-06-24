"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/storefront/Header";

const T = {
  bgPage:       "#F5F3EE",
  bgWhite:      "#FFFFFF",
  dark:         "#1A1A18",
  muted:        "#888880",
  border:       "#C8C5BE",
  errorRed:     "#E24B4A",
  errorBg:      "#FCEBEB",
  errorBorder:  "#F09595",
  errorText:    "#A32D2D",
  successGreen: "#2D7D46",
  successBg:    "#EBF7EE",
  successBorder:"#9EDCA9",
  successText:  "#1C522D",
} as const;

const baseInput: React.CSSProperties = {
  border: `1px solid ${T.border}`,
  borderRadius: 0,
  background: T.bgWhite,
  height: "42px",
  padding: "0 12px",
  fontSize: "13px",
  color: T.dark,
  width: "100%",
  outline: "none",
  display: "block",
  boxSizing: "border-box",
  fontFamily: "inherit",
  transition: "border-color 0.15s ease",
};

const labelSt: React.CSSProperties = {
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  fontWeight: 500,
  color: "#555555",
  display: "block",
  marginBottom: "5px",
};

function RegisterForm() {
  const router = useRouter();

  // Form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDev, setIsDev] = useState(false);

  // Focused states
  const [emailFocused, setEmailFocused] = useState(false);
  const [pwFocused, setPwFocused] = useState(false);
  const [confirmPwFocused, setConfirmPwFocused] = useState(false);

  // Error & Success states
  const [emailError, setEmailError] = useState("");
  const [pwError, setPwError] = useState("");
  const [confirmPwError, setConfirmPwError] = useState("");
  const [authError, setAuthError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Password requirements
  const hasMinLength = password.length >= 6;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const h = window.location.hostname;
    setIsDev(h === "localhost" || h === "127.0.0.1" || window.location.port !== "");
  }, []);

  const validateForm = useCallback((): boolean => {
    let ok = true;
    setEmailError("");
    setPwError("");
    setConfirmPwError("");

    if (!email.trim()) {
      setEmailError("Email address is required.");
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
      ok = false;
    }

    if (!password) {
      setPwError("Password is required.");
      ok = false;
    } else {
      if (!hasMinLength) {
        setPwError("Password must be at least 6 characters.");
        ok = false;
      } else if (!hasLetter || !hasNumber) {
        setPwError("Password must contain at least one letter and one number.");
        ok = false;
      }
    }

    if (!confirmPassword) {
      setConfirmPwError("Please confirm your password.");
      ok = false;
    } else if (password !== confirmPassword) {
      setConfirmPwError("Passwords do not match.");
      ok = false;
    }

    return ok;
  }, [email, password, confirmPassword, hasMinLength, hasLetter, hasNumber]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setSuccessMessage("");
    if (!validateForm()) return;
    setLoading(true);

    const isDummy =
      process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("dummy") ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (isDummy) {
      await new Promise<void>((res) => setTimeout(res, 1200));
      // Mock successful registration
      document.cookie = "mock_customer_session=true; path=/; max-age=86400";
      document.cookie = `mock_user_email=${email.trim()}; path=/; max-age=86400`;
      const derivedName = email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      document.cookie = `mock_user_name=${derivedName}; path=/; max-age=86400`;
      
      setSuccessMessage("Account created successfully! Redirecting to your dashboard...");
      setTimeout(() => {
        router.push("/account");
      }, 1500);
      return;
    }

    try {
      const supabase = createClient();
      const { data, error: authErr } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/account`,
        }
      });
      if (authErr) throw authErr;

      if (data?.session) {
        setSuccessMessage("Account created successfully! Redirecting...");
        setTimeout(() => {
          if (email.endsWith("@ruvenstudio.in") || email.endsWith("@ruven.in")) {
            router.push("/admin");
          } else {
            router.push("/account");
          }
        }, 1200);
      } else {
        setSuccessMessage("Registration successful! Please check your email inbox to confirm your account.");
        setLoading(false);
      }
    } catch (err: any) {
      setAuthError(err.message || "Failed to create account. Please try again.");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const isDummy =
      process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("dummy") ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (isDummy) {
      setLoading(true);
      await new Promise<void>((res) => setTimeout(res, 800));
      document.cookie = "mock_customer_session=true; path=/; max-age=86400";
      document.cookie = "mock_user_email=google.user@gmail.com; path=/; max-age=86400";
      document.cookie = "mock_user_name=Google Tester; path=/; max-age=86400";
      router.push("/account");
      return;
    }
    try {
      const supabase = createClient();
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/account` },
      });
    } catch {
      setAuthError("Google sign-in failed. Please try again.");
    }
  };

  const emailBorder = emailError ? T.errorRed : emailFocused ? T.dark : T.border;
  const pwBorder = pwError ? T.errorRed : pwFocused ? T.dark : T.border;
  const confirmPwBorder = confirmPwError ? T.errorRed : confirmPwFocused ? T.dark : T.border;

  return (
    <>
      <style>{`
        @keyframes ruven-spin {
          to { transform: rotate(360deg); }
        }
        .ruven-spin {
          animation: ruven-spin 0.7s linear infinite;
        }
        .back-link { color: ${T.muted}; transition: color 0.15s ease; }
        .back-link:hover { color: ${T.dark}; }
        .google-btn { transition: background 0.15s ease, border-color 0.15s ease; }
        .google-btn:hover { background: #F9F9F9 !important; border-color: ${T.dark} !important; }
        .req-item { display: flex; alignItems: center; gap: 4px; fontSize: 10px; color: ${T.muted}; transition: color 0.15s ease; }
        .req-item.active { color: ${T.dark}; }
        @media (max-width: 767px) {
          .login-left-panel { display: none !important; }
          .login-right-panel { width: 100% !important; padding: 32px 24px !important; }
          .login-inner { padding: 0 !important; }
        }
      `}</style>

      <div style={{ display: "flex", flex: 1, overflow: "hidden", minHeight: 0 }}>
        {/* LEFT EDITORIAL PANEL */}
        <div
          className="login-left-panel"
          style={{
            width: "45%",
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
            background: "#2A2820",
          }}
        >
          <img
            src="/brand_story_lifestyle.png"
            alt=""
            aria-hidden="true"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/brand_story_editorial.png";
            }}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(26,24,19,0.90) 0%, rgba(26,24,19,0.35) 50%, rgba(26,24,19,0.10) 100%)",
              zIndex: 1,
            }}
          />
          <div style={{ position: "absolute", bottom: "40px", left: "32px", right: "32px", zIndex: 2 }}>
            <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.50)", margin: "0 0 10px 0" }}>
              Studio Membership
            </p>
            <blockquote style={{ margin: 0, padding: 0, border: "none", fontFamily: 'Georgia, "Times New Roman", serif', color: T.bgWhite }}>
              <p style={{ fontSize: "18px", fontWeight: 400, lineHeight: 1.4, letterSpacing: "-0.01em", margin: "0 0 8px 0", fontStyle: "italic" }}>
                &ldquo;Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come.&rdquo;
              </p>
              <footer style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.60)" }}>
                &mdash; 2 Corinthians 5:17
              </footer>
            </blockquote>
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div
          className="login-right-panel"
          style={{
            flex: 1,
            background: T.bgWhite,
            overflowY: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 24px",
            fontFamily: 'var(--font-sans)',
          }}
        >
          <div className="login-inner" style={{ width: "100%", maxWidth: "380px", padding: "48px 40px", background: T.bgWhite }}>
            <Link href="/shop" className="back-link" style={{ fontSize: "12px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px", cursor: "pointer", marginBottom: "32px" }}>
              &larr; Back to shop
            </Link>

            <h1 style={{ fontSize: "28px", fontWeight: 600, color: T.dark, letterSpacing: "-0.025em", lineHeight: 1.2, margin: "0 0 6px 0" }}>
              Create account.
            </h1>
            <p style={{ fontSize: "13px", color: T.muted, lineHeight: 1.5, margin: "0 0 36px 0" }}>
              Sign up for a Ruven Studio account.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div style={{ marginBottom: "20px" }}>
                <label htmlFor="register-email" style={labelSt}>Email address</label>
                <input
                  id="register-email"
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                    if (authError) setAuthError("");
                  }}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  style={{ ...baseInput, borderColor: emailBorder }}
                />
                {emailError && (
                  <span style={{ display: "block", fontSize: "11px", color: T.errorRed, marginTop: "4px" }}>
                    {emailError}
                  </span>
                )}
              </div>

              {/* Password */}
              <div style={{ marginBottom: "20px" }}>
                <label htmlFor="register-password" style={labelSt}>Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (pwError) setPwError("");
                      if (authError) setAuthError("");
                    }}
                    onFocus={() => setPwFocused(true)}
                    onBlur={() => setPwFocused(false)}
                    style={{ ...baseInput, paddingRight: "44px", borderColor: pwBorder }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, color: T.muted }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {pwError && (
                  <span style={{ display: "block", fontSize: "11px", color: T.errorRed, marginTop: "4px" }}>
                    {pwError}
                  </span>
                )}

                {/* Password strength guide */}
                <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div className={`req-item ${hasMinLength ? "active" : ""}`} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px" }}>
                    {hasMinLength ? <Check size={10} style={{ color: T.successGreen }} /> : <div style={{ width: 10, height: 10, borderRadius: "50%", border: `1px solid ${T.border}` }} />}
                    <span>At least 6 characters</span>
                  </div>
                  <div className={`req-item ${hasLetter ? "active" : ""}`} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px" }}>
                    {hasLetter ? <Check size={10} style={{ color: T.successGreen }} /> : <div style={{ width: 10, height: 10, borderRadius: "50%", border: `1px solid ${T.border}` }} />}
                    <span>Contains at least one letter</span>
                  </div>
                  <div className={`req-item ${hasNumber ? "active" : ""}`} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px" }}>
                    {hasNumber ? <Check size={10} style={{ color: T.successGreen }} /> : <div style={{ width: 10, height: 10, borderRadius: "50%", border: `1px solid ${T.border}` }} />}
                    <span>Contains at least one number</span>
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div style={{ marginBottom: "24px" }}>
                <label htmlFor="register-confirm-password" style={labelSt}>Confirm Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    id="register-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (confirmPwError) setConfirmPwError("");
                      if (authError) setAuthError("");
                    }}
                    onFocus={() => setConfirmPwFocused(true)}
                    onBlur={() => setConfirmPwFocused(false)}
                    style={{ ...baseInput, paddingRight: "44px", borderColor: confirmPwBorder }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, color: T.muted }}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {confirmPwError && (
                  <span style={{ display: "block", fontSize: "11px", color: T.errorRed, marginTop: "4px" }}>
                    {confirmPwError}
                  </span>
                )}
              </div>

              {/* Success Banner (styled with beautiful green) */}
              {successMessage && (
                <div
                  role="alert"
                  style={{
                    background: T.successBg,
                    border: `1px solid ${T.successBorder}`,
                    padding: "10px 14px",
                    marginBottom: "20px",
                    fontSize: "12px",
                    color: T.successText,
                    lineHeight: 1.5,
                  }}
                >
                  {successMessage}
                </div>
              )}

              {/* Error Banner */}
              {authError && (
                <div
                  role="alert"
                  style={{
                    background: T.errorBg,
                    border: `1px solid ${T.errorBorder}`,
                    padding: "10px 14px",
                    marginBottom: "20px",
                    fontSize: "12px",
                    color: T.errorText,
                    lineHeight: 1.5,
                  }}
                >
                  {authError}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: T.dark,
                  color: "#FFFFFF",
                  borderRadius: 0,
                  height: "44px",
                  width: "100%",
                  fontSize: "13px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  fontWeight: 500,
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginBottom: "20px",
                  transition: "opacity 0.15s ease",
                }}
              >
                {loading ? (
                  <>
                    <span className="ruven-spin" style={{ width: "14px", height: "14px", border: "1.5px solid rgba(255,255,255,0.35)", borderTopColor: "#FFFFFF", borderRadius: "50%", display: "inline-block" }} />
                    Creating account…
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ flex: 1, height: "0.5px", background: T.border }} />
                <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: T.muted }}>OR</span>
                <div style={{ flex: 1, height: "0.5px", background: T.border }} />
              </div>

              <button
                type="button"
                className="google-btn"
                onClick={handleGoogleSignIn}
                style={{
                  background: "transparent",
                  border: `1px solid ${T.border}`,
                  borderRadius: 0,
                  height: "40px",
                  width: "100%",
                  fontSize: "12px",
                  color: "#555555",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  marginBottom: "24px",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>

              <p style={{ textAlign: "center", fontSize: "12px", color: T.muted, margin: 0 }}>
                Already have an account?
                <Link
                  href="/login"
                  style={{
                    color: T.dark,
                    fontWeight: 600,
                    textDecoration: "underline",
                    marginLeft: "4px",
                  }}
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default function RegisterPage() {
  return (
    <CartProvider>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#FFFFFF", overflowX: "hidden" }}>
        <Header />
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          <RegisterForm />
        </div>
      </div>
    </CartProvider>
  );
}
