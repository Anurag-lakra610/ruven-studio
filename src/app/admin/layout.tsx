"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import "./admin.css";

// ─── Nav Config ────────────────────────────────────────────────────────────
const NAV_GROUPS = [
  {
    id: "overview",
    label: "Overview",
    icon: (
      <svg className="adm-nav-group-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    items: [
      { label: "Dashboard", href: "/admin" }
    ]
  },
  {
    id: "commerce",
    label: "Commerce",
    icon: (
      <svg className="adm-nav-group-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
    items: [
      { label: "Products", href: "/admin/products" },
      { label: "Collections", href: "/admin/collections" },
      { label: "Orders", href: "/admin/orders", badge: 12 },
      { label: "Customers", href: "/admin/customers" }
    ]
  },
  {
    id: "content",
    label: "Content",
    icon: (
      <svg className="adm-nav-group-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    items: [
      { label: "Faith Journal", href: "/admin/content", badge: 3 },
      { label: "Media Library", href: "/admin/media" },
    ]
  },
  {
    id: "community",
    label: "Community",
    icon: (
      <svg className="adm-nav-group-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    items: [
      { label: "Prayer Requests", href: "/admin/community", badge: 5 }
    ]
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: (
      <svg className="adm-nav-group-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    items: [
      { label: "Campaigns", href: "/admin/marketing" },
      { label: "Discounts", href: "/admin/discounts" }
    ]
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: (
      <svg className="adm-nav-group-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    items: [
      { label: "Reports", href: "/admin/analytics" }
    ]
  },
  {
    id: "team",
    label: "Team",
    icon: (
      <svg className="adm-nav-group-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    items: [
      { label: "Users & Roles", href: "/admin/team" }
    ]
  },
  {
    id: "settings",
    label: "Settings",
    icon: (
      <svg className="adm-nav-group-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
    items: [
      { label: "System Settings", href: "/admin/settings" }
    ]
  }
];

const CMD_ITEMS = [
  { label: "Dashboard", href: "/admin", section: "Navigate" },
  { label: "Products", href: "/admin/products", section: "Navigate" },
  { label: "Orders", href: "/admin/orders", section: "Navigate" },
  { label: "Customers", href: "/admin/customers", section: "Navigate" },
  { label: "Faith Journal", href: "/admin/content", section: "Navigate" },
  { label: "Analytics Reports", href: "/admin/analytics", section: "Navigate" },
  { label: "Team & Roles", href: "/admin/team", section: "Navigate" },
  { label: "Settings & RBAC", href: "/admin/settings", section: "Navigate" },
];

const NOTIFICATIONS = [
  { id: "1", text: "New order #RS-1042 received — ₹2,890", time: "2 min ago", color: "#22c55e" },
  { id: "2", text: "Low stock alert: Armor Tee White/M — 3 left", time: "18 min ago", color: "#f59e0b" },
  { id: "3", text: "Prayer request pending review from Anjali", time: "1 hour ago", color: "#3b82f6" },
  { id: "4", text: "Monthly revenue report is ready", time: "3 hours ago", color: "#670000" }
];

// ─── Component ─────────────────────────────────────────────────────────────
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // Auth
  const [adminName, setAdminName] = useState("Samuel Ruven");
  const [adminEmail, setAdminEmail] = useState("samuel@ruvenstudio.in");
  const [loaded, setLoaded] = useState(false);

  // Sidebar
  const [collapsed, setCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["overview", "commerce"]);

  // Header
  const [clock, setClock] = useState("");
  const [role, setRole] = useState("super-admin");
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showCmdPalette, setShowCmdPalette] = useState(false);
  const [cmdQuery, setCmdQuery] = useState("");

  // Refs
  const themeRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const cmdInputRef = useRef<HTMLInputElement>(null);

  // ── Auth check ──────────────────────────────────────────────────────────
  useEffect(() => {
    const getCookie = (name: string) => {
      const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)"));
      return match ? decodeURIComponent(match[2]) : "";
    };
    const isAdmin = getCookie("mock_admin_session") === "true";
    if (!isAdmin) { router.push("/login"); return; }
    const name = getCookie("mock_user_name");
    const email = getCookie("mock_user_email");
    if (name) setAdminName(name);
    if (email) setAdminEmail(email);
    setLoaded(true);
  }, [router]);

  // ── Clock ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = now.getHours();
      const m = String(now.getMinutes()).padStart(2, "0");
      const ampm = h >= 12 ? "PM" : "AM";
      const h12 = h % 12 || 12;
      setClock(`${String(h12).padStart(2, "0")}:${m} ${ampm}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // ── Keyboard shortcut ⌘K ────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowCmdPalette(p => !p);
      }
      if (e.key === "Escape") {
        setShowCmdPalette(false);
        setShowThemeMenu(false);
        setShowNotifs(false);
        setShowNewModal(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Focus cmd input when palette opens
  useEffect(() => {
    if (showCmdPalette) {
      setCmdQuery("");
      setTimeout(() => cmdInputRef.current?.focus(), 50);
    }
  }, [showCmdPalette]);

  // ── Close dropdowns on outside click ────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) setShowThemeMenu(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifs(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Sidebar group toggle ─────────────────────────────────────────────────
  const toggleGroup = (id: string) => {
    setExpandedGroups(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  // ── Logout ───────────────────────────────────────────────────────────────
  const handleLogout = () => {
    document.cookie = "mock_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "mock_user_email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "mock_user_name=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/login");
  };

  // ── CMD navigate ─────────────────────────────────────────────────────────
  const cmdNavigate = (href: string) => {
    setShowCmdPalette(false);
    router.push(href);
  };

  // ── Filtered cmd items ───────────────────────────────────────────────────
  const filteredCmd = CMD_ITEMS.filter(item =>
    item.label.toLowerCase().includes(cmdQuery.toLowerCase())
  );

  // ── Active group auto-expand ──────────────────────────────────────────────
  useEffect(() => {
    for (const group of NAV_GROUPS) {
      const isActive = group.items.some(item => {
        if (item.href === "/admin") return pathname === "/admin";
        return pathname.startsWith(item.href);
      });
      if (isActive && !expandedGroups.includes(group.id)) {
        setExpandedGroups(prev => [...prev, group.id]);
      }
    }
  }, [pathname]);

  // ── Page title ──────────────────────────────────────────────────────────
  const pageTitle = (() => {
    if (pathname === "/admin") return "Dashboard";
    const allItems = NAV_GROUPS.flatMap(g => g.items);
    const match = allItems.find(item => item.href !== "/admin" && pathname.startsWith(item.href));
    return match ? match.label : "Admin";
  })();

  if (!loaded) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "#0a0a0a", color: "#666", fontSize: "0.75rem",
        fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase"
      }}>
        Verifying Security Credentials…
      </div>
    );
  }

  const isLight = theme === "light";

  return (
    <div className={`admin-shell${isLight ? " light" : ""}`}>

      {/* ─── SIDEBAR ─────────────────────────────────────────────────────── */}
      <aside className={`adm-sidebar${collapsed ? " collapsed" : ""}`}>

        {/* Logo Header */}
        <div className="adm-sidebar-header">
          <div className="adm-logo-mark">R</div>
          <div className="adm-brand-text">
            <div className="adm-brand-name">Ruven Studio</div>
            <div className="adm-brand-sub">Admin Portal</div>
          </div>
        </div>

        {/* Nav Groups */}
        <nav className="adm-nav">
          {NAV_GROUPS.map(group => {
            const isExpanded = expandedGroups.includes(group.id);
            return (
              <div key={group.id} className={`adm-nav-group${isExpanded ? " expanded" : ""}`}>
                <div className="adm-nav-group-header" onClick={() => toggleGroup(group.id)}>
                  {group.icon}
                  <span className="adm-nav-group-label" style={{ flex: 1, fontSize: "0.85rem", fontWeight: 600 }}>
                    {group.label}
                  </span>
                  <svg className="adm-nav-group-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </div>

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

        {/* User Footer */}
        <div className="adm-sidebar-footer">
          <div className="adm-user-row">
            <div className="adm-user-avatar">
              {adminName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
            </div>
            <div className="adm-user-info">
              <div className="adm-user-name">{adminName}</div>
              <div className="adm-user-email">{adminEmail}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── MAIN ────────────────────────────────────────────────────────── */}
      <div className="adm-main">

        {/* Top Header */}
        <header className="adm-header">

          {/* Hamburger */}
          <div className="adm-header-toggle" onClick={() => setCollapsed(p => !p)} title="Toggle Sidebar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </div>

          {/* Breadcrumb + Clock */}
          <div className="adm-breadcrumb">
            <span style={{ color: "var(--adm-text-primary)", fontWeight: 700 }}>{pageTitle}</span>
            <span className="adm-clock">{clock}</span>
          </div>

          {/* Search */}
          <div className="adm-search-trigger" onClick={() => setShowCmdPalette(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14, flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <span style={{ flex: 1 }}>Search everything…</span>
            <div className="adm-search-kbd">
              <kbd>⌘</kbd><kbd>K</kbd>
            </div>
          </div>

          {/* Actions */}
          <div className="adm-header-actions">

            {/* Role Simulator */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: "0.72rem", color: "var(--adm-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Role:</span>
              <select
                className="adm-role-select"
                value={role}
                onChange={e => setRole(e.target.value)}
              >
                <option value="super-admin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="store-manager">Store Manager</option>
                <option value="content-manager">Content Manager</option>
                <option value="product-manager">Product Manager</option>
                <option value="marketing-manager">Marketing Manager</option>
                <option value="support">Customer Support</option>
              </select>
            </div>

            {/* Theme Toggle */}
            <div ref={themeRef} style={{ position: "relative" }}>
              <div
                className="adm-header-btn"
                onClick={() => { setShowThemeMenu(p => !p); setShowNotifs(false); }}
                title="Toggle Theme"
              >
                {theme === "dark" ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </svg>
                )}
              </div>
              {showThemeMenu && (
                <div className="adm-theme-menu">
                  {(["light", "dark", "system"] as const).map(t => (
                    <div key={t} className="adm-theme-item" onClick={() => { setTheme(t); setShowThemeMenu(false); }}>
                      {t === "light" ? "☀️" : t === "dark" ? "🌙" : "💻"} {t.charAt(0).toUpperCase() + t.slice(1)}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <div ref={notifRef} style={{ position: "relative" }}>
              <div
                className="adm-header-btn"
                onClick={() => { setShowNotifs(p => !p); setShowThemeMenu(false); }}
                title="Notifications"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                <div className="adm-notif-dot" />
              </div>
              {showNotifs && (
                <div className="adm-notif-panel" style={{ position: "absolute" }}>
                  <div className="adm-notif-header">
                    Notifications
                    <span style={{ fontSize: "0.72rem", color: "var(--adm-brand-gold)", fontWeight: 600 }}>
                      {NOTIFICATIONS.length} new
                    </span>
                  </div>
                  {NOTIFICATIONS.map(n => (
                    <div key={n.id} className="adm-notif-item">
                      <div className="adm-notif-dot-indicator" style={{ background: n.color }} />
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
            <button
              className="adm-btn adm-btn-primary adm-btn-sm"
              onClick={() => setShowNewModal(true)}
              style={{ gap: 6 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              New
            </button>

            {/* Logout */}
            <button
              className="adm-btn adm-btn-ghost adm-btn-sm"
              onClick={handleLogout}
              style={{ color: "var(--adm-text-muted)" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="adm-content">
          {children}
        </main>
      </div>

      {/* ─── COMMAND PALETTE ─────────────────────────────────────────────── */}
      {showCmdPalette && (
        <div className="adm-cmd-overlay" onClick={() => setShowCmdPalette(false)}>
          <div className="adm-cmd-box" onClick={e => e.stopPropagation()}>
            <div className="adm-cmd-input-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16, color: "var(--adm-text-muted)", flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                ref={cmdInputRef}
                className="adm-cmd-input"
                placeholder="Search pages, actions…"
                value={cmdQuery}
                onChange={e => setCmdQuery(e.target.value)}
              />
              <kbd style={{ background: "var(--adm-bg-elevated)", border: "1px solid var(--adm-border-normal)", borderRadius: 4, padding: "2px 6px", fontSize: "0.7rem", color: "var(--adm-text-muted)", fontFamily: "var(--adm-font-mono)" }}>ESC</kbd>
            </div>
            <div className="adm-cmd-results">
              {filteredCmd.length > 0 ? (
                <>
                  <div className="adm-cmd-section-label">Navigate</div>
                  {filteredCmd.map(item => (
                    <div key={item.href} className="adm-cmd-item" onClick={() => cmdNavigate(item.href)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14, color: "var(--adm-text-muted)", flexShrink: 0 }}>
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                      {item.label}
                    </div>
                  ))}
                </>
              ) : (
                <div style={{ padding: "20px", textAlign: "center", color: "var(--adm-text-muted)", fontSize: "0.82rem" }}>
                  No results for "{cmdQuery}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── + NEW MODAL ─────────────────────────────────────────────────── */}
      {showNewModal && (
        <div className="adm-modal-overlay" onClick={() => setShowNewModal(false)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid var(--adm-border-subtle)" }}>
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--adm-text-primary)" }}>Create New</span>
              <div style={{ cursor: "pointer", color: "var(--adm-text-muted)" }} onClick={() => setShowNewModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </div>
            </div>
            {[
              { icon: "📦", title: "New Product", desc: "Add a product to your catalog", href: "/admin/products", color: "var(--adm-brand-burgundy-glow)" },
              { icon: "✍️", title: "New Article", desc: "Write a devotional for the journal", href: "/admin/content", color: "var(--adm-brand-gold-dim)" },
              { icon: "🎁", title: "New Discount", desc: "Create a promo code or sale", href: "/admin/discounts", color: "rgba(34,197,94,0.1)" },
              { icon: "👤", title: "Invite Team Member", desc: "Send a role-based invite", href: "/admin/team", color: "var(--adm-info-bg)" }
            ].map(opt => (
              <div key={opt.href} className="adm-new-option" onClick={() => { setShowNewModal(false); router.push(opt.href); }}>
                <div className="adm-new-option-icon" style={{ background: opt.color }}>
                  <span style={{ fontSize: "1.2rem" }}>{opt.icon}</span>
                </div>
                <div>
                  <div className="adm-new-option-title">{opt.title}</div>
                  <div className="adm-new-option-desc">{opt.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
