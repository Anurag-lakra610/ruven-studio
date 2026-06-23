"use client";
import React, { useState } from "react";
import { showToast } from "../use-toast";

const INIT_DISCOUNTS = [
  { id:"D001", code:"ARMOR20",   type:"Percentage", value:"20%",  usage:34,  limit:100, status:"Active",  expires:"Jul 31, 2026" },
  { id:"D002", code:"FAITH50",   type:"Fixed",      value:"₹50",  usage:78,  limit:200, status:"Active",  expires:"Jun 30, 2026" },
  { id:"D003", code:"WELCOME15", type:"Percentage", value:"15%",  usage:12,  limit:500, status:"Active",  expires:"Dec 31, 2026" },
  { id:"D004", code:"SUMMER25",  type:"Percentage", value:"25%",  usage:200, limit:200, status:"Expired", expires:"Sep 1, 2025"  },
];

export default function AdminDiscountsPage() {
  const [discounts, setDiscounts] = useState(INIT_DISCOUNTS);
  const [showForm, setShowForm]   = useState(false);
  const [form, setForm]           = useState({ code:"", type:"Percentage", value:"", limit:"100" });
  const [copied, setCopied]       = useState<string|null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code).catch(()=>{});
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
    showToast("success","Copied!",`Code "${code}" copied to clipboard`);
  };

  const deleteDiscount = (id: string) => {
    const d = discounts.find(x=>x.id===id);
    setDiscounts(prev => prev.filter(x=>x.id!==id));
    if (d) showToast("warning","Discount deleted",`Code ${d.code} removed`);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code.trim() || !form.value.trim()) return;
    const code = form.code.trim().toUpperCase();
    if (discounts.find(d=>d.code===code)) { showToast("error","Code exists",`${code} is already in use`); return; }
    const newD = { id:`D00${discounts.length+1}`, code, type:form.type, value:form.type==="Percentage"?`${form.value}%`:`₹${form.value}`, usage:0, limit:Number(form.limit)||100, status:"Active", expires:"Dec 31, 2026" };
    setDiscounts(prev => [newD, ...prev]);
    setForm({ code:"", type:"Percentage", value:"", limit:"100" });
    setShowForm(false);
    showToast("success","Discount created",`Code ${code} is now live`);
  };

  return (
    <div style={{maxWidth:1400,margin:"0 auto"}}>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Discounts</h1>
          <p className="adm-page-subtitle">Promo codes and promotional campaigns</p>
        </div>
        <button className="adm-btn adm-btn-primary adm-btn-sm" onClick={() => setShowForm(true)}>+ New Discount</button>
      </div>

      <div className="adm-card" style={{overflow:"hidden"}}>
        <table className="adm-table">
          <thead><tr><th>Code</th><th>Type</th><th>Value</th><th>Usage</th><th>Status</th><th>Expires</th><th style={{textAlign:"right"}}>Actions</th></tr></thead>
          <tbody>
            {discounts.map(d => {
              const pct = Math.round((d.usage/d.limit)*100);
              const sc  = d.status==="Active" ? {bg:"var(--adm-success-bg)",color:"var(--adm-success)"} : {bg:"var(--adm-bg-elevated)",color:"var(--adm-text-muted)"};
              return (
                <tr key={d.id}>
                  <td>
                    <button onClick={() => copyCode(d.code)} style={{fontFamily:"var(--adm-font-mono)",fontWeight:700,fontSize:"0.875rem",color:"var(--adm-brand-gold)",background:"var(--adm-brand-gold-dim)",padding:"3px 10px",borderRadius:"var(--adm-radius-sm)",border:"1px solid rgba(192,154,107,.2)",cursor:"pointer",transition:"all .15s"}}>
                      {copied===d.code ? "✓ Copied!" : d.code}
                    </button>
                  </td>
                  <td style={{fontSize:"0.78rem"}}>{d.type}</td>
                  <td style={{fontWeight:700,color:"var(--adm-text-primary)"}}>{d.value}</td>
                  <td>
                    <div style={{fontSize:"0.68rem",color:"var(--adm-text-muted)",marginBottom:4}}>{d.usage}/{d.limit}</div>
                    <div style={{height:4,background:"var(--adm-bg-elevated)",borderRadius:999,width:80,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${pct}%`,background:pct>=90?"var(--adm-error)":pct>=60?"var(--adm-warning)":"var(--adm-success)",borderRadius:999,transition:"width .4s"}}/>
                    </div>
                  </td>
                  <td><span style={{padding:"3px 9px",borderRadius:999,fontSize:"0.68rem",fontWeight:700,textTransform:"uppercase",background:sc.bg,color:sc.color}}>{d.status}</span></td>
                  <td style={{fontSize:"0.78rem",color:"var(--adm-text-muted)"}}>{d.expires}</td>
                  <td style={{textAlign:"right"}}><button className="adm-btn adm-btn-danger adm-btn-sm" onClick={()=>deleteDiscount(d.id)}>Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="adm-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="adm-modal" onClick={e=>e.stopPropagation()}>
            <div className="adm-modal-header">
              <span className="adm-modal-title">Create Discount Code</span>
              <div className="adm-modal-close" onClick={() => setShowForm(false)}>✕</div>
            </div>
            <form onSubmit={handleCreate}>
              <div className="adm-modal-body" style={{display:"flex",flexDirection:"column",gap:12}}>
                <div className="adm-form-group">
                  <label className="adm-label">Promo Code *</label>
                  <input className="adm-input" required placeholder="e.g. FAITH20" value={form.code} onChange={e=>setForm(p=>({...p,code:e.target.value.toUpperCase()}))} style={{fontFamily:"var(--adm-font-mono)",textTransform:"uppercase"}}/>
                </div>
                <div className="adm-form-group">
                  <label className="adm-label">Discount Type</label>
                  <select className="adm-select" value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))}>
                    <option>Percentage</option>
                    <option>Fixed</option>
                  </select>
                </div>
                <div className="adm-form-group">
                  <label className="adm-label">Value * {form.type==="Percentage"?"(%)":"(₹)"}</label>
                  <input className="adm-input" required type="number" placeholder={form.type==="Percentage"?"20":"100"} value={form.value} onChange={e=>setForm(p=>({...p,value:e.target.value}))}/>
                </div>
                <div className="adm-form-group">
                  <label className="adm-label">Usage Limit</label>
                  <input className="adm-input" type="number" placeholder="100" value={form.limit} onChange={e=>setForm(p=>({...p,limit:e.target.value}))}/>
                </div>
              </div>
              <div className="adm-modal-footer">
                <button type="button" className="adm-btn adm-btn-secondary adm-btn-sm" style={{flex:1}} onClick={()=>setShowForm(false)}>Cancel</button>
                <button type="submit" className="adm-btn adm-btn-primary adm-btn-sm" style={{flex:1}}>Create Code</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
