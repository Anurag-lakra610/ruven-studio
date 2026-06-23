"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { getProducts, getCategories, MockProduct, MockCategory } from "@/lib/db";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingBag, SlidersHorizontal, ArrowUpDown, X, Search, Star } from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const { cart, wishlist, toggleWishlist, addToCart, setCartOpen } = useCart();

  // State
  const [products, setProducts] = useState<MockProduct[]>([]);
  const [categories, setCategories] = useState<MockCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [isMobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Load from search params on mount / params change
  useEffect(() => {
    getCategories().then((res) => setCategories(res));
    getProducts().then((res) => setProducts(res));
  }, []);

  useEffect(() => {
    const cat = searchParams.get("category");
    const search = searchParams.get("search");
    const filt = searchParams.get("filter");

    if (cat) setSelectedCategory(cat);
    if (search) setSearchTerm(search);
    if (filt) {
      if (filt === "new-arrivals") setSortBy("newest");
      if (filt === "best-sellers") setSortBy("best-selling");
    }
  }, [searchParams]);

  // Filtering Logic
  const filteredProducts = products.filter((product) => {
    // Category match
    if (selectedCategory !== "all" && product.category_slug !== selectedCategory) {
      return false;
    }
    // Search term match
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(lower);
      const descMatch = product.description.toLowerCase().includes(lower);
      const verseMatch = product.scripture?.text_content.toLowerCase().includes(lower) || false;
      if (!nameMatch && !descMatch && !verseMatch) return false;
    }
    // Price match
    if (product.base_price > priceRange) {
      return false;
    }
    // Size match
    if (selectedSizes.length > 0) {
      const hasSize = product.variants.some((v) => selectedSizes.includes(v.size) && v.stock > 0);
      if (!hasSize) return false;
    }
    return true;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.base_price - b.base_price;
    if (sortBy === "price-high") return b.base_price - a.base_price;
    if (sortBy === "newest") return b.slug.localeCompare(a.slug); // Mock newer
    if (sortBy === "best-selling") return b.base_price > a.base_price ? -1 : 1; // Mock best-selling
    return 0; // Default featured
  });

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

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

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSearchTerm("");
    setPriceRange(5000);
    setSelectedSizes([]);
  };

  return (
    <div className="w-full flex flex-col bg-bg-warm dark:bg-zinc-950 min-h-screen">
      {/* Editorial Header Banner */}
      <div className="relative h-[280px] w-full bg-zinc-950 flex items-center px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image src="/hero_lifestyle.png" alt="Ruven Collection Banner" fill className="object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        </div>
        <div className="relative z-10 space-y-4 max-w-xl text-white">
          <nav className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 flex items-center gap-2">
            <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-gold">Shop Drops</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">Oversized Faith Collection</h1>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Minimal clothing inspired by scriptures and constructed to spark quiet conversations. Handcrafted premium streetwear using organic heavyweight cotton.
          </p>
        </div>
      </div>

      {/* Category Selection Tabs */}
      <div className="w-full bg-white dark:bg-zinc-900 border-b border-border-warm py-4 sticky top-[80px] z-30">
        <div className="max-w-[1400px] mx-auto px-6 flex overflow-x-auto gap-4 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
              selectedCategory === "all"
                ? "bg-brand-burgundy text-white"
                : "bg-bg-card text-text-primary hover:bg-border-warm"
            }`}
          >
            All Drops
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
                selectedCategory === cat.slug
                  ? "bg-brand-burgundy text-white"
                  : "bg-bg-card text-text-primary hover:bg-border-warm"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-8">
          <div className="flex justify-between items-center pb-4 border-b border-border-warm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">Filter Catalog</h3>
            <button onClick={clearAllFilters} className="text-[10px] uppercase font-bold text-text-muted hover:text-brand-burgundy transition-colors">
              Clear All
            </button>
          </div>

          {/* Search bar */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wide text-text-primary">Search</h4>
            <div className="relative flex items-center border border-border-warm bg-white dark:bg-zinc-900 rounded p-2">
              <Search className="w-4 h-4 text-text-muted mr-2" />
              <input
                type="text"
                placeholder="Search products, verses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs bg-transparent border-none p-0 focus:outline-none text-text-primary placeholder:text-text-muted"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")}>
                  <X className="w-3.5 h-3.5 text-text-muted hover:text-text-primary" />
                </button>
              )}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-bold uppercase text-text-primary">
              <span>Max Price</span>
              <span className="text-brand-burgundy">₹{priceRange}</span>
            </div>
            <input
              type="range"
              min="1500"
              max="5000"
              step="100"
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              className="w-full accent-brand-burgundy cursor-pointer"
            />
          </div>

          {/* Sizes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wide text-text-primary">Filter By Size</h4>
            <div className="flex flex-wrap gap-2">
              {["S", "M", "L", "XL"].map((sz) => (
                <button
                  key={sz}
                  onClick={() => handleSizeToggle(sz)}
                  className={`w-10 h-10 rounded border text-xs font-bold flex items-center justify-center transition-colors ${
                    selectedSizes.includes(sz)
                      ? "bg-text-primary text-white border-text-primary"
                      : "border-border-warm hover:border-text-primary text-text-primary"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Grid View */}
        <section className="lg:col-span-3 space-y-6">
          {/* Top toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border-warm">
            <span className="text-xs font-semibold text-text-muted">
              Showing {sortedProducts.length} premium products
            </span>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-4 py-2 border border-border-warm rounded text-xs font-bold text-text-primary"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>

              <div className="flex items-center border border-border-warm rounded px-2.5 py-1.5 bg-white dark:bg-zinc-900 ml-auto sm:ml-0">
                <ArrowUpDown className="w-3.5 h-3.5 text-text-muted mr-2" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs bg-transparent border-none p-0 focus:outline-none text-text-primary cursor-pointer"
                >
                  <option value="featured">Featured Drops</option>
                  <option value="newest">Newest Releases</option>
                  <option value="best-selling">Best Selling</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Tags */}
          {(selectedCategory !== "all" || searchTerm || priceRange < 5000 || selectedSizes.length > 0) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Active Filters:</span>
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-zinc-900 border border-border-warm rounded-full text-[10px] font-semibold text-text-primary">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory("all")}><X className="w-3 h-3 text-red-500" /></button>
                </span>
              )}
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-zinc-900 border border-border-warm rounded-full text-[10px] font-semibold text-text-primary">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm("")}><X className="w-3 h-3 text-red-500" /></button>
                </span>
              )}
              {priceRange < 5000 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-zinc-900 border border-border-warm rounded-full text-[10px] font-semibold text-text-primary">
                  Price &lt; ₹{priceRange}
                  <button onClick={() => setPriceRange(5000)}><X className="w-3 h-3 text-red-500" /></button>
                </span>
              )}
              {selectedSizes.map((sz) => (
                <span key={sz} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-zinc-900 border border-border-warm rounded-full text-[10px] font-semibold text-text-primary">
                  Size: {sz}
                  <button onClick={() => handleSizeToggle(sz)}><X className="w-3 h-3 text-red-500" /></button>
                </span>
              ))}
              <button onClick={clearAllFilters} className="text-[10px] font-bold text-brand-burgundy hover:text-brand-gold transition-colors ml-2 uppercase">
                Reset
              </button>
            </div>
          )}

          {/* Product Cards Grid */}
          {sortedProducts.length === 0 ? (
            <div className="h-[300px] flex flex-col items-center justify-center text-center space-y-4">
              <span className="text-2xl">🔍</span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">No products found</h3>
              <p className="text-xs text-text-muted max-w-xs">
                We couldn't find any products matching your active filters. Try resetting search parameters.
              </p>
              <button onClick={clearAllFilters} className="px-6 py-2.5 bg-brand-burgundy hover:bg-brand-gold text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors">
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sortedProducts.map((product) => {
                const sizesAvailable = product.variants.map((v) => v.size);
                return (
                  <div key={product.id} className="bg-white dark:bg-zinc-900 border border-border-warm rounded-xl overflow-hidden shadow-sm flex flex-col justify-between group">
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg-card">
                      <Link href={`/products/${product.slug}`}>
                        <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-103 transition-transform duration-700" />
                      </Link>
                      <button
                        onClick={() => handleWishlistToggle(product)}
                        className="absolute top-3.5 right-3.5 bg-white dark:bg-zinc-800 hover:text-brand-burgundy transition-colors p-2 rounded-full shadow-md z-10"
                        aria-label="Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isItemInWishlist(product.id) ? "text-brand-burgundy fill-brand-burgundy" : "text-text-primary"}`} />
                      </button>
                      {product.slug === "armor-of-light-heavyweight-tee" && (
                        <span className="absolute bottom-3 left-3 bg-brand-burgundy text-white text-[8px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded">
                          Romans 13:12
                        </span>
                      )}
                      {product.slug === "renewal-of-mind-french-terry-hoodie" && (
                        <span className="absolute bottom-3 left-3 bg-brand-gold text-text-primary text-[8px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded">
                          Romans 12:2
                        </span>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-text-muted">
                          {product.category_slug === "oversized-tees" ? "Oversized Tee" : "Streetwear Hoodie"}
                        </span>
                        <Link href={`/products/${product.slug}`}>
                          <h3 className="text-xs font-bold uppercase tracking-wide text-text-primary mt-1 hover:text-brand-burgundy transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-xs font-bold text-brand-burgundy mt-1.5">₹{product.base_price}</p>
                      </div>

                      {/* Sizes Quick Add Buttons */}
                      <div className="pt-3 border-t border-border-warm space-y-2">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-text-muted block">Quick Add Size</span>
                        <div className="flex gap-1">
                          {sizesAvailable.map((sz) => (
                            <button
                              key={sz}
                              onClick={() => handleQuickAdd(product, sz)}
                              className="px-2.5 py-1.5 border border-border-warm rounded text-[9px] font-bold text-text-primary hover:bg-brand-burgundy hover:text-white hover:border-brand-burgundy transition-colors"
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Mobile Filters Modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div onClick={() => setMobileFiltersOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-xs" />
          <div className="relative w-full max-w-sm h-full bg-bg-warm dark:bg-zinc-900 shadow-2xl flex flex-col p-6 z-10 overflow-y-auto space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-border-warm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1 hover:text-brand-burgundy transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wide text-text-primary">Search</h4>
              <div className="relative flex items-center border border-border-warm bg-white dark:bg-zinc-900 rounded p-2">
                <Search className="w-4 h-4 text-text-muted mr-2" />
                <input
                  type="text"
                  placeholder="Search products, verses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-xs bg-transparent border-none focus:outline-none text-text-primary placeholder:text-text-muted"
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold uppercase text-text-primary">
                <span>Max Price</span>
                <span className="text-brand-burgundy">₹{priceRange}</span>
              </div>
              <input
                type="range"
                min="1500"
                max="5000"
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full accent-brand-burgundy cursor-pointer"
              />
            </div>

            {/* Sizes */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wide text-text-primary">Filter By Size</h4>
              <div className="flex flex-wrap gap-2">
                {["S", "M", "L", "XL"].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => handleSizeToggle(sz)}
                    className={`w-10 h-10 rounded border text-xs font-bold flex items-center justify-center transition-colors ${
                      selectedSizes.includes(sz)
                        ? "bg-text-primary text-white border-text-primary"
                        : "border-border-warm hover:border-text-primary text-text-primary"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-border-warm flex gap-4">
              <button
                onClick={() => {
                  clearAllFilters();
                  setMobileFiltersOpen(false);
                }}
                className="flex-1 py-2.5 border border-border-warm rounded text-xs font-bold uppercase text-text-primary hover:bg-border-warm transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 py-2.5 bg-brand-burgundy text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-brand-gold transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen flex items-center justify-center bg-bg-warm dark:bg-zinc-950 text-text-muted text-xs font-bold uppercase tracking-widest">
        Loading Collection Catalog...
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
