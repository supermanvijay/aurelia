import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ShoppingBag, Calendar, Phone } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTastingBag } from '../context/TastingBagContext';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { totalCount, setIsDrawerOpen } = useTastingBag();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Story', href: '#story' },
    { label: 'Menu', href: '#menu' },
    { label: 'Chefs', href: '#chefs' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Events', href: '#events' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Visit', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToReservation = () => {
    setMobileMenuOpen(false);
    const target = document.querySelector('#reservation');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B0C10]/95 dark:bg-[#0B0C10]/95 light:bg-[#FCFBF9]/95 backdrop-blur-md border-b border-[#C5A059]/15 shadow-xl py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element Brand wordmark */}
          <a
            href="#"
            className="text-2xl md:text-3xl font-serif tracking-widest text-[#F3F4F6] light:text-[#191817] font-bold uppercase transition-colors whitespace-nowrap shrink-0 group"
          >
            AURELIA
            <span className="block text-[9px] tracking-[0.35em] text-[#C5A059] font-sans font-medium uppercase mt-0.5">
              Mayfair · London
            </span>
          </a>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs tracking-widest uppercase font-medium text-slate-300 light:text-[#5E5953]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#C5A059] light:hover:text-[#9B7836] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A059] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Utilities */}
          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 rounded-full text-slate-300 light:text-slate-700 hover:text-[#C5A059] light:hover:text-[#9B7836] hover:bg-white/5 light:hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A059]"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Tasting Itinerary / Pre-Order Drawer Trigger */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open Tasting Itinerary"
              className="relative p-2 rounded-full text-slate-300 light:text-slate-700 hover:text-[#C5A059] hover:bg-white/5 light:hover:bg-black/5 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C5A059] text-[#0B0C10] text-[10px] font-bold flex items-center justify-center font-mono">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={scrollToReservation}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0B0C10] bg-[#C5A059] hover:bg-[#D4AF37] light:bg-[#9B7836] light:hover:bg-[#856529] light:text-white rounded-none border border-[#E6C875]/40 transition-all duration-200 shadow-sm hover:shadow-[#C5A059]/20 hover:shadow-md whitespace-nowrap shrink-0"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Table</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 text-slate-200 light:text-slate-800 hover:text-[#C5A059]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#0B0C10]/98 light:bg-[#FCFBF9]/98 backdrop-blur-xl flex flex-col justify-between p-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-6 border-b border-[#C5A059]/20">
            <span className="text-2xl font-serif tracking-widest text-[#F3F4F6] light:text-[#191817] font-bold">
              AURELIA
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-slate-300 light:text-slate-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-6 my-auto text-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-lg uppercase tracking-widest text-slate-200 light:text-slate-800 hover:text-[#C5A059] font-serif transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-[#C5A059]/20 space-y-4">
            <button
              onClick={scrollToReservation}
              className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0B0C10] bg-[#C5A059] light:bg-[#9B7836] light:text-white flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table Online</span>
            </button>

            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="w-full py-3 text-xs tracking-wider uppercase text-slate-300 light:text-slate-700 border border-[#C5A059]/30 flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Call Concierge {RESTAURANT_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
