"use client";
import React, { useState } from "react";

const CUSTOMERS = [
  { id: "C001", name: "Priya Sharma", email: "priya@example.com", orders: 4, spent: "₹12,890", joined: "Jan 2026", status: "Active" },
  { id: "C002", name: "Rahul Mehta", email: "rahul@example.com", orders: 2, spent: "₹3,450", joined: "Feb 2026", status: "Active" },
  { id: "C003", name: "Anjali Kumar", email: "anjali@example.com", orders: 6, spent: "₹18,200", joined: "Nov 2025", status: "VIP" },
  { id: "C004", name: "Vikram Desai", email: "vikram@example.com", orders: 1, spent: "₹980", joined: "Mar 2026", status: "Active" },
  { id: "C005", name: "Meera Pillai", email: "meera@example.com", orders: 3, spent: "₹8,100", joined: "Dec 2025", status: "Active" },
  { id: "C006", name: "John David", email: "john@example.com", orders: 5, spent: "₹14,500", joined: "Oct 2025", status: "VIP" },
];

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof CUSTOMERS[0] | null>(null);

  const filtered = CUSTOMERS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Customers</h1>
          <p className="adm-page-subtitle">Customer accounts and purchase history</p>
        </div>
        <div className="adm-page-actions">
          <button className="adm-btn adm-btn-secondary adm-btn-sm" onClick={() => alert("Customer list exported!")}>
            Export CSV
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total Customers", value: CUSTOMERS.length, color: "var(--adm-brand-gold)" },
          { label: "VIP Accounts", value: CUSTOMERS.filter(c => c.status === "VIP").length, color: "#8b5cf6" },
          { label: "Avg. Order Value", value: "₹4,700", color: "var(--adm-success)" },
          { label: "New This Month", value: 2, color: "var(--adm-info)" }
        ].map(s => (
          <div key={s.label} className="adm-card" style={{ padding: "16px 20px" }}>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "0.7rem", color: "var(--adm-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="adm-card" style={{ marginBottom: 16, padding: "12px 16px" }}>
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", background: "none", border: "none", fontSize: "0.875rem", color: "var(--adm-text-primary)", outline: "none", fontFamily: "var(--adm-font-sans)" }}
        />
      </div>

      {/* Table */}
      <div className="adm-card" style={{ overflow: "hidden" }}>
        <table className="adm-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Joined</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, var(--adm-brand-burgundy), var(--adm-brand-gold))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                      {c.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: "var(--adm-text-primary)", fontSize: "0.85rem" }}>{c.name}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--adm-text-muted)" }}>{c.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ fontWeight: 600 }}>{c.orders}</td>
                <td style={{ fontFamily: "var(--adm-font-mono)", fontWeight: 700, color: "var(--adm-text-primary)" }}>{c.spent}</td>
                <td style={{ color: "var(--adm-text-muted)", fontSize: "0.78rem" }}>{c.joined}</td>
                <td>
                  <span style={{ padding: "3px 9px", borderRadius: 999, fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", background: c.status === "VIP" ? "rgba(139,92,246,0.1)" : "var(--adm-success-bg)", color: c.status === "VIP" ? "#8b5cf6" : "var(--adm-success)", border: "1px solid", borderColor: c.status === "VIP" ? "#8b5cf633" : "rgba(34,197,94,0.2)" }}>
                    {c.status}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <button className="adm-btn adm-btn-secondary adm-btn-sm" onClick={() => setSelected(c)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="adm-modal-overlay" onClick={() => setSelected(null)}>
          <div className="adm-modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: "20px", borderBottom: "1px solid var(--adm-border-subtle)", display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontWeight: 700, color: "var(--adm-text-primary)" }}>Customer Profile</div>
              <div style={{ cursor: "pointer", color: "var(--adm-text-muted)" }} onClick={() => setSelected(null)}>✕</div>
            </div>
            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, paddingBottom: 16, borderBottom: "1px solid var(--adm-border-subtle)" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, var(--adm-brand-burgundy), var(--adm-brand-gold))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: 700, color: "#fff" }}>
                  {selected.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
                </div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--adm-text-primary)" }}>{selected.name}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--adm-text-muted)" }}>{selected.email}</div>
              </div>
              {[["Orders Placed", selected.orders], ["Total Spent", selected.spent], ["Member Since", selected.joined], ["Account Type", selected.status]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                  <span style={{ color: "var(--adm-text-muted)", fontWeight: 600 }}>{k}</span>
                  <span style={{ color: "var(--adm-text-primary)", fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "0 20px 20px" }}>
              <button className="adm-btn adm-btn-secondary adm-btn-sm" style={{ width: "100%" }} onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
