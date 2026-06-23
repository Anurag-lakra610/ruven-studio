"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Search, Truck, MapPin, Package, Calendar, CheckCircle } from "lucide-react";
import Link from "next/link";

function TrackingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryOrderNo = searchParams.get("order_number") || "";

  const [orderInput, setOrderInput] = useState(queryOrderNo);
  const [orderNo, setOrderNo] = useState(queryOrderNo);

  useEffect(() => {
    if (queryOrderNo) {
      setOrderNo(queryOrderNo);
      setOrderInput(queryOrderNo);
    }
  }, [queryOrderNo]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderInput.trim()) {
      setOrderNo(orderInput.trim());
      router.push(`/tracking?order_number=${encodeURIComponent(orderInput.trim())}`);
    }
  };

  // Mock tracking steps based on order number
  const getTrackingSteps = (num: string) => {
    const sum = num.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const stepIndex = sum % 4; // Mock step index (0 to 3)

    return [
      { label: "Order Received", desc: "Order initialized and payment captured successfully.", completed: true, date: "June 23, 2026" },
      { label: "Processing & Packaging", desc: "Items verified, folded, and boxed at South India Fulfillment Center.", completed: stepIndex >= 1, date: "June 23, 2026" },
      { label: "Dispatched from Hub", desc: "Handed over to Bluedart Express courier hub in Tiruppur.", completed: stepIndex >= 2, date: "June 24, 2026" },
      { label: "Out for Delivery", desc: "Package reached local delivery office, in transit to destination.", completed: stepIndex >= 3, date: "June 26, 2026" }
    ];
  };

  const trackingSteps = orderNo ? getTrackingSteps(orderNo) : [];
  const currentStep = trackingSteps.filter(s => s.completed).length - 1;

  return (
    <div className="w-full bg-bg-warm dark:bg-zinc-950 py-12 px-6 md:px-12 lg:px-20 min-h-[calc(100vh-160px)]">
      <div className="max-w-2xl mx-auto space-y-10">
        {/* Navigation */}
        <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-muted hover:text-brand-burgundy transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>

        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-[10px] font-bold tracking-[0.15em] text-brand-gold uppercase block">Logistics Hub</span>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary uppercase">Track Shipment</h1>
        </div>

        {/* Lookup bar */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2 p-2 bg-white dark:bg-zinc-900 border border-border-warm rounded-full shadow-sm max-w-lg mx-auto">
          <div className="flex-1 flex items-center pl-3">
            <Search className="w-4 h-4 text-text-muted mr-2" />
            <input
              type="text"
              placeholder="Enter Order Reference (e.g. RU-129384)"
              value={orderInput}
              onChange={(e) => setOrderInput(e.target.value)}
              className="w-full text-xs bg-transparent border-none p-0 focus:outline-none text-text-primary"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-brand-burgundy hover:bg-brand-gold text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors"
          >
            Track
          </button>
        </form>

        {orderNo ? (
          <div className="bg-white dark:bg-zinc-900 border border-border-warm rounded-xl p-6 md:p-8 space-y-8 shadow-sm">
            {/* Courier Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-6 border-b border-border-warm text-xs">
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider block">Carrier</span>
                <span className="font-bold text-text-primary">Bluedart Express</span>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider block">Tracking No</span>
                <span className="font-mono font-semibold text-text-primary">BD738927189IN</span>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider block">Status</span>
                <span className="font-bold text-brand-burgundy uppercase">
                  {currentStep === 0 && "Pending Pack"}
                  {currentStep === 1 && "Packaging"}
                  {currentStep === 2 && "In Transit"}
                  {currentStep === 3 && "Out for Delivery"}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider block">Est. Delivery</span>
                <span className="font-bold text-text-primary flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                  <span>June 26, 2026</span>
                </span>
              </div>
            </div>

            {/* Stepper progress */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">Shipment Milestones</h3>

              <div className="relative pl-6 border-l-2 border-border-warm space-y-8 py-2">
                {trackingSteps.map((step, idx) => {
                  const isActive = step.completed;
                  return (
                    <div key={idx} className="relative">
                      {/* Step Indicator Dot */}
                      <span
                        className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          isActive
                            ? "bg-brand-burgundy border-brand-burgundy text-white shadow-md shadow-brand-burgundy/15"
                            : "bg-white dark:bg-zinc-950 border-border-warm text-text-muted"
                        }`}
                      >
                        {isActive && <CheckCircle className="w-3 h-3 text-white fill-brand-burgundy" />}
                      </span>

                      <div className="space-y-1 text-left">
                        <div className="flex justify-between items-baseline">
                          <h4 className={`text-xs font-bold uppercase tracking-wide ${isActive ? "text-text-primary" : "text-text-muted"}`}>
                            {step.label}
                          </h4>
                          {isActive && <span className="text-[9px] font-semibold text-text-muted">{step.date}</span>}
                        </div>
                        <p className="text-[11px] text-text-muted leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery address */}
            <div className="border-t border-border-warm pt-6 flex items-start gap-3 text-xs">
              <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider block">Ship-To Address</span>
                <p className="text-text-primary leading-relaxed">
                  John Doe, 12/A, Sector 3, Mumbai, Maharashtra, 400001, India
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-900 border border-border-warm rounded-xl p-8 text-center text-xs space-y-4 shadow-sm">
            <Package className="w-10 h-10 text-text-muted stroke-[1] mx-auto" />
            <h3 className="font-bold text-text-primary uppercase tracking-wider">No active shipment query</h3>
            <p className="text-text-muted max-w-xs mx-auto">
              Please enter your order reference number above (e.g. RU-129384) to pull live Bluedart routing details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen flex items-center justify-center bg-bg-warm dark:bg-zinc-950 text-text-muted text-xs font-bold uppercase tracking-widest">
        Loading Tracking Status...
      </div>
    }>
      <TrackingContent />
    </Suspense>
  );
}
