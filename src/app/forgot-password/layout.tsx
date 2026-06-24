import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password — Ruven Studio",
  description: "Reset your Ruven Studio password to regain access to your storefront account.",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
