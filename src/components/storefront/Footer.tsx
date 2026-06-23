"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-bg-card dark:bg-zinc-900 border-t border-border-warm py-16 px-6 md:px-12 mt-auto" id="site-footer">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Information */}
        <div className="space-y-4">
          <Image
            src="/logo.png"
            alt="Ruven Studio Logo"
            width={100}
            height={42}
            className="h-[45px] w-auto object-contain dark:invert mix-blend-multiply dark:mix-blend-normal"
          />
          <p className="text-xs text-text-muted leading-relaxed">
            Ruven Studio is an independent fashion label constructed to construct conversations about Christ, faith, and grace in modern creative environments.
          </p>
          <div className="flex gap-4">
            <a
              href="https://instagram.com/ruven.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary hover:text-brand-burgundy transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a
              href="https://facebook.com/ruven.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary hover:text-brand-burgundy transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-4">Collections</h4>
          <ul className="space-y-2.5 text-xs text-text-muted">
            <li>
              <Link href="/shop" className="hover:text-brand-burgundy transition-colors">Shop All Drops</Link>
            </li>
            <li>
              <Link href="/shop?category=oversized-tees" className="hover:text-brand-burgundy transition-colors">Oversized Tees</Link>
            </li>
            <li>
              <Link href="/shop?category=hoodies" className="hover:text-brand-burgundy transition-colors">French Terry Hoodies</Link>
            </li>
            <li>
              <Link href="/shop?filter=new-arrivals" className="hover:text-brand-burgundy transition-colors">New Releases</Link>
            </li>
          </ul>
        </div>

        {/* Brand Story & Support */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-4">Journal & Story</h4>
          <ul className="space-y-2.5 text-xs text-text-muted">
            <li>
              <Link href="/#story-section" className="hover:text-brand-burgundy transition-colors">Our Story & Mission</Link>
            </li>
            <li>
              <Link href="/#community-section" className="hover:text-brand-burgundy transition-colors">Community Wall</Link>
            </li>
            <li>
              <Link href="/journal/the-armor-of-light" className="hover:text-brand-burgundy transition-colors">Weekly Devotional</Link>
            </li>
            <li>
              <Link href="/account" className="hover:text-brand-burgundy transition-colors">My Profile & Orders</Link>
            </li>
          </ul>
        </div>

        {/* Newsletter & Contact */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">Contact & Journal</h4>
          <p className="text-xs text-text-muted">
            Subscribe to receive alerts for limited product drop dates, devotionals, and early access codes.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center border border-border-warm rounded bg-white dark:bg-zinc-950 p-1"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 text-xs px-2 py-1.5 bg-transparent border-none focus:outline-none"
              required
            />
            <button
              type="submit"
              className="p-1.5 bg-brand-burgundy hover:bg-brand-gold text-white rounded transition-colors"
              aria-label="Subscribe"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <div className="space-y-1.5 pt-2 text-[11px] text-text-muted">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-brand-gold" />
              <span>fellowship@ruvenstudio.in</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              <span>Tiruppur, Tamil Nadu, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-[1400px] mx-auto border-t border-border-warm mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-text-muted">
        <div>
          <span>© {new Date().getFullYear()} Ruven Studio. Made with purpose for the glory of Christ.</span>
        </div>
        <div className="flex items-center gap-6">
          <span>Secure payments via Razorpay</span>
          <div className="flex items-center gap-2 grayscale opacity-70">
            {/* Mock Credit Card UPI icons */}
            <span className="border border-border-warm px-1.5 py-0.5 rounded font-mono text-[8px]">UPI</span>
            <span className="border border-border-warm px-1.5 py-0.5 rounded font-mono text-[8px]">VISA</span>
            <span className="border border-border-warm px-1.5 py-0.5 rounded font-mono text-[8px]">MC</span>
            <span className="border border-border-warm px-1.5 py-0.5 rounded font-mono text-[8px]">NET</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
