"use client";
import React, { useState } from "react";

const MEDIA = [
  { id: "M001", name: "hero_lifestyle.png", type: "image/png", size: "2.4 MB", url: "/hero_lifestyle.png" },
  { id: "M002", name: "armor_tee_hero.png", type: "image/png", size: "1.8 MB", url: "/armor_tee_hero.png" },
  { id: "M003", name: "logo.png", type: "image/png", size: "120 KB", url: "/logo.png" },
  { id: "M004", name: "product_hoodie.png", type: "image/png", size: "1.2 MB", url: "/product_hoodie.png" },
];

export default function AdminMediaPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [media] = useState(MEDIA);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Media Library</h1>
          <p className="adm-page-subtitle">Upload and manage product images and assets</p>
        </div>
        <div className="adm-page-actions">
          {selected.length > 0 && (
            <button className="adm-btn adm-btn-secondary adm-btn-sm" onClick={() => { alert(`Deleted ${selected.length} files`); setSelected([]); }} style={{ color: "var(--adm-error)" }}>
              Delete {selected.length} Selected
            </button>
          )}
          <button className="adm-btn adm-btn-primary adm-btn-sm" onClick={() => alert("File picker opening…")}>
            Upload Files
          </button>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); alert("Files uploaded successfully!"); }}
        className="adm-card"
        style={{
          marginBottom: 20,
          padding: "32px",
          textAlign: "center",
          cursor: "pointer",
          borderStyle: "dashed",
          borderWidth: 2,
          borderColor: dragging ? "var(--adm-brand-gold)" : "var(--adm-border-normal)",
          background: dragging ? "var(--adm-brand-gold-dim)" : "var(--adm-bg-surface)",
          transition: "all 0.15s ease"
        }}
        onClick={() => alert("File picker opening…")}
      >
        <div style={{ fontSize: "2rem", marginBottom: 8 }}>📁</div>
        <div style={{ fontWeight: 600, color: "var(--adm-text-primary)", marginBottom: 4 }}>
          Drag & drop files here
        </div>
        <div style={{ fontSize: "0.78rem", color: "var(--adm-text-muted)" }}>
          Supported: PNG, JPG, WEBP, SVG — Max 10MB per file
        </div>
      </div>

      {/* Media Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
        {media.map(item => {
          const isSelected = selected.includes(item.id);
          return (
            <div
              key={item.id}
              className="adm-card"
              style={{
                cursor: "pointer",
                overflow: "hidden",
                borderColor: isSelected ? "var(--adm-brand-gold)" : undefined,
                boxShadow: isSelected ? "0 0 0 2px var(--adm-brand-gold)" : undefined
              }}
              onClick={() => toggle(item.id)}
            >
              <div style={{ height: 140, background: "var(--adm-bg-elevated)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <img
                  src={item.url}
                  alt={item.name}
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover", width: "100%", height: "100%" }}
                  onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                {isSelected && (
                  <div style={{ position: "absolute", top: 8, right: 8, width: 22, height: 22, borderRadius: "50%", background: "var(--adm-brand-gold)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", color: "#000", fontWeight: 700 }}>
                    ✓
                  </div>
                )}
              </div>
              <div style={{ padding: "10px 12px" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--adm-text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.name}
                </div>
                <div style={{ fontSize: "0.65rem", color: "var(--adm-text-muted)", marginTop: 3 }}>{item.size}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
