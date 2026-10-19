import React from 'react';
import { Calendar, ChevronDown, Award, Sparkles, Compass, Clock } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-[#0B0C10]">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2000&auto=format&fit=crop"
          alt="Aurelia Haute Dining Mayfair"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[12000ms] opacity-40 mix-blend-luminosity filter brightness-90 contrast-110"
        />
        {/* Measured dark scrim gradient to guarantee 4.5:1 text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10]/85 via-[#0B0C10]/75 to-[#0B0C10]" />
        {/* Subtle warm amber radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#C5A059]/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 my-auto w-full pt-12 md:pt-16">
        <div className="max-w-3xl">
          {/* Subtle Editorial Kicker - Unboxed without pill badges */}
          <div className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-[#C5A059] font-medium mb-6">
            <span className="w-8 h-[1px] bg-[#C5A059]" />
            <span>Michelin-Starred Sanctuary · Mayfair</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>Est. 2020</span>
          </div>

          {/* Slogan & Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#F3F4F6] font-normal tracking-tight leading-[1.08] mb-6 [text-wrap:balance]">
            Haute Gastronomy <br />
            <span className="italic font-light text-[#E6C875]">Beyond Borders.</span>
          </h1>

          {/* Editorial Paragraph */}
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-10 max-w-2xl">
            Where classical French saucier precision, rare Japanese binchotan charcoal,
            and royal Awadhi aromatics converge. An intimate culinary atelier orchestrated by Chefs Jean-Luc Morisset and Arjun Sen.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-5">
            <button
              onClick={() => scrollTo('#reservation')}
              className="px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#0B0C10] bg-[#C5A059] hover:bg-[#D4AF37] transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-[#C5A059]/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </button>

            <button
              onClick={() => scrollTo('#menu')}
              className="px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#F3F4F6] hover:text-[#C5A059] border border-[#C5A059]/40 hover:border-[#C5A059] bg-[#12131A]/60 backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
            >
              <span>Explore The Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4-Column KPI / Trust Strip below the Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full mt-12 pt-8 border-t border-[#C5A059]/20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="flex items-start gap-3.5">
            <Award className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
            <div>
              <div className="text-lg font-serif font-bold text-[#F3F4F6] tabular-nums">
                2 Michelin Stars
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Plus Michelin Green Star for Sustainability
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Sparkles className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
            <div>
              <div className="text-lg font-serif font-bold text-[#F3F4F6] tabular-nums">
                800+ Grand Crus
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Subterranean temperature-controlled vault
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Compass className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
            <div>
              <div className="text-lg font-serif font-bold text-[#F3F4F6]">
                42 Berkeley Sq
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Mayfair, London · Complimentary Valet
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Clock className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
            <div>
              <div className="text-lg font-serif font-bold text-[#F3F4F6]">
                Lunch & Dinner
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Tue – Sun: 12:00–15:30 & 17:30–23:30
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => scrollTo('#story')}
            aria-label="Scroll to story section"
            className="text-slate-400 hover:text-[#C5A059] transition-colors p-2"
          >
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
