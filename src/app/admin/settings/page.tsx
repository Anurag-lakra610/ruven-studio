"use client";

import React, { useState } from "react";
import { Settings, Shield, Mail, ArrowRight, Plus, Trash2, Send, CheckCircle2, ShieldCheck } from "lucide-react";

interface Permission {
  key: string;
  name: string;
}

interface RolePermissions {
  role: string;
  permissions: string[];
}

interface Invitation {
  id: string;
  email: string;
  role: string;
  status: "Pending" | "Expired" | "Accepted";
}

interface RedirectLog {
  id: string;
  source: string;
  destination: string;
  code: 301 | 302;
}

export default function AdminSettingsPage() {
  // Mock permissions list
  const permissionsList: Permission[] = [
    { key: "PRODUCTS_CREATE", name: "Create product listings" },
    { key: "PRODUCTS_PUBLISH", name: "Publish products to storefront" },
    { key: "PRODUCTS_DELETE", name: "Delete product records" },
    { key: "ORDERS_REFUND", name: "Process order payment refunds" },
    { key: "ARTICLES_PUBLISH", name: "Publish devotionals to Journal" },
    { key: "SETTINGS_GATEWAY", name: "Update Razorpay API gateways keys" }
  ];

  // RBAC roles permissions mappings state
  const [roleMappings, setRoleMappings] = useState<RolePermissions[]>([
    { role: "Super Admin", permissions: ["PRODUCTS_CREATE", "PRODUCTS_PUBLISH", "PRODUCTS_DELETE", "ORDERS_REFUND", "ARTICLES_PUBLISH", "SETTINGS_GATEWAY"] },
    { role: "Store Manager", permissions: ["PRODUCTS_CREATE", "PRODUCTS_PUBLISH", "PRODUCTS_DELETE"] },
    { role: "Content Editor", permissions: ["ARTICLES_PUBLISH"] },
    { role: "Warehouse Operator", permissions: [] }
  ]);

  // Invites state
  const [invites, setInvites] = useState<Invitation[]>([
    { id: "1", email: "editor@ruvenstudio.in", role: "Content Editor", status: "Pending" },
    { id: "2", email: "fulfilment@ruven.in", role: "Warehouse Operator", status: "Pending" }
  ]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Store Manager");

  // Redirects log state
  const [redirects, setRedirects] = useState<RedirectLog[]>([
    { id: "1", source: "/shop/oversized", destination: "/shop?category=oversized-tees", code: 301 },
    { id: "2", source: "/devotion/armor", destination: "/journal/the-armor-of-light", code: 301 }
  ]);
  const [redirectSource, setRedirectSource] = useState("");
  const [redirectDest, setRedirectDest] = useState("");
  const [redirectCode, setRedirectCode] = useState<301 | 302>(301);

  // Toggle RBAC perms
  const handlePermissionToggle = (roleName: string, permKey: string) => {
    setRoleMappings(prev =>
      prev.map(mapping => {
        if (mapping.role === roleName) {
          const hasPerm = mapping.permissions.includes(permKey);
          const updated = hasPerm
            ? mapping.permissions.filter(p => p !== permKey)
            : [...mapping.permissions, permKey];
          return { ...mapping, permissions: updated };
        }
        return mapping;
      })
    );
  };

  // Add Invite
  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newInvite: Invitation = {
      id: `${Date.now()}`,
      email: inviteEmail.trim(),
      role: inviteRole,
      status: "Pending"
    };

    setInvites(prev => [...prev, newInvite]);
    setInviteEmail("");
    alert(`Invitation sent to ${newInvite.email} via Resend webhook!`);
  };

  const handleCancelInvite = (id: string) => {
    setInvites(prev => prev.filter(i => i.id !== id));
  };

  // Add Redirect
  const handleAddRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!redirectSource.trim() || !redirectDest.trim()) return;

    const newRedirect: RedirectLog = {
      id: `${Date.now()}`,
      source: redirectSource.trim(),
      destination: redirectDest.trim(),
      code: redirectCode
    };

    setRedirects(prev => [...prev, newRedirect]);
    setRedirectSource("");
    setRedirectDest("");
  };

  const handleDeleteRedirect = (id: string) => {
    setRedirects(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: RBAC SETTINGS MAPPER */}
        <section className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-border-warm rounded-xl p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-border-warm">
            <ShieldCheck className="w-5 h-5 text-brand-burgundy" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">
              Role-Based Access Control (RBAC)
            </h3>
          </div>

          <div className="space-y-6">
            {roleMappings.map((mapping) => (
              <div key={mapping.role} className="space-y-3 bg-bg-warm dark:bg-zinc-950 p-4 rounded-xl border border-border-warm">
                <span className="text-xs font-bold text-text-primary uppercase tracking-wide block border-b border-border-warm/50 pb-2">
                  Role: {mapping.role}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {permissionsList.map((perm) => {
                    const isChecked = mapping.permissions.includes(perm.key);
                    return (
                      <label
                        key={perm.key}
                        className="flex items-start gap-2.5 p-2 bg-white dark:bg-zinc-900 rounded border border-border-warm/60 cursor-pointer hover:border-brand-burgundy transition-all"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handlePermissionToggle(mapping.role, perm.key)}
                          className="accent-brand-burgundy mt-0.5 flex-shrink-0"
                        />
                        <div className="text-[10px] text-text-primary leading-tight text-left">
                          <span className="font-bold block">{perm.key}</span>
                          <span className="text-text-muted">{perm.name}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT: INVITES DISPATCH & REDIRECTS LOG */}
        <aside className="lg:col-span-5 space-y-8">
          {/* Invites Dispatch card */}
          <div className="bg-white dark:bg-zinc-900 border border-border-warm rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-border-warm">
              <Mail className="w-5 h-5 text-brand-gold" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">
                Invite Team Members
              </h3>
            </div>

            <form onSubmit={handleSendInvite} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-wider text-text-primary block">Invite Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="colleague@ruvenstudio.in"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full border border-border-warm rounded p-2 focus:outline-none focus:border-brand-burgundy text-text-primary bg-transparent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-wider text-text-primary block">Target Permission Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full border border-border-warm rounded p-2 focus:outline-none focus:border-brand-burgundy text-text-primary bg-transparent"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Store Manager">Store Manager</option>
                  <option value="Content Editor">Content Editor</option>
                  <option value="Warehouse Operator">Warehouse Operator</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-brand-burgundy hover:bg-brand-gold text-white text-[10px] font-bold uppercase tracking-widest rounded transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Invitation Email</span>
              </button>
            </form>

            {/* Invites list */}
            <div className="space-y-3 pt-4 border-t border-border-warm">
              <span className="text-[10px] font-bold uppercase tracking-wide text-text-primary block">Pending Invitations</span>
              <div className="space-y-2">
                {invites.map((inv) => (
                  <div key={inv.id} className="flex justify-between items-center gap-4 bg-bg-card dark:bg-zinc-800 p-2.5 rounded border border-border-warm text-[10px] text-text-primary">
                    <div>
                      <span className="font-bold block">{inv.email}</span>
                      <span className="text-[8px] font-bold text-brand-gold uppercase tracking-wider block">{inv.role}</span>
                    </div>
                    <button
                      onClick={() => handleCancelInvite(inv.id)}
                      className="p-1 hover:text-red-500 transition-colors"
                      title="Cancel Invite"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SEO Redirects Logs */}
          <div className="bg-white dark:bg-zinc-900 border border-border-warm rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-border-warm">
              <Settings className="w-5 h-5 text-text-muted" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">
                SEO Redirect Logs
              </h3>
            </div>

            <form onSubmit={handleAddRedirect} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-text-primary block">Source Path</label>
                  <input
                    type="text"
                    required
                    placeholder="/old-path"
                    value={redirectSource}
                    onChange={(e) => setRedirectSource(e.target.value)}
                    className="w-full border border-border-warm rounded p-2 focus:outline-none focus:border-brand-burgundy text-text-primary bg-transparent"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-text-primary block">Destination</label>
                  <input
                    type="text"
                    required
                    placeholder="/new-path"
                    value={redirectDest}
                    onChange={(e) => setRedirectDest(e.target.value)}
                    className="w-full border border-border-warm rounded p-2 focus:outline-none focus:border-brand-burgundy text-text-primary bg-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="font-bold text-text-primary uppercase">Code:</span>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      checked={redirectCode === 301}
                      onChange={() => setRedirectCode(301)}
                      className="accent-brand-burgundy"
                    />
                    <span>301 Permanent</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      checked={redirectCode === 302}
                      onChange={() => setRedirectCode(302)}
                      className="accent-brand-burgundy"
                    />
                    <span>302 Temporary</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-burgundy hover:bg-brand-gold text-white text-[10px] font-bold uppercase tracking-widest rounded transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </form>

            {/* Redirects list */}
            <div className="space-y-3 pt-4 border-t border-border-warm">
              <span className="text-[10px] font-bold uppercase tracking-wide text-text-primary block">Active Redirect mappings</span>
              <div className="space-y-2">
                {redirects.map((r) => (
                  <div key={r.id} className="flex justify-between items-center gap-4 bg-bg-card dark:bg-zinc-800 p-2.5 rounded border border-border-warm text-[10px] text-text-primary">
                    <div className="text-left font-mono text-[9px] leading-relaxed">
                      <div><strong className="text-brand-burgundy">Src:</strong> {r.source}</div>
                      <div><strong className="text-green-600">Dst:</strong> {r.destination}</div>
                      <div className="text-text-muted mt-0.5 uppercase tracking-wider text-[8px]">Redirect Code: {r.code}</div>
                    </div>
                    <button
                      onClick={() => handleDeleteRedirect(r.id)}
                      className="p-1 hover:text-red-500 transition-colors"
                      title="Delete Redirect"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
