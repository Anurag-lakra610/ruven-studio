"use client";
import React, { useState } from "react";
import { showToast } from "../use-toast";

const INIT_PRAYER = [
  { id:"PR001", name:"Anjali Verma",   request:"Praying for my family's health and for God's peace in our home.", date:"Jun 23, 2026", status:"Pending", urgent:true  },
  { id:"PR002", name:"Michael Thomas", request:"Please pray for my job interview next week. I trust in His plans.", date:"Jun 22, 2026", status:"Prayed",  urgent:false },
  { id:"PR003", name:"Sunita Rajan",   request:"Seeking prayer for my son's recovery from surgery.", date:"Jun 22, 2026", status:"Pending", urgent:true  },
  { id:"PR004", name:"David Samuel",   request:"Grateful for answered prayers. Praying for our church's growth.", date:"Jun 21, 2026", status:"Prayed",  urgent:false },
  { id:"PR005", name:"Anonymous",      request:"Please pray for healing from anxiety and depression.", date:"Jun 20, 2026", status:"Pending", urgent:false },
];

export default function AdminCommunityPage() {
  const [requests, setRequests] = useState(INIT_PRAYER);
  const [filter, setFilter]     = useState("All");

  const togglePrayed = (id: string) => {
    setRequests(prev => prev.map(r => {
      if (r.id !== id) return r;
      const next = r.status === "Prayed" ? "Pending" : "Prayed";
      showToast(next==="Prayed"?"success":"info", next==="Prayed"?"Marked as prayed 🙏":"Reopened request", `${r.name}'s request updated`);
      return { ...r, status: next };
    }));
  };

  const filtered = filter === "All" ? requests : requests.filter(r => r.status === filter);
  const pending  = requests.filter(r => r.status === "Pending").length;
  const prayed   = requests.filter(r => r.status === "Prayed").length;

  return (
    <div style={{maxWidth:1400,margin:"0 auto"}}>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Community</h1>
          <p className="adm-page-subtitle">Prayer requests and faith community engagement</p>
        </div>
        <button className="adm-btn adm-btn-primary adm-btn-sm" onClick={() => {
          setRequests(prev => prev.map(r => ({...r, status:"Prayed"})));
          showToast("success","All marked as prayed 🙏","All pending requests resolved");
        }}>
          Pray All
        </button>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20}}>
        {[
          { label:"Total Requests", value:requests.length, color:"var(--adm-brand-gold)" },
          { label:"Pending Prayer",  value:pending,          color:"var(--adm-warning)"   },
          { label:"Prayed Over",     value:prayed,           color:"var(--adm-success)"   }
        ].map(s => (
          <div key={s.label} className="adm-card" style={{padding:"16px 18px",cursor:"pointer"}} onClick={() => setFilter(s.label==="Pending Prayer"?"Pending":s.label==="Prayed Over"?"Prayed":"All")}>
            <div style={{fontSize:"1.8rem",fontWeight:800,color:s.color,letterSpacing:"-0.04em"}}>{s.value}</div>
            <div style={{fontSize:"0.68rem",color:"var(--adm-text-muted)",textTransform:"uppercase",letterSpacing:"0.07em",marginTop:4}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="adm-tabs" style={{marginBottom:18,width:"fit-content",background:"var(--adm-bg-surface)",border:"1px solid var(--adm-border-subtle)"}}>
        {["All","Pending","Prayed"].map(f => (
          <div key={f} className={`adm-tab${filter===f?" active":""}`} onClick={() => setFilter(f)} style={{padding:"8px 16px"}}>
            {f} {f==="Pending"&&pending>0&&<span style={{background:"var(--adm-brand-burgundy)",color:"#fff",borderRadius:999,padding:"1px 5px",fontSize:"0.6rem",marginLeft:4}}>{pending}</span>}
          </div>
        ))}
      </div>

      {/* Prayer Cards */}
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {filtered.map(req => (
          <div key={req.id} className="adm-card" style={{padding:"16px 18px",borderColor:req.urgent&&req.status==="Pending"?"rgba(245,158,11,.3)":undefined}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:14}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,flexWrap:"wrap"}}>
                  <span style={{fontSize:"1.1rem"}}>🙏</span>
                  <span style={{fontWeight:700,color:"var(--adm-text-primary)",fontSize:"0.875rem"}}>{req.name}</span>
                  {req.urgent&&req.status==="Pending"&&<span style={{padding:"2px 8px",borderRadius:999,fontSize:"0.62rem",fontWeight:700,textTransform:"uppercase",background:"var(--adm-warning-bg)",color:"var(--adm-warning)"}}>Urgent</span>}
                  <span style={{fontSize:"0.68rem",color:"var(--adm-text-muted)",marginLeft:"auto"}}>{req.date}</span>
                </div>
                <p style={{fontSize:"0.85rem",color:"var(--adm-text-secondary)",lineHeight:1.6,fontStyle:"italic",margin:0}}>
                  &ldquo;{req.request}&rdquo;
                </p>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8,flexShrink:0}}>
                <span style={{padding:"3px 9px",borderRadius:999,fontSize:"0.68rem",fontWeight:700,textTransform:"uppercase",background:req.status==="Prayed"?"var(--adm-success-bg)":"var(--adm-warning-bg)",color:req.status==="Prayed"?"var(--adm-success)":"var(--adm-warning)",textAlign:"center"}}>
                  {req.status==="Prayed"?"✓ Prayed":"⏳ Pending"}
                </span>
                <button className={`adm-btn adm-btn-sm ${req.status==="Pending"?"adm-btn-primary":"adm-btn-secondary"}`} onClick={() => togglePrayed(req.id)}>
                  {req.status==="Pending"?"Mark Prayed":"Reopen"}
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="adm-empty">
            <div className="adm-empty-icon">🙏</div>
            <div className="adm-empty-title">No requests here</div>
            <div className="adm-empty-desc">All prayer requests in this category have been handled.</div>
          </div>
        )}
      </div>
    </div>
  );
}
