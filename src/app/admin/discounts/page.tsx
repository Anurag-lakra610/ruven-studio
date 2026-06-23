"use client";
import React, { useState } from "react";

const DISCOUNTS = [
  { id: "D001", code: "ARMOR20", type: "Percentage", value: "20%", usage: 34, limit: 100, status: "Active", expires: "Jul 31, 2026" },
  { id: "D002", code: "FAITH50", type: "Fixed", value: "₹50", usage: 78, limit: 200, status: "Active", expires: "Jun 30, 2026" },
  { id: "D003", code: "WELCOME15", type: "Percentage", value: "15%", usage: 12, limit: 500, status: "Active", expires: "Dec 31, 2026" },
  { id: "D004", code: "SUMMER2025", type: "Percentage", value: "25%", usage: 200, limit: 200, status: "Expired", expires: "Sep 1, 2025" },
];

export default function AdminDiscountsPage() {
  const [discounts, setDiscounts] = useState(DISCOUNTS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: "", type: "Percentage", value: "", limit: "100" });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code.trim() || !form.value.trim()) return;
    setDiscounts(prev => [...prev, {
      id: `D00${prev.length + 1}`,
      code: form.code.toUpperCase(),
      type: form.type,
      value: form.type === "Percentage" ? `${form.value}%` : `₹${form.value}`,
      usage: 0,
      limit: Number(form.limit),
      status: "Active",
      expires: "Dec 31, 2026"
    }]);
    setForm({ code: "", type: "Percentage", value: "", limit: "100" });
    setShowForm(false);
    alert(`Discount code "${form.code.toUpperCase()}" created!`);
  };

  const deleteDiscount = (id: string) => {
    if (confirm("Delete this discount code?")) {
      setDiscounts(prev => prev.filter(d => d.id !== id));
    }
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Discounts</h1>
          <p className="adm-page-subtitle">Promo codes and sale campaigns</p>
        </div>
        <button className="adm-btn adm-btn-primary adm-btn-sm" onClick={() => setShowForm(true)}>
          + New Discount
        </button>
      </div>

      <div className="adm-card" style={{ overflow: "hidden" }}>
        <table className="adm-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Type</th>
              <th>Value</th>
              <th>Usage</th>
              <th>Status</th>
              <th>Expires</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map(d => {
              const pct = Math.round((d.usage / d.limit) * 100);
              return (
                <tr key={d.id}>
                  <td>
                    <span style={{ fontFamily: "var(--adm-font-mono)", fontWeight: 700, fontSize: "0.875rem", color: "var(--adm-brand-gold)", background: "var(--adm-brand-gold-dim)", padding: "3px 10px", borderRadius: "var(--adm-radius-sm)" }}>
                      {d.code}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.78rem" }}>{d.type}</td>
                  <td style={{ fontWeight: 700, color: "var(--adm-text-primary)" }}>{d.value}</td>
                  <td>
                    <div style={{ fontSize: "0.72rem", color: "var(--adm-text-muted)", marginBottom: 4 }}>{d.usage}/{d.limit}</div>
                    <div style={{ height: 4, background: "var(--adm-bg-elevated)", borderRadius: 999, width: 80, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: pct >= 90 ? "var(--adm-error)" : pct >= 60 ? "var(--adm-warning)" : "var(--adm-success)", borderRadius: 999 }} />
                    </div>
                  </td>
                  <td>
                    <span style={{ padding: "3px 9px", borderRadius: 999, fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", background: d.status === "Active" ? "var(--adm-success-bg)" : "var(--adm-bg-elevated)", color: d.status === "Active" ? "var(--adm-success)" : "var(--adm-text-muted)" }}>
                      {d.status}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.78rem", color: "var(--adm-text-muted)" }}>{d.expires}</td>
                  <td style={{ textAlign: "right" }}>
                    <button className="adm-btn adm-btn-secondary adm-btn-sm" onClick={() => deleteDiscount(d.id)} style={{ color: "var(--adm-error)" }}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="adm-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="adm-modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--adm-border-subtle)", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700, color: "var(--adm-text-primary)" }}>Create Discount Code</span>
              <div style={{ cursor: "pointer", color: "var(--adm-text-muted)" }} onClick={() => setShowForm(false)}>✕</div>
            </div>
            <form onSubmit={handleCreate} style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Promo Code", key: "code", type: "text", placeholder: "e.g. FAITH20" },
                { label: "Discount Value", key: "value", type: "text", placeholder: form.type === "Percentage" ? "e.g. 20" : "e.g. 100" },
                { label: "Usage Limit", key: "limit", type: "number", placeholder: "100" }
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--adm-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>{f.label}</label>
                  <input
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    value={(form as any)[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--adm-radius-md)", background: "var(--adm-bg-elevated)", border: "1px solid var(--adm-border-normal)", color: "var(--adm-text-primary)", fontFamily: "var(--adm-font-sans)", fontSize: "0.875rem" }}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--adm-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>Discount Type</label>
                <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--adm-radius-md)", background: "var(--adm-bg-elevated)", border: "1px solid var(--adm-border-normal)", color: "var(--adm-text-primary)", fontFamily: "var(--adm-font-sans)" }}>
                  <option>Percentage</option>
                  <option>Fixed</option>
                </select>
              </div>
              <button type="submit" className="adm-btn adm-btn-primary" style={{ width: "100%" }}>Create Discount</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
