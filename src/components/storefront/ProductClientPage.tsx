"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MockProduct } from "@/lib/db";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck, Plus, Minus, ChevronDown, Check } from "lucide-react";

interface ProductClientPageProps {
  product: MockProduct;
}

export const ProductClientPage: React.FC<ProductClientPageProps> = ({ product }) => {
  const { cart, wishlist, toggleWishlist, addToCart, setCartOpen } = useCart();

  // Selected state
  const [selectedSize, setSelectedSize] = useState(product.variants[0]?.size || "M");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "size-chart">("description");
  const [isAccordionOpen, setAccordionOpen] = useState(false);

  const selectedVariant = product.variants.find((v) => v.size === selectedSize);
  const stockAvailable = selectedVariant ? selectedVariant.stock : 0;
  const isLowStock = stockAvailable > 0 && stockAvailable <= 80; // adjusted threshold for seed values

  const handleAddToCart = () => {
    if (stockAvailable === 0) return;
    addToCart(
      {
        id: product.id,
        variantId: selectedVariant?.id || `${product.id}-default`,
        name: product.name,
        slug: product.slug,
        price: product.base_price,
        size: selectedSize,
        color: selectedVariant?.color || "Ink Black",
        image: product.image
      },
      quantity
    );
    setCartOpen(true);
  };

  const handleWishlistToggle = () => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.base_price,
      image: product.image
    });
  };

  const isItemInWishlist = wishlist.some((item) => item.id === product.id);

  return (
    <div className="w-full bg-bg-warm dark:bg-zinc-950 py-12 px-6 md:px-12 lg:px-20">
      {/* Breadcrumbs */}
      <nav className="text-[10px] uppercase font-bold tracking-widest text-text-muted mb-8 max-w-[1400px] mx-auto">
        <Link href="/" className="hover:text-brand-burgundy transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-brand-burgundy transition-colors">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-brand-gold">{product.name}</span>
      </nav>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Product Images */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-bg-card border border-border-warm shadow-sm group">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02] cursor-zoom-in"
            />
            {product.scripture && (
              <span className="absolute bottom-4 left-4 bg-brand-burgundy text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded">
                {product.scripture.book} {product.scripture.chapter}:{product.scripture.verse}
              </span>
            )}
          </div>
        </div>

        {/* Right: Product Details & Interaction */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
              {product.category_slug === "oversized-tees" ? "Oversized Streetwear Tee" : "French Terry Hoodie"}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary uppercase mt-1">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-xl font-bold text-brand-burgundy">₹{product.base_price}</span>
              {product.original_price && (
                <span className="text-xs text-text-muted line-through">₹{product.original_price}</span>
              )}
            </div>
          </div>

          {/* Scripture focus card */}
          {product.scripture && (
            <div className="bg-white dark:bg-zinc-900 border border-brand-gold/20 rounded-xl p-5 space-y-3 relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 text-brand-gold/10 text-7xl font-bold select-none pointer-events-none">
                †
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-brand-gold">Scripture Focus</span>
              <p className="text-xs text-brand-burgundy italic font-medium leading-relaxed">
                "{product.scripture.text_content}"
              </p>
              <p className="text-[10px] uppercase font-bold tracking-widest text-text-muted">
                — {product.scripture.book} {product.scripture.chapter}:{product.scripture.verse} ({product.scripture.translation})
              </p>
            </div>
          )}

          {/* Sizing selection */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold uppercase tracking-wider text-text-primary">Select Size</span>
              <button
                onClick={() => setAccordionOpen(!isAccordionOpen)}
                className="text-[10px] font-bold uppercase text-brand-burgundy hover:text-brand-gold transition-colors flex items-center gap-1"
              >
                <span>Sizing Chart</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isAccordionOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* Sizing Chart Drawer Accordion */}
            {isAccordionOpen && (
              <div className="border border-border-warm bg-white dark:bg-zinc-900 rounded-lg p-4 text-[11px] text-text-primary space-y-2 animate-fadeIn">
                <p className="font-semibold text-text-muted">Oversized Boxy Fit (Sizes in Inches):</p>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border-warm text-left text-text-muted">
                      <th className="py-1">Size</th>
                      <th className="py-1">Chest</th>
                      <th className="py-1">Length</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="py-1 font-bold">S</td>
                      <td className="py-1">42"</td>
                      <td className="py-1">27.5"</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="py-1 font-bold">M</td>
                      <td className="py-1">44"</td>
                      <td className="py-1">28"</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="py-1 font-bold">L</td>
                      <td className="py-1">46"</td>
                      <td className="py-1">29"</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold">XL</td>
                      <td className="py-1">48"</td>
                      <td className="py-1">30"</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-[10px] text-text-muted italic pt-1">
                  *We recommend sizing down if you prefer a standard, less-oversized look.
                </p>
              </div>
            )}

            <div className="flex gap-2">
              {product.variants.map((variant) => {
                const isOutOfStock = variant.stock === 0;
                return (
                  <button
                    key={variant.id}
                    disabled={isOutOfStock}
                    onClick={() => {
                      setSelectedSize(variant.size);
                      setQuantity(1);
                    }}
                    className={`w-12 h-12 rounded-lg border text-xs font-bold flex flex-col items-center justify-center transition-all relative ${
                      isOutOfStock
                        ? "border-dashed border-border-warm text-zinc-300 dark:text-zinc-700 cursor-not-allowed"
                        : selectedSize === variant.size
                        ? "bg-text-primary text-white border-text-primary"
                        : "bg-white dark:bg-zinc-900 border-border-warm hover:border-text-primary text-text-primary"
                    }`}
                  >
                    <span>{variant.size}</span>
                    {isOutOfStock && (
                      <span className="absolute text-[7px] text-red-500 font-bold bottom-1 uppercase tracking-tighter">Out</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Inventory Alerts */}
            {stockAvailable > 0 ? (
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 dark:text-green-500 uppercase tracking-wider">
                <Check className="w-3.5 h-3.5" />
                <span>In Stock • Ready to ship ({stockAvailable} units)</span>
              </div>
            ) : (
              <div className="text-[10px] font-bold text-red-500 uppercase tracking-wider">
                Temporarily Sold Out
              </div>
            )}
            {isLowStock && stockAvailable > 0 && (
              <p className="text-[10px] text-brand-gold font-bold uppercase tracking-wider">
                ⚠️ Limited Stock: Only {stockAvailable} pieces left in this size!
              </p>
            )}
          </div>

          {/* Quantity & Buy Buttons */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-text-primary">Quantity</span>
              <div className="flex items-center border border-border-warm rounded bg-white dark:bg-zinc-900">
                <button
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(quantity - 1)}
                  className="p-2 hover:bg-border-warm dark:hover:bg-zinc-800 disabled:opacity-30 transition-colors"
                >
                  <Minus className="w-4 h-4 text-text-primary" />
                </button>
                <span className="w-10 text-center font-bold text-text-primary text-sm">{quantity}</span>
                <button
                  disabled={quantity >= stockAvailable}
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-border-warm dark:hover:bg-zinc-800 disabled:opacity-30 transition-colors"
                >
                  <Plus className="w-4 h-4 text-text-primary" />
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={stockAvailable === 0}
                className="flex-1 py-4 bg-brand-burgundy hover:bg-brand-gold disabled:bg-zinc-300 disabled:dark:bg-zinc-800 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-widest rounded-full transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-burgundy/10"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                onClick={handleWishlistToggle}
                className="p-4 border border-border-warm rounded-full hover:bg-bg-card transition-colors flex items-center justify-center bg-white dark:bg-zinc-900"
                aria-label="Toggle Wishlist"
              >
                <Heart className={`w-5 h-5 ${isItemInWishlist ? "text-brand-burgundy fill-brand-burgundy" : "text-text-primary"}`} />
              </button>
            </div>
          </div>

          {/* Sizing Details description tab */}
          <div className="border-t border-border-warm pt-6 space-y-4">
            <div className="flex border-b border-border-warm">
              <button
                onClick={() => setActiveTab("description")}
                className={`pb-2.5 text-xs font-bold uppercase tracking-wider border-b-2 mr-6 transition-all ${
                  activeTab === "description" ? "border-brand-burgundy text-brand-burgundy" : "border-transparent text-text-muted"
                }`}
              >
                Story & Details
              </button>
            </div>

            {activeTab === "description" && (
              <div className="text-xs text-text-muted leading-relaxed space-y-3">
                <p>{product.description}</p>
                <ul className="list-disc pl-4 space-y-1 pt-2">
                  <li>Oversized Scandinavian boxy silhouette</li>
                  <li>
                    Fabric: {product.slug === "armor-of-light-heavyweight-tee" ? "240 GSM organic combed cotton" : "380 GSM ultra-heavy French Terry"}
                  </li>
                  <li>Premium hand-screened scripture printing</li>
                  <li>Preshrunk structure, built to resist warping</li>
                  <li>Crafted ethically in Tiruppur, India</li>
                </ul>
              </div>
            )}
          </div>

          {/* Retail trust features */}
          <div className="border-t border-border-warm pt-6 grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center space-y-1.5">
              <Truck className="w-5 h-5 text-brand-gold" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-text-primary">Free Shipping</span>
              <span className="text-[8px] text-text-muted">On orders &gt; ₹1500</span>
            </div>
            <div className="flex flex-col items-center space-y-1.5">
              <RotateCcw className="w-5 h-5 text-brand-gold" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-text-primary">Replacement</span>
              <span className="text-[8px] text-text-muted">7 days returns window</span>
            </div>
            <div className="flex flex-col items-center space-y-1.5">
              <ShieldCheck className="w-5 h-5 text-brand-gold" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-text-primary">Secured UPI</span>
              <span className="text-[8px] text-text-muted">Razorpay payments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
