"use client";
import React, { useState } from "react";
import { showToast } from "../use-toast";

const INIT_MEMBERS = [
  { id:"U001", name:"Samuel Ruven", email:"samuel@ruvenstudio.in", role:"Super Admin",        status:"Active",  lastActive:"Now"          },
  { id:"U002", name:"Grace Thomas", email:"grace@ruvenstudio.in",  role:"Store Manager",       status:"Active",  lastActive:"2 hours ago"  },
  { id:"U003", name:"Aaron Mathew", email:"aaron@ruvenstudio.in",  role:"Content Editor",      status:"Active",  lastActive:"Yesterday"    },
  { id:"U004", name:"Preethi Lal",  email:"preethi@ruven.in",      role:"Warehouse Operator",  status:"Pending", lastActive:"—"            },
];

const ROLES = ["Store Manager","Content Editor","Product Manager","Marketing Manager","Warehouse Operator","Customer Support"];

const LOGS = [
  { user:"Samuel Ruven", action:"Published product: Armor of Light Tee",      time:"5 min ago",  type:"product" },
  { user:"Grace Thomas", action:"Updated order #RS-1041 → Shipped",           time:"1 hour ago", type:"order"   },
  { user:"Aaron Mathew", action:"Saved draft: Romans 13 Devotional",          time:"3 hours ago",type:"content" },
  { user:"Samuel Ruven", action:"Sent invite to preethi@ruven.in",            time:"Yesterday",  type:"team"    },
  { user:"Grace Thomas", action:"Applied discount ARMOR20 to order #RS-1040", time:"Yesterday",  type:"order"   },
];

const LOG_ICONS: Record<string, string> = { product:"📦", order:"🛍️", content:"✍️", team:"👤" };
const STATUS_COL = (s: string) => s==="Active"
  ? {bg:"var(--adm-success-bg)",color:"var(--adm-success)"}
  : s==="Pending"
  ? {bg:"var(--adm-warning-bg)",color:"var(--adm-warning)"}
  : {bg:"var(--adm-bg-elevated)",color:"var(--adm-text-muted)"};

export default function AdminTeamPage() {
  const [members, setMembers]     = useState(INIT_MEMBERS);
  const [tab, setTab]             = useState<"members"|"logs">("members");
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole,  setInviteRole]  = useState("Store Manager");

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    const firstName = inviteEmail.split("@")[0].replace(/[._]/g," ").replace(/\b\w/g,c=>c.toUpperCase());
    const newMember = { id:`U00${members.length+1}`, name:firstName, email:inviteEmail, role:inviteRole, status:"Pending", lastActive:"—" };
    setMembers(prev => [...prev, newMember]);
    setInviteEmail(""); setShowInvite(false);
    showToast("success","Invitation sent",`${inviteEmail} invited as ${inviteRole}`);
  };

  const removeMember = (id: string) => {
    const m = members.find(x=>x.id===id);
    setMembers(prev => prev.filter(x=>x.id!==id));
    if (m) showToast("warning","Member removed",`${m.name} removed from team`);
  };

  const changeRole = (id: string, newRole: string) => {
    setMembers(prev => prev.map(m => m.id===id ? {...m, role:newRole} : m));
    const m = members.find(x=>x.id===id);
    if (m) showToast("success","Role updated",`${m.name} → ${newRole}`);
  };

  return (
    <div style={{maxWidth:1400,margin:"0 auto"}}>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Team</h1>
          <p className="adm-page-subtitle">Users, roles, and access management</p>
        </div>
        <button className="adm-btn adm-btn-primary adm-btn-sm" onClick={() => setShowInvite(true)}>+ Invite Member</button>
      </div>

      {/* Tabs */}
      <div className="adm-tabs" style={{marginBottom:18,width:"fit-content",background:"var(--adm-bg-surface)",border:"1px solid var(--adm-border-subtle)"}}>
        {(["members","logs"] as const).map(t => (
          <div key={t} className={`adm-tab${tab===t?" active":""}`} onClick={() => setTab(t)} style={{padding:"8px 16px"}}>
            {t==="members"?"👥 Team Members":"📋 Activity Logs"}
          </div>
        ))}
      </div>

      {tab === "members" && (
        <div className="adm-card" style={{overflow:"hidden"}}>
          <table className="adm-table">
            <thead><tr><th>Member</th><th>Role</th><th>Status</th><th>Last Active</th><th style={{textAlign:"right"}}>Actions</th></tr></thead>
            <tbody>
              {members.map(m => {
                const isOwner = m.role === "Super Admin";
                const sc = STATUS_COL(m.status);
                return (
                  <tr key={m.id}>
                    <td>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <div style={{width:34,height:34,borderRadius:"50%",background:isOwner?"linear-gradient(135deg,var(--adm-brand-burgundy),var(--adm-brand-gold))":"var(--adm-bg-elevated)",border:isOwner?"none":"1px solid var(--adm-border-normal)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.72rem",fontWeight:700,color:isOwner?"#fff":"var(--adm-text-muted)",flexShrink:0}}>
                          {m.name.split(" ").map(w=>w[0]).join("").slice(0,2)}
                        </div>
                        <div>
                          <div style={{fontWeight:600,color:"var(--adm-text-primary)",fontSize:"0.85rem"}}>{m.name}</div>
                          <div style={{fontSize:"0.7rem",color:"var(--adm-text-muted)"}}>{m.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {isOwner ? (
                        <span style={{fontSize:"0.72rem",padding:"3px 8px",borderRadius:"var(--adm-radius-sm)",background:"var(--adm-brand-burgundy-glow)",color:"var(--adm-brand-burgundy-light)",fontWeight:700}}>Super Admin</span>
                      ) : (
                        <select value={m.role} onChange={e=>changeRole(m.id, e.target.value)}
                          style={{background:"var(--adm-bg-elevated)",border:"1px solid var(--adm-border-subtle)",borderRadius:"var(--adm-radius-sm)",color:"var(--adm-text-secondary)",padding:"3px 8px",fontSize:"0.78rem",fontFamily:"var(--adm-font-sans)",cursor:"pointer",outline:"none"}}>
                          {ROLES.map(r=><option key={r}>{r}</option>)}
                        </select>
                      )}
                    </td>
                    <td><span style={{padding:"3px 9px",borderRadius:999,fontSize:"0.68rem",fontWeight:700,textTransform:"uppercase",background:sc.bg,color:sc.color}}>{m.status}</span></td>
                    <td style={{fontSize:"0.78rem",color:"var(--adm-text-muted)"}}>{m.lastActive}</td>
                    <td style={{textAlign:"right"}}>
                      {!isOwner && <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={()=>removeMember(m.id)}>Remove</button>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {tab === "logs" && (
        <div className="adm-card">
          <div className="adm-card-body">
            <div className="adm-activity-feed">
              {LOGS.map((log, i) => (
                <div key={i} className="adm-activity-item">
                  <div className="adm-activity-icon"><span>{LOG_ICONS[log.type]||"⚡"}</span></div>
                  <div style={{flex:1}}>
                    <div className="adm-activity-title">
                      <strong style={{color:"var(--adm-text-primary)"}}>{log.user}</strong> — {log.action}
                    </div>
                    <div className="adm-activity-time">{log.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showInvite && (
        <div className="adm-modal-overlay" onClick={() => setShowInvite(false)}>
          <div className="adm-modal" onClick={e=>e.stopPropagation()}>
            <div className="adm-modal-header">
              <span className="adm-modal-title">Invite Team Member</span>
              <div className="adm-modal-close" onClick={() => setShowInvite(false)}>✕</div>
            </div>
            <form onSubmit={handleInvite}>
              <div className="adm-modal-body" style={{display:"flex",flexDirection:"column",gap:12}}>
                <div className="adm-form-group">
                  <label className="adm-label">Email Address *</label>
                  <input className="adm-input" type="email" required placeholder="colleague@ruvenstudio.in" value={inviteEmail} onChange={e=>setInviteEmail(e.target.value)}/>
                </div>
                <div className="adm-form-group">
                  <label className="adm-label">Assign Role</label>
                  <select className="adm-select" value={inviteRole} onChange={e=>setInviteRole(e.target.value)}>
                    {ROLES.map(r=><option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <div className="adm-modal-footer">
                <button type="button" className="adm-btn adm-btn-secondary adm-btn-sm" style={{flex:1}} onClick={()=>setShowInvite(false)}>Cancel</button>
                <button type="submit" className="adm-btn adm-btn-primary adm-btn-sm" style={{flex:1}}>Send Invitation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
