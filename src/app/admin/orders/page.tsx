"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "../use-toast";

const ORDERS = [
  { id:"#RS-1042", customer:"Priya S.",  email:"priya@example.com",  items:2, amount:"₹2,890", status:"Pending",    date:"Jun 23, 2026" },
  { id:"#RS-1041", customer:"Rahul M.",  email:"rahul@example.com",  items:1, amount:"₹1,450", status:"Processing", date:"Jun 23, 2026" },
  { id:"#RS-1040", customer:"Anjali K.", email:"anjali@example.com", items:3, amount:"₹3,200", status:"Pending",    date:"Jun 22, 2026" },
  { id:"#RS-1039", customer:"Vikram D.", email:"vikram@example.com", items:1, amount:"₹980",   status:"Shipped",    date:"Jun 22, 2026" },
  { id:"#RS-1038", customer:"Meera P.",  email:"meera@example.com",  items:2, amount:"₹4,100", status:"Delivered",  date:"Jun 21, 2026" },
  { id:"#RS-1037", customer:"John D.",   email:"john@example.com",   items:1, amount:"₹2,199", status:"Delivered",  date:"Jun 21, 2026" },
  { id:"#RS-1036", customer:"Sunita R.", email:"sunita@example.com", items:2, amount:"₹3,900", status:"Cancelled",  date:"Jun 20, 2026" },
];

const STATUS_COLOR: Record<string, {bg:string; color:string}> = {
  Pending:    { bg:"var(--adm-warning-bg)", color:"var(--adm-warning)" },
  Processing: { bg:"var(--adm-info-bg)",    color:"var(--adm-info)" },
  Shipped:    { bg:"rgba(139,92,246,.1)",   color:"#8b5cf6" },
  Delivered:  { bg:"var(--adm-success-bg)", color:"var(--adm-success)" },
  Cancelled:  { bg:"var(--adm-error-bg)",   color:"var(--adm-error)" }
};

export default function AdminOrdersPage() {
  const router = useRouter();
  const [filter, setFilter]   = useState("All");
  const [search, setSearch]   = useState("");
  const [selected, setSelected] = useState<typeof ORDERS[0] | null>(null);
  const [orders, setOrders]   = useState(ORDERS);

  const filters = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  const filtered = orders.filter(o => {
    const matchFilter = filter === "All" || o.status === filter;
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const markShipped = (order: typeof ORDERS[0]) => {
    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status:"Shipped" } : o));
    setSelected(null);
    showToast("success", `Order ${order.id} shipped`, `${order.customer}'s order marked as Shipped`);
  };

  const cancelOrder = (order: typeof ORDERS[0]) => {
    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status:"Cancelled" } : o));
    setSelected(null);
    showToast("warning", `Order ${order.id} cancelled`, "Customer will be notified");
  };

  return (
    <div style={{maxWidth:1400,margin:"0 auto"}}>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Orders</h1>
          <p className="adm-page-subtitle">Manage and fulfil customer orders</p>
        </div>
        <div className="adm-page-actions">
          <button className="adm-btn adm-btn-secondary adm-btn-sm" onClick={() => showToast("success","Exported","orders_export.csv downloaded")}>
            Export CSV
          </button>
        </div>
      </div>

      {/* Status filter pills */}
      <div style={{display:"flex",gap:8,marginBottom:18,flexWrap:"wrap"}}>
        {filters.map(f => {
          const count = f==="All" ? orders.length : orders.filter(o=>o.status===f).length;
          const sc = STATUS_COLOR[f] || { bg:"var(--adm-bg-elevated)", color:"var(--adm-text-secondary)" };
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="adm-btn adm-btn-sm"
              style={{
                background: filter===f ? (f==="All" ? "var(--adm-brand-burgundy)" : sc.color) : "var(--adm-bg-elevated)",
                color: filter===f ? "#fff" : "var(--adm-text-secondary)",
                border: `1px solid ${filter===f ? "transparent" : "var(--adm-border-subtle)"}`,
                gap: 6
              }}
            >
              {f}
              <span style={{background:filter===f?"rgba(255,255,255,.25)":"var(--adm-bg-overlay)",borderRadius:999,padding:"1px 6px",fontSize:"0.65rem",fontWeight:700}}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="adm-card" style={{marginBottom:14,padding:"10px 16px",display:"flex",alignItems:"center",gap:10}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:15,height:15,color:"var(--adm-text-muted)",flexShrink:0}}>
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          placeholder="Search by order ID or customer name…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{flex:1,background:"none",border:"none",fontSize:"0.875rem",color:"var(--adm-text-primary)",outline:"none",fontFamily:"var(--adm-font-sans)"}}
        />
        {search && <button onClick={()=>setSearch("")} style={{background:"none",border:"none",cursor:"pointer",color:"var(--adm-text-muted)",fontSize:"1rem"}}>✕</button>}
      </div>

      {/* Table */}
      <div className="adm-card" style={{overflow:"hidden"}}>
        <table className="adm-table">
          <thead>
            <tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Amount</th><th>Status</th><th>Date</th><th style={{textAlign:"right"}}>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} style={{textAlign:"center",padding:40,color:"var(--adm-text-muted)"}}>No orders found</td></tr>
            ) : filtered.map(o => {
              const sc = STATUS_COLOR[o.status] || { bg:"var(--adm-bg-elevated)", color:"var(--adm-text-muted)" };
              return (
                <tr key={o.id} onClick={() => setSelected(o)}>
                  <td className="adm-td-primary">{o.id}</td>
                  <td>
                    <div style={{fontWeight:600,color:"var(--adm-text-primary)",fontSize:"0.82rem"}}>{o.customer}</div>
                    <div style={{fontSize:"0.7rem",color:"var(--adm-text-muted)"}}>{o.email}</div>
                  </td>
                  <td>{o.items} item{o.items>1?"s":""}</td>
                  <td style={{fontFamily:"var(--adm-font-mono)",fontWeight:700,color:"var(--adm-text-primary)"}}>{o.amount}</td>
                  <td>
                    <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 9px",borderRadius:999,fontSize:"0.68rem",fontWeight:700,textTransform:"uppercase",background:sc.bg,color:sc.color,border:`1px solid ${sc.color}33`}}>
                      <span style={{width:5,height:5,borderRadius:"50%",background:sc.color,flexShrink:0}}/>
                      {o.status}
                    </span>
                  </td>
                  <td style={{color:"var(--adm-text-muted)",fontSize:"0.78rem"}}>{o.date}</td>
                  <td style={{textAlign:"right"}} onClick={e=>e.stopPropagation()}>
                    <button className="adm-btn adm-btn-secondary adm-btn-sm" onClick={()=>setSelected(o)}>View</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="adm-modal-overlay" onClick={() => setSelected(null)}>
          <div className="adm-modal" onClick={e=>e.stopPropagation()}>
            <div className="adm-modal-header">
              <div>
                <div style={{fontSize:"0.65rem",color:"var(--adm-brand-gold)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:2}}>Order Details</div>
                <span className="adm-modal-title" style={{fontFamily:"var(--adm-font-mono)"}}>{selected.id}</span>
              </div>
              <div className="adm-modal-close" onClick={() => setSelected(null)}>✕</div>
            </div>
            <div className="adm-modal-body" style={{display:"flex",flexDirection:"column",gap:12}}>
              {[["Customer",selected.customer],["Email",selected.email],["Amount",selected.amount],["Items",`${selected.items} item(s)`],["Date",selected.date],["Status",selected.status]].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:"0.85rem",padding:"6px 0",borderBottom:"1px solid var(--adm-border-subtle)"}}>
                  <span style={{color:"var(--adm-text-muted)",fontWeight:600}}>{k}</span>
                  <span style={{color:"var(--adm-text-primary)",fontWeight:600}}>{v}</span>
                </div>
              ))}
            </div>
            <div className="adm-modal-footer">
              {selected.status !== "Shipped" && selected.status !== "Delivered" && selected.status !== "Cancelled" && (
                <button className="adm-btn adm-btn-primary adm-btn-sm" style={{flex:1}} onClick={() => markShipped(selected)}>
                  ✓ Mark Shipped
                </button>
              )}
              {selected.status !== "Cancelled" && selected.status !== "Delivered" && (
                <button className="adm-btn adm-btn-danger adm-btn-sm" style={{flex:1}} onClick={() => cancelOrder(selected)}>
                  Cancel Order
                </button>
              )}
              <button className="adm-btn adm-btn-secondary adm-btn-sm" style={{flex:1}} onClick={() => setSelected(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
