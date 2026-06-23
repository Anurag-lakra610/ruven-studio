"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ORDERS = [
  { id: "#RS-1042", customer: "Priya S.", email: "priya@example.com", items: 2, amount: "₹2,890", status: "Pending", date: "Jun 23, 2026" },
  { id: "#RS-1041", customer: "Rahul M.", email: "rahul@example.com", items: 1, amount: "₹1,450", status: "Processing", date: "Jun 23, 2026" },
  { id: "#RS-1040", customer: "Anjali K.", email: "anjali@example.com", items: 3, amount: "₹3,200", status: "Pending", date: "Jun 22, 2026" },
  { id: "#RS-1039", customer: "Vikram D.", email: "vikram@example.com", items: 1, amount: "₹980", status: "Shipped", date: "Jun 22, 2026" },
  { id: "#RS-1038", customer: "Meera P.", email: "meera@example.com", items: 2, amount: "₹4,100", status: "Delivered", date: "Jun 21, 2026" },
  { id: "#RS-1037", customer: "John D.", email: "john@example.com", items: 1, amount: "₹2,199", status: "Delivered", date: "Jun 21, 2026" },
  { id: "#RS-1036", customer: "Sunita R.", email: "sunita@example.com", items: 2, amount: "₹3,900", status: "Cancelled", date: "Jun 20, 2026" },
];

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  Pending:    { bg: "var(--adm-warning-bg)",  color: "var(--adm-warning)" },
  Processing: { bg: "var(--adm-info-bg)",     color: "var(--adm-info)" },
  Shipped:    { bg: "rgba(139,92,246,0.08)",  color: "#8b5cf6" },
  Delivered:  { bg: "var(--adm-success-bg)",  color: "var(--adm-success)" },
  Cancelled:  { bg: "var(--adm-error-bg)",    color: "var(--adm-error)" }
};

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<typeof ORDERS[0] | null>(null);

  const filters = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  const filtered = ORDERS.filter(o => {
    const matchFilter = filter === "All" || o.status === filter;
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Orders</h1>
          <p className="adm-page-subtitle">Manage and fulfil customer orders</p>
        </div>
        <div className="adm-page-actions">
          <button className="adm-btn adm-btn-secondary adm-btn-sm" onClick={() => alert("Orders exported to CSV!")}>
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 24 }}>
        {filters.map(f => {
          const count = f === "All" ? ORDERS.length : ORDERS.filter(o => o.status === f).length;
          const c = f === "All" ? { bg: "var(--adm-bg-elevated)", color: "var(--adm-text-primary)" } : STATUS_COLORS[f] || { bg: "var(--adm-bg-elevated)", color: "var(--adm-text-primary)" };
          return (
            <div
              key={f}
              className="adm-card"
              style={{ padding: "14px 16px", cursor: "pointer", borderColor: filter === f ? "var(--adm-brand-gold)" : undefined }}
              onClick={() => setFilter(f)}
            >
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: c.color }}>{count}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--adm-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{f}</div>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="adm-card" style={{ marginBottom: 16, padding: "12px 16px" }}>
        <input
          type="text"
          placeholder="Search by order ID or customer name…"
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
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(order => {
              const sc = STATUS_COLORS[order.status] || { bg: "var(--adm-bg-elevated)", color: "var(--adm-text-muted)" };
              return (
                <tr key={order.id}>
                  <td className="adm-td-primary">{order.id}</td>
                  <td>
                    <div style={{ fontWeight: 600, color: "var(--adm-text-primary)", fontSize: "0.82rem" }}>{order.customer}</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--adm-text-muted)" }}>{order.email}</div>
                  </td>
                  <td>{order.items} item{order.items > 1 ? "s" : ""}</td>
                  <td style={{ fontFamily: "var(--adm-font-mono)", fontWeight: 700, color: "var(--adm-text-primary)" }}>{order.amount}</td>
                  <td>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 9px", borderRadius: 999, fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", background: sc.bg, color: sc.color, border: "1px solid", borderColor: sc.color + "33" }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: sc.color, flexShrink: 0 }} />
                      {order.status}
                    </span>
                  </td>
                  <td style={{ color: "var(--adm-text-muted)", fontSize: "0.78rem" }}>{order.date}</td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      className="adm-btn adm-btn-secondary adm-btn-sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="adm-modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="adm-modal" style={{ maxWidth: 480 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid var(--adm-border-subtle)" }}>
              <div>
                <div style={{ fontSize: "0.7rem", color: "var(--adm-brand-gold)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Order Details</div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--adm-text-primary)", fontFamily: "var(--adm-font-mono)" }}>{selectedOrder.id}</div>
              </div>
              <div style={{ cursor: "pointer", color: "var(--adm-text-muted)" }} onClick={() => setSelectedOrder(null)}>✕</div>
            </div>
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                ["Customer", selectedOrder.customer],
                ["Email", selectedOrder.email],
                ["Amount", selectedOrder.amount],
                ["Items", `${selectedOrder.items} item(s)`],
                ["Date", selectedOrder.date],
                ["Status", selectedOrder.status]
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                  <span style={{ color: "var(--adm-text-muted)", fontWeight: 600 }}>{k}</span>
                  <span style={{ color: "var(--adm-text-primary)", fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, padding: "0 20px 20px" }}>
              <button className="adm-btn adm-btn-primary adm-btn-sm" style={{ flex: 1 }} onClick={() => { alert(`Order ${selectedOrder.id} marked as Shipped!`); setSelectedOrder(null); }}>
                Mark Shipped
              </button>
              <button className="adm-btn adm-btn-secondary adm-btn-sm" style={{ flex: 1 }} onClick={() => setSelectedOrder(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
