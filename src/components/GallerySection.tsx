import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types/restaurant';
import { SafeImage } from './common/SafeImage';
import { Maximize2, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    { label: 'All Perspectives', value: 'all' },
    { label: 'Haute Cuisine', value: 'food' },
    { label: 'Salons & Cellar', value: 'interior' },
    { label: 'Cocktails & Vintages', value: 'cocktails' },
    { label: 'Salons & Events', value: 'events' },
  ];

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  return (
    <section id="gallery" className="py-24 bg-[#0B0C10] light:bg-[#FCFBF9] text-[#F3F4F6] light:text-[#191817]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-3 text-xs tracking-[0.3em] uppercase text-[#C5A059] font-medium mb-3">
            <span className="w-6 h-[1px] bg-[#C5A059]" />
            <span>Visual Anthology</span>
            <span className="w-6 h-[1px] bg-[#C5A059]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight">
            The Gallery
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-slate-400 light:text-slate-600 font-light leading-relaxed">
            Moments of culinary drama, quiet cellar craftsmanship, and the intimate ambience of 42 Berkeley Square.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all duration-200 border ${
                  activeCategory === cat.value
                    ? 'bg-[#C5A059] text-[#0B0C10] border-[#E6C875] font-bold shadow-md'
                    : 'bg-[#14151F] light:bg-[#EFECE5] text-slate-300 light:text-slate-700 border-[#C5A059]/15 hover:border-[#C5A059]/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Irregular Grid Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[280px]">
          {filteredItems.map((item, idx) => {
            // Create deliberate visual rhythm: make 1st and 4th cards span 2 columns/rows on desktop
            const isLarge = idx === 0 || idx === 3;
            return (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className={`group relative overflow-hidden bg-[#13141D] border border-[#C5A059]/20 cursor-pointer ${
                  isLarge ? 'sm:col-span-2 sm:row-span-2' : 'col-span-1 row-span-1'
                }`}
              >
                <SafeImage
                  src={item.image}
                  alt={item.title}
                  title={item.title}
                  fallbackType={item.category === 'interior' ? 'interior' : 'food'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Gradient Scrim & Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10]/90 via-[#0B0C10]/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex justify-end">
                    <span className="p-2 bg-[#0B0C10]/70 text-[#C5A059] border border-[#C5A059]/40">
                      <Eye className="w-4 h-4" />
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059]">
                      {item.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif text-white font-medium mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-light mt-1 line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fullscreen Interactive Lightbox Modal */}
        {activeLightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-[#0B0C10]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-10 animate-in fade-in duration-200">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors z-20"
              aria-label="Close Lightbox"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Prev Image */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-slate-300 hover:text-[#C5A059] transition-colors z-20 bg-black/40 border border-[#C5A059]/20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Image */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-slate-300 hover:text-[#C5A059] transition-colors z-20 bg-black/40 border border-[#C5A059]/20"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Image & Description */}
            <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
              <img
                src={filteredItems[activeLightboxIndex].image}
                alt={filteredItems[activeLightboxIndex].title}
                referrerPolicy="no-referrer"
                className="max-h-[72vh] max-w-full object-contain border border-[#C5A059]/30 shadow-2xl"
              />
              <div className="text-center mt-4">
                <span className="text-[11px] uppercase tracking-widest font-mono text-[#C5A059]">
                  {filteredItems[activeLightboxIndex].category} · {activeLightboxIndex + 1} of {filteredItems.length}
                </span>
                <h4 className="text-xl font-serif text-[#F3F4F6] mt-1">
                  {filteredItems[activeLightboxIndex].title}
                </h4>
                <p className="text-xs text-slate-400 font-light max-w-xl mx-auto mt-1">
                  {filteredItems[activeLightboxIndex].caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
