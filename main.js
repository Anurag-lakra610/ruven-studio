/* ==========================================================================
   Ruven Studio - Interactive Application Script
   SPA Router, Cart State, Product Details, Zoom, & Prayer Wall
   ========================================================================== */

// 1. PRODUCT DATABASE
const PRODUCTS = [
  {
    id: "tee-romans-13-12",
    title: "Armor of Light Heavyweight Tee",
    price: 1999,
    originalPrice: 2499,
    tag: "New Release",
    sizes: ["S", "M", "L", "XL"],
    image: "/oversized_tee_product.png",
    category: "oversized-tees",
    verseQuote: "The night is nearly over; the day is almost here. So let us put aside the deeds of darkness and put on the armor of light.",
    verseRef: "Romans 13:12",
    verseMeaning: "Designed to encourage believers to walk in spiritual clarity, strength, and integrity. The linear shield represents faith acting as a protective barrier in modern environments.",
    fabricDetails: "100% premium ring-spun organic cotton. 240 GSM heavy French Terry structure. Custom oversized boxy cut, ribbed crew neck collar, double-needle stitched cuffs, pre-shrunk to prevent sizing changes.",
    designStory: "This design marks Ruven Studio's commitment to visual ministry. The clean shield illustration merges modern minimalism with historic faith symbolism, acting as an open doorway for conversation on campus or in the creative office.",
    colors: [
      { name: "Vintage Black", hex: "#1c1b1b" },
      { name: "Slate Grey", hex: "#4e5256" }
    ],
    modelInfo: "Model is 6'0\" / 183cm and wears size M for a relaxed boxy fit.",
    gallery: [
      "/oversized_tee_product.png",
      "/brand_story_lifestyle.png",
      "/hero_lifestyle.png"
    ],
    detailsList: [
      { label: "Fabric", value: "100% Organic Ring-Spun Cotton" },
      { label: "Weight", value: "240 GSM Extra Heavy Knit" },
      { label: "Fit", value: "Oversized Boxy Silhouette with Drop Shoulders" },
      { label: "Print", value: "Premium Hand-Screened Plastisol Print" },
      { label: "Shrinkage", value: "Pre-shrunk to maintain shape over lifetime" },
      { label: "Origin", value: "Ethically Knitted & Printed in India" }
    ],
    reviews: [
      {
        id: "rev-tee-1",
        author: "Samuel K.",
        rating: 5,
        date: "2026-05-18",
        title: "Incredible weight and message",
        body: "The weight of this tee is unlike anything I've bought in India. Very boxy, heavy, but extremely breathable. I've had three conversations at my university campus about the Romans shield graphic already!",
        verified: true,
        helpfulCount: 14,
        avatarColor: "#B5A48F"
      },
      {
        id: "rev-tee-2",
        author: "Priyan D.",
        rating: 5,
        date: "2026-06-02",
        title: "Absolute premium streetwear",
        body: "Fits exactly like high-end Scandinavian streetwear brands but with a purpose. Ribbed collar is tight and doesn't stretch out after multiple washes. Love it.",
        verified: true,
        helpfulCount: 8,
        avatarColor: "#8D9A8D"
      },
      {
        id: "rev-tee-3",
        author: "Aaron J.",
        rating: 4,
        date: "2026-06-10",
        title: "Very oversized, consider sizing down",
        body: "Love the graphic and texture. It is quite oversized, so if you want a more standard fit, size down. Otherwise, the drape is incredible.",
        verified: true,
        helpfulCount: 3,
        avatarColor: "#9BA2B5"
      }
    ],
    faqs: [
      {
        question: "How should I wash the Armor of Light Tee?",
        answer: "Wash inside out in cold water on a gentle cycle. Hang dry in shade to prevent any shrinkage and preserve the screen-printed graphic. Avoid ironing directly on the printed graphic."
      },
      {
        question: "Is this tee suitable for hot Indian summers?",
        answer: "Yes. Even though it is a heavyweight 240 GSM knit, we use organic ring-spun cotton which is naturally highly breathable, keeping you comfortable even on warmer days."
      },
      {
        question: "Can I exchange if the size is too large?",
        answer: "We offer free size exchanges within 7 days of delivery. Because this features an oversized boxy cut, we recommend checking our Size Guide or choosing your normal size for a baggy street look."
      }
    ]
  },
  {
    id: "hoodie-romans-12-2",
    title: "Renewal of Mind French Terry Hoodie",
    price: 3499,
    originalPrice: 4299,
    tag: "Best Seller",
    sizes: ["M", "L", "XL"],
    image: "/faith_hoodie_product.png",
    category: "hoodies",
    verseQuote: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind.",
    verseRef: "Romans 12:2",
    verseMeaning: "In a noisy, modern society pulling youth in various directions, this scripture serves as a quiet reminder to align our thoughts in Christ, creating a sanctuary of peace in the mind.",
    fabricDetails: "80% premium organic cotton, 20% polyester for durability. Ultra-heavy 380 GSM combed French Terry. Cozy loop-back lining, double-lined hood with no drawstrings for a clean Scandinavian silhouette, dropped shoulders.",
    designStory: "The delicate embroidered olive branch on the chest signifies peace, renewal, and spiritual restoration. Built to last a lifetime, this hoodie represents comfort, stillness, and mindful living.",
    colors: [
      { name: "Sage Green", hex: "#5C6B5E" },
      { name: "Oatmeal Melange", hex: "#E3DFD5" }
    ],
    modelInfo: "Model is 6'1\" / 185cm and wears size L for an authentic slouchy streetwear drape.",
    gallery: [
      "/faith_hoodie_product.png",
      "/hero2.png",
      "/brand_story_lifestyle.png"
    ],
    detailsList: [
      { label: "Fabric", value: "80% Organic Cotton / 20% Durable Polyester" },
      { label: "Weight", value: "380 GSM Ultra-Heavy combed French Terry" },
      { label: "Fit", value: "Clean Scandinavian Silhouette, Dropped Shoulders" },
      { label: "Hood", value: "Double-lined, Structured (No drawstrings)" },
      { label: "Detailing", value: "High-density chest embroidery of peace olive branch" },
      { label: "Origin", value: "Ethically Sourced & Embroidered in India" }
    ],
    reviews: [
      {
        id: "rev-hoodie-1",
        author: "Devang P.",
        rating: 5,
        date: "2026-04-20",
        title: "Best hoodie I own",
        body: "The double-lined hood stands up perfectly without drawstrings. The embroidery is super clean, and the interior French Terry loops are very soft. Worth every rupee.",
        verified: true,
        helpfulCount: 22,
        avatarColor: "#8D9A8D"
      },
      {
        id: "rev-hoodie-2",
        author: "Rohan S.",
        rating: 5,
        date: "2026-05-04",
        title: "Perfect minimal aesthetic",
        body: "Extremely warm and heavy. The Sage Green color looks even better in person—has a beautiful vintage pigment dye look. True to size for a premium fit.",
        verified: true,
        helpfulCount: 15,
        avatarColor: "#B5A48F"
      },
      {
        id: "rev-hoodie-3",
        author: "Joel M.",
        rating: 5,
        date: "2026-06-05",
        title: "Premium heavy cotton",
        body: "Very solid drape. It feels thick, robust, and the scripture meaning is a beautiful talking point when wearing it around peers. High recommend.",
        verified: true,
        helpfulCount: 9,
        avatarColor: "#9BA2B5"
      }
    ],
    faqs: [
      {
        question: "Is this hoodie brushed fleece inside?",
        answer: "No, it is premium French Terry with a loopback interior. This keeps the hoodie structured and heavyweight (380 GSM) while preventing lint-shedding and making it suitable for moderate to cool Indian climates."
      },
      {
        question: "Does the hoodie have pocket storage?",
        answer: "Yes, it features a clean double-entry kangaroo pocket integrated seamlessly into the side seams, preserving the sleek, minimal front aesthetic of the hoodie."
      },
      {
        question: "What is the return policy?",
        answer: "We offer 7-day hassle-free returns and exchanges for all unworn garments in their original packaging. Simply contact client services at care@ruvenstudio.in."
      }
    ]
  }
];

// INITIAL PRAYERS DATA
const INITIAL_PRAYERS = [
  {
    id: 1,
    author: "Amit K.",
    location: "Mumbai",
    message: "Praying for guidance and peace as I start college next week. I want to stand firm in my faith and find a welcoming Christian community.",
    count: 24,
    voted: false
  },
  {
    id: 2,
    author: "Sarah M.",
    location: "Bengaluru",
    message: "Please pray for my mother's health and fast recovery from surgery. We trust in God's healing hands and comfort.",
    count: 38,
    voted: false
  },
  {
    id: 3,
    author: "R. S.",
    location: "New Delhi",
    message: "Seeking prayer for wisdom and focus during my final engineering exams. Asking that God removes anxiety and grants clarity of mind.",
    count: 15,
    voted: false
  }
];

// 2. STATE MANAGEMENT
let state = {
  activeView: "home",
  activeFilter: "all",
  cart: JSON.parse(localStorage.getItem("ruven_cart")) || [],
  wishlist: JSON.parse(localStorage.getItem("ruven_wishlist")) || [],
  prayers: JSON.parse(localStorage.getItem("ruven_prayers")) || INITIAL_PRAYERS,
  currentProductDetail: PRODUCTS[0].id,
  
  // Phase 4 PLP State
  filters: {
    size: [],
    price: [],
    tag: [],
    theme: [],
    availability: false,
    search: "",
    category: "all"
  },
  compareList: [],
  recentlyViewed: JSON.parse(localStorage.getItem("ruven_recently_viewed")) || []
};

// 3. INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
  
  // Set up Event Listeners
  setupNavigation();
  setupCartDrawer();
  setupWishlistDrawer();
  setupProductPageListeners();
  setupPrayerWall();
  setupNewsletter();
  setupAnnouncementBar();
  setupSearchModal();
  setupHeroParallax();
  setupScrollReveal();
  
  // Render Dynamic Sections
  renderHomepageGrids();
  renderShopGrid();
  renderCart();
  renderWishlist();
  renderPrayerFeed();
  
  // Handle Initial Route (if hash exists)
  handleHashRoute();
  window.addEventListener("hashchange", handleHashRoute);
  
  // Header Scroll Effect
  window.addEventListener("scroll", () => {
    const header = document.getElementById("site-header");
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
});

// 4. SPA ROUTER & NAVIGATION
function setupNavigation() {
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".nav-trigger");
    if (!trigger) return;
    
    // Prevent default hash jump if handled dynamically
    const view = trigger.getAttribute("data-view");
    const filter = trigger.getAttribute("data-filter");
    const targetSection = trigger.getAttribute("data-target");
    
    if (view) {
      switchView(view);
      
      // Handle category filtering on Shop page
      if (view === "shop") {
        const catFilter = document.getElementById("category-filter");
        if (filter && catFilter) {
          catFilter.value = filter;
          state.activeFilter = filter;
          renderShopGrid();
        }
      }
      
      // Scroll to specific section if requested (e.g. "Our Mission")
      if (targetSection) {
        setTimeout(() => {
          const targetEl = document.getElementById(targetSection);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
      
      // Close mobile menu if open
      closeMobileMenu();
    }
  });
  
  // Mobile Hamburger Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);
  }
}

function handleHashRoute() {
  const hash = window.location.hash || "#home";
  const route = hash.replace("#", "");
  
  if (route.startsWith("product/")) {
    const productId = route.split("/")[1];
    const productExists = PRODUCTS.some(p => p.id === productId);
    if (productExists) {
      state.currentProductDetail = productId;
      renderProductDetailPage();
      switchView("product");
    }
  } else if (["home", "shop", "community"].includes(route)) {
    switchView(route);
  }
}

function switchView(viewName) {
  state.activeView = viewName;
  
  // Update browser hash silently
  if (!window.location.hash.includes(`product/`)) {
    history.pushState(null, null, `#${viewName}`);
  }
  
  // Hide all sections, show active
  document.querySelectorAll(".view-section").forEach(sec => {
    sec.classList.remove("active");
  });
  
  const activeSec = document.getElementById(`${viewName}-view`);
  if (activeSec) {
    activeSec.classList.add("active");
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}

function toggleMobileMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
  navLinks.style.flexDirection = "column";
  navLinks.style.position = "absolute";
  navLinks.style.top = "var(--header-height)";
  navLinks.style.left = "0";
  navLinks.style.width = "100%";
  navLinks.style.backgroundColor = "var(--color-bg-warm)";
  navLinks.style.padding = "var(--spacing-lg)";
  navLinks.style.borderBottom = "1px solid var(--color-border)";
  navLinks.style.zIndex = "99";
}

function closeMobileMenu() {
  if (window.innerWidth <= 768) {
    const navLinks = document.querySelector(".nav-links");
    navLinks.style.display = "none";
  }
}

// 5. RENDER SHOP & HOMEPAGE PRODUCT GRIDS
function renderHomepageGrids() {
  // Update wishlist states on all homepage buttons dynamically
  document.querySelectorAll(".wishlist-btn").forEach(btn => {
    const pid = btn.getAttribute("data-id");
    const isWishlisted = state.wishlist.includes(pid);
    if (isWishlisted) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
    const child = btn.querySelector("svg") || btn.querySelector("i");
    if (child) {
      child.style.fill = isWishlisted ? "currentColor" : "none";
    }
  });
  
  // Re-create icons for elements
  if (window.lucide) {
    window.lucide.createIcons();
  }
  attachCardEvents();
}

function renderShopGrid() {
  const shopGrid = document.getElementById("shop-products-grid");
  if (!shopGrid) return;
  
  // 1. FILTERING
  let filtered = [...PRODUCTS];
  
  // Category tabs switcher
  const cat = state.filters.category;
  if (cat === "oversized-tees") {
    filtered = PRODUCTS.filter(p => p.category === "oversized-tees");
  } else if (cat === "hoodies") {
    filtered = PRODUCTS.filter(p => p.category === "hoodies");
  } else if (cat === "new-arrivals") {
    filtered = PRODUCTS.filter(p => p.tag === "New Release");
  } else if (cat === "best-sellers") {
    filtered = PRODUCTS.filter(p => p.tag === "Best Seller");
  } else if (cat === "recently-viewed") {
    filtered = state.recentlyViewed.map(pid => PRODUCTS.find(p => p.id === pid)).filter(Boolean);
  }

  // Size filters
  if (state.filters.size.length > 0) {
    filtered = filtered.filter(p => p.sizes.some(s => state.filters.size.includes(s)));
  }

  // Price filters
  if (state.filters.price.length > 0) {
    filtered = filtered.filter(p => {
      return state.filters.price.some(range => {
        if (range === "under-2000") return p.price < 2000;
        if (range === "2000-3000") return p.price >= 2000 && p.price <= 3000;
        if (range === "over-3000") return p.price > 3000;
        return false;
      });
    });
  }

  // Tag filters
  if (state.filters.tag.length > 0) {
    filtered = filtered.filter(p => state.filters.tag.includes(p.tag));
  }

  // Theme filters
  if (state.filters.theme.length > 0) {
    filtered = filtered.filter(p => {
      return state.filters.theme.some(theme => {
        if (theme === "Armor & Protection") return p.verseRef.includes("Romans 13:12");
        if (theme === "Mind Renewal") return p.verseRef.includes("Romans 12:2");
        return false;
      });
    });
  }

  // Availability filters
  if (state.filters.availability) {
    filtered = filtered.filter(p => p.sizes.length > 0); // Mock all products in-stock in this demo
  }

  // Search input filter
  const query = state.filters.search.trim().toLowerCase();
  if (query) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(query) ||
      p.verseRef.toLowerCase().includes(query) ||
      p.verseQuote.toLowerCase().includes(query) ||
      p.designStory.toLowerCase().includes(query) ||
      p.fabricDetails.toLowerCase().includes(query)
    );
  }

  // 2. SORTING
  const sortVal = document.getElementById("plp-sort-select")?.value || "featured";
  if (sortVal === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortVal === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortVal === "newest") {
    filtered.sort((a, b) => (b.tag === "New Release" ? 1 : 0) - (a.tag === "New Release" ? 1 : 0));
  } else if (sortVal === "best-selling") {
    filtered.sort((a, b) => (b.tag === "Best Seller" ? 1 : 0) - (a.tag === "Best Seller" ? 1 : 0));
  } else if (sortVal === "most-loved") {
    filtered.sort((a, b) => (state.wishlist.includes(b.id) ? 1 : 0) - (state.wishlist.includes(a.id) ? 1 : 0));
  }

  // 3. UPDATE COUNT AND BADGES
  const countEl = document.getElementById("shop-items-count");
  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} premium product${filtered.length !== 1 ? 's' : ''}`;
  }

  const activeFilters = [];
  state.filters.size.forEach(s => activeFilters.push({ type: 'size', val: s, label: `Size: ${s}` }));
  state.filters.price.forEach(p => {
    let lbl = "Price";
    if (p === "under-2000") lbl = "Under ₹2,000";
    if (p === "2000-3000") lbl = "₹2,000 - ₹3,000";
    if (p === "over-3000") lbl = "Over ₹3,000";
    activeFilters.push({ type: 'price', val: p, label: lbl });
  });
  state.filters.tag.forEach(t => activeFilters.push({ type: 'tag', val: t, label: t }));
  state.filters.theme.forEach(th => activeFilters.push({ type: 'theme', val: th, label: th }));
  if (state.filters.availability) activeFilters.push({ type: 'availability', val: 'in-stock', label: 'In Stock' });
  if (query) activeFilters.push({ type: 'search', val: query, label: `Search: "${query}"` });

  const activeFiltersRow = document.getElementById("active-filters-row");
  const clearFiltersBtn = document.getElementById("plp-clear-filters-btn");
  const clearFiltersBtnMobile = document.getElementById("mobile-filter-clear-all-btn");
  const badgeCountEl = document.getElementById("filter-badge-count");
  
  if (badgeCountEl) {
    badgeCountEl.textContent = activeFilters.length;
    badgeCountEl.style.display = activeFilters.length > 0 ? "inline-flex" : "none";
  }

  if (activeFiltersRow) {
    if (activeFilters.length === 0) {
      activeFiltersRow.innerHTML = "";
      if (clearFiltersBtn) clearFiltersBtn.style.display = "none";
      if (clearFiltersBtnMobile) clearFiltersBtnMobile.style.display = "none";
    } else {
      if (clearFiltersBtn) clearFiltersBtn.style.display = "block";
      if (clearFiltersBtnMobile) clearFiltersBtnMobile.style.display = "block";
      activeFiltersRow.innerHTML = activeFilters.map(f => `
        <span class="filter-tag-bubble">
          ${f.label}
          <button class="remove-filter-bubble-btn" data-filter-type="${f.type}" data-value="${f.val}" aria-label="Remove filter">
            <i data-lucide="x" style="width: 12px; height: 12px;"></i>
          </button>
        </span>
      `).join("");
      
      activeFiltersRow.querySelectorAll(".remove-filter-bubble-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const type = btn.getAttribute("data-filter-type");
          const val = btn.getAttribute("data-value");
          removeFilterValue(type, val);
        });
      });
    }
  }

  // 4. RENDERING PRODUCT GRID
  if (filtered.length === 0) {
    shopGrid.innerHTML = `
      <div class="plp-empty-state">
        <i data-lucide="help-circle" class="plp-empty-illustration" style="width: 48px; height: 48px;"></i>
        <h3>No Drops Found</h3>
        <p>No matching garments correspond to your active filters. Try broadening your keywords or resetting filters.</p>
        <button class="cta-button cta-button-primary" id="plp-empty-reset-btn" style="padding: 0.6rem 2rem; font-size: 0.75rem;">Reset All Filters</button>
      </div>
    `;
    document.getElementById("plp-empty-reset-btn")?.addEventListener("click", clearAllFilters);
  } else {
    let html = "";
    filtered.forEach((product, idx) => {
      const isHero = (idx === 0 && filtered.length > 1); // Let first card span larger on desktop if desired
      html += createProductCardMarkup(product, isHero);
      
      // Insert Editorial break banner after index 1 (i.e. after 2 products)
      if (idx === 1) {
        html += `
          <div class="plp-editorial-banner-item reveal-on-scroll active">
            <div class="plp-editorial-banner-img-wrap">
              <img src="/brand_story_lifestyle.png" alt="Ruven Screen Printing Process">
            </div>
            <div class="plp-editorial-banner-content">
              <span class="section-subtitle-lowercase">studio craftsmanship</span>
              <h3>The Hand-Pulled Screen Ministry</h3>
              <p>
                Every drop is screen-printed by hand in limited batches. We select heavy organic fabrics to build garments that serve as visual testimonies for years.
              </p>
              <a href="#home" class="editorial-text-link nav-trigger" data-view="home" data-target="brand-statement-section">Learn Our Process</a>
            </div>
          </div>
        `;
      }
    });
    shopGrid.innerHTML = html;
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
  attachCardEvents();
}

function createProductCardMarkup(product, isHero = false) {
  const isWishlisted = state.wishlist.includes(product.id);
  const isCompared = state.compareList.includes(product.id);
  const secondaryImage = product.id === "tee-romans-13-12" ? "/brand_story_lifestyle.png" : "/hero_lifestyle.png";
  const badges = [];
  if (product.tag) {
    badges.push(`<span class="plp-card-badge">${product.tag}</span>`);
  }
  if (product.id === "hoodie-romans-12-2") {
    badges.push(`<span class="plp-card-badge fav-badge">Favorite</span>`);
  }
  
  return `
    <article class="product-card ${isHero ? 'hero-card' : ''}" data-id="${product.id}">
      <div class="plp-card-badge-container">
        ${badges.join("")}
      </div>
      <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" data-id="${product.id}" aria-label="Add to wishlist">
        <i data-lucide="heart" style="fill: ${isWishlisted ? 'currentColor' : 'none'};"></i>
      </button>
      <div class="plp-card-media">
        <img src="${product.image}" alt="${product.title}" class="plp-card-img-primary">
        <img src="${secondaryImage}" alt="${product.title} lifestyle view" class="plp-card-img-secondary">
        
        <!-- Hover actions overlay -->
        <div class="plp-card-action-overlay">
          <button class="plp-card-quick-add-btn" data-id="${product.id}">Quick Add Fit</button>
        </div>
      </div>
      <div class="plp-card-info">
        <div class="plp-card-meta">
          <span class="plp-card-verse-ref">${product.verseRef}</span>
          <button class="plp-card-compare-btn ${isCompared ? 'active' : ''}" data-id="${product.id}">
            <i data-lucide="columns" style="width: 12px; height: 12px;"></i>
            <span>${isCompared ? 'Comparing' : 'Compare'}</span>
          </button>
        </div>
        <h3 class="plp-card-title">${product.title}</h3>
        <p class="plp-card-hover-verse">"${product.verseQuote.substring(0, 70)}..."</p>
        <div class="plp-card-price-row">
          <span class="plp-card-price">₹${product.price} <span class="price-original">₹${product.originalPrice}</span></span>
          <span style="font-size: 0.72rem; color: var(--color-text-muted); font-weight: 500;">Sizes: ${product.sizes.join(", ")}</span>
        </div>
      </div>
    </article>
  `;
}

function attachCardEvents() {
  // Wishlist clicks
  document.querySelectorAll(".wishlist-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      const pid = btn.getAttribute("data-id");
      toggleWishlist(pid);
    });
  });

  // Compare clicks
  document.querySelectorAll(".plp-card-compare-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      const pid = btn.getAttribute("data-id");
      toggleCompare(pid);
    });
  });

  // Quick Add clicks
  document.querySelectorAll(".plp-card-quick-add-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      const pid = btn.getAttribute("data-id");
      openQuickAdd(pid);
    });
  });

  // Card clicks (Open Details)
  document.querySelectorAll(".plp-layout .product-card").forEach(card => {
    card.addEventListener("click", (e) => {
      // Ignore click if it was size button or wishlist heart or compare
      if (e.target.closest(".wishlist-btn") || e.target.closest(".plp-card-quick-add-btn") || e.target.closest(".plp-card-compare-btn")) return;
      
      const pid = card.getAttribute("data-id");
      state.currentProductDetail = pid;
      window.location.hash = `product/${pid}`;
    });
  });
}

function setupProductPageListeners() {
  // 1. Category Switch Tabs
  document.querySelectorAll(".plp-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".plp-tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const cat = btn.getAttribute("data-category");
      state.filters.category = cat;
      updateHeroContent(cat);
      renderShopGrid();
    });
  });

  // 2. Collection Search
  const searchInput = document.getElementById("plp-collection-search");
  const searchClear = document.getElementById("plp-search-clear");
  
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value;
      state.filters.search = q;
      if (searchClear) searchClear.style.display = q.length > 0 ? "block" : "none";
      renderShopGrid();
    });
  }
  
  if (searchClear) {
    searchClear.addEventListener("click", () => {
      searchInput.value = "";
      state.filters.search = "";
      searchClear.style.display = "none";
      renderShopGrid();
    });
  }

  // 3. Popular Suggestion Tags
  document.querySelectorAll(".plp-suggest-tag").forEach(tag => {
    tag.addEventListener("click", () => {
      const val = tag.textContent;
      if (searchInput) {
        searchInput.value = val;
        state.filters.search = val;
        if (searchClear) searchClear.style.display = "block";
        renderShopGrid();
      }
    });
  });

  // 4. Desktop Sidebar Checkboxes
  document.querySelectorAll(".plp-sidebar-filters .plp-filter-checkbox").forEach(box => {
    box.addEventListener("change", () => {
      const type = box.getAttribute("data-filter-type");
      const val = box.getAttribute("data-value");
      
      if (type === "availability") {
        state.filters.availability = box.checked;
      } else {
        if (box.checked) {
          if (!state.filters[type].includes(val)) state.filters[type].push(val);
        } else {
          state.filters[type] = state.filters[type].filter(v => v !== val);
        }
      }
      renderShopGrid();
      syncFilterCheckboxStates();
    });
  });

  // 5. Desktop Sidebar Size buttons
  document.querySelectorAll(".plp-sidebar-filters .plp-size-filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const val = btn.getAttribute("data-value");
      const type = "size";
      btn.classList.toggle("active");
      
      if (btn.classList.contains("active")) {
        if (!state.filters[type].includes(val)) state.filters[type].push(val);
      } else {
        state.filters[type] = state.filters[type].filter(v => v !== val);
      }
      renderShopGrid();
      syncFilterCheckboxStates();
    });
  });

  // 6. Sidebar Clear All Filters Btn
  document.getElementById("plp-clear-filters-btn")?.addEventListener("click", clearAllFilters);
  document.getElementById("mobile-filter-clear-all-btn")?.addEventListener("click", clearAllFilters);

  // 7. Sort Dropdown
  document.getElementById("plp-sort-select")?.addEventListener("change", renderShopGrid);

  // 8. Mobile Filter Bottom Sheet Toggle
  const mobileToggle = document.getElementById("mobile-filter-toggle-btn");
  const mobileClose = document.getElementById("mobile-filter-close-btn");
  const mobileDrawer = document.getElementById("mobile-filter-drawer");
  const backdrop = document.getElementById("backdrop-overlay");
  const mobileApply = document.getElementById("mobile-filter-apply-btn");
  
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", () => {
      mobileDrawer.classList.add("active");
      if (backdrop) backdrop.classList.add("active");
    });
  }

  const closeMobileDrawer = () => {
    if (mobileDrawer) mobileDrawer.classList.remove("active");
    if (backdrop) backdrop.classList.remove("active");
  };

  if (mobileClose) mobileClose.addEventListener("click", closeMobileDrawer);
  if (backdrop) backdrop.addEventListener("click", closeMobileDrawer);

  // 9. Mobile Bottom Sheet Checkboxes
  document.querySelectorAll(".plp-bottom-sheet-filters .plp-filter-checkbox-mobile").forEach(box => {
    box.addEventListener("change", () => {
      const type = box.getAttribute("data-filter-type");
      const val = box.getAttribute("data-value");
      
      if (box.checked) {
        if (!state.filters[type].includes(val)) state.filters[type].push(val);
      } else {
        state.filters[type] = state.filters[type].filter(v => v !== val);
      }
    });
  });

  // 10. Mobile Bottom Sheet Sizes buttons
  document.querySelectorAll(".plp-bottom-sheet-filters .plp-size-filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const val = btn.getAttribute("data-value");
      const type = "size";
      btn.classList.toggle("active");
      
      if (btn.classList.contains("active")) {
        if (!state.filters[type].includes(val)) state.filters[type].push(val);
      } else {
        state.filters[type] = state.filters[type].filter(v => v !== val);
      }
    });
  });

  // Apply Mobile Filters
  if (mobileApply) {
    mobileApply.addEventListener("click", () => {
      renderShopGrid();
      syncFilterCheckboxStates();
      closeMobileDrawer();
    });
  }

  // 11. Compare Close & Clear Btn
  document.getElementById("compare-close-btn")?.addEventListener("click", () => {
    document.getElementById("compare-drawer").classList.remove("active");
  });
  document.getElementById("compare-clear-btn")?.addEventListener("click", () => {
    state.compareList = [];
    renderCompareDrawer();
    renderShopGrid();
  });

  // 12. Quick Add Close
  document.getElementById("quick-add-close-btn")?.addEventListener("click", () => {
    closeDrawer("quick-add");
  });
}

function toggleCompare(pid) {
  const idx = state.compareList.indexOf(pid);
  if (idx > -1) {
    state.compareList.splice(idx, 1);
  } else {
    if (state.compareList.length >= 2) {
      alert("You can compare up to 2 products at a time!");
      return;
    }
    state.compareList.push(pid);
  }
  renderCompareDrawer();
  renderShopGrid();
}

function renderCompareDrawer() {
  const drawer = document.getElementById("compare-drawer");
  const grid = document.getElementById("compare-content-grid");
  const countVal = document.getElementById("compare-count-val");
  
  if (!drawer || !grid) return;
  
  const count = state.compareList.length;
  if (countVal) countVal.textContent = count;
  
  if (count === 0) {
    drawer.classList.remove("active");
    return;
  }
  
  drawer.classList.add("active");
  
  const selectedProds = state.compareList.map(pid => PRODUCTS.find(p => p.id === pid)).filter(Boolean);
  
  let headerRowHtml = `<th>Specification</th>`;
  let designRowHtml = `<td><strong>Design Symbol</strong></td>`;
  let verseRowHtml = `<td><strong>Scripture Verse</strong></td>`;
  let fabricRowHtml = `<td><strong>Material & Fabric</strong></td>`;
  let fitRowHtml = `<td><strong>Fit & Structure</strong></td>`;
  let priceRowHtml = `<td><strong>Price</strong></td>`;
  let purposeRowHtml = `<td><strong>Visual Purpose</strong></td>`;
  
  selectedProds.forEach(p => {
    headerRowHtml += `
      <td>
        <div class="compare-card-col">
          <img src="${p.image}" alt="${p.title}">
          <div>
            <h4>${p.title}</h4>
            <button class="compare-remove-item-btn" data-id="${p.id}">Remove</button>
          </div>
        </div>
      </td>
    `;
    designRowHtml += `<td>${p.id === 'tee-romans-13-12' ? 'Linear Shield Symbol' : 'Embroidered Olive Branch'}</td>`;
    verseRowHtml += `<td><em>${p.verseRef}</em>: "${p.verseQuote}"</td>`;
    fabricRowHtml += `<td>${p.fabricDetails.substring(0, 60)}...</td>`;
    fitRowHtml += `<td>${p.id === 'tee-romans-13-12' ? 'Oversized Boxy Cut, 240 GSM' : 'Ultra-heavy Combed French Terry, 380 GSM'}</td>`;
    priceRowHtml += `<td>₹${p.price}</td>`;
    purposeRowHtml += `<td>${p.verseMeaning.substring(0, 60)}...</td>`;
  });
  
  grid.innerHTML = `
    <table class="plp-compare-table">
      <thead>
        <tr>${headerRowHtml}</tr>
      </thead>
      <tbody>
        <tr>${designRowHtml}</tr>
        <tr>${verseRowHtml}</tr>
        <tr>${fabricRowHtml}</tr>
        <tr>${fitRowHtml}</tr>
        <tr>${priceRowHtml}</tr>
        <tr>${purposeRowHtml}</tr>
      </tbody>
    </table>
  `;
  
  grid.querySelectorAll(".compare-remove-item-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      toggleCompare(btn.getAttribute("data-id"));
    });
  });
}

function openQuickAdd(pid) {
  const drawer = document.getElementById("quick-add-drawer");
  const wrapper = document.getElementById("quick-add-content-wrapper");
  
  if (!drawer || !wrapper) return;
  
  const product = PRODUCTS.find(p => p.id === pid);
  if (!product) return;
  
  const sizesHtml = product.sizes.map((size, idx) => `
    <button class="quick-add-size-btn ${idx === 0 ? 'selected' : ''}" data-size="${size}">${size}</button>
  `).join("");
  
  wrapper.innerHTML = `
    <div class="quick-add-prod-summary">
      <img src="${product.image}" alt="${product.title}">
      <div class="quick-add-prod-details">
        <h4>${product.title}</h4>
        <p>₹${product.price}</p>
        <span style="font-size: 0.72rem; color: var(--color-text-muted); font-weight: 500;">${product.verseRef}</span>
      </div>
    </div>
    
    <div class="quick-add-size-select-group">
      <h5>Select Fit Size</h5>
      <div class="quick-add-sizes-row">
        ${sizesHtml}
      </div>
    </div>
    
    <div class="quick-add-qty-group">
      <h5>Quantity</h5>
      <div class="quick-add-qty-selector">
        <button class="quick-add-qty-btn" id="qa-minus"><i data-lucide="minus" style="width: 14px;"></i></button>
        <input type="number" class="quick-add-qty-input" id="qa-qty" value="1" min="1" readonly>
        <button class="quick-add-qty-btn" id="qa-plus"><i data-lucide="plus" style="width: 14px;"></i></button>
      </div>
    </div>
    
    <button class="cta-button cta-button-primary" id="qa-submit-btn" style="margin-top: var(--spacing-sm); width: 100%;">Add to Studio Bag</button>
  `;
  
  if (window.lucide) {
    window.lucide.createIcons();
  }
  
  const sizeBtns = wrapper.querySelectorAll(".quick-add-size-btn");
  sizeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      sizeBtns.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
  });
  
  const minus = wrapper.querySelector("#qa-minus");
  const plus = wrapper.querySelector("#qa-plus");
  const qtyInput = wrapper.querySelector("#qa-qty");
  
  minus.addEventListener("click", () => {
    let val = parseInt(qtyInput.value);
    if (val > 1) qtyInput.value = val - 1;
  });
  
  plus.addEventListener("click", () => {
    let val = parseInt(qtyInput.value);
    qtyInput.value = val + 1;
  });
  
  wrapper.querySelector("#qa-submit-btn").addEventListener("click", () => {
    const selectedSize = wrapper.querySelector(".quick-add-size-btn.selected").getAttribute("data-size");
    const qty = parseInt(qtyInput.value);
    addToCart(product.id, selectedSize, qty);
    
    closeDrawer("quick-add");
    openDrawer("cart");
  });
  
  openDrawer("quick-add");
}

function updateHeroContent(category) {
  const titleEl = document.getElementById("shop-collection-title");
  const descEl = document.getElementById("shop-collection-desc");
  const breadcrumbCurrent = document.getElementById("breadcrumb-current");
  
  if (!titleEl || !descEl) return;
  
  let title = "Oversized Faith Collection";
  let desc = "Minimal clothing inspired by scripture and designed to spark conversations about Christ. Made from organic heavyweight cotton.";
  let breadcrumb = "All Drops";
  
  switch(category) {
    case "oversized-tees":
      title = "The Boxy Heavyweight Tees";
      desc = "Crafted in India using heavy 240 GSM organic cotton, featuring clean visual symbols of scripture.";
      breadcrumb = "Oversized Tees";
      break;
    case "hoodies":
      title = "The French Terry Hoodies";
      desc = "Ultra-heavy 380 GSM combed cotton fabrics, styled loopback for premium warmth, peace, and mental renewal.";
      breadcrumb = "Streetwear Hoodies";
      break;
    case "new-arrivals":
      title = "The Armor Drop Releases";
      desc = "Explore our latest releases representing spiritual defense, protection, and walk of light.";
      breadcrumb = "New Arrivals";
      break;
    case "best-sellers":
      title = "The Fellowship Favorites";
      desc = "Our most loved conversation starters worn across faith communities and creative circles.";
      breadcrumb = "Best Sellers";
      break;
    case "recently-viewed":
      title = "Your Viewed Reflections";
      desc = "Review the drops you recently explored during your search for identity and purpose.";
      breadcrumb = "Recently Viewed";
      break;
  }
  
  titleEl.textContent = title;
  descEl.textContent = desc;
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = breadcrumb;
}

function removeFilterValue(type, val) {
  if (type === "availability") {
    state.filters.availability = false;
  } else if (type === "search") {
    state.filters.search = "";
    const searchInput = document.getElementById("plp-collection-search");
    if (searchInput) searchInput.value = "";
    const searchClear = document.getElementById("plp-search-clear");
    if (searchClear) searchClear.style.display = "none";
  } else {
    state.filters[type] = state.filters[type].filter(v => v !== val);
  }
  renderShopGrid();
  syncFilterCheckboxStates();
}

function clearAllFilters() {
  state.filters.size = [];
  state.filters.price = [];
  state.filters.tag = [];
  state.filters.theme = [];
  state.filters.availability = false;
  state.filters.search = "";
  
  const searchInput = document.getElementById("plp-collection-search");
  if (searchInput) searchInput.value = "";
  const searchClear = document.getElementById("plp-search-clear");
  if (searchClear) searchClear.style.display = "none";
  
  renderShopGrid();
  syncFilterCheckboxStates();
}

function syncFilterCheckboxStates() {
  document.querySelectorAll(".plp-sidebar-filters .plp-filter-checkbox").forEach(box => {
    const type = box.getAttribute("data-filter-type");
    const val = box.getAttribute("data-value");
    if (type === "availability") {
      box.checked = state.filters.availability;
    } else {
      box.checked = state.filters[type].includes(val);
    }
  });

  document.querySelectorAll(".plp-sidebar-filters .plp-size-filter-btn").forEach(btn => {
    const val = btn.getAttribute("data-value");
    if (state.filters.size.includes(val)) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  document.querySelectorAll(".plp-bottom-sheet-filters .plp-filter-checkbox-mobile").forEach(box => {
    const type = box.getAttribute("data-filter-type");
    const val = box.getAttribute("data-value");
    box.checked = state.filters[type].includes(val);
  });

  document.querySelectorAll(".plp-bottom-sheet-filters .plp-size-filter-btn").forEach(btn => {
    const val = btn.getAttribute("data-value");
    if (state.filters.size.includes(val)) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// 6. PRODUCT DETAILS PAGE RENDERING & ZOOM
// 6. PRODUCT DETAILS PAGE RENDERING & ZOOM
function renderProductDetailPage() {
  const product = PRODUCTS.find(p => p.id === state.currentProductDetail);
  if (!product) return;
  
  // Track recently viewed products
  if (!state.recentlyViewed.includes(product.id)) {
    state.recentlyViewed.unshift(product.id);
    if (state.recentlyViewed.length > 6) {
      state.recentlyViewed.pop();
    }
    localStorage.setItem("ruven_recently_viewed", JSON.stringify(state.recentlyViewed));
  } else {
    state.recentlyViewed = state.recentlyViewed.filter(id => id !== product.id);
    state.recentlyViewed.unshift(product.id);
    localStorage.setItem("ruven_recently_viewed", JSON.stringify(state.recentlyViewed));
  }

  // Inject SEO Schema Markup
  injectSeoSchema(product);

  // Set Breadcrumbs Title
  const breadcrumbTitle = document.getElementById("pdp-breadcrumb-title");
  if (breadcrumbTitle) breadcrumbTitle.textContent = product.title;

  // Local state scoped variables
  let currentImgIdx = 0;
  let selectedSize = product.sizes[0];
  let selectedQty = 1;
  let activeColor = product.colors[0].name;
  let pdpStarFilter = null;
  let pdpSortOrder = "newest";
  let activeSizeGuideTab = "measurements";

  // Render 1. Gallery
  const renderGallery = () => {
    const galleryTarget = document.getElementById("pdp-gallery-target");
    if (!galleryTarget) return;

    const thumbsHtml = product.gallery.map((img, idx) => `
      <button class="pdp-thumb-btn ${idx === currentImgIdx ? 'active' : ''}" data-idx="${idx}">
        <img src="${img}" alt="${product.title} View ${idx + 1}">
      </button>
    `).join("");

    galleryTarget.innerHTML = `
      <div class="pdp-gallery-grid">
        <div class="pdp-thumbnails-wrap">
          ${thumbsHtml}
        </div>
        <div class="pdp-main-image-wrap" id="zoom-container">
          <img src="${product.gallery[currentImgIdx]}" id="zoom-img" alt="${product.title}">
        </div>
      </div>
    `;

    // Hook thumbnail event listeners
    galleryTarget.querySelectorAll(".pdp-thumb-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        currentImgIdx = parseInt(btn.getAttribute("data-idx"));
        renderGallery();
        bindZoomEvents();
      });
    });
  };

  const bindZoomEvents = () => {
    const container = document.getElementById("zoom-container");
    const img = document.getElementById("zoom-img");
    if (container && img) {
      container.addEventListener("mousemove", (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPct = (x / rect.width) * 100;
        const yPct = (y / rect.height) * 100;
        
        img.style.transformOrigin = `${xPct}% ${yPct}%`;
        img.style.transform = "scale(1.5)";
      });
      
      container.addEventListener("mouseleave", () => {
        img.style.transform = "scale(1)";
      });
    }
  };

  // Render 2. Info details
  const renderInfo = () => {
    const infoTarget = document.getElementById("pdp-info-target");
    if (!infoTarget) return;

    const swatchesHtml = product.colors.map(color => {
      const isSel = color.name === activeColor ? "selected" : "";
      return `
        <button class="pdp-swatch-btn ${isSel}" data-color-name="${color.name}">
          <div class="pdp-swatch-color" style="background-color: ${color.hex};"></div>
        </button>
      `;
    }).join("");

    const sizesHtml = product.sizes.map(size => {
      // Recommend 'L' for both Tee and Hoodie as the signature silhouette
      const isRec = size === "L" ? "recommended" : "";
      const isSel = size === selectedSize ? "selected" : "";
      return `<button class="pdp-size-btn ${isSel} ${isRec}" data-size="${size}">${size}</button>`;
    }).join("");

    const isWishlisted = state.wishlist.includes(product.id);

    infoTarget.innerHTML = `
      <div class="pdp-info-sticky">
        <div>
          <p class="pdp-collection-name">Sovereign Drop</p>
          <h1 class="pdp-product-title">${product.title}</h1>
          <div class="pdp-verse-ref-badge" style="margin-top: 8px;">
            <i data-lucide="book-open" style="width: 12px; height: 12px;"></i>
            <span>Inspired by ${product.verseRef}</span>
          </div>
        </div>

        <div class="pdp-price-row">
          <span class="pdp-price">₹${product.price}</span>
          <span class="pdp-original-price">₹${product.originalPrice}</span>
        </div>

        <p class="pdp-short-desc">${product.verseMeaning}</p>

        <!-- Color Selection -->
        <div class="pdp-color-picker">
          <h5>Color: <span id="pdp-active-color">${activeColor}</span></h5>
          <div class="pdp-color-swatches">
            ${swatchesHtml}
          </div>
        </div>

        <!-- Size Selection -->
        <div>
          <div class="pdp-size-picker-header">
            <h5>Select Size (Intended Oversized Cut)</h5>
            <button class="pdp-size-guide-trigger" id="pdp-size-modal-trigger">
              <i data-lucide="ruler" style="width: 14px; height: 14px;"></i> Size Details
            </button>
          </div>
          <div class="pdp-sizes-grid">
            ${sizesHtml}
          </div>
          <p class="pdp-model-height-info" style="margin-top: 8px;">
            ${product.modelInfo}
          </p>
        </div>

        <!-- Stock Indicator -->
        <div class="pdp-stock-status">
          <div class="pdp-stock-dot"></div>
          <span>Limited Drop. Only 7 items left in stock.</span>
        </div>

        <!-- Actions Row -->
        <div class="pdp-actions-row">
          <div class="pdp-qty-wrap">
            <button class="pdp-qty-btn" id="pdp-qty-minus"><i data-lucide="minus" style="width: 14px; height: 14px;"></i></button>
            <input type="number" class="pdp-qty-input" id="pdp-qty-val" value="${selectedQty}" min="1" readonly>
            <button class="pdp-qty-btn" id="pdp-qty-plus"><i data-lucide="plus" style="width: 14px; height: 14px;"></i></button>
          </div>
          <button class="pdp-add-to-bag-btn" id="pdp-add-btn">
            <i data-lucide="shopping-bag" style="width: 16px; height: 16px;"></i>
            <span id="pdp-add-btn-text">Add to bag</span>
          </button>
          <button class="pdp-wishlist-toggle-btn ${isWishlisted ? 'active' : ''}" id="pdp-wish-btn" data-id="${product.id}">
            <i data-lucide="heart" style="width: 18px; height: 18px; fill: ${isWishlisted ? 'var(--color-brand-burgundy)' : 'none'};"></i>
          </button>
        </div>

        <!-- Trust Badges -->
        <div class="pdp-trust-indicators-grid">
          <div class="pdp-trust-item">
            <i class="pdp-trust-icon" data-lucide="award" style="width: 18px; height: 18px;"></i>
            <span class="pdp-trust-text">Organic Knit</span>
          </div>
          <div class="pdp-trust-item">
            <i class="pdp-trust-icon" data-lucide="sparkles" style="width: 18px; height: 18px;"></i>
            <span class="pdp-trust-text">Faith Graphic</span>
          </div>
          <div class="pdp-trust-item">
            <i class="pdp-trust-icon" data-lucide="shield-check" style="width: 18px; height: 18px;"></i>
            <span class="pdp-trust-text">Easy Exchange</span>
          </div>
        </div>
      </div>
    `;

    // Color Swatches Trigger
    infoTarget.querySelectorAll(".pdp-swatch-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        activeColor = btn.getAttribute("data-color-name");
        renderInfo();
        syncMobileStickyBar();
      });
    });

    // Size Selector Trigger
    infoTarget.querySelectorAll(".pdp-size-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        selectedSize = btn.getAttribute("data-size");
        renderInfo();
        syncMobileStickyBar();
      });
    });

    // Sizing Modal Trigger
    const modalTrigger = document.getElementById("pdp-size-modal-trigger");
    if (modalTrigger) {
      modalTrigger.addEventListener("click", openSizingModal);
    }

    // Qty Adjusters
    const minus = document.getElementById("pdp-qty-minus");
    const plus = document.getElementById("pdp-qty-plus");
    if (minus) {
      minus.addEventListener("click", () => {
        if (selectedQty > 1) {
          selectedQty--;
          document.getElementById("pdp-qty-val").value = selectedQty;
        }
      });
    }
    if (plus) {
      plus.addEventListener("click", () => {
        selectedQty++;
        document.getElementById("pdp-qty-val").value = selectedQty;
      });
    }

    // Add to Cart
    const addBtn = document.getElementById("pdp-add-btn");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        addToCart(product.id, selectedSize, selectedQty);
        
        // Success feedback
        addBtn.classList.add("success");
        const btnText = document.getElementById("pdp-add-btn-text");
        if (btnText) btnText.textContent = "Added to Bag!";
        
        setTimeout(() => {
          addBtn.classList.remove("success");
          if (btnText) btnText.textContent = "Add to bag";
        }, 1500);

        openDrawer("cart");
      });
    }

    // Wishlist Toggle
    const wishBtn = document.getElementById("pdp-wish-btn");
    if (wishBtn) {
      wishBtn.addEventListener("click", () => {
        toggleWishlist(product.id);
        renderInfo();
        renderHomepageGrids(); // Keep other views in sync
      });
    }

    if (window.lucide) window.lucide.createIcons();
  };

  // Render 3. Verse Highlight
  const renderVerse = () => {
    const verseTarget = document.getElementById("pdp-verse-target");
    if (!verseTarget) return;
    verseTarget.innerHTML = `
      <div class="pdp-verse-watermark">${product.verseRef.split(" ")[0]}</div>
      <div class="pdp-verse-inner">
        <p class="pdp-collection-name">Scriptural Context</p>
        <div class="pdp-verse-quote-box">"${product.verseQuote}"</div>
        <div class="pdp-verse-separator"></div>
        <div class="pdp-verse-ref-author">${product.verseRef}</div>
        <p class="pdp-verse-meaning-desc">${product.verseMeaning}</p>
      </div>
    `;
  };

  // Render 4. Story Behind Design
  const renderStory = () => {
    const storyTarget = document.getElementById("pdp-story-target");
    if (!storyTarget) return;
    storyTarget.innerHTML = `
      <div class="pdp-story-layout">
        <div class="pdp-story-content">
          <p class="pdp-story-tagline">Visual Ministry</p>
          <h2 class="pdp-story-heading">Every Thread a Message</h2>
          <p class="pdp-story-desc">${product.designStory}</p>
          <div class="pdp-story-quote">"We design clothing not to conform to modern patterns, but to be an open invitation to share faith in your creative workspaces."</div>
          <p class="pdp-story-desc">Crafted in collaboration with young designers across India, merging premium Scandinavian minimal styles with deeply rooted, conversational spiritual symbols.</p>
        </div>
        <div class="pdp-story-image-wrap">
          <img src="/brand_story_lifestyle.png" alt="Sovereign Collection design story lifestyle photo">
        </div>
      </div>
    `;
  };

  // Render 5. Fabric & Craftsmanship
  const renderFabricCraft = () => {
    const craftTarget = document.getElementById("pdp-craft-target");
    if (!craftTarget) return;

    const cardsHtml = product.detailsList.map(detail => {
      let icon = "info";
      if (detail.label.toLowerCase().includes("fabric")) icon = "scissors";
      if (detail.label.toLowerCase().includes("weight")) icon = "weight";
      if (detail.label.toLowerCase().includes("fit")) icon = "shirt";
      if (detail.label.toLowerCase().includes("print")) icon = "printer";
      if (detail.label.toLowerCase().includes("shrink")) icon = "shield-alert";
      if (detail.label.toLowerCase().includes("origin")) icon = "globe";
      
      return `
        <div class="pdp-craft-card">
          <div class="pdp-craft-card-icon"><i data-lucide="${icon}" style="width: 20px; height: 20px;"></i></div>
          <div class="pdp-craft-card-label">${detail.label}</div>
          <div class="pdp-craft-card-value">${detail.value}</div>
        </div>
      `;
    }).join("");

    craftTarget.innerHTML = `
      <h2 class="pdp-craft-title editorial-title" style="font-size: 1.8rem; font-weight: 300;">Fabric & Specification Blueprint</h2>
      <div class="pdp-craft-grid">
        ${cardsHtml}
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  };

  // Render 6. Lifestyle Spread
  const renderLifestyle = () => {
    const lifestyleTarget = document.getElementById("pdp-lifestyle-target");
    if (!lifestyleTarget) return;
    lifestyleTarget.innerHTML = `
      <div class="pdp-lifestyle-spread">
        <img src="/hero_lifestyle.png" alt="Ruven Sovereign lifestyle lookbook">
        <div class="pdp-lifestyle-overlay">
          <div class="pdp-lifestyle-content">
            <span class="pdp-lifestyle-tag">Lookbook Vol 02</span>
            <h2 class="pdp-lifestyle-title">Faith in Motion</h2>
            <p class="pdp-lifestyle-desc">Our garments are engineered to transition seamlessly from academic lecture halls to worship sessions, from quiet library studies to active community campaigns.</p>
          </div>
        </div>
      </div>
    `;
  };

  // Render 7. Sizing Guide Interactive Panel
  const renderSizeGuide = () => {
    const sizeguideTarget = document.getElementById("pdp-sizeguide-target");
    if (!sizeguideTarget) return;

    sizeguideTarget.innerHTML = `
      <div class="pdp-sizeguide-layout">
        <div class="pdp-sizeguide-info">
          <h3>Interactive Sizing Guide</h3>
          <p>This drop features a signature Scandinavian oversized cut. It is designed to drape naturally off the shoulders. Choose your regular size for the intended fit, or size down for a more standard appearance.</p>
          
          <div class="pdp-sizeguide-tabs">
            <button class="pdp-sizeguide-tab-btn ${activeSizeGuideTab === 'measurements' ? 'active' : ''}" data-tab="measurements">Measurements (CM)</button>
            <button class="pdp-sizeguide-tab-btn ${activeSizeGuideTab === 'recommendations' ? 'active' : ''}" data-tab="recommendations">Model Recommendations</button>
          </div>
          
          <div id="pdp-sizeguide-tab-content">
            <!-- Dynamic Content -->
          </div>
        </div>
        
        <div class="pdp-sizeguide-illustration">
          <svg class="pdp-size-sketch" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20 20 L35 12 L42 18 L58 18 L65 12 L80 20 L75 35 L68 32 L68 90 L32 90 L32 32 L25 35 Z" stroke="var(--color-text-primary)"/>
            <line x1="32" y1="40" x2="68" y2="40" stroke="var(--color-brand-gold)" stroke-dasharray="2 2"/>
            <text x="50" y="38" fill="var(--color-brand-gold)" font-size="5" text-anchor="middle">A. CHEST</text>
            <line x1="50" y1="18" x2="50" y2="90" stroke="var(--color-brand-gold)" stroke-dasharray="2 2"/>
            <text x="52" y="55" fill="var(--color-brand-gold)" font-size="5" text-anchor="start">B. LENGTH</text>
          </svg>
          <p class="pdp-sketch-desc">Measurements are in centimeters. Width measured across chest, length from collar seam to hem.</p>
        </div>
      </div>
    `;

    const tabContent = document.getElementById("pdp-sizeguide-tab-content");
    if (tabContent) {
      if (activeSizeGuideTab === "measurements") {
        if (product.category === "oversized-tees") {
          tabContent.innerHTML = `
            <table class="pdp-sizeguide-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Chest Width (cm)</th>
                  <th>Body Length (cm)</th>
                  <th>Sleeve Length (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>S</td><td>56</td><td>70</td><td>22</td></tr>
                <tr><td>M</td><td>59</td><td>72</td><td>23</td></tr>
                <tr><td>L</td><td>62</td><td>74</td><td>24</td></tr>
                <tr><td>XL</td><td>65</td><td>76</td><td>25</td></tr>
              </tbody>
            </table>
          `;
        } else {
          tabContent.innerHTML = `
            <table class="pdp-sizeguide-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Chest Width (cm)</th>
                  <th>Body Length (cm)</th>
                  <th>Sleeve Length (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>M</td><td>61</td><td>71</td><td>63</td></tr>
                <tr><td>L</td><td>64</td><td>73</td><td>64</td></tr>
                <tr><td>XL</td><td>67</td><td>75</td><td>65</td></tr>
              </tbody>
            </table>
          `;
        }
      } else {
        tabContent.innerHTML = `
          <div class="pdp-size-recommendations" style="display: flex; flex-direction: column; gap: var(--spacing-xs); margin-top: 10px;">
            <div style="background: var(--color-white); padding: 12px; border-radius: var(--border-radius-sm); border: 1px solid var(--color-border);">
              <h4 style="font-size: 0.85rem; font-weight: 700; margin-bottom: 2px;">Standard Fit (Relaxed)</h4>
              <p style="font-size: 0.8rem; color: var(--color-text-muted);">Choose one size smaller than your standard size if you prefer a traditional, closer-to-body look.</p>
            </div>
            <div style="background: var(--color-white); padding: 12px; border-radius: var(--border-radius-sm); border: 1px solid var(--color-border);">
              <h4 style="font-size: 0.85rem; font-weight: 700; margin-bottom: 2px;">Oversized Look (Intended)</h4>
              <p style="font-size: 0.8rem; color: var(--color-text-muted);">Choose your normal size. The shoulders are dropped, and chest is broad to create a modern slouchy shape.</p>
            </div>
          </div>
        `;
      }
    }

    // Sizing guide tabs click triggers
    sizeguideTarget.querySelectorAll(".pdp-sizeguide-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        activeSizeGuideTab = btn.getAttribute("data-tab");
        renderSizeGuide();
      });
    });
  };

  // Render 8. Accordions
  const renderSupportAccordions = () => {
    const supportTarget = document.getElementById("pdp-support-target");
    if (!supportTarget) return;

    const faqsHtml = product.faqs.map((faq, idx) => `
      <div class="pdp-accordion-item">
        <button class="pdp-accordion-header" data-idx="${idx}">
          <span>${faq.question}</span>
          <span class="pdp-accordion-header-icon"><i data-lucide="plus" style="width: 16px; height: 16px;"></i></span>
        </button>
        <div class="pdp-accordion-content">
          <div class="pdp-accordion-content-inner">
            <p>${faq.answer}</p>
          </div>
        </div>
      </div>
    `).join("");
    
    const defaultFaqHtml = `
      <div class="pdp-accordion-item">
        <button class="pdp-accordion-header" data-idx="default-ship">
          <span>What are your shipping rates and delivery times in India?</span>
          <span class="pdp-accordion-header-icon"><i data-lucide="plus" style="width: 16px; height: 16px;"></i></span>
        </button>
        <div class="pdp-accordion-content">
          <div class="pdp-accordion-content-inner">
            <p>We provide free express shipping on all orders above ₹1,500. Delivery to metropolitan cities (Mumbai, Bengaluru, Delhi) takes 3-4 business days. For rest of India, it takes 5-7 business days.</p>
          </div>
        </div>
      </div>
    `;

    supportTarget.innerHTML = `
      <div class="pdp-support-layout">
        <h2 class="pdp-support-title editorial-title" style="font-size: 1.8rem; font-weight: 300; text-align: center; margin-bottom: var(--spacing-xl);">Care, Shipping & Support</h2>
        <div class="pdp-accordions-container" style="border-top: 1px solid var(--color-border);">
          ${faqsHtml}
          ${defaultFaqHtml}
        </div>
      </div>
    `;

    // Accordions expand click triggers
    supportTarget.querySelectorAll(".pdp-accordion-header").forEach(header => {
      header.addEventListener("click", () => {
        const item = header.parentElement;
        const content = item.querySelector(".pdp-accordion-content");
        const isActive = header.classList.contains("active");

        // Close all other accordions first
        supportTarget.querySelectorAll(".pdp-accordion-header").forEach(h => {
          h.classList.remove("active");
          h.parentElement.querySelector(".pdp-accordion-content").style.maxHeight = null;
        });

        if (!isActive) {
          header.classList.add("active");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });

    if (window.lucide) window.lucide.createIcons();
  };

  // Render 9. Customer Reviews Panel
  const renderReviews = () => {
    const reviewsTarget = document.getElementById("pdp-reviews-target");
    if (!reviewsTarget) return;

    // Filter reviews
    let filteredReviews = [...product.reviews];
    if (pdpStarFilter !== null) {
      filteredReviews = filteredReviews.filter(r => r.rating === pdpStarFilter);
    }

    // Sort reviews
    if (pdpSortOrder === "newest") {
      filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      filteredReviews.sort((a, b) => b.helpfulCount - a.helpfulCount);
    }

    const totalReviews = product.reviews.length;
    const avgRating = totalReviews > 0 
      ? (product.reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
      : "5.0";

    const ratingBars = [5, 4, 3, 2, 1].map(stars => {
      const count = product.reviews.filter(r => r.rating === stars).length;
      const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
      const isActive = pdpStarFilter === stars ? "active" : "";
      return `
        <div class="pdp-distribution-row ${isActive}" data-stars="${stars}">
          <span>${stars} star</span>
          <div class="pdp-dist-bar-bg">
            <div class="pdp-dist-bar-fill" style="width: ${pct}%;"></div>
          </div>
          <span style="text-align: right; color: var(--color-text-muted);">${count}</span>
        </div>
      `;
    }).join("");

    const getStarsHtml = (rating) => {
      let stars = "";
      for (let i = 1; i <= 5; i++) {
        const isFilled = i <= rating ? "currentColor" : "none";
        stars += `<i data-lucide="star" style="width: 14px; height: 14px; fill: ${isFilled};"></i>`;
      }
      return stars;
    };

    const reviewCardsHtml = filteredReviews.map(rev => `
      <div class="pdp-review-card">
        <div class="pdp-review-meta">
          <div class="pdp-review-stars">
            ${getStarsHtml(rev.rating)}
          </div>
          <span class="pdp-review-date">${rev.date}</span>
        </div>
        <div class="pdp-review-author-row">
          <div class="pdp-review-avatar" style="background-color: ${rev.avatarColor};">${rev.author.charAt(0)}</div>
          <span class="pdp-review-author">${rev.author}</span>
          ${rev.verified ? `
            <span class="pdp-review-verified">
              <i data-lucide="check-circle" style="width: 12px; height: 12px;"></i> Verified Purchase
            </span>
          ` : ""}
        </div>
        <h4 class="pdp-review-title">${rev.title}</h4>
        <p class="pdp-review-body">${rev.body}</p>
        <div class="pdp-review-helpful">
          <span>Was this review helpful?</span>
          <button class="pdp-review-helpful-btn" data-rev-id="${rev.id}">
            <i data-lucide="thumbs-up" style="width: 12px; height: 12px;"></i>
            <span>(${rev.helpfulCount})</span>
          </button>
        </div>
      </div>
    `).join("");

    reviewsTarget.innerHTML = `
      <div style="max-width: var(--max-width-site); margin: 0 auto;">
        <h2 class="pdp-craft-title editorial-title" style="font-size: 1.8rem; font-weight: 300; text-align: center; margin-bottom: var(--spacing-xl);">Customer Reflections</h2>
        
        <div class="pdp-reviews-grid">
          <!-- Summary card left -->
          <div class="pdp-reviews-summary-card">
            <span class="pdp-reviews-score">${avgRating}</span>
            <div class="pdp-reviews-stars-wrap">
              ${getStarsHtml(Math.round(parseFloat(avgRating)))}
            </div>
            <span class="pdp-reviews-total-text">Based on ${totalReviews} verified reviews</span>
            <div class="pdp-reviews-distribution">
              ${ratingBars}
            </div>
            ${pdpStarFilter !== null ? `
              <button class="plp-compare-clear-btn" id="pdp-clear-review-filter" style="margin-top: 10px;">Clear Filter</button>
            ` : ""}
          </div>
          
          <!-- Reviews list right -->
          <div>
            <div class="pdp-reviews-toolbar">
              <span class="pdp-reviews-toolbar-title">${filteredReviews.length} Reflections</span>
              <div style="display: flex; gap: var(--spacing-sm); align-items: center;">
                <label style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--color-text-muted);">Sort By:</label>
                <select class="plp-sort-dropdown" id="pdp-review-sort" style="padding: 6px 12px; font-size: 0.8rem;">
                  <option value="newest" ${pdpSortOrder === "newest" ? "selected" : ""}>Newest First</option>
                  <option value="helpful" ${pdpSortOrder === "helpful" ? "selected" : ""}>Most Helpful</option>
                </select>
              </div>
            </div>
            <div class="pdp-reviews-list-container">
              ${filteredReviews.length > 0 ? reviewCardsHtml : `
                <p style="text-align: center; color: var(--color-text-muted); padding: 40px 0;">No reviews matching selected rating.</p>
              `}
            </div>
          </div>
        </div>
      </div>
    `;

    // Click triggers for Rating distribution rows
    reviewsTarget.querySelectorAll(".pdp-distribution-row").forEach(row => {
      row.addEventListener("click", () => {
        const star = parseInt(row.getAttribute("data-stars"));
        pdpStarFilter = pdpStarFilter === star ? null : star; // Toggle filter
        renderReviews();
      });
    });

    // Clear filter trigger
    const clearReviewFilter = document.getElementById("pdp-clear-review-filter");
    if (clearReviewFilter) {
      clearReviewFilter.addEventListener("click", () => {
        pdpStarFilter = null;
        renderReviews();
      });
    }

    // Sort order dropdown trigger
    const sortDropdown = document.getElementById("pdp-review-sort");
    if (sortDropdown) {
      sortDropdown.addEventListener("change", (e) => {
        pdpSortOrder = e.target.value;
        renderReviews();
      });
    }

    // Helpfulness clicks
    reviewsTarget.querySelectorAll(".pdp-review-helpful-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const revId = btn.getAttribute("data-rev-id");
        const review = product.reviews.find(r => r.id === revId);
        if (review) {
          review.helpfulCount++;
          renderReviews();
        }
      });
    });

    if (window.lucide) window.lucide.createIcons();
  };

  // Render 10. Related Products
  const renderRelated = () => {
    const relatedTarget = document.getElementById("pdp-related-target");
    if (!relatedTarget) return;

    // Recommend the other product
    const relatedProducts = PRODUCTS.filter(p => p.id !== product.id);

    const relatedCardsHtml = relatedProducts.map(p => `
      <div class="product-card" style="border: 1px solid var(--color-border); border-radius: var(--border-radius-md); overflow: hidden; background: var(--color-white);">
        <a href="#product/${p.id}" class="nav-trigger" data-view="product" style="display: block; aspect-ratio: 4/5; overflow: hidden; position: relative;">
          <img src="${p.image}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover;">
          <div class="plp-card-action-overlay">
            <span class="plp-card-quick-add-btn" style="text-align: center; display: block; font-size: 0.72rem; padding: 10px;">Explore Drop</span>
          </div>
        </a>
        <div class="plp-card-info" style="padding: 15px;">
          <div class="plp-card-meta">
            <span class="plp-card-verse-ref">${p.verseRef}</span>
          </div>
          <h4 class="plp-card-title" style="font-size: 1rem; font-weight: 700; margin-bottom: 8px;">${p.title}</h4>
          <div class="plp-card-price-row">
            <span class="plp-card-price">₹${p.price}</span>
          </div>
        </div>
      </div>
    `).join("");

    relatedTarget.innerHTML = `
      <div class="pdp-related-header">
        <p class="pdp-collection-name">Complete the Look</p>
        <h2 class="editorial-title" style="font-size: 1.8rem; font-weight: 300;">Styled with Purpose</h2>
      </div>
      <div class="pdp-related-grid" style="grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));">
        ${relatedCardsHtml}
      </div>
    `;

    // Hook card navigations
    relatedTarget.querySelectorAll(".nav-trigger").forEach(link => {
      link.addEventListener("click", (e) => {
        window.scrollTo({ top: 0, behavior: "instant" });
      });
    });
  };

  // Render 11. Recently Viewed
  const renderRecentlyViewed = () => {
    const recentTarget = document.getElementById("pdp-recent-section");
    if (!recentTarget) return;

    // Filter viewed items to exclude the current one
    const viewedIds = state.recentlyViewed.filter(id => id !== product.id);

    if (viewedIds.length === 0) {
      recentTarget.style.display = "none";
      return;
    }
    recentTarget.style.display = "block";

    const viewedProducts = viewedIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

    const cardsHtml = viewedProducts.map(p => `
      <div class="pdp-recent-card" style="border: 1px solid var(--color-border); border-radius: var(--border-radius-md); overflow: hidden; background: var(--color-white);">
        <a href="#product/${p.id}" class="nav-trigger" data-view="product" style="display: block; aspect-ratio: 4/5; overflow: hidden; position: relative;">
          <img src="${p.image}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover;">
        </a>
        <div style="padding: 12px;">
          <span style="font-size: 0.65rem; font-weight: 700; color: var(--color-brand-gold); text-transform: uppercase;">${p.verseRef}</span>
          <h4 style="font-size: 0.88rem; font-weight: 700; margin: 4px 0 6px;">${p.title}</h4>
          <span style="font-weight: 700; font-size: 0.88rem; color: var(--color-text-primary);">₹${p.price}</span>
        </div>
      </div>
    `).join("");

    recentTarget.innerHTML = `
      <div style="margin-bottom: var(--spacing-lg);">
        <p class="pdp-collection-name">Continue Browsing</p>
        <h2 class="editorial-title" style="font-size: 1.8rem; font-weight: 300;">Recently Explored</h2>
      </div>
      <div class="pdp-recent-carousel">
        ${cardsHtml}
      </div>
    `;

    // Hook navigations
    recentTarget.querySelectorAll(".nav-trigger").forEach(link => {
      link.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "instant" });
      });
    });
  };

  // Render 12. Community UGC Gallery
  const renderCommunityInspiration = () => {
    const commTarget = document.getElementById("pdp-community-target");
    if (!commTarget) return;

    // Static community lookbook items matching local assets
    const ugcItems = [
      { img: "/brand_story_lifestyle.png", handle: "@amit_k12", caption: "Walking into college with purpose. Shield of Light Tee." },
      { img: "/hero_lifestyle.png", handle: "@christina_sharma", caption: "Renewed in mind, focused on fellowship. Love the Sage green tone." },
      { img: "/hero2.png", handle: "@sarah.m", caption: "Double lined hood structure is perfect. Romans 12:2." },
      { img: "/oversized_tee_product.png", handle: "@joel_mercy", caption: "Conversation starter indeed. Built heavy, worn with pride." }
    ];

    const cardsHtml = ugcItems.map(item => `
      <div class="pdp-community-card">
        <img src="${item.img}" alt="Community lookbook post by ${item.handle}">
        <div class="pdp-community-hover-overlay">
          <div class="pdp-community-handle">${item.handle}</div>
          <p class="pdp-community-caption">"${item.caption}"</p>
          <div style="margin-top: 10px; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; color: var(--color-brand-gold);">@ruven.studio</div>
        </div>
      </div>
    `).join("");

    commTarget.innerHTML = `
      <div class="pdp-related-header">
        <p class="pdp-collection-name">Fellowship Inspiration</p>
        <h2 class="editorial-title" style="font-size: 1.8rem; font-weight: 300;">Worn in Community</h2>
      </div>
      <div class="pdp-community-grid">
        ${cardsHtml}
      </div>
    `;
  };

  // Render 13. Mobile Sticky Purchase Bar
  const renderMobileStickyBar = () => {
    const stickyBar = document.getElementById("pdp-mobile-sticky-bar");
    if (!stickyBar) return;

    stickyBar.innerHTML = `
      <div class="pdp-mobile-bar-summary">
        <h4 style="font-size: 0.88rem; font-weight:700; margin-bottom:2px;">${product.title}</h4>
        <p style="font-size: 0.75rem; color: var(--color-text-muted);">₹${product.price} • Selected: <span id="pdp-mobile-selected-size" style="font-weight:700; color:var(--color-brand-burgundy);">${selectedSize}</span></p>
      </div>
      <div class="pdp-mobile-bar-actions">
        <button class="pdp-mobile-add-btn" id="pdp-mobile-add-btn-act">Add to Bag</button>
      </div>
    `;

    // Hook sticky button action
    const stickyAdd = document.getElementById("pdp-mobile-add-btn-act");
    if (stickyAdd) {
      stickyAdd.addEventListener("click", () => {
        addToCart(product.id, selectedSize, selectedQty);
        
        stickyAdd.textContent = "Added!";
        stickyAdd.style.backgroundColor = "var(--color-brand-sage)";
        setTimeout(() => {
          stickyAdd.textContent = "Add to Bag";
          stickyAdd.style.backgroundColor = "var(--color-brand-burgundy)";
        }, 1500);

        openDrawer("cart");
      });
    }
  };

  const syncMobileStickyBar = () => {
    const el = document.getElementById("pdp-mobile-selected-size");
    if (el) el.textContent = selectedSize;
  };

  // Render Sizing Modal content
  const openSizingModal = () => {
    const modal = document.getElementById("pdp-size-modal");
    const modalBody = document.getElementById("pdp-modal-body");
    if (!modal || !modalBody) return;

    let chartHtml = "";
    if (product.category === "oversized-tees") {
      chartHtml = `
        <table class="pdp-sizeguide-table" style="margin-top: 15px;">
          <thead>
            <tr>
              <th>Size</th>
              <th>Chest Width (cm)</th>
              <th>Body Length (cm)</th>
              <th>Sleeve Length (cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>S</td><td>56</td><td>70</td><td>22</td></tr>
            <tr><td>M</td><td>59</td><td>72</td><td>23</td></tr>
            <tr><td>L</td><td>62</td><td>74</td><td>24</td></tr>
            <tr><td>XL</td><td>65</td><td>76</td><td>25</td></tr>
          </tbody>
        </table>
      `;
    } else {
      chartHtml = `
        <table class="pdp-sizeguide-table" style="margin-top: 15px;">
          <thead>
            <tr>
              <th>Size</th>
              <th>Chest Width (cm)</th>
              <th>Body Length (cm)</th>
              <th>Sleeve Length (cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>M</td><td>61</td><td>71</td><td>63</td></tr>
            <tr><td>L</td><td>64</td><td>73</td><td>64</td></tr>
            <tr><td>XL</td><td>67</td><td>75</td><td>65</td></tr>
          </tbody>
        </table>
      `;
    }

    modalBody.innerHTML = `
      <h3 class="editorial-title" style="font-size: 1.5rem; font-weight: 300; margin-bottom: var(--spacing-sm);">${product.title} Dimension Chart</h3>
      <p style="font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.5;">This drops features dropped shoulders, extended sleeves, and a generous boxy chest cut. If you prefer a fitted look, select one size down from your usual size.</p>
      ${chartHtml}
      <div style="margin-top: 20px; text-align: center;">
        <button class="cta-button cta-button-primary" id="pdp-modal-close-action" style="padding: 10px 24px; font-size: 0.8rem;">Close Sizing Table</button>
      </div>
    `;

    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Disable scroll behind modal

    // Close listeners
    const closeBtn = document.getElementById("pdp-modal-close-btn");
    const closeAct = document.getElementById("pdp-modal-close-action");
    const overlay = modal.querySelector(".pdp-modal-overlay");

    const closeHandler = () => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    };

    if (closeBtn) closeBtn.addEventListener("click", closeHandler);
    if (closeAct) closeAct.addEventListener("click", closeHandler);
    if (overlay) overlay.addEventListener("click", closeHandler);
  };

  // Set Observer for Mobile Sticky Purchase Bar
  const setupMobileStickyBarObserver = () => {
    const targetBtn = document.getElementById("pdp-add-btn");
    const stickyBar = document.getElementById("pdp-mobile-sticky-bar");
    
    if (targetBtn && stickyBar && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // Show on mobile when the main CTA is out of view
          if (!entry.isIntersecting && window.innerWidth <= 768) {
            stickyBar.classList.add("active");
          } else {
            stickyBar.classList.remove("active");
          }
        });
      }, { threshold: 0 });
      
      observer.observe(targetBtn);
    }
  };

  // Execute all renders
  renderGallery();
  bindZoomEvents();
  renderInfo();
  renderVerse();
  renderStory();
  renderFabricCraft();
  renderLifestyle();
  renderSizeGuide();
  renderSupportAccordions();
  renderReviews();
  renderRelated();
  renderRecentlyViewed();
  renderCommunityInspiration();
  renderMobileStickyBar();
  setupMobileStickyBarObserver();
}

function injectSeoSchema(product) {
  let schemaEl = document.getElementById("pdp-seo-schema");
  if (!schemaEl) {
    schemaEl = document.createElement("script");
    schemaEl.type = "application/ld+json";
    schemaEl.id = "pdp-seo-schema";
    document.head.appendChild(schemaEl);
  }
  
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": [
      window.location.origin + product.image
    ],
    "description": product.fabricDetails,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Ruven Studio"
    },
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "priceCurrency": "INR",
      "price": product.price,
      "priceValidUntil": "2027-01-01",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": product.reviews.length.toString()
    }
  };
  
  schemaEl.textContent = JSON.stringify(productSchema);
}

// 7. CART DRAWER STATE & RENDERING
function setupCartDrawer() {
  const openBtn = document.getElementById("cart-toggle-btn");
  const closeBtn = document.getElementById("cart-close-btn");
  const backdrop = document.getElementById("backdrop-overlay");
  const checkoutBtn = document.getElementById("checkout-btn");
  const mobileCheckoutBtn = document.getElementById("mobile-checkout-btn");
  
  if (openBtn) openBtn.addEventListener("click", () => openDrawer("cart"));
  if (closeBtn) closeBtn.addEventListener("click", () => closeDrawer("cart"));
  if (backdrop) backdrop.addEventListener("click", () => {
    closeDrawer("cart");
    closeDrawer("wishlist");
  });
  
  const checkoutAction = () => {
    if (state.cart.length === 0) {
      alert("Your studio bag is empty!");
      return;
    }
    alert("Proceeding to secure checkout under God's protection. Thank you for supporting Ruven Studio!");
    // Clear cart as placeholder order placement
    state.cart = [];
    saveCartState();
    renderCart();
    closeDrawer("cart");
  };

  if (checkoutBtn) checkoutBtn.addEventListener("click", checkoutAction);
  if (mobileCheckoutBtn) mobileCheckoutBtn.addEventListener("click", checkoutAction);
}

function openDrawer(drawerId) {
  document.getElementById(`${drawerId}-drawer`).classList.add("active");
  document.getElementById("backdrop-overlay").classList.add("active");
  document.body.style.overflow = "hidden"; // disable scroll behind drawer
}

function closeDrawer(drawerId) {
  document.getElementById(`${drawerId}-drawer`).classList.remove("active");
  document.getElementById("backdrop-overlay").classList.remove("active");
  document.body.style.overflow = ""; // restore scroll
}

function addToCart(productId, size, quantity) {
  const existingIndex = state.cart.findIndex(item => item.id === productId && item.size === size);
  
  if (existingIndex > -1) {
    state.cart[existingIndex].qty += quantity;
  } else {
    state.cart.push({ id: productId, size: size, qty: quantity });
  }
  
  saveCartState();
  renderCart();
}

function removeFromCart(productId, size) {
  state.cart = state.cart.filter(item => !(item.id === productId && item.size === size));
  saveCartState();
  renderCart();
}

function updateCartQty(productId, size, change) {
  const index = state.cart.findIndex(item => item.id === productId && item.size === size);
  if (index > -1) {
    state.cart[index].qty += change;
    if (state.cart[index].qty <= 0) {
      removeFromCart(productId, size);
      return;
    }
    saveCartState();
    renderCart();
  }
}

function saveCartState() {
  localStorage.setItem("ruven_cart", JSON.stringify(state.cart));
}

function renderCart() {
  const cartContent = document.getElementById("cart-drawer-content");
  const cartBadge = document.getElementById("cart-badge");
  const subtotalVal = document.getElementById("cart-subtotal-val");
  const stickyPrice = document.getElementById("mobile-sticky-price");
  const mobileBar = document.getElementById("mobile-bottom-bar");
  
  if (!cartContent) return;
  
  // Cart Badge Total Count
  const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
  if (cartBadge) {
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems === 0 ? "none" : "flex";
  }
  
  if (state.cart.length === 0) {
    cartContent.innerHTML = `
      <div class="cart-empty">
        <i data-lucide="shopping-bag" class="cart-empty-icon"></i>
        <p style="font-family: var(--font-editorial); font-size: 1.25rem; font-style: italic;">Your studio bag is empty.</p>
        <p style="font-size: 0.8rem; max-width: 250px;">Find clothing created for self-discovery and conversations of faith.</p>
        <button class="cta-button cta-button-primary nav-trigger" data-view="shop" style="padding: 0.6rem 2rem; font-size: 0.75rem; margin-top: var(--spacing-xs);" onclick="document.getElementById('cart-close-btn').click();">Browse Drops</button>
      </div>
    `;
    if (subtotalVal) subtotalVal.textContent = "₹0.00";
    if (stickyPrice) stickyPrice.textContent = "₹0.00";
    if (mobileBar) mobileBar.style.display = "none";
    document.getElementById("cart-drawer-footer").style.display = "none";
    return;
  }
  
  document.getElementById("cart-drawer-footer").style.display = "block";
  let subtotal = 0;
  
  const cartListMarkup = state.cart.map(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    const itemTotal = product.price * item.qty;
    subtotal += itemTotal;
    
    return `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="cart-item-info">
          <div>
            <h4 class="cart-item-title">${product.title}</h4>
            <div class="cart-item-meta">
              <span>Size: ${item.size}</span>
              <span>Category: ${product.category.replace("-", " ")}</span>
            </div>
          </div>
          <div class="cart-item-qty">
            <button class="cart-item-qty-btn decrease-qty" data-id="${product.id}" data-size="${item.size}"><i data-lucide="minus" style="width: 10px;"></i></button>
            <span class="cart-item-qty-val">${item.qty}</span>
            <button class="cart-item-qty-btn increase-qty" data-id="${product.id}" data-size="${item.size}"><i data-lucide="plus" style="width: 10px;"></i></button>
          </div>
        </div>
        <div class="cart-item-price-remove">
          <span class="cart-item-price">₹${itemTotal}</span>
          <button class="cart-item-remove-btn remove-item" data-id="${product.id}" data-size="${item.size}">Remove</button>
        </div>
      </div>
    `;
  }).join("");
  
  cartContent.innerHTML = `<div class="cart-items-list">${cartListMarkup}</div>`;
  
  if (window.lucide) {
    window.lucide.createIcons();
  }
  
  if (subtotalVal) subtotalVal.textContent = `₹${subtotal}`;
  if (stickyPrice) stickyPrice.textContent = `₹${subtotal}`;
  
  // Show mobile bottom sticky bar if items exist and on mobile
  if (mobileBar) {
    mobileBar.style.display = (window.innerWidth <= 480) ? "flex" : "none";
  }
  
  // Attach Cart Adjustment Listeners
  document.querySelectorAll(".decrease-qty").forEach(btn => {
    btn.addEventListener("click", () => {
      updateCartQty(btn.getAttribute("data-id"), btn.getAttribute("data-size"), -1);
    });
  });
  
  document.querySelectorAll(".increase-qty").forEach(btn => {
    btn.addEventListener("click", () => {
      updateCartQty(btn.getAttribute("data-id"), btn.getAttribute("data-size"), 1);
    });
  });
  
  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", () => {
      removeFromCart(btn.getAttribute("data-id"), btn.getAttribute("data-size"));
    });
  });
}

// 8. WISHLIST STATE & RENDERING
function setupWishlistDrawer() {
  const openBtn = document.getElementById("wishlist-toggle-btn");
  const closeBtn = document.getElementById("wishlist-close-btn");
  
  if (openBtn) openBtn.addEventListener("click", () => openDrawer("wishlist"));
  if (closeBtn) closeBtn.addEventListener("click", () => closeDrawer("wishlist"));
}

function toggleWishlist(productId) {
  const index = state.wishlist.indexOf(productId);
  if (index > -1) {
    state.wishlist.splice(index, 1);
  } else {
    state.wishlist.push(productId);
  }
  
  localStorage.setItem("ruven_wishlist", JSON.stringify(state.wishlist));
  renderWishlist();
  
  // Re-render other grids to reflect visual heart changes
  renderHomepageGrids();
  renderShopGrid();
}

function renderWishlist() {
  const content = document.getElementById("wishlist-drawer-content");
  const badge = document.getElementById("wishlist-badge");
  
  if (!content) return;
  
  const count = state.wishlist.length;
  if (badge) {
    badge.textContent = count;
    badge.style.display = count === 0 ? "none" : "flex";
  }
  
  if (count === 0) {
    content.innerHTML = `
      <div class="cart-empty">
        <i data-lucide="heart" class="cart-empty-icon"></i>
        <p style="font-family: var(--font-editorial); font-size: 1.25rem; font-style: italic;">Your wishlist is empty.</p>
        <p style="font-size: 0.8rem; max-width: 250px;">Save products you love and want to start conversations with.</p>
      </div>
    `;
    return;
  }
  
  const wishlistItemsMarkup = state.wishlist.map(pid => {
    const product = PRODUCTS.find(p => p.id === pid);
    if (!product) return "";
    return `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="cart-item-info">
          <div>
            <h4 class="cart-item-title">${product.title}</h4>
            <span style="font-size: 0.85rem; font-weight: 500;">₹${product.price}</span>
          </div>
          <button class="cta-button cta-button-primary move-to-bag-btn" data-id="${product.id}" style="padding: 0.4rem 1rem; font-size: 0.65rem; border-radius: var(--border-radius-full); width: max-content; margin-top: var(--spacing-xs);">Move to Bag</button>
        </div>
        <div class="cart-item-price-remove" style="justify-content: flex-start;">
          <button class="cart-item-remove-btn remove-wishlist-item" data-id="${product.id}">Remove</button>
        </div>
      </div>
    `;
  }).join("");
  
  content.innerHTML = `<div class="cart-items-list">${wishlistItemsMarkup}</div>`;
  
  // Re-create icons for wishlist drawer
  if (window.lucide) {
    window.lucide.createIcons();
  }
  
  // Event listeners for wishlist drawer items
  document.querySelectorAll(".remove-wishlist-item").forEach(btn => {
    btn.addEventListener("click", () => {
      toggleWishlist(btn.getAttribute("data-id"));
    });
  });
  
  document.querySelectorAll(".move-to-bag-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const pid = btn.getAttribute("data-id");
      const product = PRODUCTS.find(p => p.id === pid);
      
      // Default to first size available
      addToCart(pid, product.sizes[0], 1);
      toggleWishlist(pid); // Remove from wishlist on move
      closeDrawer("wishlist");
      openDrawer("cart");
    });
  });
}

// 9. COMMUNITY PRAYER WALL CONTROLLER
function setupPrayerWall() {
  const form = document.getElementById("prayer-request-form");
  if (!form) return;
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const authorVal = document.getElementById("prayer-author").value.trim();
    const locationVal = document.getElementById("prayer-location").value.trim();
    const messageVal = document.getElementById("prayer-message").value.trim();
    
    const newPrayer = {
      id: Date.now(),
      author: authorVal || "Anonymous",
      location: locationVal || "India",
      message: messageVal,
      count: 1, // Start with 1 prayer support
      voted: true // User who posted automatically supports it
    };
    
    state.prayers.unshift(newPrayer); // Add to top of feed
    localStorage.setItem("ruven_prayers", JSON.stringify(state.prayers));
    
    renderPrayerFeed();
    form.reset();
    
    alert("Your prayer request has been shared onto the wall. The studio collective stands with you.");
  });
}

function renderPrayerFeed() {
  const feed = document.getElementById("prayer-wall-feed");
  if (!feed) return;
  
  if (state.prayers.length === 0) {
    feed.innerHTML = `
      <p style="text-align: center; color: var(--color-text-muted); font-size: 0.9rem; padding: var(--spacing-xl) 0;">No prayer requests shared yet. Be the first to share one.</p>
    `;
    return;
  }
  
  feed.innerHTML = state.prayers.map(prayer => `
    <div class="prayer-card" data-id="${prayer.id}">
      <div class="prayer-meta">
        <span class="prayer-name">${prayer.author}</span>
        <span>${prayer.location}</span>
      </div>
      <p class="prayer-content">"${prayer.message}"</p>
      <div class="prayer-actions">
        <button class="prayer-pray-btn ${prayer.voted ? 'active' : ''}" data-id="${prayer.id}" aria-label="Pray for this request">
          <i data-lucide="heart" style="width: 14px; fill: ${prayer.voted ? 'currentColor' : 'none'};"></i>
          <span>${prayer.count} Standing in Prayer</span>
        </button>
      </div>
    </div>
  `).join("");
  
  if (window.lucide) {
    window.lucide.createIcons();
  }
  
  // Attach "Amen / Stand in Prayer" click events
  document.querySelectorAll(".prayer-pray-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const pid = parseInt(btn.getAttribute("data-id"));
      const index = state.prayers.findIndex(p => p.id === pid);
      
      if (index > -1) {
        const prayer = state.prayers[index];
        if (prayer.voted) {
          prayer.count--;
          prayer.voted = false;
        } else {
          prayer.count++;
          prayer.voted = true;
        }
        localStorage.setItem("ruven_prayers", JSON.stringify(state.prayers));
        renderPrayerFeed();
      }
    });
  });
}

// 10. NEWSLETTER & EXTRA EVENTS
function setupNewsletter() {
  const form = document.getElementById("newsletter-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.querySelector("input").value;
      alert(`Welcome to the Studio Fellowship! Confirmation sent to: ${email}`);
      form.reset();
    });
  }
}

// 11. ANNOUNCEMENT BAR VALUE ROTATION
function setupAnnouncementBar() {
  const messages = [
    "Designed to Start Conversations About Christ",
    "Premium Quality • Faith Inspired • Limited Collections",
    "Made with Purpose"
  ];
  let currentIndex = 0;
  const container = document.getElementById("announcement-text");
  if (!container) return;

  setInterval(() => {
    container.style.opacity = 0;
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % messages.length;
      container.textContent = messages[currentIndex];
      container.style.opacity = 1;
    }, 400);
  }, 4500);
}

// 12. SEARCH MODAL TRIGGERS & HANDLING
function setupSearchModal() {
  const searchBtn = document.getElementById("search-btn");
  const closeBtn = document.getElementById("search-modal-close-btn");
  const modal = document.getElementById("search-modal");
  const form = document.getElementById("search-modal-form");
  const input = document.getElementById("search-modal-input");

  if (!searchBtn || !modal) return;

  searchBtn.addEventListener("click", () => {
    modal.classList.add("active");
    setTimeout(() => input.focus(), 150);
  });

  const closeSearch = () => {
    modal.classList.remove("active");
    input.value = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeSearch);

  // Close search on Esc key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeSearch();
    }
  });

  // Handle click on suggestions or trigger search
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = input.value.trim().toLowerCase();
      if (query) {
        closeSearch();
        switchView("shop");
        
        // Search inside products
        const shopGrid = document.getElementById("shop-products-grid");
        if (shopGrid) {
          const filtered = PRODUCTS.filter(p => 
            p.title.toLowerCase().includes(query) || 
            p.verseRef.toLowerCase().includes(query) || 
            p.designStory.toLowerCase().includes(query)
          );
          
          const countEl = document.getElementById("shop-items-count");
          if (countEl) {
            countEl.textContent = `Search results for "${query}": ${filtered.length} found`;
          }
          
          shopGrid.innerHTML = filtered.length > 0
            ? filtered.map(product => createProductCardMarkup(product)).join("")
            : `<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted); padding: var(--spacing-xl) 0;">No matching drops found. Try searching 'tee' or 'hoodie'.</p>`;
          
          if (window.lucide) {
            window.lucide.createIcons();
          }
          attachCardEvents();
        }
      }
    });
  }

  // Intercept search suggestion links to close modal
  document.querySelectorAll(".search-suggestion-link").forEach(link => {
    link.addEventListener("click", () => {
      closeSearch();
    });
  });
}

// 13. HERO PARALLAX MOUSE INTERACTION (Disabled to keep image still)
function setupHeroParallax() {
  // Parallax removed so the image behaves still
}

// 14. SCROLL REVEAL MICRO-INTERACTION
function setupScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.9;
    revealElements.forEach(el => {
      const boxTop = el.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        el.classList.add("active");
      }
    });
  };
  
  window.addEventListener("scroll", revealOnScroll);
  // Run once on load
  revealOnScroll();
}
