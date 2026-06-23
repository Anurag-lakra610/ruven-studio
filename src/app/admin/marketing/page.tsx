"use client";
import React, { useState } from "react";

const CAMPAIGNS = [
  { id: "CMP-001", name: "Armor of Light Launch", type: "Email", status: "Active", sent: 1240, opens: "38.2%", clicks: "12.4%", date: "Jun 15, 2026" },
  { id: "CMP-002", name: "Father's Day Special", type: "Instagram", status: "Completed", sent: 3500, opens: "44.1%", clicks: "18.6%", date: "Jun 12, 2026" },
  { id: "CMP-003", name: "Scripture Drops Newsletter", type: "Email", status: "Draft", sent: 0, opens: "—", clicks: "—", date: "Jun 25, 2026" },
];

const REVIEWS = [
  { id: "R001", customer: "Priya S.", product: "Armor of Light Tee", rating: 5, review: "Amazing quality and the verse print is stunning!", date: "Jun 20, 2026", approved: true },
  { id: "R002", customer: "Rahul M.", product: "Renewal Hoodie", rating: 4, review: "Great hoodie, love the minimal design.", date: "Jun 19, 2026", approved: false },
  { id: "R003", customer: "Anjali K.", product: "Child of God Tee", rating: 5, review: "My favorite purchase this year!", date: "Jun 18, 2026", approved: true },
];

export default function AdminMarketingPage() {
  const [activeTab, setActiveTab] = useState<"campaigns" | "reviews">("campaigns");
  const [reviews, setReviews] = useState(REVIEWS);

  const toggleApprove = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, approved: !r.approved } : r));
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Marketing</h1>
          <p className="adm-page-subtitle">Campaigns, reviews, and audience engagement</p>
        </div>
        <button className="adm-btn adm-btn-primary adm-btn-sm" onClick={() => alert("Opening campaign creator…")}>
          + New Campaign
        </button>
      </div>

      {/* Tabs */}
      <div className="adm-tabs" style={{ marginBottom: 20, width: "fit-content", background: "var(--adm-bg-surface)", border: "1px solid var(--adm-border-subtle)" }}>
        {(["campaigns", "reviews"] as const).map(tab => (
          <div
            key={tab}
            className={`adm-tab${activeTab === tab ? " active" : ""}`}
            onClick={() => setActiveTab(tab)}
            style={{ padding: "8px 18px", textTransform: "capitalize" }}
          >
            {tab === "campaigns" ? "📣 Campaigns" : "⭐ Reviews"}
          </div>
        ))}
      </div>

      {activeTab === "campaigns" && (
        <div className="adm-card" style={{ overflow: "hidden" }}>
          <table className="adm-table">
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Type</th>
                <th>Sent</th>
                <th>Open Rate</th>
                <th>Click Rate</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {CAMPAIGNS.map(c => {
                const sc = c.status === "Active" ? { bg: "var(--adm-success-bg)", color: "var(--adm-success)" }
                  : c.status === "Completed" ? { bg: "var(--adm-info-bg)", color: "var(--adm-info)" }
                  : { bg: "var(--adm-bg-elevated)", color: "var(--adm-text-muted)" };
                return (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 600, color: "var(--adm-text-primary)" }}>{c.name}</td>
                    <td>
                      <span style={{ fontSize: "0.72rem", background: "var(--adm-bg-elevated)", padding: "2px 8px", borderRadius: 999, color: "var(--adm-text-secondary)" }}>
                        {c.type}
                      </span>
                    </td>
                    <td style={{ fontFamily: "var(--adm-font-mono)" }}>{c.sent.toLocaleString()}</td>
                    <td style={{ color: "var(--adm-success)", fontWeight: 600 }}>{c.opens}</td>
                    <td style={{ color: "var(--adm-info)", fontWeight: 600 }}>{c.clicks}</td>
                    <td>
                      <span style={{ padding: "3px 9px", borderRadius: 999, fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", background: sc.bg, color: sc.color }}>
                        {c.status}
                      </span>
                    </td>
                    <td style={{ textAlign: "right", color: "var(--adm-text-muted)", fontSize: "0.78rem" }}>{c.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "reviews" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {reviews.map(r => (
            <div key={r.id} className="adm-card" style={{ padding: "16px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{ fontWeight: 700, color: "var(--adm-text-primary)", fontSize: "0.875rem" }}>{r.customer}</div>
                    <span style={{ fontSize: "0.72rem", color: "var(--adm-text-muted)" }}>on {r.product}</span>
                    <div style={{ display: "flex", gap: 2 }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} style={{ color: i < r.rating ? "var(--adm-brand-gold)" : "var(--adm-text-disabled)", fontSize: "0.8rem" }}>★</span>
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "var(--adm-text-secondary)", lineHeight: 1.5 }}>"{r.review}"</p>
                  <div style={{ fontSize: "0.7rem", color: "var(--adm-text-muted)", marginTop: 8 }}>{r.date}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
                  <span style={{ padding: "3px 9px", borderRadius: 999, fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", background: r.approved ? "var(--adm-success-bg)" : "var(--adm-warning-bg)", color: r.approved ? "var(--adm-success)" : "var(--adm-warning)" }}>
                    {r.approved ? "Approved" : "Pending"}
                  </span>
                  <button
                    className="adm-btn adm-btn-secondary adm-btn-sm"
                    onClick={() => toggleApprove(r.id)}
                  >
                    {r.approved ? "Revoke" : "Approve"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
