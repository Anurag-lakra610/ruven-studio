"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProducts, MockProduct } from "@/lib/db";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shirt,
  Sparkles,
  ShieldCheck,
  Truck,
  Compass,
  Activity,
  MessageSquare,
  Feather,
  Calendar,
  Heart,
  ShoppingBag,
  ArrowRight,
  Star
} from "lucide-react";

export default function StorefrontHomePage() {
  const { cart, wishlist, toggleWishlist, addToCart, setCartOpen } = useCart();
  const [products, setProducts] = useState<MockProduct[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedTeeSize, setSelectedTeeSize] = useState("M");
  const [selectedHoodieSize, setSelectedHoodieSize] = useState("L");

  const heroSlides = [
    { image: "/hero2.png", alt: "Ruven Studio young creative streetwear lookbook" },
    { image: "/hero3.png", alt: "Ruven Studio street lifestyle editorial lookbook" },
    { image: "/hero4.png", alt: "Ruven Studio urban faith streetwear lookbook" }
  ];

  // Fetch products from database helper
  useEffect(() => {
    getProducts().then((res) => setProducts(res));
  }, []);

  // Slide rotation timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const teeProduct = products.find((p) => p.slug === "armor-of-light-heavyweight-tee");
  const hoodieProduct = products.find((p) => p.slug === "renewal-of-mind-french-terry-hoodie");

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

  const isItemInWishlist = (productId: string) => wishlist.some((item) => item.id === productId);

  const handleWishlistToggle = (product: MockProduct) => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.base_price,
      image: product.image
    });
  };

  return (
    <div className="w-full flex flex-col bg-bg-warm dark:bg-zinc-950 overflow-x-hidden">
      {/* 1. HERO SLIDER */}
      <section className="hero">
        <div className="hero-bg" id="hero-bg-parallax">
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              className={`hero-slide ${activeSlide === idx ? "active" : ""}`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="hero-img"
              />
            </div>
          ))}
        </div>
        <div className="hero-overlay"></div>
        
        {/* Slideshow Indicators */}
        <div className="hero-indicators">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              className={`indicator-dot ${activeSlide === idx ? "active" : ""}`}
              onClick={() => setActiveSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
        <div className="hero-grain"></div>
        
        {/* Animated Background Blurred Shapes */}
        <div className="blur-shape shape-1"></div>
        <div className="blur-shape shape-2"></div>
        
        <div className="hero-content">
          <h1 className="hero-headline">Put on the<br/>Armor of Light.</h1>
          <p className="hero-supporting-text">Inspired by Romans 13:12. Heavy-weight, minimalist streetwear designed to start quiet, meaningful conversations about faith, identity, and grace.</p>
          <div className="hero-cta-group" style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", marginTop: "2rem" }}>
            <Link href="/shop" className="cta-button cta-button-primary">
              <span className="btn-content">
                <span className="btn-text">Shop Collection</span>
                <span className="btn-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </span>
            </Link>
            <a href="#story-section" className="cta-button cta-button-secondary">
              <span className="btn-content">
                <span className="btn-text">Our Story</span>
                <span className="btn-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 1: Trust Strip */}
      <div className="trust-strip-v2">
        <div className="trust-strip-container">
          <div className="trust-item-v2">
            <Shirt className="trust-icon-v2" />
            <span className="trust-text-v2">Premium Fabric</span>
          </div>
          <div className="trust-item-v2">
            <Sparkles className="trust-icon-v2" />
            <span className="trust-text-v2">Faith Inspired</span>
          </div>
          <div className="trust-item-v2">
            <ShieldCheck className="trust-icon-v2" />
            <span className="trust-text-v2">Secure Checkout</span>
          </div>
          <div className="trust-item-v2">
            <Truck className="trust-icon-v2" />
            <span className="trust-text-v2">Fast Shipping</span>
          </div>
          <div className="trust-item-v2">
            <Compass className="trust-icon-v2" />
            <span className="trust-text-v2">Designed with Purpose</span>
          </div>
          <div className="trust-item-v2">
            <Activity className="trust-icon-v2" />
            <span className="trust-text-v2">Made for Everyday Wear</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: Our Mission (Editorial Storytelling) */}
      <section className="editorial-mission section-padding-lg" id="story-section">
        <div className="editorial-mission-grid">
          <div className="mission-text-col">
            <span className="section-subtitle-lowercase">our purpose</span>
            <h2 className="editorial-headline-large">Formed in Faith.<br />Tailored for Purpose.</h2>
            <p className="mission-paragraph">
              Ruven Studio is an independent Christian lifestyle label creating heavy-weight apparel designed to start quiet, meaningful conversations. We construct each garment to serve as a visual bridge, allowing you to carry your faith with elegance and confidence in modern creative environments.
            </p>
            <div className="mission-quote-box">
              <span className="quote-sign">“</span>
              <p className="mission-quote-text">We don't create clothing to conform; we design to transform.</p>
              <p className="mission-quote-author">— The Ruven Collective</p>
            </div>
            <div className="mission-verse-accent">
              <p className="mission-verse-quote">"Do not be conformed to this world, but be transformed by the renewal of your mind..."</p>
              <p className="mission-verse-ref">Romans 12:2</p>
            </div>
          </div>
          <div className="mission-image-col">
            <div className="mission-image-wrap">
              <img src="/brand_story_lifestyle.png" alt="Ruven Studio Craftsmanship and Story" className="mission-img" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Featured Collection Campaign */}
      <section className="featured-campaign section-padding-lg">
        <div className="campaign-header">
          <div>
            <span className="section-subtitle-lowercase">editorial drop 01</span>
            <h2 className="editorial-title-v2">The Armor & Protection Campaign</h2>
          </div>
          <p className="campaign-description">
            A meticulous collection representing strength and spiritual integrity in a chaotic world. Styled with Scandinavian minimalism and heavyweight textures.
          </p>
        </div>
        
        <div className="campaign-grid">
          {/* Left Hero Campaign Card (Armor of Light Tee) */}
          {teeProduct && (
            <article className="campaign-hero-card product-card" data-id={teeProduct.id}>
              <div className="campaign-hero-img-wrap">
                <img src={teeProduct.image} alt={teeProduct.name} className="campaign-hero-img" />
                <span className="campaign-tag-badge">New Release</span>
                <button 
                  onClick={() => handleWishlistToggle(teeProduct)}
                  className={`wishlist-btn ${isItemInWishlist(teeProduct.id) ? "active" : ""}`} 
                  aria-label="Add to wishlist"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </div>
              <div className="campaign-hero-info">
                <div className="campaign-info-meta">
                  <span className="campaign-verse-tag">Romans 13:12</span>
                  <span className="campaign-category-tag">Oversized Tee</span>
                </div>
                <h3 className="campaign-hero-title">{teeProduct.name}</h3>
                <p className="campaign-hero-desc">
                  240 GSM organic combed cotton, styled in a custom boxy oversized cut. Featuring a clean, linear shield design signifying spiritual defense.
                </p>
                <div className="campaign-actions">
                  <span className="campaign-price">
                    ₹{teeProduct.base_price} {teeProduct.original_price && <span className="price-original">₹{teeProduct.original_price}</span>}
                  </span>
                  {/* Sizes Selector inside Campaign Card for Quick Add */}
                  <div className="size-selector-v2">
                    {["S", "M", "L", "XL"].map((size) => (
                      <button 
                        key={size}
                        onClick={() => handleQuickAdd(teeProduct, size)}
                        className="size-btn" 
                        data-size={size}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Right supporting column */}
          <div className="campaign-side-col">
            {hoodieProduct && (
              <article className="campaign-supporting-card product-card" data-id={hoodieProduct.id}>
                <div className="supporting-img-wrap">
                  <img src={hoodieProduct.image} alt={hoodieProduct.name} className="supporting-img" />
                  <span className="campaign-tag-badge">Best Seller</span>
                  <button 
                    onClick={() => handleWishlistToggle(hoodieProduct)}
                    className={`wishlist-btn ${isItemInWishlist(hoodieProduct.id) ? "active" : ""}`} 
                    aria-label="Add to wishlist"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>
                <div className="supporting-info">
                  <span className="campaign-verse-tag">Romans 12:2</span>
                  <h4 className="supporting-title">{hoodieProduct.name}</h4>
                  <div className="flex justify-between items-center mt-2">
                    <p className="supporting-price">₹{hoodieProduct.base_price}</p>
                    <div className="size-selector-v2">
                      {["M", "L", "XL"].map((size) => (
                        <button 
                          key={size}
                          onClick={() => handleQuickAdd(hoodieProduct, size)}
                          className="size-btn" 
                          data-size={size}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            )}
            
            <div className="campaign-editorial-statement">
              <h3>Every Thread Tells a Story</h3>
              <p>
                Our graphics are not simple illustrations. They are screen-printed conversations waiting to happen, serving as reminders of mental renewal, clarity, and protection in God.
              </p>
              <Link href="/shop" className="editorial-text-link">
                Browse All Apparel →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Immersive Lifestyle Campaign */}
      <section className="lifestyle-immersive-campaign">
        <div className="immersive-bg-wrap">
          <img src="/hero_lifestyle.png" alt="Ruven Studio Lifestyle Movement" className="immersive-bg-img" />
        </div>
        <div className="immersive-overlay-v2"></div>
        <div className="immersive-content">
          <span className="immersive-subtitle">lifestyle campaign</span>
          <h2 className="immersive-statement">Faith Is Meant To Be Lived.<br />Not Hidden.</h2>
          <p className="immersive-subtext">Designed in India to carry the message of light. Our premium minimal streetwear helps you start the conversations that matter.</p>
          <Link href="/shop" className="immersive-cta-link">Explore the Lookbook</Link>
        </div>
      </section>

      {/* SECTION 5: Bible Verse Highlight */}
      <section className="scripture-highlight section-padding-lg">
        <div className="scripture-container">
          <div className="scripture-vector">
            {/* Sleek minimalist cross / ray graphic (inline SVG) */}
            <svg viewBox="0 0 100 100" className="scripture-svg-graphic" aria-hidden="true">
              <path d="M50,10 L50,90 M20,35 L80,35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3"></path>
              <circle cx="50" cy="35" r="22" stroke="currentColor" strokeWidth="1" stroke-dasharray="2 3" fill="none" opacity="0.25"></circle>
            </svg>
          </div>
          <span className="verse-label-accent">scripture focus</span>
          <blockquote className="modern-bible-verse">
            "Do not be conformed to this world, but be transformed by the renewal of your mind, that by testing you may discern what is the will of God, what is good and acceptable and perfect."
          </blockquote>
          <p className="modern-bible-reference">Romans 12:2</p>
          
          <div className="verse-connection-box">
            <h4>Why This Verse Matters</h4>
            <p>
              In a generation driven by noise, social pressure, and anxiety, this verse is a sanctuary. It reminds us that our true identity is found in renewal and divine transformation, rather than mimicking temporary worldly patterns. This scriptural theme forms the creative core of our Heavyweight Hoodie collection.
            </p>
            <Link href="/shop?category=hoodies" className="verse-connect-link">Explore Mind Renewal Drops</Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: Best Sellers (Asymmetrical Editorial Layout) */}
      <section className="best-sellers-editorial section-padding-lg">
        <div className="best-sellers-header">
          <span className="section-subtitle-lowercase">essential drops</span>
          <h2 className="editorial-title-v2">Ruven Studio Best Sellers</h2>
        </div>

        <div className="best-sellers-layout">
          {/* Hero Best Seller (Left, taking up larger space) */}
          {hoodieProduct && (
            <article className="product-card best-seller-hero-card" data-id={hoodieProduct.id}>
              <div className="best-seller-hero-grid">
                <div className="best-seller-hero-img-side">
                  <img src={hoodieProduct.image} alt={hoodieProduct.name} className="best-seller-hero-img" />
                  <button 
                    onClick={() => handleWishlistToggle(hoodieProduct)}
                    className={`wishlist-btn ${isItemInWishlist(hoodieProduct.id) ? "active" : ""}`} 
                    aria-label="Add to wishlist"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                  <span className="badge-tag">Best Seller</span>
                </div>
                <div className="best-seller-hero-info-side">
                  <span className="best-seller-verse-ref">Romans 12:2</span>
                  <h3 className="best-seller-title">{hoodieProduct.name}</h3>
                  <p className="best-seller-price">
                    ₹{hoodieProduct.base_price} {hoodieProduct.original_price && <span className="price-original">₹{hoodieProduct.original_price}</span>}
                  </p>
                  
                  <p className="best-seller-fabric-summary">
                    Fabric: 380 GSM ultra-heavy combed French Terry. Loop-back lining, double-lined drawstring-free hood. Crafted to represent comfortable, mindful living.
                  </p>
                  
                  <div className="best-seller-verse-preview">
                    <p className="verse-quote-short">"Do not conform... but be transformed."</p>
                  </div>
                  
                  {/* Quick add sizes selector */}
                  <div className="best-seller-quick-add">
                    <span className="quick-add-label">Quick Add Size</span>
                    <div className="size-selector-v2">
                      {["M", "L", "XL"].map((size) => (
                        <button 
                          key={size}
                          onClick={() => handleQuickAdd(hoodieProduct, size)}
                          className="size-btn" 
                          data-size={size}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Supporting Best Seller (Right, smaller vertical card) */}
          {teeProduct && (
            <article className="product-card best-seller-side-card" data-id={teeProduct.id}>
              <button 
                onClick={() => handleWishlistToggle(teeProduct)}
                className={`wishlist-btn ${isItemInWishlist(teeProduct.id) ? "active" : ""}`} 
                aria-label="Add to wishlist"
              >
                <Heart className="w-4 h-4 fill-current" />
              </button>
              <div className="best-seller-side-img-wrap">
                <img src={teeProduct.image} alt={teeProduct.name} className="best-seller-side-img" />
                <span className="badge-tag">New Drop</span>
              </div>
              <div className="best-seller-side-info">
                <span className="best-seller-verse-ref">Romans 13:12</span>
                <h3 className="best-seller-title">{teeProduct.name}</h3>
                <p className="best-seller-price">₹{teeProduct.base_price}</p>
                
                {/* Quick add sizes selector */}
                <div className="best-seller-quick-add-mini">
                  <div className="size-selector-v2">
                    {["S", "M", "L", "XL"].map((size) => (
                      <button 
                        key={size}
                        onClick={() => handleQuickAdd(teeProduct, size)}
                        className="size-btn" 
                        data-size={size}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* SECTION 7: Why Choose Ruven */}
      <section className="why-ruven section-padding-lg">
        <div className="why-ruven-header">
          <span className="section-subtitle-lowercase">crafted for conversation</span>
          <h2 className="editorial-title-v2">The Anatomy of Ruven Studio</h2>
        </div>
        <div className="why-ruven-grid">
          <div className="feature-card">
            <div className="feature-icon-wrap">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h4>Designed to Start Conversations</h4>
            <p>Every graphic acts as an intentional conversation starter, creating direct opportunities to share faith and hope.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap">
              <Shirt className="w-5 h-5" />
            </div>
            <h4>Premium Heavyweight Cotton</h4>
            <p>Tailored in 240 GSM T-shirts and 380 GSM loopback French Terry hoodies. Durable, dense, and built to last.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap">
              <Feather className="w-5 h-5" />
            </div>
            <h4>Faith Inspired Graphics</h4>
            <p>Original, minimalist scriptural symbols screen-printed carefully with absolute precision.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap">
              <Calendar className="w-5 h-5" />
            </div>
            <h4>Limited Edition Collections</h4>
            <p>Released in small, calculated runs to maintain design integrity and reduce environmental manufacturing waste.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap">
              <Heart className="w-5 h-5" />
            </div>
            <h4>Ethically Produced</h4>
            <p>Independently manufactured in clean, safe facilities in India supporting local creative tailors.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap">
              <Activity className="w-5 h-5" />
            </div>
            <h4>Built for Everyday Wear</h4>
            <p>Featuring pre-shrunk structures, double-stitched details, and timeless cuts for modern comfort.</p>
          </div>
        </div>
      </section>

      {/* SECTION 8: Community Stories */}
      <section className="community-testimonials section-padding-lg">
        <div className="testimonials-header">
          <span className="section-subtitle-lowercase">united in faith</span>
          <h2 className="editorial-title-v2">Shared Reflections</h2>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-quote">"The Armor of Light tee has opened so many doors. Friends at college ask what the shield represents, allowing me to share my faith journey naturally."</p>
            <div className="testimonial-author">
              <div className="author-avatar-initials" style={{ backgroundColor: "var(--color-brand-burgundy)", color: "var(--color-white)" }}>D</div>
              <div className="author-details">
                <span className="author-name">David S.</span>
                <span className="author-loc">Bengaluru • College Ministry</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-quote">"The comfort of the loopback French Terry is outstanding, but the reminder of mental renewal on the chest serves as a quiet anchor of peace during my days."</p>
            <div className="testimonial-author">
              <div className="author-avatar-initials" style={{ backgroundColor: "var(--color-brand-gold)", color: "var(--color-text-primary)" }}>P</div>
              <div className="author-details">
                <span className="author-name">Priya M.</span>
                <span className="author-loc">Mumbai • Creative Director</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-quote">"Perfect boxy fit. I wear my Ruven Studio tees to fellowships and study circles. It always sparks conversations about walk of faith and identity in Christ."</p>
            <div className="testimonial-author">
              <div className="author-avatar-initials" style={{ backgroundColor: "var(--color-border)", color: "var(--color-text-primary)" }}>R</div>
              <div className="author-details">
                <span className="author-name">Rahul K.</span>
                <span className="author-loc">New Delhi • Student Leader</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: Asymmetrical Instagram Social Wall */}
      <section className="instagram-gallery section-padding-lg">
        <div className="instagram-header">
          <span className="section-subtitle-lowercase">fellowship studio</span>
          <h2 className="editorial-title-v2">Shared on Instagram</h2>
          <a href="https://instagram.com/ruven.studio" target="_blank" rel="noopener noreferrer" className="instagram-handle">@ruven.studio</a>
        </div>
        <div className="instagram-asymmetric-grid">
          <div className="instagram-grid-item">
            <img src="/brand_story_lifestyle.png" alt="Ruven Studio lookbook styling" />
            <div className="instagram-overlay">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>View Post</span>
            </div>
          </div>
          <div className="instagram-grid-item">
            <img src="/hero_lifestyle.png" alt="Youth sharing scripture in streetwear" />
            <div className="instagram-overlay">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>View Post</span>
            </div>
          </div>
          <div className="instagram-grid-item">
            <img src="/oversized_tee_product.png" alt="Heavyweight screen print detail" />
            <div className="instagram-overlay">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>View Post</span>
            </div>
          </div>
          <div className="instagram-grid-item">
            <img src="/faith_hoodie_product.png" alt="Embroidered branch detailing on French Terry" />
            <div className="instagram-overlay">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>View Post</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
