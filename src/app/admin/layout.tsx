"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import "./admin.css";

// ─── Types ──────────────────────────────────────────────────────────────────
interface ToastItem {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
}

// ─── Nav Config ─────────────────────────────────────────────────────────────
const NAV_GROUPS = [
  {
    id: "overview",
    label: "Overview",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    items: [{ label: "Dashboard", href: "/admin" }]
  },
  {
    id: "commerce",
    label: "Commerce",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
    items: [
      { label: "Products",    href: "/admin/products" },
      { label: "Collections", href: "/admin/collections" },
      { label: "Orders",      href: "/admin/orders",   badge: 12 },
      { label: "Customers",   href: "/admin/customers" }
    ]
  },
  {
    id: "content",
    label: "Content",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    items: [
      { label: "Faith Journal",  href: "/admin/content", badge: 3 },
      { label: "Media Library",  href: "/admin/media" }
    ]
  },
  {
    id: "community",
    label: "Community",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    items: [{ label: "Prayer Requests", href: "/admin/community", badge: 5 }]
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    items: [
      { label: "Campaigns", href: "/admin/marketing" },
      { label: "Discounts",  href: "/admin/discounts" }
    ]
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    items: [{ label: "Reports", href: "/admin/analytics" }]
  },
  {
    id: "team",
    label: "Team",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    items: [{ label: "Users & Roles", href: "/admin/team" }]
  },
  {
    id: "settings",
    label: "Settings",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
    items: [{ label: "System Settings", href: "/admin/settings" }]
  }
];

const ALL_NAV_ITEMS = NAV_GROUPS.flatMap(g => g.items);

const NOTIFICATIONS = [
  { id: "1", text: "New order #RS-1042 — ₹2,890 from Priya S.", time: "2 min ago",  color: "#22c55e" },
  { id: "2", text: "Low stock: Armor Tee White/M — 3 units left",  time: "18 min ago", color: "#f59e0b" },
  { id: "3", text: "Prayer request pending review from Anjali",    time: "1 hr ago",   color: "#3b82f6" },
  { id: "4", text: "Monthly revenue report is ready to export",    time: "3 hrs ago",  color: "#670000" }
];

const TOAST_ICONS: Record<string, string> = {
  success: "✓", error: "✕", warning: "⚠", info: "ℹ"
};

// ─── Layout Component ────────────────────────────────────────────────────────
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();

  // Auth
  const [adminName,  setAdminName]  = useState("Samuel Ruven");
  const [adminEmail, setAdminEmail] = useState("samuel@ruvenstudio.in");
  const [loaded,     setLoaded]     = useState(false);

  // Sidebar
  const [collapsed,      setCollapsed]      = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    NAV_GROUPS.map(g => g.id) // ALL groups open by default
  );

  // Header
  const [clock,         setClock]         = useState("");
  const [role,          setRole]          = useState("Super Admin");
  const [theme,         setTheme]         = useState<"dark" | "light" | "system">("dark");
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showNotifs,    setShowNotifs]    = useState(false);
  const [showNewModal,  setShowNewModal]  = useState(false);
  const [showCmd,       setShowCmd]       = useState(false);
  const [cmdQuery,      setCmdQuery]      = useState("");

  // Toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Refs
  const themeRef   = useRef<HTMLDivElement>(null);
  const notifRef   = useRef<HTMLDivElement>(null);
  const cmdInputRef = useRef<HTMLInputElement>(null);

  // ── Add Toast ──────────────────────────────────────────────────────────────
  const addToast = useCallback((type: ToastItem["type"], title: string, message?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4500);
  }, []);

  const removeToast = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  // ── Listen for window toast events (from page components) ─────────────────
  useEffect(() => {
    const handler = (e: Event) => {
      const { type, title, message } = (e as CustomEvent).detail;
      addToast(type, title, message);
    };
    window.addEventListener("admin-toast", handler);
    return () => window.removeEventListener("admin-toast", handler);
  }, [addToast]);

  // ── Auth check ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const getCookie = (name: string) => {
      const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)"));
      return match ? decodeURIComponent(match[2]) : "";
    };
    if (getCookie("mock_admin_session") !== "true") {
      router.replace("/login");
      return;
    }
    const name  = getCookie("mock_user_name");
    const email = getCookie("mock_user_email");
    if (name)  setAdminName(name);
    if (email) setAdminEmail(email);
    setLoaded(true);
  }, [router]);

  // ── Clock ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = d.getHours();
      const m = String(d.getMinutes()).padStart(2, "0");
      const s = String(d.getSeconds()).padStart(2, "0");
      const ampm = h >= 12 ? "PM" : "AM";
      const h12  = h % 12 || 12;
      setClock(`${String(h12).padStart(2,"0")}:${m}:${s} ${ampm}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // ── Keyboard shortcuts ─────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setShowCmd(p => !p); }
      if (e.key === "Escape") {
        setShowCmd(false);
        setShowThemeMenu(false);
        setShowNotifs(false);
        setShowNewModal(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus cmd input when palette opens
  useEffect(() => {
    if (showCmd) {
      setCmdQuery("");
      setTimeout(() => cmdInputRef.current?.focus(), 40);
    }
  }, [showCmd]);

  // ── Close dropdowns on outside click ──────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) setShowThemeMenu(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifs(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Sidebar group toggle ───────────────────────────────────────────────────
  const toggleGroup = (id: string) => {
    setExpandedGroups(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  // ── Logout ─────────────────────────────────────────────────────────────────
  const handleLogout = () => {
    ["mock_admin_session","mock_user_name","mock_user_email"].forEach(c => {
      document.cookie = `${c}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    });
    addToast("info", "Logged out", "Redirecting to login…");
    setTimeout(() => router.replace("/login"), 800);
  };

  // ── Page title ─────────────────────────────────────────────────────────────
  const pageTitle = (() => {
    if (pathname === "/admin") return "Dashboard";
    const match = ALL_NAV_ITEMS.find(i => i.href !== "/admin" && pathname.startsWith(i.href));
    return match ? match.label : "Admin";
  })();

  // ── Filtered cmd results ──────────────────────────────────────────────────
  const cmdResults = ALL_NAV_ITEMS.filter(item =>
    item.label.toLowerCase().includes(cmdQuery.toLowerCase())
  );

  // ── Loading screen ─────────────────────────────────────────────────────────
  if (!loaded) {
    return (
      <div style={{
        position: "fixed", inset: 0, display: "flex", alignItems: "center",
        justifyContent: "center", background: "#0a0a0a", flexDirection: "column", gap: 16
      }}>
        <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#670000,#8E1B1B)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", fontWeight: 800, color: "#fff" }}>R</div>
        <div style={{ color: "#444", fontSize: "0.72rem", fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>Verifying credentials…</div>
      </div>
    );
  }

  const isLight = theme === "light";

  return (
    <div className={`admin-shell${isLight ? " light" : ""}`}>

      {/* ═══════════════════════ SIDEBAR ═══════════════════════════════════ */}
      <aside className={`adm-sidebar${collapsed ? " collapsed" : ""}`}>

        {/* Logo */}
        <div className="adm-sidebar-header">
          <div className="adm-logo-mark">R</div>
          <div className="adm-brand-text">
            <div className="adm-brand-name">Ruven Studio</div>
            <div className="adm-brand-sub">Admin Portal</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="adm-nav">
          {NAV_GROUPS.map(group => {
            const isExpanded = expandedGroups.includes(group.id);
            return (
              <div key={group.id} className={`adm-nav-group${isExpanded ? " expanded" : ""}`}>
                {/* Group header */}
                <div className="adm-nav-group-header" onClick={() => toggleGroup(group.id)}>
                  <span className="adm-nav-group-icon">{group.icon}</span>
                  <span className="adm-nav-group-label">{group.label}</span>
                  <svg className="adm-nav-group-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </div>

                {/* Group items */}
                <div className="adm-nav-group-items">
                  {group.items.map(item => {
                    const isActive = item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`adm-nav-item${isActive ? " active" : ""}`}
                      >
                        <span style={{ flex: 1 }}>{item.label}</span>
                        {(item as any).badge && (
                          <span className="adm-nav-badge">{(item as any).badge}</span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="adm-sidebar-footer">
          <div className="adm-user-row">
            <div className="adm-user-avatar">
              {adminName.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase()}
            </div>
            <div className="adm-user-info">
              <div className="adm-user-name">{adminName}</div>
              <div className="adm-user-email">{adminEmail}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ═══════════════════════ MAIN ═════════════════════════════════════ */}
      <div className="adm-main">

        {/* ── TOP HEADER ── */}
        <header className="adm-header">

          {/* Hamburger */}
          <div className="adm-header-toggle" onClick={() => setCollapsed(p => !p)} title="Toggle Sidebar (⌘\\)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:18,height:18}}>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6"  x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </div>

          {/* Page title + clock */}
          <div className="adm-breadcrumb">
            <span>{pageTitle}</span>
            <span className="adm-clock">{clock}</span>
          </div>

          {/* Search trigger */}
          <div className="adm-search-trigger" onClick={() => setShowCmd(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:13,height:13,flexShrink:0}}>
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <span style={{flex:1}}>Search everything…</span>
            <div className="adm-search-kbd">
              <kbd>⌘</kbd><kbd>K</kbd>
            </div>
          </div>

          {/* Actions */}
          <div className="adm-header-actions">

            {/* Role */}
            <div style={{display:"flex",alignItems:"center",gap:5}}>
              <span style={{fontSize:"0.68rem",color:"var(--adm-text-muted)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em"}}>Role:</span>
              <select className="adm-role-select" value={role} onChange={e => { setRole(e.target.value); addToast("info","Role switched", `Now viewing as ${e.target.value}`); }}>
                {["Super Admin","Admin","Store Manager","Content Editor","Product Manager","Marketing Manager","Customer Support"].map(r =>
                  <option key={r}>{r}</option>
                )}
              </select>
            </div>

            {/* Theme */}
            <div ref={themeRef} style={{position:"relative"}}>
              <div className="adm-header-btn" onClick={() => { setShowThemeMenu(p => !p); setShowNotifs(false); }} title="Toggle Theme">
                {theme === "dark" ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:17,height:17}}><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:17,height:17}}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>
                )}
              </div>
              {showThemeMenu && (
                <div className="adm-theme-menu">
                  {(["light","dark","system"] as const).map(t => (
                    <div key={t} className="adm-theme-item" onClick={() => { setTheme(t); setShowThemeMenu(false); addToast("success","Theme changed", `Switched to ${t} mode`); }}>
                      {t === "light" ? "☀️" : t === "dark" ? "🌙" : "💻"} {t.charAt(0).toUpperCase()+t.slice(1)}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <div ref={notifRef} style={{position:"relative"}}>
              <div className="adm-header-btn" onClick={() => { setShowNotifs(p => !p); setShowThemeMenu(false); }} title="Notifications">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:17,height:17}}>
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 01-3.46 0"/>
                </svg>
                <div className="adm-notif-dot"/>
              </div>
              {showNotifs && (
                <div className="adm-notif-panel">
                  <div className="adm-notif-header">
                    Notifications
                    <span style={{fontSize:"0.7rem",color:"var(--adm-brand-gold)",fontWeight:700,cursor:"pointer"}} onClick={() => { setShowNotifs(false); addToast("success","All cleared","Marked all as read"); }}>
                      Mark all read
                    </span>
                  </div>
                  {NOTIFICATIONS.map(n => (
                    <div key={n.id} className="adm-notif-item" onClick={() => setShowNotifs(false)}>
                      <div className="adm-notif-dot-indicator" style={{background:n.color}}/>
                      <div>
                        <div className="adm-notif-text">{n.text}</div>
                        <div className="adm-notif-time">{n.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* + New */}
            <button className="adm-btn adm-btn-primary adm-btn-sm" onClick={() => setShowNewModal(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{width:13,height:13}}>
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5"  y1="12" x2="19" y2="12"/>
              </svg>
              New
            </button>

            {/* Logout */}
            <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={handleLogout} style={{color:"var(--adm-text-muted)"}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:14,height:14}}>
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        </header>

        {/* ── PAGE CONTENT ── */}
        <main className="adm-content">
          {children}
        </main>
      </div>

      {/* ═══════════════ COMMAND PALETTE ═══════════════════════════════════ */}
      {showCmd && (
        <div className="adm-cmd-overlay" onClick={() => setShowCmd(false)}>
          <div className="adm-cmd-box" onClick={e => e.stopPropagation()}>
            <div className="adm-cmd-input-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:16,height:16,color:"var(--adm-text-muted)",flexShrink:0}}>
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                ref={cmdInputRef}
                className="adm-cmd-input"
                placeholder="Search pages, actions…"
                value={cmdQuery}
                onChange={e => setCmdQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && cmdResults.length > 0) {
                    setShowCmd(false);
                    router.push(cmdResults[0].href);
                  }
                }}
              />
              <kbd style={{background:"var(--adm-bg-elevated)",border:"1px solid var(--adm-border-normal)",borderRadius:4,padding:"2px 6px",fontSize:"0.65rem",color:"var(--adm-text-muted)",fontFamily:"monospace"}}>ESC</kbd>
            </div>
            <div className="adm-cmd-results">
              {cmdResults.length > 0 ? (
                <>
                  <div className="adm-cmd-section-label">Navigate</div>
                  {cmdResults.map(item => (
                    <div key={item.href} className="adm-cmd-item" onClick={() => { setShowCmd(false); router.push(item.href); }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:13,height:13,color:"var(--adm-text-muted)",flexShrink:0}}>
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                      {item.label}
                    </div>
                  ))}
                </>
              ) : (
                <div style={{padding:"24px",textAlign:"center",color:"var(--adm-text-muted)",fontSize:"0.82rem"}}>
                  No results for &quot;{cmdQuery}&quot;
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ + NEW MODAL ═══════════════════════════════════════ */}
      {showNewModal && (
        <div className="adm-modal-overlay" onClick={() => setShowNewModal(false)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <div className="adm-modal-header">
              <span className="adm-modal-title">Create New</span>
              <div className="adm-modal-close" onClick={() => setShowNewModal(false)}>✕</div>
            </div>
            {[
              { icon:"📦", title:"New Product",     desc:"Add a product to the catalog",      href:"/admin/products",  color:"var(--adm-brand-burgundy-glow)" },
              { icon:"✍️", title:"New Article",     desc:"Write a devotional for the journal", href:"/admin/content",   color:"var(--adm-brand-gold-dim)" },
              { icon:"🏷️", title:"New Discount",    desc:"Create a promo code or sale",       href:"/admin/discounts", color:"var(--adm-success-bg)" },
              { icon:"👤", title:"Invite Member",   desc:"Send a role-based invitation",      href:"/admin/team",      color:"var(--adm-info-bg)" }
            ].map(opt => (
              <div key={opt.href} className="adm-new-option" onClick={() => { setShowNewModal(false); router.push(opt.href); }}>
                <div className="adm-new-option-icon" style={{background:opt.color}}>
                  <span style={{fontSize:"1.2rem"}}>{opt.icon}</span>
                </div>
                <div>
                  <div className="adm-new-option-title">{opt.title}</div>
                  <div className="adm-new-option-desc">{opt.desc}</div>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:14,height:14,color:"var(--adm-text-muted)",marginLeft:"auto"}}>
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════ TOAST CONTAINER ═══════════════════════════════════ */}
      <div className="adm-toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`adm-toast adm-toast-${toast.type}`}>
            <span className="adm-toast-icon">{TOAST_ICONS[toast.type]}</span>
            <div style={{flex:1,minWidth:0}}>
              <div className="adm-toast-title">{toast.title}</div>
              {toast.message && <div className="adm-toast-message">{toast.message}</div>}
            </div>
            <span className="adm-toast-close" onClick={() => removeToast(toast.id)}>✕</span>
          </div>
        ))}
      </div>

    </div>
  );
}
