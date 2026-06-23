"use client";

import React, { useState, useEffect } from "react";
import { getProducts, getDevotionals, MockProduct, MockDevotional } from "@/lib/db";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  AlertTriangle,
  ArrowUpRight,
  BookOpen,
  DollarSign,
  Activity
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

interface CRMEvent {
  id: string;
  customer: string;
  event: string;
  time: string;
  badge: string;
}

export default function AdminDashboardPage() {
  const [productsCount, setProductsCount] = useState(0);
  const [devotionalsCount, setDevotionalsCount] = useState(0);
  const [timelineEvents, setTimelineEvents] = useState<CRMEvent[]>([]);

  // Mock revenue chart data
  const chartData = [
    { name: "Mon", sales: 12000, orders: 6 },
    { name: "Tue", sales: 19000, orders: 9 },
    { name: "Wed", sales: 15000, orders: 7 },
    { name: "Thu", sales: 34000, orders: 12 },
    { name: "Fri", sales: 28000, orders: 10 },
    { name: "Sat", sales: 49000, orders: 18 },
    { name: "Sun", sales: 39000, orders: 15 }
  ];

  useEffect(() => {
    getProducts().then(res => setProductsCount(res.length));
    getDevotionals().then(res => setDevotionalsCount(res.length));

    setTimelineEvents([
      {
        id: "1",
        customer: "John Doe",
        event: "Placed order RU-389271 (Paid ₹2199)",
        time: "15 minutes ago",
        badge: "SALE"
      },
      {
        id: "2",
        customer: "David S.",
        event: "Added Armor of Light Heavyweight Tee (M) to wishlist",
        time: "1 hour ago",
        badge: "CRM"
      },
      {
        id: "3",
        customer: "Priya M.",
        event: "Created new customer account profile",
        time: "3 hours ago",
        badge: "REGISTRATION"
      },
      {
        id: "4",
        customer: "Rahul K.",
        event: "Left a 5-star product review on Renewal Hoodie",
        time: "Yesterday",
        badge: "REVIEW"
      }
    ]);
  }, []);

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto">
      {/* 1. TOP METRICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="bg-white dark:bg-zinc-900 border border-border-warm rounded-xl p-6 flex items-center justify-between shadow-sm">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Total Revenue</span>
            <span className="text-2xl font-bold text-text-primary">₹2,36,400</span>
            <span className="text-[9px] font-bold text-green-600 dark:text-green-500 uppercase tracking-wider flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+18% MoM</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white dark:bg-zinc-900 border border-border-warm rounded-xl p-6 flex items-center justify-between shadow-sm">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Storefront Orders</span>
            <span className="text-2xl font-bold text-text-primary">87 Orders</span>
            <span className="text-[9px] font-bold text-green-600 dark:text-green-500 uppercase tracking-wider flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+8% this week</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white dark:bg-zinc-900 border border-border-warm rounded-xl p-6 flex items-center justify-between shadow-sm">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Store Customers</span>
            <span className="text-2xl font-bold text-text-primary">46 Accounts</span>
            <span className="text-[9px] font-bold text-green-600 dark:text-green-500 uppercase tracking-wider flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+12 New drops</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white dark:bg-zinc-900 border border-border-warm rounded-xl p-6 flex items-center justify-between shadow-sm">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Devotional Articles</span>
            <span className="text-2xl font-bold text-text-primary">{devotionalsCount} Published</span>
            <span className="text-[9px] font-bold text-brand-gold uppercase tracking-wider block">
              1 Scripture Embed
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 2. RECHARTS SALES AREA CHART */}
      <div className="bg-white dark:bg-zinc-900 border border-border-warm rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">Sales Analytics Overview</h3>
            <p className="text-[10px] text-text-muted">Weekly performance logs including transaction revenue metrics.</p>
          </div>
          <span className="text-xs font-bold text-brand-burgundy hover:text-brand-gold cursor-pointer transition-colors flex items-center gap-1">
            <span>View Full Report</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#670000" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#670000" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E5DD" />
              <XAxis dataKey="name" stroke="#6B6862" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#6B6862" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip formatter={(value) => [`₹${value}`, "Sales"]} />
              <Area type="monotone" dataKey="sales" stroke="#670000" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. CRM TIMELINE EVENTS */}
      <div className="bg-white dark:bg-zinc-900 border border-border-warm rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">CRM Operations Timeline</h3>
            <p className="text-[10px] text-text-muted">Real-time moderation audit events of customers inside Ruven Studio.</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-bg-card flex items-center justify-center text-brand-gold">
            <Activity className="w-4 h-4" />
          </div>
        </div>

        <div className="divide-y divide-zinc-100 dark:divide-zinc-800 space-y-4">
          {timelineEvents.map((evt) => (
            <div key={evt.id} className="flex justify-between items-start gap-4 pt-4 first:pt-0">
              <div className="flex gap-3">
                <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border h-fit mt-0.5 ${
                  evt.badge === "SALE"
                    ? "bg-green-50 border-green-200 text-green-600 dark:bg-green-950/20 dark:border-green-900/30"
                    : evt.badge === "CRM"
                    ? "bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950/20 dark:border-blue-900/30"
                    : evt.badge === "REGISTRATION"
                    ? "bg-purple-50 border-purple-200 text-purple-600 dark:bg-purple-950/20 dark:border-purple-900/30"
                    : "bg-amber-50 border-amber-200 text-amber-600 dark:bg-amber-950/20 dark:border-amber-900/30"
                }`}>
                  {evt.badge}
                </span>
                <div className="text-xs space-y-0.5 text-left">
                  <span className="font-bold text-text-primary block">{evt.customer}</span>
                  <span className="text-text-muted">{evt.event}</span>
                </div>
              </div>
              <span className="text-[9px] font-semibold text-text-muted whitespace-nowrap">{evt.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
