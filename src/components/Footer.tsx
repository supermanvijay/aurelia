import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Send, CheckCircle2, Instagram, Facebook, Youtube, Award, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubscribed(true);
    setVoucherCode(`AURELIA-WELCOME-${Math.floor(100 + Math.random() * 900)}`);
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="bg-[#07080B] light:bg-[#EAE6DD] text-[#F3F4F6] light:text-[#191817] pt-20 pb-12 border-t border-[#C5A059]/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Newsletter & Brand Statement Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#C5A059]/15">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-3xl font-serif font-bold tracking-widest text-[#F3F4F6] light:text-[#191817] uppercase">
              AURELIA
            </span>
            <p className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-mono">
              Haute Multi-Cuisine Atelier · Mayfair
            </p>
            <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 font-light leading-relaxed max-w-sm">
              Classical French sauce foundations, heritage Indian charcoal dum cooking, and artisanal Italian pasta craft in the heart of London.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-none border border-[#C5A059]/30 flex items-center justify-center text-slate-400 hover:text-[#C5A059] hover:border-[#C5A059] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-none border border-[#C5A059]/30 flex items-center justify-center text-slate-400 hover:text-[#C5A059] hover:border-[#C5A059] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-none border border-[#C5A059]/30 flex items-center justify-center text-slate-400 hover:text-[#C5A059] hover:border-[#C5A059] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 bg-[#0E0F15] light:bg-white border border-[#C5A059]/25 p-8 shadow-sm">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059] block mb-1">
              Private Gastronomy Dispatch
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-[#F3F4F6] light:text-[#191817] mb-2">
              Join The Connoisseur Club
            </h3>
            <p className="text-xs text-slate-400 light:text-slate-600 font-light leading-relaxed mb-6">
              Receive privileged first access to quarterly seasonal menu reveals, guest vintner tastings, and complimentary sommelier pairing vouchers.
            </p>

            {subscribed ? (
              <div className="p-4 bg-[#141520] light:bg-[#FAF8F5] border border-[#C5A059]/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A059]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome to the Aurelia Society.</span>
                </div>
                <p className="text-xs text-slate-300 light:text-slate-700">
                  Your complimentary welcome digest and exclusive cellar code have been issued:
                </p>
                <div className="font-mono text-xs font-bold text-[#E6C875] tracking-wider">
                  Voucher: {voucherCode} (Complimentary Champagne on Arrival)
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-[#07080B] light:bg-[#FAF8F5] border border-[#C5A059]/30 text-xs text-white light:text-black placeholder:text-slate-500 focus:outline-none focus:border-[#C5A059]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#0B0C10] bg-[#C5A059] hover:bg-[#D4AF37] light:bg-[#9B7836] light:text-white transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Navigation & Contact Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#C5A059]/10 text-xs">
          <div>
            <h4 className="font-serif text-sm font-semibold text-[#F3F4F6] light:text-[#191817] uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-slate-400 light:text-slate-600">
              <li>
                <button onClick={() => scrollTo('#story')} className="hover:text-[#C5A059] transition-colors">
                  Our Story & Heritage
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#menu')} className="hover:text-[#C5A059] transition-colors">
                  Autumn Repertoire
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#chefs')} className="hover:text-[#C5A059] transition-colors">
                  Executive Chefs
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#gallery')} className="hover:text-[#C5A059] transition-colors">
                  The Gallery
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#reservation')} className="hover:text-[#C5A059] transition-colors">
                  Online Reservations
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold text-[#F3F4F6] light:text-[#191817] uppercase tracking-wider mb-4">
              Private Dining
            </h4>
            <ul className="space-y-2.5 text-slate-400 light:text-slate-600">
              <li>The Crystal Salon (48 Seats)</li>
              <li>The Sommelier Vault (12 Seats)</li>
              <li>Charcoal & Omakase Counter (8 Seats)</li>
              <li>The Glass Veranda (24 Seats)</li>
              <li>Bespoke Townhouse Buyouts</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold text-[#F3F4F6] light:text-[#191817] uppercase tracking-wider mb-4">
              Location & Contact
            </h4>
            <div className="space-y-2 text-slate-400 light:text-slate-600">
              <p>{RESTAURANT_INFO.address}</p>
              <p>Telephone: {RESTAURANT_INFO.phone}</p>
              <p>Email: {RESTAURANT_INFO.email}</p>
              <p className="text-slate-500">Valet station on Berkeley Square</p>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold text-[#F3F4F6] light:text-[#191817] uppercase tracking-wider mb-4">
              Service Schedule
            </h4>
            <div className="space-y-1.5 text-slate-400 light:text-slate-600 font-mono text-[11px]">
              <p>{RESTAURANT_INFO.openingHours.lunch}</p>
              <p>{RESTAURANT_INFO.openingHours.dinner}</p>
              <p className="text-[#C5A059] pt-1">Reservations 60 days ahead</p>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Recognition Strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Aurelia Restaurant Group Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <span>Two Michelin Stars (2022–2026)</span>
            <span aria-hidden="true">·</span>
            <span>Michelin Green Star</span>
            <span aria-hidden="true">·</span>
            <span>Five AA Rosettes</span>
            <span aria-hidden="true">·</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
