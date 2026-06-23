"use client";
import React, { useState, useEffect } from "react";
import { showToast } from "../use-toast";

const MONTHLY = [
  { month:"Jan", revenue:82000,  orders:34, visitors:1240 },
  { month:"Feb", revenue:96000,  orders:41, visitors:1580 },
  { month:"Mar", revenue:115000, orders:52, visitors:1820 },
  { month:"Apr", revenue:108000, orders:47, visitors:1690 },
  { month:"May", revenue:134000, orders:61, visitors:2100 },
  { month:"Jun", revenue:156000, orders:72, visitors:2480 }
];

const TOP_PRODUCTS = [
  { name:"Armor of Light Heavyweight Tee", revenue:"₹42,890", units:18, growth:"+34%" },
  { name:"Child of God Tee — Black",       revenue:"₹28,400", units:12, growth:"+22%" },
  { name:"Renewal Hoodie — Burgundy",      revenue:"₹19,800", units:7,  growth:"+15%" },
  { name:"Faith Essentials Bundle",         revenue:"₹14,200", units:5,  growth:"+8%"  }
];

const CHANNELS = [
  { label:"Organic Search", pct:42, color:"#670000"  },
  { label:"Instagram",      pct:28, color:"#C09A6B"  },
  { label:"Direct",         pct:18, color:"#22c55e"  },
  { label:"WhatsApp",       pct:12, color:"#3b82f6"  }
];

const maxRev = Math.max(...MONTHLY.map(d => d.revenue));

export default function AdminAnalyticsPage() {
  const [metric, setMetric] = useState<"revenue"|"orders"|"visitors">("revenue");
  const [animated, setAnimated] = useState(false);

  useEffect(() => { setTimeout(() => setAnimated(true), 100); }, []);
  useEffect(() => { setAnimated(false); setTimeout(() => setAnimated(true), 80); }, [metric]);

  const getVal = (d: typeof MONTHLY[0]) => metric==="revenue" ? d.revenue : metric==="orders" ? d.orders*1000 : d.visitors*50;
  const maxVal = Math.max(...MONTHLY.map(getVal));

  const formatVal = (d: typeof MONTHLY[0]) =>
    metric==="revenue" ? `₹${Math.round(d.revenue/1000)}k`
    : metric==="orders" ? `${d.orders}`
    : `${d.visitors.toLocaleString()}`;

  return (
    <div style={{maxWidth:1400,margin:"0 auto"}}>
      <div className="adm-page-header">
        <div><h1 className="adm-page-title">Analytics Reports</h1><p className="adm-page-subtitle">Revenue, traffic, and product performance</p></div>
        <button className="adm-btn adm-btn-primary adm-btn-sm" onClick={() => showToast("success","Report exported","analytics_june_2026.pdf downloaded")}>
          Export Report
        </button>
      </div>

      {/* KPI Summary */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
        {[
          { label:"Monthly Revenue",  value:"₹1,56,000", delta:"+16.4%", color:"var(--adm-brand-burgundy)" },
          { label:"Monthly Orders",   value:"307",       delta:"+12.8%", color:"var(--adm-brand-gold)"     },
          { label:"Avg Order Value",  value:"₹4,700",    delta:"+3.1%",  color:"var(--adm-success)"        },
          { label:"Store Visitors",   value:"9,910",     delta:"+21.5%", color:"var(--adm-info)"           }
        ].map(s => (
          <div key={s.label} className="adm-card" style={{padding:"16px 18px"}}>
            <div style={{fontSize:"0.68rem",color:"var(--adm-text-muted)",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:8}}>{s.label}</div>
            <div style={{fontSize:"1.6rem",fontWeight:800,color:s.color,letterSpacing:"-0.04em"}}>{s.value}</div>
            <div style={{fontSize:"0.7rem",fontWeight:600,color:"var(--adm-success)",marginTop:4}}>↑ {s.delta} vs last period</div>
          </div>
        ))}
      </div>

      {/* Bar Chart with metric switcher */}
      <div className="adm-card" style={{marginBottom:20}}>
        <div className="adm-card-header">
          <div><div className="adm-card-title">Monthly Performance</div><div className="adm-card-subtitle">Last 6 months</div></div>
          <div className="adm-tabs">
            {(["revenue","orders","visitors"] as const).map(m => (
              <div key={m} className={`adm-tab${metric===m?" active":""}`} onClick={() => setMetric(m)} style={{textTransform:"capitalize"}}>{m}</div>
            ))}
          </div>
        </div>
        <div className="adm-card-body">
          <div style={{display:"flex",alignItems:"flex-end",gap:10,height:160,paddingTop:16}}>
            {MONTHLY.map(d => {
              const pct = (getVal(d)/maxVal)*100;
              return (
                <div key={d.month} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:5,height:"100%"}}>
                  <div style={{fontSize:"0.68rem",color:"var(--adm-text-muted)",fontFamily:"var(--adm-font-mono)"}}>{formatVal(d)}</div>
                  <div style={{flex:1,width:"100%",display:"flex",alignItems:"flex-end"}}>
                    <div style={{width:"100%",height:animated?`${pct}%`:"0%",background:"linear-gradient(to top,var(--adm-brand-burgundy),var(--adm-brand-burgundy-mid))",borderRadius:"4px 4px 0 0",transition:"height .5s cubic-bezier(.16,1,.3,1)",minHeight:3}}/>
                  </div>
                  <div style={{fontSize:"0.7rem",color:"var(--adm-text-muted)",fontWeight:600}}>{d.month}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="adm-grid-2">
        <div className="adm-card">
          <div className="adm-card-header"><div className="adm-card-title">Top Products</div></div>
          <div style={{overflow:"hidden"}}>
            <table className="adm-table">
              <thead><tr><th>#</th><th>Product</th><th>Revenue</th><th>Units</th><th>Growth</th></tr></thead>
              <tbody>
                {TOP_PRODUCTS.map((p,i) => (
                  <tr key={p.name}>
                    <td style={{color:"var(--adm-text-muted)",fontWeight:700,fontSize:"0.78rem"}}>{i+1}</td>
                    <td style={{fontWeight:600,color:"var(--adm-text-primary)",maxWidth:180,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</td>
                    <td style={{fontFamily:"var(--adm-font-mono)",fontWeight:700,color:"var(--adm-text-primary)"}}>{p.revenue}</td>
                    <td>{p.units}</td>
                    <td style={{color:"var(--adm-success)",fontWeight:700}}>{p.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="adm-card">
          <div className="adm-card-header"><div className="adm-card-title">Traffic Channels</div></div>
          <div className="adm-card-body">
            {CHANNELS.map(ch => (
              <div key={ch.label} style={{marginBottom:16}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.82rem",marginBottom:5}}>
                  <span style={{color:"var(--adm-text-secondary)",fontWeight:600}}>{ch.label}</span>
                  <span style={{color:"var(--adm-text-primary)",fontWeight:700}}>{ch.pct}%</span>
                </div>
                <div style={{height:6,background:"var(--adm-bg-elevated)",borderRadius:999,overflow:"hidden"}}>
                  <div style={{height:"100%",width:animated?`${ch.pct}%`:"0%",background:ch.color,borderRadius:999,transition:"width .6s cubic-bezier(.16,1,.3,1)"}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
