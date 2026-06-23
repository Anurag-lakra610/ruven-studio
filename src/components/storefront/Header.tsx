"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Heart,
  User,
  ShoppingBag,
  Menu,
  X,
  Plus,
  Minus,
  Trash2,
  ChevronRight,
  ArrowRight
} from "lucide-react";

export const Header: React.FC = () => {
  const router = useRouter();
  const {
    cart,
    wishlist,
    isCartOpen,
    isWishlistOpen,
    isSearchOpen,
    searchQuery,
    setCartOpen,
    setWishlistOpen,
    setSearchOpen,
    setSearchQuery,
    removeFromCart,
    updateCartQty,
    removeFromWishlist,
    addToCart
  } = useCart();

  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const cartTotalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionClick = (tag: string) => {
    setSearchQuery(tag);
    setSearchOpen(false);
    router.push(`/shop?search=${encodeURIComponent(tag)}`);
  };

  const handleQuickAddToCart = (wishItem: any) => {
    addToCart(
      {
        id: wishItem.id,
        variantId: `${wishItem.id}-default`,
        name: wishItem.name,
        slug: wishItem.slug,
        price: wishItem.price,
        size: "M", // Default quick add size
        color: "Ink Black",
        image: wishItem.image
      },
      1
    );
    setWishlistOpen(false);
    setCartOpen(true);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="relative w-full h-[40px] bg-brand-burgundy text-white overflow-hidden z-50 flex items-center">
        <div className="flex w-max whitespace-nowrap animate-[announcementMarquee_28s_linear_infinite]">
          <div className="flex items-center gap-12 pr-12">
            <span className="text-[10px] font-bold tracking-[0.08em] uppercase">Designed to Start Conversations About Christ</span>
            <span className="w-1.5 h-3 text-brand-gold font-bold">†</span>
            <span className="text-[10px] font-bold tracking-[0.08em] uppercase">Premium Quality • Faith Inspired • Limited Collections</span>
            <span className="w-1.5 h-3 text-brand-gold font-bold">†</span>
            <span className="text-[10px] font-bold tracking-[0.08em] uppercase">Made with Purpose</span>
            <span className="w-1.5 h-3 text-brand-gold font-bold">†</span>
          </div>
          <div className="flex items-center gap-12 pr-12" aria-hidden="true">
            <span className="text-[10px] font-bold tracking-[0.08em] uppercase">Designed to Start Conversations About Christ</span>
            <span className="w-1.5 h-3 text-brand-gold font-bold">†</span>
            <span className="text-[10px] font-bold tracking-[0.08em] uppercase">Premium Quality • Faith Inspired • Limited Collections</span>
            <span className="w-1.5 h-3 text-brand-gold font-bold">†</span>
            <span className="text-[10px] font-bold tracking-[0.08em] uppercase">Made with Purpose</span>
            <span className="w-1.5 h-3 text-brand-gold font-bold">†</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 left-0 w-full h-[80px] bg-white dark:bg-zinc-950 border-b border-border-warm z-40 flex items-center justify-between px-6 md:px-12 transition-all">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="Ruven Studio Logo"
            width={120}
            height={50}
            className="h-[55px] w-auto object-contain dark:invert"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center h-full">
          <ul className="flex items-center gap-10 h-full">
            <li className="h-full flex items-center">
              <Link href="/" className="text-xs font-bold uppercase tracking-[0.08em] text-text-primary hover:text-brand-burgundy transition-colors relative py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-burgundy after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">
                Home
              </Link>
            </li>
            <li className="group h-full flex items-center static">
              <Link href="/shop" className="text-xs font-bold uppercase tracking-[0.08em] text-text-primary hover:text-brand-burgundy transition-colors relative py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-burgundy after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">
                Shop
              </Link>

              {/* Mega Menu Dropdown */}
              <div className="absolute top-full left-0 w-full bg-white dark:bg-zinc-900 border-b border-border-warm shadow-xl px-12 py-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-350 z-50">
                <div className="max-w-[1400px] mx-auto grid grid-cols-4 gap-8">
                  <Link href="/shop?filter=new-arrivals" className="block group/item transition-transform duration-200">
                    <div className="w-full aspect-[4/3] overflow-hidden rounded bg-bg-card mb-3 relative">
                      <Image src="/hero_lifestyle.png" alt="Featured Collection" fill className="object-cover group-hover/item:scale-105 transition-transform duration-500" />
                    </div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-1">Featured Collection</h5>
                    <p className="text-[10px] text-text-muted">Explore the visual ministry drop</p>
                  </Link>

                  <Link href="/shop?category=oversized-tees" className="block group/item transition-transform duration-200">
                    <div className="w-full aspect-[4/3] overflow-hidden rounded bg-bg-card mb-3 relative">
                      <Image src="/oversized_tee_product.png" alt="Oversized Tees" fill className="object-cover group-hover/item:scale-105 transition-transform duration-500" />
                    </div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-1">Oversized Tees</h5>
                    <p className="text-[10px] text-text-muted">Heavy-weight 240 GSM organic cotton</p>
                  </Link>

                  <Link href="/shop?category=hoodies" className="block group/item transition-transform duration-200">
                    <div className="w-full aspect-[4/3] overflow-hidden rounded bg-bg-card mb-3 relative">
                      <Image src="/faith_hoodie_product.png" alt="Premium Hoodies" fill className="object-cover group-hover/item:scale-105 transition-transform duration-500" />
                    </div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-1">Premium Hoodies</h5>
                    <p className="text-[10px] text-text-muted">Cozy 380 GSM French Terry hoodies</p>
                  </Link>

                  <Link href="/shop?filter=best-sellers" className="block group/item transition-transform duration-200">
                    <div className="w-full aspect-[4/3] overflow-hidden rounded bg-bg-card mb-3 relative">
                      <Image src="/brand_story_lifestyle.png" alt="Best Sellers" fill className="object-cover group-hover/item:scale-105 transition-transform duration-500" />
                    </div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-1">Best Sellers</h5>
                    <p className="text-[10px] text-text-muted">Our most loved conversation starters</p>
                  </Link>
                </div>

                <div className="max-w-[1400px] mx-auto border-t border-border-warm mt-8 pt-4 flex justify-center gap-12">
                  <Link href="/shop?filter=new-arrivals" className="text-[11px] font-bold uppercase tracking-widest text-text-muted hover:text-brand-burgundy transition-colors">
                    New Drops
                  </Link>
                  <Link href="/shop?filter=best-sellers" className="text-[11px] font-bold uppercase tracking-widest text-text-muted hover:text-brand-burgundy transition-colors">
                    Limited Edition
                  </Link>
                  <Link href="/shop" className="text-[11px] font-bold uppercase tracking-widest text-text-muted hover:text-brand-burgundy transition-colors">
                    Browse All
                  </Link>
                </div>
              </div>
            </li>
            <li className="h-full flex items-center">
              <Link href="/shop?filter=new-arrivals" className="text-xs font-bold uppercase tracking-[0.08em] text-text-primary hover:text-brand-burgundy transition-colors relative py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-burgundy after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">
                New Arrivals
              </Link>
            </li>
            <li className="h-full flex items-center">
              <Link href="/#story-section" className="text-xs font-bold uppercase tracking-[0.08em] text-text-primary hover:text-brand-burgundy transition-colors relative py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-burgundy after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">
                Our Story
              </Link>
            </li>
            <li className="h-full flex items-center">
              <Link href="/#community-section" className="text-xs font-bold uppercase tracking-[0.08em] text-text-primary hover:text-brand-burgundy transition-colors relative py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-burgundy after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">
                Community
              </Link>
            </li>
          </ul>
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setSearchOpen(true)}
            className="text-text-primary hover:text-brand-burgundy transition-colors p-1"
            aria-label="Open Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={() => setWishlistOpen(true)}
            className="relative text-text-primary hover:text-brand-burgundy transition-colors p-1"
            aria-label="Open Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-burgundy text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          <Link
            href="/account"
            className="text-text-primary hover:text-brand-burgundy transition-colors p-1"
            aria-label="Account Settings"
          >
            <User className="w-5 h-5" />
          </Link>

          <button
            onClick={() => setCartOpen(true)}
            className="relative text-text-primary hover:text-brand-burgundy transition-colors p-1"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartTotalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-burgundy text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                {cartTotalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-text-primary hover:text-brand-burgundy transition-colors p-1"
            aria-label="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col items-center justify-start pt-[100px] px-6"
          >
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-brand-gold transition-colors p-2"
              aria-label="Close Search"
            >
              <X className="w-7 h-7" />
            </button>

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-2xl"
            >
              <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-border-warm pb-3">
                <Search className="w-6 h-6 text-text-muted mr-3" />
                <input
                  type="text"
                  placeholder="Search oversized tees, hoodies, scriptures..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-lg bg-transparent border-none p-0 focus:outline-none text-text-primary placeholder:text-text-muted"
                  autoFocus
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery("")} className="text-text-muted hover:text-text-primary">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </form>

              <div className="mt-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Popular searches</span>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["tee", "hoodie", "armor", "renewal", "Romans 12:2"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleSuggestionClick(tag)}
                      className="px-3.5 py-1.5 bg-bg-card dark:bg-zinc-800 rounded-full text-xs text-text-primary hover:bg-brand-burgundy hover:text-white transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WISHLIST DRAWER */}
      <AnimatePresence>
        {isWishlistOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setWishlistOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              className="relative w-full max-w-md h-full bg-bg-warm dark:bg-zinc-900 shadow-2xl flex flex-col z-10"
            >
              <div className="flex items-center justify-between p-6 border-b border-border-warm bg-white dark:bg-zinc-950">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-brand-burgundy fill-brand-burgundy" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">My Wishlist ({wishlist.length})</h3>
                </div>
                <button onClick={() => setWishlistOpen(false)} className="p-2 hover:text-brand-burgundy transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <Heart className="w-12 h-12 text-text-muted stroke-[1]" />
                    <p className="text-sm text-text-muted">Your wishlist is currently empty.</p>
                    <Link
                      href="/shop"
                      onClick={() => setWishlistOpen(false)}
                      className="px-6 py-2.5 bg-brand-burgundy text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-gold transition-colors rounded-full"
                    >
                      Browse Catalog
                    </Link>
                  </div>
                ) : (
                  wishlist.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-white dark:bg-zinc-950 border border-border-warm rounded-lg relative group">
                      <div className="w-20 h-24 bg-bg-card rounded overflow-hidden relative flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h4 className="text-xs font-bold text-text-primary uppercase tracking-wide pr-6 line-clamp-1">{item.name}</h4>
                          <p className="text-xs font-semibold text-brand-burgundy mt-1">₹{item.price}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleQuickAddToCart(item)}
                            className="px-3.5 py-1.5 bg-text-primary text-white dark:bg-zinc-800 dark:text-zinc-50 text-[10px] font-bold uppercase tracking-wider hover:bg-brand-burgundy rounded transition-colors flex items-center gap-1"
                          >
                            Quick Add (M)
                          </button>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="p-1.5 text-text-muted hover:text-red-600 transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              className="relative w-full max-w-md h-full bg-bg-warm dark:bg-zinc-900 shadow-2xl flex flex-col z-10"
            >
              <div className="flex items-center justify-between p-6 border-b border-border-warm bg-white dark:bg-zinc-950">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-brand-burgundy" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">Shopping Cart ({cartTotalItems})</h3>
                </div>
                <button onClick={() => setCartOpen(false)} className="p-2 hover:text-brand-burgundy transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <ShoppingBag className="w-12 h-12 text-text-muted stroke-[1]" />
                    <p className="text-sm text-text-muted">Your cart is empty.</p>
                    <Link
                      href="/shop"
                      onClick={() => setCartOpen(false)}
                      className="px-6 py-2.5 bg-brand-burgundy text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-gold transition-colors rounded-full"
                    >
                      Shop Now
                    </Link>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4 p-4 bg-white dark:bg-zinc-950 border border-border-warm rounded-lg">
                      <div className="w-20 h-24 bg-bg-card rounded overflow-hidden relative flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs font-bold text-text-primary uppercase tracking-wide line-clamp-1 pr-2">{item.name}</h4>
                            <button
                              onClick={() => removeFromCart(item.id, item.size)}
                              className="text-text-muted hover:text-red-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">
                            Size: {item.size} • Color: {item.color}
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-border-warm rounded bg-bg-card dark:bg-zinc-800">
                            <button
                              onClick={() => updateCartQty(item.id, item.size, -1)}
                              className="p-1 hover:bg-border-warm dark:hover:bg-zinc-700 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-text-primary">{item.qty}</span>
                            <button
                              onClick={() => updateCartQty(item.id, item.size, 1)}
                              className="p-1 hover:bg-border-warm dark:hover:bg-zinc-700 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-xs font-bold text-brand-burgundy">₹{item.price * item.qty}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-border-warm bg-white dark:bg-zinc-950 space-y-4">
                  <div className="flex justify-between text-xs uppercase tracking-wider text-text-primary font-bold">
                    <span>Subtotal</span>
                    <span className="text-brand-burgundy text-sm">₹{cartSubtotal}</span>
                  </div>
                  <p className="text-[10px] text-text-muted">
                    Tax and shipping calculated at checkout. Free shipping on orders over ₹1,500.
                  </p>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      router.push("/checkout");
                    }}
                    className="w-full py-3 bg-brand-burgundy text-white hover:bg-brand-gold font-bold text-xs uppercase tracking-widest rounded-full transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MOBILE NAV SLIDEOUT MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="relative w-full max-w-[280px] h-full bg-white dark:bg-zinc-900 shadow-2xl flex flex-col z-10"
            >
              <div className="flex items-center justify-between p-6 border-b border-border-warm bg-white dark:bg-zinc-950">
                <Image src="/logo.png" alt="Ruven Logo" width={80} height={35} className="h-[35px] w-auto object-contain dark:invert" />
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:text-brand-burgundy transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-6 space-y-6">
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm font-bold uppercase tracking-wider text-text-primary hover:text-brand-burgundy transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm font-bold uppercase tracking-wider text-text-primary hover:text-brand-burgundy transition-colors"
                    >
                      Shop All
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop?category=oversized-tees"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block pl-4 text-xs font-semibold text-text-muted hover:text-brand-burgundy transition-colors"
                    >
                      — Oversized Tees
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop?category=hoodies"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block pl-4 text-xs font-semibold text-text-muted hover:text-brand-burgundy transition-colors"
                    >
                      — French Terry Hoodies
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop?filter=new-arrivals"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm font-bold uppercase tracking-wider text-text-primary hover:text-brand-burgundy transition-colors"
                    >
                      New Arrivals
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#story-section"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm font-bold uppercase tracking-wider text-text-primary hover:text-brand-burgundy transition-colors"
                    >
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#community-section"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm font-bold uppercase tracking-wider text-text-primary hover:text-brand-burgundy transition-colors"
                    >
                      Community
                    </Link>
                  </li>
                </ul>

                <div className="border-t border-border-warm pt-6 space-y-4">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setWishlistOpen(true);
                    }}
                    className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-text-primary"
                  >
                    <span>Wishlist ({wishlist.length})</span>
                    <Heart className="w-4 h-4 text-brand-burgundy" />
                  </button>

                  <Link
                    href="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-text-primary"
                  >
                    <span>My Account</span>
                    <User className="w-4 h-4 text-text-muted" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
