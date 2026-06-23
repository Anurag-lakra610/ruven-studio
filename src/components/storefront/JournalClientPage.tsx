"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MockDevotional, MockProduct } from "@/lib/db";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingBag, Calendar, User, ArrowLeft } from "lucide-react";

interface JournalClientPageProps {
  article: MockDevotional;
  relatedProducts: MockProduct[];
}

export const JournalClientPage: React.FC<JournalClientPageProps> = ({ article, relatedProducts }) => {
  const { cart, wishlist, toggleWishlist, addToCart, setCartOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState("M");

  const relatedProduct = relatedProducts[0]; //Curate first related product

  const handleQuickAdd = (product: MockProduct, size: string) => {
    addToCart(
      {
        id: product.id,
        variantId: product.variants?.find((v) => v.size === size)?.id || `${product.id}-default`,
        name: product.name,
        slug: product.slug,
        price: product.base_price,
        size: size,
        color: product.slug === "armor-of-light-heavyweight-tee" ? "Ink Black" : "Warm Charcoal",
        image: product.image
      },
      1
    );
    setCartOpen(true);
  };

  const handleWishlistToggle = (product: MockProduct) => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.base_price,
      image: product.image
    });
  };

  const isItemInWishlist = (productId: string) => wishlist.some((item) => item.id === productId);

  const displayAuthor = (!article.author || article.author === "Super Admin" || article.author === "Admin" || article.author === "admin") ? "Ruven Studio" : article.author;

  return (
    <div className="w-full bg-bg-warm dark:bg-zinc-950 py-12 px-6 md:px-12 lg:px-20">
      {/* Back button */}
      <div className="max-w-3xl mx-auto mb-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-muted hover:text-brand-burgundy transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Collection</span>
        </Link>
      </div>

      <article className="max-w-3xl mx-auto space-y-12">
        {/* Cover Header */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-tight uppercase">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-xs text-text-muted font-semibold pb-6 border-b border-border-warm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-brand-gold" />
              <span>By {displayAuthor}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-gold" />
              <span>
                {new Date(article.published_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden shadow-md border border-border-warm">
          <Image src={article.cover_image_url} alt={article.title} fill className="object-cover" />
        </div>

        {/* Body content */}
        <div className="space-y-6 text-sm text-text-primary leading-relaxed">
          {article.body_json.map((block, idx) => {
            if (block.type === "paragraph") {
              return (
                <p key={idx} className="text-justify font-medium opacity-90">
                  {block.content}
                </p>
              );
            }
            if (block.type === "heading") {
              return (
                <h2 key={idx} className="text-lg md:text-xl font-bold uppercase tracking-wide text-text-primary pt-4">
                  {block.content}
                </h2>
              );
            }
            if (block.type === "scripture") {
              return (
                <div key={idx} className="bg-white dark:bg-zinc-900 border-l-4 border-brand-burgundy rounded-r-lg p-5 my-8 space-y-2 relative overflow-hidden">
                  <span className="absolute -right-6 -bottom-6 text-brand-gold/10 text-8xl font-bold select-none pointer-events-none">
                    †
                  </span>
                  <p className="italic text-base text-brand-burgundy font-medium leading-relaxed">
                    "{block.content}"
                  </p>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-text-muted text-right">
                    — {block.reference}
                  </p>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Curated Commerce Embed: Shop the Inspiration */}
        {relatedProduct && (
          <div className="border border-border-warm rounded-xl bg-white dark:bg-zinc-900 p-6 md:p-8 space-y-6 mt-16 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-brand-gold block">
                  Shop the Inspiration
                </span>
                <h3 className="text-sm font-bold uppercase tracking-wide text-text-primary">
                  {relatedProduct.name}
                </h3>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-brand-burgundy">₹{relatedProduct.base_price}</span>
                {relatedProduct.original_price && (
                  <span className="text-[10px] text-text-muted line-through">₹{relatedProduct.original_price}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative aspect-[3/4] w-full md:w-32 rounded bg-bg-card border border-border-warm overflow-hidden flex-shrink-0">
                <Image src={relatedProduct.image} alt={relatedProduct.name} fill className="object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1 space-y-4">
                <p className="text-xs text-text-muted leading-relaxed">
                  Inspired directly by the scriptures discussed in this devotional article. Cut in our signature boxy oversized streetwear silhouette from heavy organic combed cotton.
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border-warm">
                  {/* Sizes */}
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase text-text-muted tracking-wider">Size:</span>
                    <div className="flex gap-1">
                      {["S", "M", "L", "XL"].map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`w-7 h-7 rounded border text-[9px] font-bold flex items-center justify-center transition-colors ${
                            selectedSize === sz
                              ? "bg-text-primary text-white border-text-primary"
                              : "border-border-warm hover:border-text-primary text-text-primary"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleQuickAdd(relatedProduct, selectedSize)}
                      className="px-4 py-2 bg-brand-burgundy hover:bg-brand-gold text-white text-[9px] font-bold uppercase tracking-widest rounded transition-colors flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                    <button
                      onClick={() => handleWishlistToggle(relatedProduct)}
                      className="p-2 border border-border-warm rounded hover:bg-bg-card transition-colors flex items-center justify-center bg-white dark:bg-zinc-900"
                      aria-label="Add to wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isItemInWishlist(relatedProduct.id) ? "text-brand-burgundy fill-brand-burgundy" : "text-text-primary"}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
