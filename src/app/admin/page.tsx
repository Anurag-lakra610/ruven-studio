"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProducts, getDevotionals } from "@/lib/db";

// ─── Chart data ─────────────────────────────────────────────────────────────
const CHART_DATASETS = {
  "7D": {
    total: "₹1,24,890",
    change: "+23.1%",
    bars: [
      { day: "Mon", pct: 40 }, { day: "Tue", pct: 60 }, { day: "Wed", pct: 45 },
      { day: "Thu", pct: 80 }, { day: "Fri", pct: 55 }, { day: "Sat", pct: 100 }, { day: "Sun", pct: 70 }
    ]
  },
  "30D": {
    total: "₹5,84,200",
    change: "+18.3%",
    bars: [
      { day: "W1", pct: 50 }, { day: "W2", pct: 65 }, { day: "W3", pct: 80 }, { day: "W4", pct: 100 }
    ]
  },
  "90D": {
    total: "₹18,36,700",
    change: "+34.7%",
    bars: [
      { day: "Jan", pct: 55 }, { day: "Feb", pct: 70 }, { day: "Mar", pct: 100 }
    ]
  }
};

const PENDING_ORDERS = [
  { id: "#RS-1042", customer: "Priya S.", amount: "₹2,890", status: "Pending", badge: "warning" },
  { id: "#RS-1041", customer: "Rahul M.", amount: "₹1,450", status: "Processing", badge: "info" },
  { id: "#RS-1040", customer: "Anjali K.", amount: "₹3,200", status: "Pending", badge: "warning" },
  { id: "#RS-1039", customer: "Vikram D.", amount: "₹980", status: "Shipped", badge: "success" }
];

const RECENT_ACTIVITY = [
  { icon: "🛍️", title: "New order #RS-1042", desc: "₹2,890 from Priya S.", time: "2 minutes ago" },
  { icon: "📦", title: "Product published", desc: "Child of God Tee (Black)", time: "14 minutes ago" },
  { icon: "👤", title: "New customer", desc: "Rahul Mehta signed up", time: "1 hour ago" },
  { icon: "✍️", title: "Article drafted", desc: "\"Romans 13: Put on the Armor\"", time: "3 hours ago" }
];

const LOW_STOCK = [
  { name: "Armor of Light Tee — White / M", pct: 15, count: "3 left", level: "low" },
  { name: "Child of God Tee — Black / L", pct: 35, count: "7 left", level: "mid" }
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [chartTab, setChartTab] = useState<"7D" | "30D" | "90D">("7D");
  const [productsCount, setProductsCount] = useState(0);
  const [devotionalsCount, setDevotionalsCount] = useState(0);
  const [greeting, setGreeting] = useState("Good morning");

  useEffect(() => {
    getProducts().then(r => setProductsCount(r.length));
    getDevotionals().then(r => setDevotionalsCount(r.length));
    const h = new Date().getHours();
    if (h < 12) setGreeting("Good morning");
    else if (h < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const chartData = CHART_DATASETS[chartTab];

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>

      {/* ─── PAGE HEADER ─────────────────────────────────────────────────── */}
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">{greeting}, Admin 👋</h1>
          <p className="adm-page-subtitle">Here&apos;s what&apos;s happening with Ruven Studio today.</p>
        </div>
        <div className="adm-page-actions">
          <button className="adm-btn adm-btn-secondary adm-btn-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Last 30 days
          </button>
          <button
            className="adm-btn adm-btn-primary adm-btn-sm"
            onClick={() => alert("Analytics report downloading…")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export
          </button>
        </div>
      </div>

      {/* ─── KPI STAT CARDS ──────────────────────────────────────────────── */}
      <div className="adm-stats-grid">
        {/* Revenue */}
        <div className="adm-stat-card">
          <div className="adm-stat-accent adm-accent-burgundy" />
          <div className="adm-stat-header">
            <span className="adm-stat-label">Revenue Today</span>
            <div className="adm-stat-icon" style={{ background: "var(--adm-brand-burgundy-glow)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--adm-brand-burgundy-light)" strokeWidth="2" style={{ width: 16, height: 16 }}>
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
          </div>
          <div className="adm-stat-value">₹24,890</div>
          <div className="adm-stat-change up">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 12, height: 12 }}>
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
              <polyline points="17 6 23 6 23 12"/>
            </svg>
            +18.4% vs yesterday
          </div>
        </div>

        {/* Orders */}
        <div className="adm-stat-card">
          <div className="adm-stat-accent adm-accent-gold" />
          <div className="adm-stat-header">
            <span className="adm-stat-label">Orders Today</span>
            <div className="adm-stat-icon" style={{ background: "var(--adm-brand-gold-dim)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--adm-brand-gold)" strokeWidth="2" style={{ width: 16, height: 16 }}>
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
            </div>
          </div>
          <div className="adm-stat-value">47</div>
          <div className="adm-stat-change up">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 12, height: 12 }}>
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
              <polyline points="17 6 23 6 23 12"/>
            </svg>
            +7 from yesterday
          </div>
        </div>

        {/* Visitors */}
        <div className="adm-stat-card">
          <div className="adm-stat-accent adm-accent-success" />
          <div className="adm-stat-header">
            <span className="adm-stat-label">Visitors Today</span>
            <div className="adm-stat-icon" style={{ background: "var(--adm-success-bg)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--adm-success)" strokeWidth="2" style={{ width: 16, height: 16 }}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
          </div>
          <div className="adm-stat-value">1,842</div>
          <div className="adm-stat-change up">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 12, height: 12 }}>
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
              <polyline points="17 6 23 6 23 12"/>
            </svg>
            +12.2% this week
          </div>
        </div>

        {/* Conversion */}
        <div className="adm-stat-card">
          <div className="adm-stat-accent adm-accent-info" />
          <div className="adm-stat-header">
            <span className="adm-stat-label">Conversion Rate</span>
            <div className="adm-stat-icon" style={{ background: "var(--adm-info-bg)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--adm-info)" strokeWidth="2" style={{ width: 16, height: 16 }}>
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
          </div>
          <div className="adm-stat-value">2.55%</div>
          <div className="adm-stat-change down">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 12, height: 12 }}>
              <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
              <polyline points="17 18 23 18 23 12"/>
            </svg>
            −0.3% vs last week
          </div>
        </div>
      </div>

      {/* ─── QUICK ACTIONS ───────────────────────────────────────────────── */}
      <div className="adm-quick-actions">
        {[
          { icon: "➕", label: "New Product", color: "var(--adm-brand-burgundy-glow)", href: "/admin/products" },
          { icon: "✍️", label: "Write Article", color: "var(--adm-brand-gold-dim)", href: "/admin/content" },
          { icon: "📋", label: "View Orders", color: "var(--adm-info-bg)", href: "/admin/orders" },
          { icon: "🏷️", label: "Add Discount", color: "var(--adm-success-bg)", href: "/admin/discounts" },
          { icon: "🖼️", label: "Upload Media", color: "var(--adm-warning-bg)", href: "/admin/media" },
          { icon: "📊", label: "Analytics", color: "rgba(139,92,246,0.1)", href: "/admin/analytics" }
        ].map(qa => (
          <div key={qa.label} className="adm-qa" onClick={() => router.push(qa.href)}>
            <div className="adm-qa-icon" style={{ background: qa.color }}>
              <span style={{ fontSize: "1.2rem" }}>{qa.icon}</span>
            </div>
            <span className="adm-qa-label">{qa.label}</span>
          </div>
        ))}
      </div>

      {/* ─── CHARTS ROW ──────────────────────────────────────────────────── */}
      <div className="adm-chart-grid">

        {/* Revenue Overview */}
        <div className="adm-card">
          <div className="adm-card-header">
            <div>
              <div className="adm-card-title">Revenue Overview</div>
              <div className="adm-card-subtitle">Period performance</div>
            </div>
            <div className="adm-tabs">
              {(["7D", "30D", "90D"] as const).map(tab => (
                <div
                  key={tab}
                  className={`adm-tab${chartTab === tab ? " active" : ""}`}
                  onClick={() => setChartTab(tab)}
                >
                  {tab}
                </div>
              ))}
            </div>
          </div>
          <div className="adm-card-body">
            {/* Summary numbers */}
            <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--adm-text-primary)" }}>
                  {chartData.total}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--adm-text-muted)" }}>Total Revenue</div>
              </div>
              <div>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--adm-success)" }}>
                  {chartData.change}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--adm-text-muted)" }}>vs last period</div>
              </div>
            </div>

            {/* SVG Sparkline */}
            <div className="adm-chart-area">
              <svg viewBox="0 0 400 140" preserveAspectRatio="none" style={{ width: "100%", height: 140 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#670000" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#670000" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path
                  d="M0,110 C50,100 80,60 120,50 S180,30 220,40 S300,20 340,15 S380,20 400,18"
                  fill="url(#revGrad)"
                />
                <path
                  d="M0,110 C50,100 80,60 120,50 S180,30 220,40 S300,20 340,15 S380,20 400,18"
                  fill="none" stroke="#670000" strokeWidth="2.5"
                />
                <circle cx="400" cy="18" r="4" fill="#670000"/>
              </svg>
            </div>

            {/* Bar Chart */}
            <div className="adm-bar-chart" style={{ height: 80, marginTop: 8 }}>
              {chartData.bars.map((b, i) => (
                <div key={b.day} className="adm-bar-group">
                  <div
                    className="adm-bar adm-bar-primary"
                    style={{
                      height: `${b.pct}%`,
                      opacity: i === chartData.bars.length - 1 ? 0.4 : 1
                    }}
                  />
                  <div className="adm-bar-label">{b.day}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traffic Sources Donut */}
        <div className="adm-card">
          <div className="adm-card-header">
            <div>
              <div className="adm-card-title">Traffic Sources</div>
              <div className="adm-card-subtitle">Today&apos;s visitors</div>
            </div>
          </div>
          <div className="adm-card-body">
            <div className="adm-donut-wrapper">
              {/* Donut SVG — CSS strokes with dasharray */}
              <svg className="adm-donut-svg" viewBox="0 0 42 42" style={{ width: 140, height: 140, transform: "rotate(-90deg)", flexShrink: 0 }}>
                <circle cx="21" cy="21" r="15.91549431" fill="none" stroke="var(--adm-bg-elevated)" strokeWidth="5"/>
                {/* Organic 42% */}
                <circle cx="21" cy="21" r="15.91549431" fill="none" stroke="#670000" strokeWidth="5"
                  strokeDasharray="42 58" strokeDashoffset="25"/>
                {/* Instagram 28% */}
                <circle cx="21" cy="21" r="15.91549431" fill="none" stroke="#C09A6B" strokeWidth="5"
                  strokeDasharray="28 72" strokeDashoffset="-17"/>
                {/* Direct 18% */}
                <circle cx="21" cy="21" r="15.91549431" fill="none" stroke="#22c55e" strokeWidth="5"
                  strokeDasharray="18 82" strokeDashoffset="-45"/>
                {/* WhatsApp 12% */}
                <circle cx="21" cy="21" r="15.91549431" fill="none" stroke="#3b82f6" strokeWidth="5"
                  strokeDasharray="12 88" strokeDashoffset="-63"/>
                {/* Center text */}
                <text x="21" y="21" textAnchor="middle"
                  fill="var(--adm-text-primary)" fontSize="4.5" dy="2"
                  fontWeight="700" style={{ transform: "rotate(90deg) translateX(-42px)", transformOrigin: "center" }}>
                </text>
              </svg>

              <div style={{ position: "relative" }}>
                {/* Center label overlay */}
                <div style={{ position: "absolute", left: -160, top: "50%", transform: "translateY(-50%)", width: 140, textAlign: "center", pointerEvents: "none" }}>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--adm-text-primary)" }}>1,842</div>
                  <div style={{ fontSize: "0.6rem", color: "var(--adm-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Visitors</div>
                </div>

                {/* Legend */}
                <div className="adm-donut-legend">
                  {[
                    { color: "#670000", label: "Organic", value: "42%" },
                    { color: "#C09A6B", label: "Instagram", value: "28%" },
                    { color: "#22c55e", label: "Direct", value: "18%" },
                    { color: "#3b82f6", label: "WhatsApp", value: "12%" }
                  ].map(item => (
                    <div key={item.label} className="adm-legend-item">
                      <div className="adm-legend-dot" style={{ background: item.color }} />
                      <span className="adm-legend-label">{item.label}</span>
                      <span className="adm-legend-value">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM ROW: ORDERS + ACTIVITY ───────────────────────────────── */}
      <div className="adm-grid-2">

        {/* Pending Orders */}
        <div className="adm-card">
          <div className="adm-card-header">
            <div>
              <div className="adm-card-title">Pending Orders</div>
              <div className="adm-card-subtitle">Require attention</div>
            </div>
            <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => router.push("/admin/orders")}>
              View all →
            </button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {PENDING_ORDERS.map(order => (
                  <tr key={order.id}>
                    <td className="adm-td-primary">{order.id}</td>
                    <td>{order.customer}</td>
                    <td style={{ fontFamily: "var(--adm-font-mono)", fontWeight: 600, color: "var(--adm-text-primary)" }}>{order.amount}</td>
                    <td>
                      <span className={`adm-badge adm-badge-${order.badge}`}>
                        <span className="adm-badge-dot" />
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="adm-card">
          <div className="adm-card-header">
            <div className="adm-card-title">Recent Activity</div>
          </div>
          <div className="adm-card-body">
            <div className="adm-activity-feed">
              {RECENT_ACTIVITY.map((act, i) => (
                <div key={i} className="adm-activity-item">
                  <div className="adm-activity-icon">
                    <span>{act.icon}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="adm-activity-title">
                      <strong style={{ color: "var(--adm-text-primary)" }}>{act.title}</strong> — {act.desc}
                    </div>
                    <div className="adm-activity-time">{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── LOW STOCK ALERT ─────────────────────────────────────────────── */}
      <div className="adm-card" style={{ marginBottom: 24, borderColor: "rgba(245,158,11,0.2)" }}>
        <div className="adm-card-header">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1rem" }}>⚠️</span>
            <div>
              <div className="adm-card-title">Low Stock Alert</div>
              <div className="adm-card-subtitle">These products need restocking</div>
            </div>
          </div>
          <button
            className="adm-btn adm-btn-secondary adm-btn-sm"
            onClick={() => alert("Bulk restock request sent to warehouse!")}
          >
            Bulk Restock
          </button>
        </div>
        <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
          {LOW_STOCK.map(item => (
            <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 36, height: 36, background: "var(--adm-bg-elevated)",
                borderRadius: "var(--adm-radius-sm)", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "1.2rem", flexShrink: 0
              }}>👕</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--adm-text-primary)" }}>
                  {item.name}
                </div>
              </div>
              <div className={`adm-stock-bar-wrapper adm-stock-${item.level}`} style={{ width: 120 }}>
                <div className="adm-stock-bar">
                  <div className="adm-stock-fill" style={{ width: `${item.pct}%` }} />
                </div>
                <span style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: item.level === "low" ? "var(--adm-error)" : "var(--adm-warning)"
                }}>
                  {item.count}
                </span>
              </div>
              <button
                className="adm-btn adm-btn-secondary adm-btn-sm"
                onClick={() => alert(`Restock request sent for ${item.name}`)}
              >
                Restock
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
