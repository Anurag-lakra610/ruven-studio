"use client";
import React, { useState } from "react";

const MONTHLY_DATA = [
  { month: "Jan", revenue: 82000, orders: 34, visitors: 1240 },
  { month: "Feb", revenue: 96000, orders: 41, visitors: 1580 },
  { month: "Mar", revenue: 115000, orders: 52, visitors: 1820 },
  { month: "Apr", revenue: 108000, orders: 47, visitors: 1690 },
  { month: "May", revenue: 134000, orders: 61, visitors: 2100 },
  { month: "Jun", revenue: 156000, orders: 72, visitors: 2480 }
];

const TOP_PRODUCTS = [
  { name: "Armor of Light Heavyweight Tee", revenue: "₹42,890", units: 18, growth: "+34%" },
  { name: "Child of God Tee — Black", revenue: "₹28,400", units: 12, growth: "+22%" },
  { name: "Renewal Hoodie — Burgundy", revenue: "₹19,800", units: 7, growth: "+15%" },
  { name: "Faith Essentials Bundle", revenue: "₹14,200", units: 5, growth: "+8%" }
];

export default function AdminAnalyticsPage() {
  const maxRevenue = Math.max(...MONTHLY_DATA.map(d => d.revenue));

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Analytics Reports</h1>
          <p className="adm-page-subtitle">Revenue, traffic, and product performance insights</p>
        </div>
        <button className="adm-btn adm-btn-primary adm-btn-sm" onClick={() => alert("Downloading full report…")}>
          Export Report
        </button>
      </div>

      {/* KPI Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Monthly Revenue", value: "₹1,56,000", delta: "+16.4%", color: "var(--adm-brand-burgundy)" },
          { label: "Monthly Orders", value: "307", delta: "+12.8%", color: "var(--adm-brand-gold)" },
          { label: "Avg Order Value", value: "₹4,700", delta: "+3.1%", color: "var(--adm-success)" },
          { label: "Store Visitors", value: "9,910", delta: "+21.5%", color: "var(--adm-info)" }
        ].map(s => (
          <div key={s.label} className="adm-card" style={{ padding: "18px 20px" }}>
            <div style={{ fontSize: "0.7rem", color: "var(--adm-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: s.color, letterSpacing: "-0.04em" }}>{s.value}</div>
            <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--adm-success)", marginTop: 4 }}>↑ {s.delta} vs last period</div>
          </div>
        ))}
      </div>

      {/* Revenue Bar Chart */}
      <div className="adm-card" style={{ marginBottom: 24 }}>
        <div className="adm-card-header">
          <div>
            <div className="adm-card-title">Monthly Revenue Trend</div>
            <div className="adm-card-subtitle">Last 6 months</div>
          </div>
        </div>
        <div className="adm-card-body">
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 180, paddingTop: 20 }}>
            {MONTHLY_DATA.map(d => {
              const pct = (d.revenue / maxRevenue) * 100;
              return (
                <div key={d.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%" }}>
                  <div style={{ fontSize: "0.72rem", color: "var(--adm-text-muted)", fontFamily: "var(--adm-font-mono)" }}>
                    ₹{Math.round(d.revenue / 1000)}k
                  </div>
                  <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                    <div style={{ width: "100%", height: `${pct}%`, background: "linear-gradient(to top, var(--adm-brand-burgundy), var(--adm-brand-burgundy-mid))", borderRadius: "4px 4px 0 0", transition: "height 0.4s ease", minHeight: 4 }} />
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--adm-text-muted)", fontWeight: 600 }}>{d.month}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="adm-grid-2">
        {/* Top Products */}
        <div className="adm-card">
          <div className="adm-card-header">
            <div className="adm-card-title">Top Products</div>
          </div>
          <div style={{ overflow: "hidden" }}>
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Revenue</th>
                  <th>Units</th>
                  <th>Growth</th>
                </tr>
              </thead>
              <tbody>
                {TOP_PRODUCTS.map(p => (
                  <tr key={p.name}>
                    <td style={{ fontWeight: 600, color: "var(--adm-text-primary)", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</td>
                    <td style={{ fontFamily: "var(--adm-font-mono)", fontWeight: 700, color: "var(--adm-text-primary)" }}>{p.revenue}</td>
                    <td>{p.units}</td>
                    <td style={{ color: "var(--adm-success)", fontWeight: 700 }}>{p.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Traffic Channels */}
        <div className="adm-card">
          <div className="adm-card-header">
            <div className="adm-card-title">Traffic Channels</div>
          </div>
          <div className="adm-card-body">
            {[
              { label: "Organic Search", pct: 42, color: "#670000" },
              { label: "Instagram", pct: 28, color: "#C09A6B" },
              { label: "Direct", pct: 18, color: "#22c55e" },
              { label: "WhatsApp", pct: 12, color: "#3b82f6" }
            ].map(ch => (
              <div key={ch.label} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: 5 }}>
                  <span style={{ color: "var(--adm-text-secondary)", fontWeight: 600 }}>{ch.label}</span>
                  <span style={{ color: "var(--adm-text-primary)", fontWeight: 700 }}>{ch.pct}%</span>
                </div>
                <div style={{ height: 6, background: "var(--adm-bg-elevated)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${ch.pct}%`, background: ch.color, borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
