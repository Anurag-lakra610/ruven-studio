"use client";
import React, { useState } from "react";
import { showToast } from "../use-toast";

const INIT_CUSTOMERS = [
  { id:"C001", name:"Priya Sharma",  email:"priya@example.com",  orders:4, spent:"₹12,890", joined:"Jan 2026", status:"Active" },
  { id:"C002", name:"Rahul Mehta",   email:"rahul@example.com",  orders:2, spent:"₹3,450",  joined:"Feb 2026", status:"Active" },
  { id:"C003", name:"Anjali Kumar",  email:"anjali@example.com", orders:6, spent:"₹18,200", joined:"Nov 2025", status:"VIP"    },
  { id:"C004", name:"Vikram Desai",  email:"vikram@example.com", orders:1, spent:"₹980",    joined:"Mar 2026", status:"Active" },
  { id:"C005", name:"Meera Pillai",  email:"meera@example.com",  orders:3, spent:"₹8,100",  joined:"Dec 2025", status:"Active" },
  { id:"C006", name:"John David",    email:"john@example.com",   orders:5, spent:"₹14,500", joined:"Oct 2025", status:"VIP"    },
];

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState(INIT_CUSTOMERS);
  const [search, setSearch]     = useState("");
  const [selected, setSelected] = useState<typeof INIT_CUSTOMERS[0] | null>(null);

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const promoteToVIP = (c: typeof INIT_CUSTOMERS[0]) => {
    setCustomers(prev => prev.map(x => x.id === c.id ? {...x, status: x.status==="VIP"?"Active":"VIP"} : x));
    const next = c.status === "VIP" ? "Active" : "VIP";
    setSelected(prev => prev ? {...prev, status: next} : null);
    showToast("success", `${c.name} → ${next}`, `Account status updated successfully`);
  };

  const sendEmail = (c: typeof INIT_CUSTOMERS[0]) => {
    showToast("success","Email sent", `Message dispatched to ${c.email}`);
    setSelected(null);
  };

  return (
    <div style={{maxWidth:1400,margin:"0 auto"}}>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Customers</h1>
          <p className="adm-page-subtitle">Customer accounts and purchase history</p>
        </div>
        <div className="adm-page-actions">
          <button className="adm-btn adm-btn-secondary adm-btn-sm" onClick={() => showToast("success","Exported","customers_export.csv downloaded")}>
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
        {[
          { label:"Total Customers", value:customers.length,                              color:"var(--adm-brand-gold)" },
          { label:"VIP Accounts",    value:customers.filter(c=>c.status==="VIP").length,  color:"#8b5cf6"  },
          { label:"Avg Order Value", value:"₹4,700",                                      color:"var(--adm-success)"   },
          { label:"New This Month",  value:2,                                             color:"var(--adm-info)"      }
        ].map(s => (
          <div key={s.label} className="adm-card" style={{padding:"16px 18px"}}>
            <div style={{fontSize:"1.6rem",fontWeight:800,color:s.color,letterSpacing:"-0.03em"}}>{s.value}</div>
            <div style={{fontSize:"0.68rem",color:"var(--adm-text-muted)",textTransform:"uppercase",letterSpacing:"0.07em",marginTop:4}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="adm-card" style={{marginBottom:14,padding:"10px 16px",display:"flex",alignItems:"center",gap:10}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:15,height:15,color:"var(--adm-text-muted)",flexShrink:0}}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" placeholder="Search by name or email…" value={search} onChange={e=>setSearch(e.target.value)}
          style={{flex:1,background:"none",border:"none",fontSize:"0.875rem",color:"var(--adm-text-primary)",outline:"none",fontFamily:"var(--adm-font-sans)"}}/>
        {search && <button onClick={()=>setSearch("")} style={{background:"none",border:"none",cursor:"pointer",color:"var(--adm-text-muted)",fontSize:"1rem"}}>✕</button>}
      </div>

      {/* Table */}
      <div className="adm-card" style={{overflow:"hidden"}}>
        <table className="adm-table">
          <thead><tr><th>Customer</th><th>Orders</th><th>Total Spent</th><th>Joined</th><th>Status</th><th style={{textAlign:"right"}}>Actions</th></tr></thead>
          <tbody>
            {filtered.map(c => {
              const isVIP = c.status === "VIP";
              return (
                <tr key={c.id} onClick={() => setSelected(c)}>
                  <td>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{width:32,height:32,borderRadius:"50%",background:isVIP?"linear-gradient(135deg,var(--adm-brand-burgundy),var(--adm-brand-gold))":"var(--adm-bg-elevated)",border:isVIP?"none":"1px solid var(--adm-border-normal)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.72rem",fontWeight:700,color:isVIP?"#fff":"var(--adm-text-muted)",flexShrink:0}}>
                        {c.name.split(" ").map(w=>w[0]).join("").slice(0,2)}
                      </div>
                      <div>
                        <div style={{fontWeight:600,color:"var(--adm-text-primary)",fontSize:"0.85rem"}}>{c.name}</div>
                        <div style={{fontSize:"0.7rem",color:"var(--adm-text-muted)"}}>{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{fontWeight:600}}>{c.orders}</td>
                  <td style={{fontFamily:"var(--adm-font-mono)",fontWeight:700,color:"var(--adm-text-primary)"}}>{c.spent}</td>
                  <td style={{color:"var(--adm-text-muted)",fontSize:"0.78rem"}}>{c.joined}</td>
                  <td>
                    <span style={{padding:"3px 9px",borderRadius:999,fontSize:"0.68rem",fontWeight:700,textTransform:"uppercase",background:isVIP?"rgba(139,92,246,.1)":"var(--adm-success-bg)",color:isVIP?"#8b5cf6":"var(--adm-success)",border:"1px solid",borderColor:isVIP?"#8b5cf633":"rgba(34,197,94,.2)"}}>
                      {isVIP ? "⭐ VIP" : "Active"}
                    </span>
                  </td>
                  <td style={{textAlign:"right"}} onClick={e=>e.stopPropagation()}>
                    <button className="adm-btn adm-btn-secondary adm-btn-sm" onClick={()=>setSelected(c)}>View</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Profile Modal */}
      {selected && (
        <div className="adm-modal-overlay" onClick={() => setSelected(null)}>
          <div className="adm-modal" onClick={e=>e.stopPropagation()}>
            <div className="adm-modal-header">
              <span className="adm-modal-title">Customer Profile</span>
              <div className="adm-modal-close" onClick={() => setSelected(null)}>✕</div>
            </div>
            <div className="adm-modal-body">
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,paddingBottom:16,borderBottom:"1px solid var(--adm-border-subtle)",marginBottom:16}}>
                <div style={{width:56,height:56,borderRadius:"50%",background:"linear-gradient(135deg,var(--adm-brand-burgundy),var(--adm-brand-gold))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",fontWeight:700,color:"#fff"}}>
                  {selected.name.split(" ").map(w=>w[0]).join("").slice(0,2)}
                </div>
                <div style={{fontWeight:700,color:"var(--adm-text-primary)",fontSize:"1rem"}}>{selected.name}</div>
                <div style={{fontSize:"0.78rem",color:"var(--adm-text-muted)"}}>{selected.email}</div>
                <span style={{padding:"3px 10px",borderRadius:999,fontSize:"0.68rem",fontWeight:700,textTransform:"uppercase",background:selected.status==="VIP"?"rgba(139,92,246,.1)":"var(--adm-success-bg)",color:selected.status==="VIP"?"#8b5cf6":"var(--adm-success)"}}>
                  {selected.status === "VIP" ? "⭐ VIP" : "Active"}
                </span>
              </div>
              {[["Orders Placed",selected.orders],["Total Spent",selected.spent],["Member Since",selected.joined]].map(([k,v])=>(
                <div key={k as string} style={{display:"flex",justifyContent:"space-between",fontSize:"0.85rem",padding:"8px 0",borderBottom:"1px solid var(--adm-border-subtle)"}}>
                  <span style={{color:"var(--adm-text-muted)",fontWeight:600}}>{k}</span>
                  <span style={{color:"var(--adm-text-primary)",fontWeight:600}}>{v}</span>
                </div>
              ))}
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn adm-btn-secondary adm-btn-sm" style={{flex:1}} onClick={() => promoteToVIP(selected)}>
                {selected.status==="VIP"?"Demote to Active":"Promote to VIP"}
              </button>
              <button className="adm-btn adm-btn-primary adm-btn-sm" style={{flex:1}} onClick={() => sendEmail(selected)}>
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
