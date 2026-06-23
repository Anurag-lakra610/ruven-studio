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
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
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
    // Price match checkbox ranges
    if (selectedPrices.length > 0) {
      const match = selectedPrices.some((range) => {
        if (range === "under-2000") return product.base_price < 2000;
        if (range === "2000-3000") return product.base_price >= 2000 && product.base_price <= 3000;
        if (range === "over-3000") return product.base_price > 3000;
        return false;
      });
      if (!match) return false;
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

  const handlePriceToggle = (range: string) => {
    setSelectedPrices((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
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
    setSelectedPrices([]);
    setSelectedSizes([]);
  };

  return (
    <div className="w-full flex flex-col bg-bg-warm dark:bg-zinc-950 min-h-screen">
      {/* Collection Hero Section */}
      <div className="plp-collection-hero">
        <div className="plp-hero-bg-wrap">
          <img src="/hero_lifestyle.png" alt="Ruven Studio Collection Banner" className="plp-hero-bg-img" />
        </div>
        <div className="plp-hero-overlay"></div>
        <div className="plp-hero-content">
          <nav className="plp-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <span className="plp-breadcrumb-sep">/</span>
            <span className="text-brand-gold">Collections</span>
            <span className="plp-breadcrumb-sep">/</span>
            <span id="breadcrumb-current">All Drops</span>
          </nav>
          <h1 className="plp-collection-title">Oversized Faith Collection</h1>
          <p className="plp-collection-desc">
            Minimal clothing inspired by scripture and designed to spark conversations about Christ. Made from organic heavyweight cotton.
          </p>
          <div className="plp-hero-verse-box">
            <p className="plp-hero-verse-quote">"Do not be conformed to this world, but be transformed by the renewal of your mind..."</p>
            <p className="plp-hero-verse-ref">Romans 12:2</p>
          </div>
        </div>
      </div>

      {/* Collection Navigation Tabs */}
      <div className="plp-nav-container">
        <div className="plp-nav-tabs">
          <button 
            onClick={() => setSelectedCategory("all")}
            className={`plp-tab-btn ${selectedCategory === "all" ? "active" : ""}`}
          >
            All Drops
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`plp-tab-btn ${selectedCategory === cat.slug ? "active" : ""}`}
            >
              {cat.name}
            </button>
          ))}
          <button 
            onClick={() => setSortBy("newest")}
            className={`plp-tab-btn ${sortBy === "newest" ? "active" : ""}`}
          >
            New Arrivals
          </button>
          <button 
            onClick={() => setSortBy("best-selling")}
            className={`plp-tab-btn ${sortBy === "best-selling" ? "active" : ""}`}
          >
            Best Sellers
          </button>
        </div>
      </div>

      <div className="section-padding shop-page-v2">
        {/* Collection Search Bar */}
        <div className="plp-search-toolbar">
          <div className="plp-search-container">
            <Search className="plp-search-icon" />
            <input
              type="text"
              id="plp-collection-search"
              placeholder="Search oversized tees, hoodies, verses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="off"
            />
            {searchTerm && (
              <button 
                id="plp-search-clear" 
                onClick={() => setSearchTerm("")} 
                aria-label="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="plp-search-suggestions">
            <span className="plp-suggest-label">Popular:</span>
            {["tee", "hoodie", "armor", "renewal"].map((tag) => (
              <button 
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="plp-suggest-tag"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar: Item count and Sorting */}
        <div className="plp-toolbar">
          <div>
            <p className="plp-items-count">
              Showing {sortedProducts.length} premium products
            </p>
            {/* Active filter tags row */}
            <div className="plp-active-filters-row">
              {(selectedCategory !== "all" || searchTerm || selectedSizes.length > 0 || selectedPrices.length > 0) && (
                <>
                  {selectedCategory !== "all" && (
                    <span className="plp-active-filter-tag">
                      Category: {selectedCategory}
                      <button onClick={() => setSelectedCategory("all")}>&times;</button>
                    </span>
                  )}
                  {searchTerm && (
                    <span className="plp-active-filter-tag">
                      Search: "{searchTerm}"
                      <button onClick={() => setSearchTerm("")}>&times;</button>
                    </span>
                  )}
                  {selectedSizes.map((sz) => (
                    <span key={sz} className="plp-active-filter-tag">
                      Size: {sz}
                      <button onClick={() => handleSizeToggle(sz)}>&times;</button>
                    </span>
                  ))}
                  {selectedPrices.map((pr) => (
                    <span key={pr} className="plp-active-filter-tag">
                      Price: {pr === "under-2000" ? "Under ₹2,000" : pr === "2000-3000" ? "₹2,000 - ₹3,000" : "Over ₹3,000"}
                      <button onClick={() => handlePriceToggle(pr)}>&times;</button>
                    </span>
                  ))}
                  <button onClick={clearAllFilters} className="plp-clear-all-btn-tag" style={{ border: "none", background: "none", color: "var(--color-brand-burgundy)", fontWeight: "bold", fontSize: "0.72rem", cursor: "pointer" }}>
                    Clear All
                  </button>
                </>
              )}
            </div>
          </div>
          
          <div className="plp-toolbar-actions">
            {/* Mobile Filter Trigger */}
            <button 
              onClick={() => setMobileFiltersOpen(true)}
              className="plp-mobile-filter-btn" 
              id="mobile-filter-toggle-btn"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              {(selectedSizes.length + selectedPrices.length > 0) && (
                <span className="plp-filter-badge" id="filter-badge-count">
                  {selectedSizes.length + selectedPrices.length}
                </span>
              )}
            </button>
            
            <div className="plp-sort-wrapper">
              <label htmlFor="plp-sort-select" className="plp-sort-label">Sort By:</label>
              <select 
                id="plp-sort-select" 
                className="plp-sort-dropdown"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured Releases</option>
                <option value="newest">Newest Drops</option>
                <option value="best-selling">Best Selling</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Shopping Section: Sidebar + Product Grid */}
        <div className="plp-layout">
          {/* Desktop Sticky Sidebar Filters */}
          <aside className="plp-sidebar-filters">
            <div className="plp-filter-header">
              <h3>Filter Shop</h3>
              {(selectedCategory !== "all" || searchTerm || selectedSizes.length > 0 || selectedPrices.length > 0) && (
                <button onClick={clearAllFilters} className="plp-clear-all-btn">Clear All</button>
              )}
            </div>
            
            {/* Size Filter */}
            <div className="plp-filter-group-item">
              <h4 className="plp-filter-title">Available Sizes</h4>
              <div className="plp-filter-options size-grid-filter">
                {["S", "M", "L", "XL"].map((sz) => (
                  <button 
                    key={sz}
                    onClick={() => handleSizeToggle(sz)}
                    className={`plp-size-filter-btn ${selectedSizes.includes(sz) ? "active" : ""}`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="plp-filter-group-item">
              <h4 className="plp-filter-title">Price Range</h4>
              <div className="plp-filter-options list-filter">
                <label className="plp-checkbox-label">
                  <input 
                    type="checkbox" 
                    className="plp-filter-checkbox"
                    checked={selectedPrices.includes("under-2000")}
                    onChange={() => handlePriceToggle("under-2000")}
                  />
                  <span>Under ₹2,000</span>
                </label>
                <label className="plp-checkbox-label">
                  <input 
                    type="checkbox" 
                    className="plp-filter-checkbox"
                    checked={selectedPrices.includes("2000-3000")}
                    onChange={() => handlePriceToggle("2000-3000")}
                  />
                  <span>₹2,000 - ₹3,000</span>
                </label>
                <label className="plp-checkbox-label">
                  <input 
                    type="checkbox" 
                    className="plp-filter-checkbox"
                    checked={selectedPrices.includes("over-3000")}
                    onChange={() => handlePriceToggle("over-3000")}
                  />
                  <span>Over ₹3,000</span>
                </label>
              </div>
            </div>

            {/* Tag / Badge Filter */}
            <div className="plp-filter-group-item">
              <h4 className="plp-filter-title">Collection Tags</h4>
              <div className="plp-filter-options list-filter">
                <label className="plp-checkbox-label">
                  <input type="checkbox" className="plp-filter-checkbox" defaultChecked />
                  <span>New Arrivals</span>
                </label>
                <label className="plp-checkbox-label">
                  <input type="checkbox" className="plp-filter-checkbox" defaultChecked />
                  <span>Best Sellers</span>
                </label>
              </div>
            </div>

            {/* Verse Theme Filter */}
            <div className="plp-filter-group-item">
              <h4 className="plp-filter-title">Verse Theme</h4>
              <div className="plp-filter-options list-filter">
                <label className="plp-checkbox-label">
                  <input type="checkbox" className="plp-filter-checkbox" defaultChecked />
                  <span>Armor & Protection</span>
                </label>
                <label className="plp-checkbox-label">
                  <input type="checkbox" className="plp-filter-checkbox" defaultChecked />
                  <span>Mind Renewal</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Main Grid */}
          <div className="plp-grid-container">
            {sortedProducts.length === 0 ? (
              <div className="plp-empty-state">
                <span className="text-3xl plp-empty-illustration">🔍</span>
                <h3>No products found</h3>
                <p>We couldn't find any products matching your active filters. Try resetting search parameters.</p>
                <button onClick={clearAllFilters} className="cta-button cta-button-primary">Reset Filters</button>
              </div>
            ) : (
              <div className="product-grid-v2">
                {sortedProducts.map((product) => {
                  const sizesAvailable = product.variants.map((v) => v.size);
                  return (
                    <article key={product.id} className="product-card" data-id={product.id}>
                      <div className="plp-card-media">
                        <Link href={`/products/${product.slug}`}>
                          <img src={product.image} alt={product.name} className="plp-card-img-primary" />
                          <img src={product.image} alt={product.name} className="plp-card-img-secondary" />
                        </Link>
                        <div className="plp-card-badge-container">
                          {product.slug === "armor-of-light-heavyweight-tee" && (
                            <span className="plp-card-badge">New Release</span>
                          )}
                          {product.slug === "renewal-of-mind-french-terry-hoodie" && (
                            <span className="plp-card-badge fav-badge">Best Seller</span>
                          )}
                        </div>
                        <button 
                          onClick={() => handleWishlistToggle(product)}
                          className={`wishlist-btn ${isItemInWishlist(product.id) ? "active" : ""}`}
                          aria-label="Add to wishlist"
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                        {/* Hover Quick Add Size Selector */}
                        <div className="plp-card-action-overlay">
                          <div className="flex flex-col gap-2 w-full">
                            <span className="text-[10px] text-white font-bold uppercase tracking-wider text-center block">Quick Add Size</span>
                            <div className="flex justify-center gap-1.5">
                              {sizesAvailable.map((sz) => (
                                <button
                                  key={sz}
                                  onClick={() => handleQuickAdd(product, sz)}
                                  className="w-8 h-8 rounded bg-white text-text-primary text-[10px] font-bold flex items-center justify-center hover:bg-brand-burgundy hover:text-white transition-colors"
                                >
                                  {sz}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="plp-card-info">
                        <div className="plp-card-meta">
                          <span className="plp-card-verse-ref">
                            {product.slug === "armor-of-light-heavyweight-tee" ? "Romans 13:12" : "Romans 12:2"}
                          </span>
                          <span className="text-[9px] uppercase font-bold tracking-wider text-text-muted">
                            {product.category_slug === "oversized-tees" ? "Oversized Tee" : "Streetwear Hoodie"}
                          </span>
                        </div>
                        <Link href={`/products/${product.slug}`}>
                          <h3 className="plp-card-title">{product.name}</h3>
                        </Link>
                        {product.scripture?.text_content && (
                          <p className="plp-card-hover-verse">
                            "{product.scripture.text_content.substring(0, 50)}..."
                          </p>
                        )}
                        <div className="plp-card-price-row">
                          <span className="plp-card-price">
                            ₹{product.base_price} 
                            {product.original_price && <span className="price-original">₹{product.original_price}</span>}
                          </span>
                          <button className="plp-card-compare-btn">
                            <span>Compare</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet Filters Modal */}
      {isMobileFiltersOpen && (
        <div className="plp-bottom-sheet-filters active" id="mobile-filter-drawer" style={{ display: "block", zIndex: 200 }}>
          <div className="plp-bottom-sheet-header">
            <h3>Filters</h3>
            <button onClick={() => setMobileFiltersOpen(false)} className="plp-close-bottom-sheet-btn" aria-label="Close filters">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="plp-bottom-sheet-content" style={{ maxHeight: "70vh", overflowY: "auto", paddingBottom: "2rem" }}>
            <div className="plp-bottom-sheet-section">
              <h4>Sizes</h4>
              <div className="plp-filter-options size-grid-filter">
                {["S", "M", "L", "XL"].map((sz) => (
                  <button 
                    key={sz}
                    onClick={() => handleSizeToggle(sz)}
                    className={`plp-size-filter-btn ${selectedSizes.includes(sz) ? "active" : ""}`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <div className="plp-bottom-sheet-section">
              <h4>Price Range</h4>
              <div className="plp-filter-options list-filter">
                <label className="plp-checkbox-label">
                  <input 
                    type="checkbox" 
                    className="plp-filter-checkbox"
                    checked={selectedPrices.includes("under-2000")}
                    onChange={() => handlePriceToggle("under-2000")}
                  />
                  <span>Under ₹2,000</span>
                </label>
                <label className="plp-checkbox-label">
                  <input 
                    type="checkbox" 
                    className="plp-filter-checkbox"
                    checked={selectedPrices.includes("2000-3000")}
                    onChange={() => handlePriceToggle("2000-3000")}
                  />
                  <span>₹2,000 - ₹3,000</span>
                </label>
                <label className="plp-checkbox-label">
                  <input 
                    type="checkbox" 
                    className="plp-filter-checkbox"
                    checked={selectedPrices.includes("over-3000")}
                    onChange={() => handlePriceToggle("over-3000")}
                  />
                  <span>Over ₹3,000</span>
                </label>
              </div>
            </div>
            
            <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
              <button 
                onClick={() => {
                  clearAllFilters();
                  setMobileFiltersOpen(false);
                }} 
                className="cta-button cta-button-secondary" 
                style={{ flex: 1, padding: "0.8rem" }}
              >
                Clear
              </button>
              <button 
                onClick={() => setMobileFiltersOpen(false)} 
                className="cta-button cta-button-primary" 
                style={{ flex: 1, padding: "0.8rem" }}
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
