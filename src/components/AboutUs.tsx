import React, { useState } from 'react';
import { SafeImage } from './common/SafeImage';
import { CHEF_PROFILES, TIMELINE_EVENTS, AWARDS_LIST } from '../data/restaurantData';
import { Award, Compass, HeartHandshake, Leaf, Quote } from 'lucide-react';

export const AboutUs: React.FC = () => {
  const [activeTimelineYear, setActiveTimelineYear] = useState('2026');

  return (
    <section id="story" className="py-24 bg-[#0F1016] light:bg-[#F4F1EA] text-[#F3F4F6] light:text-[#191817] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-3 text-xs tracking-[0.3em] uppercase text-[#C5A059] font-medium mb-3">
            <span className="w-6 h-[1px] bg-[#C5A059]" />
            <span>Our Heritage & Philosophy</span>
            <span className="w-6 h-[1px] bg-[#C5A059]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight [text-wrap:balance]">
            The Alchemy of Two Worlds
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 light:text-slate-600 font-light leading-relaxed">
            Born from a shared obsession with provenance, flame, and deep extraction. Aurelia represents a new chapter of British multi-cuisine fine dining.
          </p>
        </div>

        {/* 2-Column Split: The Story & Architectural Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-serif text-[#F3F4F6] light:text-[#191817] leading-snug">
              From Paris and Lucknow to Mayfair’s Historic Berkeley Square
            </h3>
            <p className="text-slate-300 light:text-[#4A453E] leading-relaxed text-sm sm:text-base font-light">
              Founded in 2020 by French saucier Jean-Luc Morisset and master of heritage charcoal Arjun Sen, Aurelia was conceived as an unconstrained atelier. We dismantled the artificial boundaries between Western classical structure and Eastern alchemy.
            </p>
            <p className="text-slate-300 light:text-[#4A453E] leading-relaxed text-sm sm:text-base font-light">
              Every morning begins with direct deliveries from our Somerset biodynamic farm, Cornish day-boats landing wild turbot, and small-batch spices imported directly from sustainable groves in Kerala and Kashmir.
            </p>

            {/* Mission & Vision Callout Cards - Hairline bordered, no thick left border */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 bg-[#151620] light:bg-white border border-[#C5A059]/20 shadow-sm">
                <div className="flex items-center gap-2.5 text-[#C5A059] mb-2 font-serif text-lg">
                  <Leaf className="w-4 h-4" />
                  <h4>Our Mission</h4>
                </div>
                <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed">
                  To honor regenerative agriculture and celebrate culinary heritage through daring cross-cultural gastronomy with zero food waste.
                </p>
              </div>

              <div className="p-5 bg-[#151620] light:bg-white border border-[#C5A059]/20 shadow-sm">
                <div className="flex items-center gap-2.5 text-[#C5A059] mb-2 font-serif text-lg">
                  <Compass className="w-4 h-4" />
                  <h4>Our Vision</h4>
                </div>
                <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed">
                  To craft an unpretentious yet unforgettable dining sanctum where each plate tells an authentic human story of origin and craft.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] overflow-hidden border border-[#C5A059]/25 shadow-2xl">
              <SafeImage
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop"
                alt="Aurelia Mayfair Dining Room Interior"
                fallbackType="interior"
                title="Aurelia Mayfair Dining Room"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10]/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-xs text-white/90">
                <span className="font-serif tracking-widest uppercase">The Crystal Salon · Mayfair</span>
                <span className="text-[#E6C875]">Seats 48</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chef Section */}
        <div id="chefs" className="mb-28 pt-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs tracking-[0.25em] uppercase text-[#C5A059] font-medium block mb-2">
              The Maestros
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif font-normal">
              Meet Our Executive Chefs
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {CHEF_PROFILES.map((chef, idx) => (
              <div
                key={chef.name}
                className="bg-[#14151E] light:bg-white border border-[#C5A059]/20 overflow-hidden flex flex-col group hover:border-[#C5A059]/40 transition-colors"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <SafeImage
                    src={chef.image}
                    alt={chef.name}
                    fallbackType="chef"
                    title={chef.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14151E] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 text-[11px] uppercase tracking-widest font-mono text-[#C5A059] bg-[#0B0C10]/80 px-2.5 py-1">
                    {chef.origin}
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-2xl font-serif text-[#F3F4F6] light:text-[#191817]">
                      {chef.name}
                    </h4>
                    <span className="text-xs uppercase tracking-widest text-[#C5A059] font-medium block mt-1 mb-4">
                      {chef.role}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 font-light leading-relaxed mb-6">
                      {chef.bio}
                    </p>
                  </div>

                  <blockquote className="pt-4 border-t border-[#C5A059]/15 flex items-start gap-3">
                    <Quote className="w-4 h-4 text-[#C5A059] shrink-0 mt-1 opacity-70" />
                    <p className="text-xs italic text-slate-400 light:text-slate-500 font-serif leading-relaxed">
                      "{chef.quote}"
                    </p>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Accolades Showcase */}
        <div className="mb-28 p-8 md:p-12 bg-[#12131C] light:bg-[#EFECE5] border border-[#C5A059]/20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#C5A059]/15">
            <div>
              <span className="text-xs tracking-[0.25em] uppercase text-[#C5A059] font-medium block mb-1">
                Global Recognition
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif">
                Awards & Accolades
              </h3>
            </div>
            <p className="text-xs text-slate-400 light:text-slate-600 max-w-sm">
              Independently judged by culinary inspectors, sommeliers, and international food critics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {AWARDS_LIST.map((award) => (
              <div
                key={award.title}
                className="p-5 bg-[#0B0C10]/60 light:bg-white/80 border border-[#C5A059]/20 flex flex-col justify-between"
              >
                <Award className="w-5 h-5 text-[#C5A059] mb-3" />
                <div>
                  <h5 className="font-serif text-base font-semibold text-[#F3F4F6] light:text-[#191817] leading-snug">
                    {award.title}
                  </h5>
                  <div className="text-[11px] text-[#C5A059] font-mono mt-1">
                    {award.year}
                  </div>
                  <p className="text-[11px] text-slate-400 light:text-slate-500 mt-2">
                    {award.org}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Restaurant Timeline */}
        <div>
          <div className="text-center max-w-md mx-auto mb-10">
            <span className="text-xs tracking-[0.25em] uppercase text-[#C5A059] font-medium block mb-1">
              Evolution
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif">
              The Journey of Aurelia
            </h3>
          </div>

          {/* Timeline Navigation Years */}
          <div className="flex items-center justify-center flex-wrap gap-2 md:gap-4 mb-8">
            {TIMELINE_EVENTS.map((event) => (
              <button
                key={event.year}
                onClick={() => setActiveTimelineYear(event.year)}
                className={`px-4 py-2 text-xs font-mono transition-all duration-200 border ${
                  activeTimelineYear === event.year
                    ? 'bg-[#C5A059] text-[#0B0C10] border-[#E6C875] font-bold shadow-md'
                    : 'bg-[#151620] light:bg-white text-slate-300 light:text-slate-700 border-[#C5A059]/20 hover:border-[#C5A059]'
                }`}
              >
                {event.year}
              </button>
            ))}
          </div>

          {/* Active Timeline Display */}
          {TIMELINE_EVENTS.filter((e) => e.year === activeTimelineYear).map((e) => (
            <div
              key={e.year}
              className="max-w-2xl mx-auto p-8 bg-[#14151F] light:bg-white border border-[#C5A059]/25 text-center shadow-xl animate-in fade-in zoom-in-95 duration-300"
            >
              <span className="text-3xl font-serif font-bold text-[#C5A059] font-mono block mb-2">
                {e.year}
              </span>
              <h4 className="text-xl font-serif text-[#F3F4F6] light:text-[#191817] mb-3">
                {e.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 font-light leading-relaxed">
                {e.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
