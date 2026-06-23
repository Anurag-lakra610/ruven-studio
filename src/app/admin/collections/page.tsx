"use client";
import React, { useState } from "react";

const COLLECTIONS = [
  { id: "COL-001", name: "Armor of Light Series", slug: "armor-of-light", products: 4, status: "Active", created: "Jan 2026" },
  { id: "COL-002", name: "Faith Essentials", slug: "faith-essentials", products: 6, status: "Active", created: "Feb 2026" },
  { id: "COL-003", name: "Summer Drops 2026", slug: "summer-drops-2026", products: 2, status: "Draft", created: "Jun 2026" },
];

export default function AdminCollectionsPage() {
  const [showForm, setShowForm] = useState(false);
  const [collections, setCollections] = useState(COLLECTIONS);
  const [form, setForm] = useState({ name: "", slug: "" });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, "-");
    setCollections(prev => [...prev, {
      id: `COL-00${prev.length + 1}`,
      name: form.name,
      slug,
      products: 0,
      status: "Draft",
      created: "Jun 2026"
    }]);
    setForm({ name: "", slug: "" });
    setShowForm(false);
    alert(`Collection "${form.name}" created successfully!`);
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Collections</h1>
          <p className="adm-page-subtitle">Group products into curated collections</p>
        </div>
        <button className="adm-btn adm-btn-primary adm-btn-sm" onClick={() => setShowForm(true)}>
          + New Collection
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {collections.map(col => (
          <div key={col.id} className="adm-card" style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: "var(--adm-radius-md)", background: "var(--adm-brand-burgundy-glow)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>
                🗂️
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: "var(--adm-text-primary)", fontSize: "0.95rem" }}>{col.name}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--adm-text-muted)", fontFamily: "var(--adm-font-mono)", marginTop: 2 }}>
                  /{col.slug} · {col.products} products · Created {col.created}
                </div>
              </div>
              <span style={{ padding: "3px 10px", borderRadius: 999, fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", background: col.status === "Active" ? "var(--adm-success-bg)" : "var(--adm-bg-elevated)", color: col.status === "Active" ? "var(--adm-success)" : "var(--adm-text-muted)", border: "1px solid", borderColor: col.status === "Active" ? "rgba(34,197,94,0.2)" : "var(--adm-border-normal)" }}>
                {col.status}
              </span>
              <button className="adm-btn adm-btn-secondary adm-btn-sm" onClick={() => alert(`Editing "${col.name}"…`)}>Edit</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="adm-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="adm-modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--adm-border-subtle)", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700, color: "var(--adm-text-primary)" }}>New Collection</span>
              <div style={{ cursor: "pointer", color: "var(--adm-text-muted)" }} onClick={() => setShowForm(false)}>✕</div>
            </div>
            <form onSubmit={handleAdd} style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--adm-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>Collection Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Summer Drops 2026"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--adm-radius-md)", background: "var(--adm-bg-elevated)", border: "1px solid var(--adm-border-normal)", color: "var(--adm-text-primary)", fontFamily: "var(--adm-font-sans)", fontSize: "0.875rem" }}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--adm-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>URL Slug (optional)</label>
                <input
                  type="text"
                  placeholder="auto-generated from name"
                  value={form.slug}
                  onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--adm-radius-md)", background: "var(--adm-bg-elevated)", border: "1px solid var(--adm-border-normal)", color: "var(--adm-text-primary)", fontFamily: "var(--adm-font-mono)", fontSize: "0.82rem" }}
                />
              </div>
              <button type="submit" className="adm-btn adm-btn-primary" style={{ width: "100%" }}>Create Collection</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
