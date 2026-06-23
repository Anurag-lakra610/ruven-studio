import React from "react";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/storefront/Header";
import { Footer } from "@/components/storefront/Footer";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-bg-warm dark:bg-zinc-950 font-sans text-text-primary">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
}
