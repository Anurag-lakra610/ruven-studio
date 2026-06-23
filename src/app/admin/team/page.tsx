"use client";
import React, { useState } from "react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Pending" | "Inactive";
  lastActive: string;
}

const ROLES = ["Super Admin", "Store Manager", "Content Editor", "Product Manager", "Marketing Manager", "Warehouse Operator", "Customer Support"];

const TEAM_MEMBERS: TeamMember[] = [
  { id: "U001", name: "Samuel Ruven", email: "samuel@ruvenstudio.in", role: "Super Admin", status: "Active", lastActive: "Now" },
  { id: "U002", name: "Grace Thomas", email: "grace@ruvenstudio.in", role: "Store Manager", status: "Active", lastActive: "2 hours ago" },
  { id: "U003", name: "Aaron Mathew", email: "aaron@ruvenstudio.in", role: "Content Editor", status: "Active", lastActive: "Yesterday" },
  { id: "U004", name: "Preethi Lal", email: "preethi@ruven.in", role: "Warehouse Operator", status: "Pending", lastActive: "—" },
];

const ACTIVITY_LOGS = [
  { user: "Samuel Ruven", action: "Published product: Armor of Light Tee", time: "5 min ago", type: "product" },
  { user: "Grace Thomas", action: "Updated order #RS-1041 status to Shipped", time: "1 hour ago", type: "order" },
  { user: "Aaron Mathew", action: "Saved draft: Romans 13 Devotional", time: "3 hours ago", type: "content" },
  { user: "Samuel Ruven", action: "Sent team invite to preethi@ruven.in", time: "Yesterday", type: "team" },
];

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Store Manager");
  const [activeTab, setActiveTab] = useState<"members" | "logs">("members");

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    const firstName = inviteEmail.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    setMembers(prev => [...prev, {
      id: `U00${prev.length + 1}`,
      name: firstName,
      email: inviteEmail,
      role: inviteRole,
      status: "Pending",
      lastActive: "—"
    }]);
    alert(`Invitation sent to ${inviteEmail}`);
    setInviteEmail("");
    setShowInvite(false);
  };

  const removeMember = (id: string) => {
    if (confirm("Remove this team member?")) {
      setMembers(prev => prev.filter(m => m.id !== id));
    }
  };

  const statusColor = (s: string) =>
    s === "Active" ? { bg: "var(--adm-success-bg)", color: "var(--adm-success)" }
    : s === "Pending" ? { bg: "var(--adm-warning-bg)", color: "var(--adm-warning)" }
    : { bg: "var(--adm-bg-elevated)", color: "var(--adm-text-muted)" };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Team</h1>
          <p className="adm-page-subtitle">Users, roles, and access management</p>
        </div>
        <button className="adm-btn adm-btn-primary adm-btn-sm" onClick={() => setShowInvite(true)}>
          + Invite Member
        </button>
      </div>

      {/* Tabs */}
      <div className="adm-tabs" style={{ marginBottom: 20, width: "fit-content", background: "var(--adm-bg-surface)", border: "1px solid var(--adm-border-subtle)" }}>
        {(["members", "logs"] as const).map(t => (
          <div key={t} className={`adm-tab${activeTab === t ? " active" : ""}`} onClick={() => setActiveTab(t)} style={{ padding: "8px 18px", textTransform: "capitalize" }}>
            {t === "members" ? "👥 Team Members" : "📋 Activity Logs"}
          </div>
        ))}
      </div>

      {activeTab === "members" && (
        <div className="adm-card" style={{ overflow: "hidden" }}>
          <table className="adm-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Active</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(m => {
                const sc = statusColor(m.status);
                const isOwner = m.role === "Super Admin";
                return (
                  <tr key={m.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: "50%", background: isOwner ? "linear-gradient(135deg, var(--adm-brand-burgundy), var(--adm-brand-gold))" : "var(--adm-bg-elevated)", border: isOwner ? "none" : "1px solid var(--adm-border-normal)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: isOwner ? "#fff" : "var(--adm-text-muted)", flexShrink: 0 }}>
                          {m.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: "var(--adm-text-primary)", fontSize: "0.85rem" }}>{m.name}</div>
                          <div style={{ fontSize: "0.7rem", color: "var(--adm-text-muted)" }}>{m.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: "0.72rem", padding: "3px 8px", borderRadius: "var(--adm-radius-sm)", background: isOwner ? "var(--adm-brand-burgundy-glow)" : "var(--adm-bg-elevated)", color: isOwner ? "var(--adm-brand-burgundy-light)" : "var(--adm-text-secondary)", fontWeight: 600 }}>
                        {m.role}
                      </span>
                    </td>
                    <td>
                      <span style={{ padding: "3px 9px", borderRadius: 999, fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", background: sc.bg, color: sc.color }}>
                        {m.status}
                      </span>
                    </td>
                    <td style={{ fontSize: "0.78rem", color: "var(--adm-text-muted)" }}>{m.lastActive}</td>
                    <td style={{ textAlign: "right" }}>
                      {!isOwner && (
                        <button className="adm-btn adm-btn-secondary adm-btn-sm" onClick={() => removeMember(m.id)} style={{ color: "var(--adm-error)" }}>
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "logs" && (
        <div className="adm-card">
          <div className="adm-card-body">
            <div className="adm-activity-feed">
              {ACTIVITY_LOGS.map((log, i) => {
                const icons: Record<string, string> = { product: "📦", order: "🛍️", content: "✍️", team: "👤" };
                return (
                  <div key={i} className="adm-activity-item">
                    <div className="adm-activity-icon">
                      <span>{icons[log.type] || "⚡"}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="adm-activity-title">
                        <strong style={{ color: "var(--adm-text-primary)" }}>{log.user}</strong> — {log.action}
                      </div>
                      <div className="adm-activity-time">{log.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInvite && (
        <div className="adm-modal-overlay" onClick={() => setShowInvite(false)}>
          <div className="adm-modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--adm-border-subtle)", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700, color: "var(--adm-text-primary)" }}>Invite Team Member</span>
              <div style={{ cursor: "pointer", color: "var(--adm-text-muted)" }} onClick={() => setShowInvite(false)}>✕</div>
            </div>
            <form onSubmit={handleInvite} style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--adm-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="colleague@ruvenstudio.in"
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--adm-radius-md)", background: "var(--adm-bg-elevated)", border: "1px solid var(--adm-border-normal)", color: "var(--adm-text-primary)", fontFamily: "var(--adm-font-sans)", fontSize: "0.875rem" }}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--adm-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>Assign Role</label>
                <select value={inviteRole} onChange={e => setInviteRole(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--adm-radius-md)", background: "var(--adm-bg-elevated)", border: "1px solid var(--adm-border-normal)", color: "var(--adm-text-primary)", fontFamily: "var(--adm-font-sans)" }}>
                  {ROLES.filter(r => r !== "Super Admin").map(r => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="adm-btn adm-btn-primary" style={{ width: "100%" }}>
                Send Invitation
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
