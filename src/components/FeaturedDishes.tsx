import React from 'react';
import { MENU_ITEMS } from '../data/restaurantData';
import { SafeImage } from './common/SafeImage';
import { useTastingBag } from '../context/TastingBagContext';
import { Plus, Wine, ArrowRight } from 'lucide-react';

export const FeaturedDishes: React.FC = () => {
  const { addItem } = useTastingBag();
  const featured = MENU_ITEMS.filter((item) => item.featured).slice(0, 3);

  const scrollToMenu = () => {
    const el = document.querySelector('#menu');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="py-24 bg-[#0B0C10] light:bg-[#FCFBF9] text-[#F3F4F6] light:text-[#191817]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-[#C5A059]/20">
          <div>
            <div className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-[#C5A059] font-medium mb-2">
              <span className="w-6 h-[1px] bg-[#C5A059]" />
              <span>Chef's Daily Repertoire</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight">
              Featured Signatures
            </h2>
          </div>
          <button
            onClick={scrollToMenu}
            className="group flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059] hover:text-[#E6C875] light:hover:text-[#7A5C24] transition-colors self-start md:self-end"
          >
            <span>View Full À La Carte & Degustation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3-Column Product Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((dish) => (
            <div
              key={dish.id}
              className="group bg-[#13141D] light:bg-white border border-[#C5A059]/20 hover:border-[#C5A059]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg"
            >
              <div>
                {/* Product Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <SafeImage
                    src={dish.image}
                    alt={dish.name}
                    title={dish.name}
                    fallbackType="food"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13141D] via-transparent to-transparent opacity-80" />
                  
                  {/* Clean unboxed category/cuisine indicator */}
                  <div className="absolute top-3 left-4 text-[11px] tracking-widest uppercase font-mono text-[#E6C875] bg-[#0B0C10]/85 px-2.5 py-1">
                    {dish.cuisine} · {dish.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Dietary tags as clean unboxed text */}
                  <div className="flex items-center gap-2 text-xs text-[#C5A059] font-medium mb-2">
                    {dish.dietary.map((tag, idx) => (
                      <React.Fragment key={tag}>
                        <span>{tag}</span>
                        {idx < dish.dietary.length - 1 && <span aria-hidden="true">·</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  <h3 className="text-xl font-serif text-[#F3F4F6] light:text-[#191817] group-hover:text-[#C5A059] transition-colors leading-snug">
                    {dish.name}
                  </h3>

                  {dish.subname && (
                    <div className="text-xs text-slate-400 light:text-slate-500 italic mt-0.5 mb-3 font-serif">
                      {dish.subname}
                    </div>
                  )}

                  <p className="text-xs text-slate-300 light:text-slate-600 leading-relaxed font-light line-clamp-3">
                    {dish.description}
                  </p>

                  {dish.pairingNote && (
                    <div className="mt-4 pt-3 border-t border-[#C5A059]/15 flex items-start gap-2 text-[11px] text-slate-400 light:text-slate-500">
                      <Wine className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                      <span className="italic">{dish.pairingNote}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer: Price & Add to Tasting Itinerary */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-[#C5A059]/10">
                <div className="text-lg font-serif font-bold text-[#C5A059] tabular-nums">
                  £{dish.price.toFixed(2)}
                </div>

                <button
                  onClick={() => addItem(dish)}
                  className="px-3.5 py-2 text-xs uppercase tracking-wider text-[#0B0C10] bg-[#C5A059] hover:bg-[#D4AF37] light:bg-[#9B7836] light:text-white transition-colors flex items-center gap-1.5 font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Taste List</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
