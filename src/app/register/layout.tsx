import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account — Ruven Studio",
  description:
    "Create a Ruven Studio account to get early access to drops, save items in your wishlist, and track your orders.",
  robots: { index: false, follow: false },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
