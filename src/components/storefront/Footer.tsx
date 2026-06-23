"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, ArrowRight, Check } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState("");

  // BUG 8: Email validation with regex before submission
  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setEmail("");
    }, 400);
  };

  return (
    <>
      {/* SECTION: Newsletter (Red invitation strip) */}
      <section className="newsletter-section-v2 section-padding-lg" id="newsletter-section">
        <div className="newsletter-container">
          <span className="newsletter-subtitle">studio invitation</span>
          <h2>Join a Community That Wears Its Faith.</h2>
          <p className="newsletter-description">
            Ruven Studio is more than apparel. It is a fellowship. Subscribe to receive monthly reflections on scripture, behind-the-scenes design diary insights, and exclusive early access to our limited batches.
          </p>

          {/* BUG 8: Redesigned newsletter with inline validation + success message */}
          {subscribed ? (
            <p className="text-sm font-bold text-white tracking-wide mt-4">
              You&apos;re in. Watch your inbox.
            </p>
          ) : (
            <form className="newsletter-form-v2 w-full" onSubmit={handleSubscribe}>
              <div className="flex flex-col md:flex-row gap-3 w-full max-w-[480px]">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  aria-label="Email Address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  className="flex-1 h-[52px] px-4 text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:border-white/60 transition-colors rounded-none"
                />
                <button
                  type="submit"
                  className="h-[52px] px-6 bg-white text-brand-burgundy text-xs font-bold uppercase tracking-widest hover:bg-zinc-100 transition-colors flex items-center gap-2 whitespace-nowrap rounded-none"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {emailError && (
                <p className="text-xs text-red-300 mt-2 text-left">{emailError}</p>
              )}
            </form>
          )}

          <div className="newsletter-benefits">
            <span className="benefit-tag">
              <Check className="w-3 h-3 text-white/70 inline-block mr-1 align-middle" />
              <span className="align-middle">Early Access</span>
            </span>
            <span className="benefit-tag">
              <Check className="w-3 h-3 text-white/70 inline-block mr-1 align-middle" />
              <span className="align-middle">Scriptural Devotionals</span>
            </span>
            <span className="benefit-tag">
              <Check className="w-3 h-3 text-white/70 inline-block mr-1 align-middle" />
              <span className="align-middle">Limited Drops</span>
            </span>
          </div>
        </div>
      </section>

      {/* FOOTER: Dark Sitemap Grid */}
      <footer className="footer-v2" id="site-footer">
        <div className="footer-grid-v2">
          {/* Column 1: Brand Info & Socials */}
          <div className="footer-brand-v2">
            <Link href="/" className="brand-logo" style={{ marginBottom: "var(--spacing-sm)", display: "inline-block", width: "max-content" }}>
              <img
                src="/logo_white.png"
                alt="Ruven Studio Label Logo"
                style={{ height: "60px", width: "auto", objectFit: "contain", display: "block" }}
              />
            </Link>
            <p className="footer-statement-v2">
              An independent Christian lifestyle fashion label crafting heavy-weight apparel designed to start quiet, meaningful conversations about faith, renewal, and identity.
            </p>
            <div className="footer-social-row">
              {/* BUG 7: All socials have target="_blank" rel="noopener noreferrer" */}
              <a href="https://instagram.com/ruven.studio" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg className="footer-social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://facebook.com/ruven.studio" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg className="footer-social-icon" viewBox="0 0 320 512" fill="currentColor">
                  <path d="M80 299.3V256H12v-54.7h68v-39.7c0-67.3 41.1-104 101.2-104 28.8 0 53.6 2.1 60.8 3v70.5h-41.7c-32.7 0-39 15.5-39 38.3V201.3h78.2l-10.2 54.7H161v198H80z"/>
                </svg>
              </a>
              {/* BUG 7: WhatsApp updated to real business number format */}
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Group">
                <svg className="footer-social-icon" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                </svg>
              </a>
            </div>
            <div className="footer-contact-details">
              <div className="footer-contact-item">
                <Mail className="footer-contact-icon w-3.5 h-3.5" />
                <a href="mailto:hello@ruvenstudio.in">hello@ruvenstudio.in</a>
              </div>
              <div className="footer-contact-item">
                <Phone className="footer-contact-icon w-3.5 h-3.5" />
                {/* TODO: Replace with real business number before launch */}
                <a href="tel:+919876543210">+91 98765 43210</a>
              </div>
            </div>
          </div>

          {/* Column 2: Studio Collections */}
          <div className="footer-links-col-v2">
            <h4>Studio Collections</h4>
            <ul>
              <li><Link href="/shop?category=oversized-tees">Oversized T-Shirts</Link></li>
              <li><Link href="/shop?category=hoodies">French Terry Hoodies</Link></li>
              <li><Link href="/shop?filter=new-arrivals">Armor of Light Drop</Link></li>
              <li><Link href="/shop?filter=best-sellers">Best Sellers</Link></li>
            </ul>
          </div>

          {/* Column 3: Fellowship & Mission — BUG 4: removed admin routes */}
          <div className="footer-links-col-v2">
            <h4>Fellowship &amp; Mission</h4>
            <ul>
              <li><Link href="/#community-section">The Prayer Wall</Link></li>
              <li><Link href="/journal/the-armor-of-light">Weekly Faith Devotionals</Link></li>
              <li><Link href="/#story-section">Our Mission Statement</Link></li>
              <li><Link href="/#community-section">Campus Ministries</Link></li>
            </ul>
          </div>

          {/* Column 4: Client Services — BUG 5: privacy now goes to real page */}
          <div className="footer-links-col-v2">
            <h4>Client Services</h4>
            <ul>
              <li><Link href="/#faq-section">Sizing Guidelines</Link></li>
              <li><Link href="/#faq-section">7-Day Exchanges</Link></li>
              <li><Link href="/#faq-section">Support &amp; Contact</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar — BUG 5: policy links point to correct pages */}
        <div className="footer-bottom-v2">
          <p>&copy; {new Date().getFullYear()} Ruven Studio. Crafted with purpose in India.</p>
          <div className="footer-bottom-links-v2">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span className="footer-separator">•</span>
            <Link href="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </>
  );
};
