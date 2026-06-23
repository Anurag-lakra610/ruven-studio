import type { Metadata } from "next";

// SEO: noindex auth pages — standard practice
export const metadata: Metadata = {
  title: "Sign In — Ruven Studio",
  description:
    "Sign in to your Ruven Studio account to track orders, manage returns, and get early access to limited drops.",
  robots: { index: false, follow: false },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
