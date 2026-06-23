"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "./use-toast";

// ─── Static data ─────────────────────────────────────────────────────────────
const CHART_DATA = {
  "7D": {
    total: "₹1,24,890", change: "+23.1%",
    bars: [
      { day:"Mon", pct:40 }, { day:"Tue", pct:62 }, { day:"Wed", pct:48 },
      { day:"Thu", pct:80 }, { day:"Fri", pct:55 }, { day:"Sat", pct:100 }, { day:"Sun", pct:70 }
    ]
  },
  "30D": {
    total: "₹5,84,200", change: "+18.3%",
    bars: [{ day:"W1",pct:50},{ day:"W2",pct:65},{ day:"W3",pct:80},{ day:"W4",pct:100}]
  },
  "90D": {
    total: "₹18,36,700", change: "+34.7%",
    bars: [{ day:"Jan",pct:55},{ day:"Feb",pct:70},{ day:"Mar",pct:100}]
  }
};

const PENDING_ORDERS = [
  { id:"#RS-1042", customer:"Priya S.",  amount:"₹2,890", status:"Pending",    badge:"warning" },
  { id:"#RS-1041", customer:"Rahul M.",  amount:"₹1,450", status:"Processing", badge:"info"    },
  { id:"#RS-1040", customer:"Anjali K.", amount:"₹3,200", status:"Pending",    badge:"warning" },
  { id:"#RS-1039", customer:"Vikram D.", amount:"₹980",   status:"Shipped",    badge:"success" }
];

const ACTIVITY = [
  { icon:"🛍️", text:"New order #RS-1042", sub:"₹2,890 from Priya S.",                    time:"2 min ago"  },
  { icon:"📦", text:"Product published",   sub:"Child of God Tee (Black)",                time:"14 min ago" },
  { icon:"👤", text:"New customer",        sub:"Rahul Mehta signed up",                   time:"1 hour ago" },
  { icon:"✍️", text:"Article drafted",     sub:"\"Romans 13: Put on the Armor\"",         time:"3 hours ago"}
];

const LOW_STOCK = [
  { name:"Armor of Light Tee — White / M", pct:15, count:"3 left",  level:"low" },
  { name:"Child of God Tee — Black / L",   pct:35, count:"7 left",  level:"mid" }
];

const DONUT_SEGMENTS = [
  { label:"Organic",   pct:42, color:"#670000",  dash:42,  offset:25  },
  { label:"Instagram", pct:28, color:"#C09A6B",  dash:28,  offset:-17 },
  { label:"Direct",    pct:18, color:"#22c55e",  dash:18,  offset:-45 },
  { label:"WhatsApp",  pct:12, color:"#3b82f6",  dash:12,  offset:-63 }
];

export default function AdminDashboardPage() {
  const router   = useRouter();
  const [tab,    setTab]    = useState<"7D"|"30D"|"90D">("7D");
  const [greeting, setGreeting] = useState("Good morning");
  const [animBars, setAnimBars] = useState(false);

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening");
    // Trigger bar animation
    setTimeout(() => setAnimBars(true), 100);
  }, []);

  // Retrigger bar animation on tab change
  useEffect(() => {
    setAnimBars(false);
    const t = setTimeout(() => setAnimBars(true), 80);
    return () => clearTimeout(t);
  }, [tab]);

  const data = CHART_DATA[tab];

  return (
    <div style={{ maxWidth:1400, margin:"0 auto" }}>

      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">{greeting}, Admin 👋</h1>
          <p className="adm-page-subtitle">Here&apos;s what&apos;s happening with Ruven Studio today.</p>
        </div>
        <div className="adm-page-actions">
          <button
            className="adm-btn adm-btn-secondary adm-btn-sm"
            onClick={() => showToast("info","Date filter","Date picker coming soon")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:13,height:13}}>
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Last 30 days
          </button>
          <button
            className="adm-btn adm-btn-primary adm-btn-sm"
            onClick={() => showToast("success","Report exported","analytics_report.csv downloaded")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:13,height:13}}>
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export
          </button>
        </div>
      </div>

      {/* ── KPI CARDS ────────────────────────────────────────────────────── */}
      <div className="adm-stats-grid">
        {[
          { label:"Revenue Today",    value:"₹24,890", change:"+18.4%", dir:"up", accent:"burgundy", iconBg:"var(--adm-brand-burgundy-glow)", icon:"#", iconColor:"var(--adm-brand-burgundy-light)", desc:"vs yesterday" },
          { label:"Orders Today",     value:"47",      change:"+7",     dir:"up", accent:"gold",     iconBg:"var(--adm-brand-gold-dim)",      icon:"✓", iconColor:"var(--adm-brand-gold)",           desc:"from yesterday" },
          { label:"Visitors Today",   value:"1,842",   change:"+12.2%", dir:"up", accent:"success",  iconBg:"var(--adm-success-bg)",          icon:"👥", iconColor:"var(--adm-success)",             desc:"this week" },
          { label:"Conversion Rate",  value:"2.55%",   change:"−0.3%",  dir:"down", accent:"info",  iconBg:"var(--adm-info-bg)",             icon:"📈", iconColor:"var(--adm-info)",               desc:"vs last week" }
        ].map((s) => (
          <div key={s.label} className="adm-stat-card" onClick={() => router.push("/admin/analytics")} style={{cursor:"pointer"}}>
            <div className={`adm-stat-accent adm-accent-${s.accent}`}/>
            <div className="adm-stat-header">
              <span className="adm-stat-label">{s.label}</span>
              <div className="adm-stat-icon" style={{background:s.iconBg}}>
                <span style={{fontSize:"0.9rem"}}>{s.icon}</span>
              </div>
            </div>
            <div className="adm-stat-value">{s.value}</div>
            <div className={`adm-stat-change ${s.dir}`}>
              <span>{s.dir === "up" ? "↑" : "↓"}</span>
              {s.change} {s.desc}
            </div>
          </div>
        ))}
      </div>

      {/* ── QUICK ACTIONS ─────────────────────────────────────────────────── */}
      <div className="adm-quick-actions">
        {[
          { icon:"➕", label:"New Product",  color:"var(--adm-brand-burgundy-glow)", href:"/admin/products"  },
          { icon:"✍️", label:"Write Article", color:"var(--adm-brand-gold-dim)",      href:"/admin/content"   },
          { icon:"📋", label:"View Orders",  color:"var(--adm-info-bg)",             href:"/admin/orders"    },
          { icon:"🏷️", label:"Add Discount", color:"var(--adm-success-bg)",          href:"/admin/discounts" },
          { icon:"🖼️", label:"Upload Media", color:"var(--adm-warning-bg)",          href:"/admin/media"     },
          { icon:"📊", label:"Analytics",   color:"rgba(139,92,246,.12)",            href:"/admin/analytics" }
        ].map(qa => (
          <div key={qa.label} className="adm-qa" onClick={() => router.push(qa.href)}>
            <div className="adm-qa-icon" style={{background:qa.color}}>
              <span style={{fontSize:"1.1rem"}}>{qa.icon}</span>
            </div>
            <span className="adm-qa-label">{qa.label}</span>
          </div>
        ))}
      </div>

      {/* ── CHARTS ROW ────────────────────────────────────────────────────── */}
      <div className="adm-chart-grid">

        {/* Revenue Overview */}
        <div className="adm-card">
          <div className="adm-card-header">
            <div>
              <div className="adm-card-title">Revenue Overview</div>
              <div className="adm-card-subtitle">Period performance</div>
            </div>
            <div className="adm-tabs">
              {(["7D","30D","90D"] as const).map(t => (
                <div key={t} className={`adm-tab${tab===t?" active":""}`} onClick={() => setTab(t)}>{t}</div>
              ))}
            </div>
          </div>
          <div className="adm-card-body">
            {/* Summary */}
            <div style={{display:"flex",gap:24,marginBottom:12}}>
              <div>
                <div style={{fontSize:"1.6rem",fontWeight:800,letterSpacing:"-0.04em",color:"var(--adm-text-primary)"}}>{data.total}</div>
                <div style={{fontSize:"0.68rem",color:"var(--adm-text-muted)"}}>Total Revenue</div>
              </div>
              <div>
                <div style={{fontSize:"1.6rem",fontWeight:800,letterSpacing:"-0.04em",color:"var(--adm-success)"}}>{data.change}</div>
                <div style={{fontSize:"0.68rem",color:"var(--adm-text-muted)"}}>vs last period</div>
              </div>
            </div>

            {/* SVG Sparkline */}
            <svg viewBox="0 0 400 120" preserveAspectRatio="none" style={{width:"100%",height:80,display:"block"}}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#670000" stopOpacity="0.35"/>
                  <stop offset="100%" stopColor="#670000" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d="M0,110 C60,95 90,55 140,45 S200,25 240,35 S310,15 350,10 S390,15 400,12 L400,120 L0,120 Z" fill="url(#revGrad)"/>
              <path d="M0,110 C60,95 90,55 140,45 S200,25 240,35 S310,15 350,10 S390,15 400,12" fill="none" stroke="#670000" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="400" cy="12" r="4" fill="#670000"/>
            </svg>

            {/* Bar Chart */}
            <div className="adm-bar-chart">
              {data.bars.map((b, i) => (
                <div key={b.day+tab} className="adm-bar-group">
                  <div
                    className="adm-bar adm-bar-primary"
                    style={{height: animBars ? `${b.pct}%` : "0%", opacity: i===data.bars.length-1 ? 0.45 : 1}}
                  />
                  <div className="adm-bar-label">{b.day}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traffic Sources Donut */}
        <div className="adm-card">
          <div className="adm-card-header">
            <div>
              <div className="adm-card-title">Traffic Sources</div>
              <div className="adm-card-subtitle">Today&apos;s visitors</div>
            </div>
          </div>
          <div className="adm-card-body">
            <div className="adm-donut-wrapper">
              {/* Donut SVG */}
              <div style={{position:"relative",width:130,height:130,flexShrink:0}}>
                <svg viewBox="0 0 42 42" style={{width:130,height:130,transform:"rotate(-90deg)"}}>
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--adm-bg-elevated)" strokeWidth="5"/>
                  {DONUT_SEGMENTS.map(seg => (
                    <circle key={seg.label} cx="21" cy="21" r="15.9" fill="none"
                      stroke={seg.color} strokeWidth="5"
                      strokeDasharray={`${seg.dash} ${100-seg.dash}`}
                      strokeDashoffset={seg.offset}
                    />
                  ))}
                </svg>
                {/* Center label */}
                <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                  <div style={{fontSize:"1.1rem",fontWeight:800,color:"var(--adm-text-primary)",lineHeight:1}}>1,842</div>
                  <div style={{fontSize:"0.55rem",color:"var(--adm-text-muted)",textTransform:"uppercase",letterSpacing:"0.06em",marginTop:2}}>Visitors</div>
                </div>
              </div>
              {/* Legend */}
              <div className="adm-donut-legend">
                {DONUT_SEGMENTS.map(seg => (
                  <div key={seg.label} className="adm-legend-item">
                    <div className="adm-legend-dot" style={{background:seg.color}}/>
                    <span className="adm-legend-label">{seg.label}</span>
                    <span className="adm-legend-value">{seg.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM ROW ───────────────────────────────────────────────────── */}
      <div className="adm-grid-2">

        {/* Pending Orders */}
        <div className="adm-card">
          <div className="adm-card-header">
            <div>
              <div className="adm-card-title">Pending Orders</div>
              <div className="adm-card-subtitle">Require attention</div>
            </div>
            <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => router.push("/admin/orders")}>
              View all →
            </button>
          </div>
          <div style={{overflowX:"auto"}}>
            <table className="adm-table">
              <thead>
                <tr><th>Order</th><th>Customer</th><th>Amount</th><th>Status</th></tr>
              </thead>
              <tbody>
                {PENDING_ORDERS.map(o => (
                  <tr key={o.id} onClick={() => router.push("/admin/orders")}>
                    <td className="adm-td-primary">{o.id}</td>
                    <td>{o.customer}</td>
                    <td style={{fontFamily:"var(--adm-font-mono)",fontWeight:600,color:"var(--adm-text-primary)"}}>{o.amount}</td>
                    <td>
                      <span className={`adm-badge adm-badge-${o.badge}`}>
                        <span className="adm-badge-dot"/>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="adm-card">
          <div className="adm-card-header">
            <div className="adm-card-title">Recent Activity</div>
            <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => showToast("info","Activity log","Full audit log coming soon")}>View all</button>
          </div>
          <div className="adm-card-body">
            <div className="adm-activity-feed">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="adm-activity-item">
                  <div className="adm-activity-icon"><span>{a.icon}</span></div>
                  <div style={{flex:1}}>
                    <div className="adm-activity-title">
                      <strong style={{color:"var(--adm-text-primary)"}}>{a.text}</strong>
                      <span style={{color:"var(--adm-text-muted)"}}> — {a.sub}</span>
                    </div>
                    <div className="adm-activity-time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── LOW STOCK ALERT ──────────────────────────────────────────────── */}
      <div className="adm-card" style={{marginBottom:24,borderColor:"rgba(245,158,11,.25)"}}>
        <div className="adm-card-header">
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:"1.1rem"}}>⚠️</span>
            <div>
              <div className="adm-card-title">Low Stock Alert</div>
              <div className="adm-card-subtitle">These products need restocking soon</div>
            </div>
          </div>
          <button className="adm-btn adm-btn-secondary adm-btn-sm" onClick={() => showToast("success","Restock requested","Bulk restock order sent to warehouse")}>
            Bulk Restock
          </button>
        </div>
        <div style={{padding:"14px 18px",display:"flex",flexDirection:"column",gap:12}}>
          {LOW_STOCK.map(item => (
            <div key={item.name} style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:36,height:36,background:"var(--adm-bg-elevated)",borderRadius:"var(--adm-radius-sm)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",flexShrink:0}}>👕</div>
              <div style={{flex:1}}>
                <div style={{fontSize:"0.82rem",fontWeight:600,color:"var(--adm-text-primary)"}}>{item.name}</div>
              </div>
              <div style={{width:120}}>
                <div className={`adm-stock-bar adm-stock-${item.level}`}>
                  <div className="adm-stock-fill" style={{width:`${item.pct}%`}}/>
                </div>
                <span style={{fontSize:"0.68rem",fontWeight:700,color:item.level==="low"?"var(--adm-error)":"var(--adm-warning)"}}>{item.count}</span>
              </div>
              <button
                className="adm-btn adm-btn-secondary adm-btn-sm"
                onClick={() => showToast("success","Restock requested", `${item.name} — restock sent to warehouse`)}
              >Restock</button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
