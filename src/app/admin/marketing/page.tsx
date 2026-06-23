"use client";
import React, { useState } from "react";
import { showToast } from "../use-toast";

const INIT_CAMPAIGNS = [
  { id:"CMP-001", name:"Armor of Light Launch",       type:"Email",    status:"Active",    sent:1240, opens:"38.2%", clicks:"12.4%", date:"Jun 15, 2026" },
  { id:"CMP-002", name:"Father's Day Special",         type:"Instagram", status:"Completed", sent:3500, opens:"44.1%", clicks:"18.6%", date:"Jun 12, 2026" },
  { id:"CMP-003", name:"Scripture Drops Newsletter",   type:"Email",    status:"Draft",     sent:0,    opens:"—",     clicks:"—",     date:"Jun 25, 2026" },
];

const INIT_REVIEWS = [
  { id:"R001", customer:"Priya S.",   product:"Armor of Light Tee",  rating:5, review:"Amazing quality and the verse print is stunning!",   date:"Jun 20, 2026", approved:true  },
  { id:"R002", customer:"Rahul M.",   product:"Renewal Hoodie",       rating:4, review:"Great hoodie, love the minimal design.",             date:"Jun 19, 2026", approved:false },
  { id:"R003", customer:"Anjali K.",  product:"Child of God Tee",     rating:5, review:"My favorite purchase this year!",                    date:"Jun 18, 2026", approved:true  },
];

export default function AdminMarketingPage() {
  const [tab,  setTab]     = useState<"campaigns"|"reviews">("campaigns");
  const [campaigns, setCampaigns] = useState(INIT_CAMPAIGNS);
  const [reviews, setReviews]     = useState(INIT_REVIEWS);
  const [showNew, setShowNew]     = useState(false);
  const [newName, setNewName]     = useState("");
  const [newType, setNewType]     = useState("Email");

  const launchCampaign = (id: string) => {
    setCampaigns(prev => prev.map(c => c.id===id ? {...c, status:"Active", sent: Math.floor(Math.random()*2000+500)} : c));
    const c = campaigns.find(x=>x.id===id);
    if (c) showToast("success","Campaign launched",`"${c.name}" is now live`);
  };

  const deleteCampaign = (id: string) => {
    const c = campaigns.find(x=>x.id===id);
    setCampaigns(prev => prev.filter(x=>x.id!==id));
    if (c) showToast("warning","Campaign deleted",`"${c.name}" removed`);
  };

  const toggleReview = (id: string) => {
    setReviews(prev => prev.map(r => {
      if (r.id !== id) return r;
      const next = !r.approved;
      showToast(next?"success":"warning", next?"Review approved":"Review hidden", `${r.customer}'s review updated`);
      return { ...r, approved: next };
    }));
  };

  const createCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const c = { id:`CMP-00${campaigns.length+1}`, name:newName, type:newType, status:"Draft", sent:0, opens:"—", clicks:"—", date:"Jun 23, 2026" };
    setCampaigns(prev => [c, ...prev]);
    setNewName(""); setShowNew(false);
    showToast("success","Campaign created",`"${c.name}" saved as Draft`);
  };

  const SC: Record<string, {bg:string;color:string}> = {
    Active:    {bg:"var(--adm-success-bg)",color:"var(--adm-success)"},
    Completed: {bg:"var(--adm-info-bg)",   color:"var(--adm-info)"},
    Draft:     {bg:"var(--adm-bg-elevated)",color:"var(--adm-text-muted)"}
  };

  return (
    <div style={{maxWidth:1400,margin:"0 auto"}}>
      <div className="adm-page-header">
        <div><h1 className="adm-page-title">Marketing</h1><p className="adm-page-subtitle">Campaigns, reviews, and audience engagement</p></div>
        <button className="adm-btn adm-btn-primary adm-btn-sm" onClick={() => setShowNew(true)}>+ New Campaign</button>
      </div>

      <div className="adm-tabs" style={{marginBottom:18,width:"fit-content",background:"var(--adm-bg-surface)",border:"1px solid var(--adm-border-subtle)"}}>
        {(["campaigns","reviews"] as const).map(t => (
          <div key={t} className={`adm-tab${tab===t?" active":""}`} onClick={() => setTab(t)} style={{padding:"8px 16px"}}>
            {t==="campaigns"?"📣 Campaigns":"⭐ Reviews"}
          </div>
        ))}
      </div>

      {tab === "campaigns" && (
        <div className="adm-card" style={{overflow:"hidden"}}>
          <table className="adm-table">
            <thead><tr><th>Campaign</th><th>Type</th><th>Sent</th><th>Open Rate</th><th>Click Rate</th><th>Status</th><th style={{textAlign:"right"}}>Actions</th></tr></thead>
            <tbody>
              {campaigns.map(c => {
                const sc = SC[c.status] || SC.Draft;
                return (
                  <tr key={c.id}>
                    <td style={{fontWeight:600,color:"var(--adm-text-primary)"}}>{c.name}</td>
                    <td><span style={{fontSize:"0.7rem",background:"var(--adm-bg-elevated)",padding:"2px 8px",borderRadius:999,color:"var(--adm-text-secondary)"}}>{c.type}</span></td>
                    <td style={{fontFamily:"var(--adm-font-mono)"}}>{c.sent.toLocaleString()}</td>
                    <td style={{color:"var(--adm-success)",fontWeight:600}}>{c.opens}</td>
                    <td style={{color:"var(--adm-info)",fontWeight:600}}>{c.clicks}</td>
                    <td><span style={{padding:"3px 9px",borderRadius:999,fontSize:"0.68rem",fontWeight:700,textTransform:"uppercase",background:sc.bg,color:sc.color}}>{c.status}</span></td>
                    <td style={{textAlign:"right",display:"flex",gap:6,justifyContent:"flex-end"}}>
                      {c.status==="Draft" && <button className="adm-btn adm-btn-primary adm-btn-sm" onClick={()=>launchCampaign(c.id)}>Launch</button>}
                      <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={()=>deleteCampaign(c.id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {tab === "reviews" && (
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {reviews.map(r => (
            <div key={r.id} className="adm-card" style={{padding:"16px 18px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:14}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,flexWrap:"wrap"}}>
                    <span style={{fontWeight:700,color:"var(--adm-text-primary)",fontSize:"0.875rem"}}>{r.customer}</span>
                    <span style={{fontSize:"0.7rem",color:"var(--adm-text-muted)"}}>on {r.product}</span>
                    <div style={{display:"flex",gap:1}}>{Array.from({length:5}).map((_,i)=><span key={i} style={{color:i<r.rating?"var(--adm-brand-gold)":"var(--adm-text-disabled)",fontSize:"0.85rem"}}>★</span>)}</div>
                  </div>
                  <p style={{fontSize:"0.82rem",color:"var(--adm-text-secondary)",lineHeight:1.5,margin:0}}>"{r.review}"</p>
                  <div style={{fontSize:"0.68rem",color:"var(--adm-text-muted)",marginTop:6}}>{r.date}</div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:8,flexShrink:0,alignItems:"flex-end"}}>
                  <span style={{padding:"3px 9px",borderRadius:999,fontSize:"0.68rem",fontWeight:700,textTransform:"uppercase",background:r.approved?"var(--adm-success-bg)":"var(--adm-warning-bg)",color:r.approved?"var(--adm-success)":"var(--adm-warning)"}}>
                    {r.approved?"Approved":"Pending"}
                  </span>
                  <button className={`adm-btn adm-btn-sm ${r.approved?"adm-btn-secondary":"adm-btn-primary"}`} onClick={()=>toggleReview(r.id)}>
                    {r.approved?"Hide Review":"Approve"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showNew && (
        <div className="adm-modal-overlay" onClick={() => setShowNew(false)}>
          <div className="adm-modal" onClick={e=>e.stopPropagation()}>
            <div className="adm-modal-header"><span className="adm-modal-title">New Campaign</span><div className="adm-modal-close" onClick={()=>setShowNew(false)}>✕</div></div>
            <form onSubmit={createCampaign}>
              <div className="adm-modal-body" style={{display:"flex",flexDirection:"column",gap:12}}>
                <div className="adm-form-group"><label className="adm-label">Campaign Name *</label><input className="adm-input" required placeholder="e.g. Winter Faith Drop" value={newName} onChange={e=>setNewName(e.target.value)}/></div>
                <div className="adm-form-group"><label className="adm-label">Channel</label><select className="adm-select" value={newType} onChange={e=>setNewType(e.target.value)}><option>Email</option><option>Instagram</option><option>WhatsApp</option><option>Push</option></select></div>
              </div>
              <div className="adm-modal-footer">
                <button type="button" className="adm-btn adm-btn-secondary adm-btn-sm" style={{flex:1}} onClick={()=>setShowNew(false)}>Cancel</button>
                <button type="submit" className="adm-btn adm-btn-primary adm-btn-sm" style={{flex:1}}>Create Campaign</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
