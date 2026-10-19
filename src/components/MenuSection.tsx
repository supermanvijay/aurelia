import React, { useState, useMemo } from 'react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuCategory, DietaryTag, MenuItem } from '../types/restaurant';
import { SafeImage } from './common/SafeImage';
import { useTastingBag } from '../context/TastingBagContext';
import { Search, Plus, Wine, Printer, Check, Sparkles, X } from 'lucide-react';

export const MenuSection: React.FC = () => {
  const { addItem } = useTastingBag();
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const categories: { label: string; value: MenuCategory }[] = [
    { label: 'All Offerings', value: 'all' },
    { label: 'Starters', value: 'starters' },
    { label: 'Main Courses', value: 'main' },
    { label: 'Desserts', value: 'desserts' },
    { label: 'Cellar & Cocktails', value: 'beverages' },
    { label: 'Degustation Journeys', value: 'combos' },
  ];

  const dietaryFilters: (DietaryTag | 'all')[] = [
    'all',
    'Chef Signature',
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Halal Friendly',
  ];

  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesDietary =
        selectedDietary === 'all' || item.dietary.includes(selectedDietary);
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.subname && item.subname.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesDietary && matchesSearch;
    });
  }, [selectedCategory, selectedDietary, searchQuery]);

  return (
    <section id="menu" className="py-24 bg-[#0B0C10] light:bg-[#FCFBF9] text-[#F3F4F6] light:text-[#191817]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-3 text-xs tracking-[0.3em] uppercase text-[#C5A059] font-medium mb-3">
            <span className="w-6 h-[1px] bg-[#C5A059]" />
            <span>À La Carte & Tasting Repertoire</span>
            <span className="w-6 h-[1px] bg-[#C5A059]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight [text-wrap:balance]">
            The Autumn Tasting Menu
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-slate-400 light:text-slate-600 font-light leading-relaxed">
            Every dish is an homage to heritage terroir, cooked with classical restraint and seasoned with international spirit.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059] hover:text-[#E6C875] light:hover:text-[#7A5C24] transition-colors py-1 border-b border-[#C5A059]/40"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Preview & Print Tasting Folio</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-6 mb-12">
          {/* Search Input */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes, ingredients (e.g., wagyu, scallop, saffron)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#13141E] light:bg-white border border-[#C5A059]/25 text-xs text-[#F3F4F6] light:text-[#191817] placeholder:text-slate-500 focus:outline-none focus:border-[#C5A059] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Interactive Category Tabs (Functional Segmented Control) */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all duration-200 border ${
                  selectedCategory === cat.value
                    ? 'bg-[#C5A059] text-[#0B0C10] border-[#E6C875] font-bold shadow-md'
                    : 'bg-[#14151F] light:bg-[#EFECE5] text-slate-300 light:text-slate-700 border-[#C5A059]/15 hover:border-[#C5A059]/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Dietary Sub-Filters */}
          <div className="flex items-center justify-center flex-wrap gap-2 text-[11px]">
            <span className="text-slate-500 uppercase tracking-widest mr-2">Filter by:</span>
            {dietaryFilters.map((diet) => (
              <button
                key={diet}
                onClick={() => setSelectedDietary(diet)}
                className={`px-3 py-1 transition-colors ${
                  selectedDietary === diet
                    ? 'text-[#C5A059] font-bold underline underline-offset-4 decoration-[#C5A059]'
                    : 'text-slate-400 hover:text-slate-200 light:hover:text-slate-800'
                }`}
              >
                {diet === 'all' ? 'All Dietary' : diet}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Cards Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 border border-[#C5A059]/15 bg-[#14151F]">
            <p className="text-slate-400 font-serif text-lg">No dishes found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDietary('all');
                setSearchQuery('');
              }}
              className="mt-4 text-xs text-[#C5A059] underline tracking-widest uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                className="group bg-[#13141D] light:bg-white border border-[#C5A059]/20 hover:border-[#C5A059]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <SafeImage
                      src={dish.image}
                      alt={dish.name}
                      title={dish.name}
                      fallbackType={dish.category === 'beverages' ? 'cocktail' : 'food'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#13141D] via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute top-3 right-3 text-[10px] tracking-widest uppercase font-mono text-[#E6C875] bg-[#0B0C10]/85 px-2 py-0.5">
                      {dish.cuisine}
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Clean unboxed dietary metadata */}
                    <div className="flex items-center gap-2 text-[11px] text-[#C5A059] font-medium mb-1.5 flex-wrap">
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

                    <p className="text-xs text-slate-300 light:text-slate-600 leading-relaxed font-light">
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

                <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-[#C5A059]/10">
                  <div className="text-lg font-serif font-bold text-[#C5A059] tabular-nums">
                    £{dish.price.toFixed(2)}
                  </div>

                  <button
                    onClick={() => addItem(dish)}
                    className="px-3.5 py-2 text-xs uppercase tracking-wider text-[#0B0C10] bg-[#C5A059] hover:bg-[#D4AF37] light:bg-[#9B7836] light:text-white transition-colors flex items-center gap-1.5 font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Itinerary</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tasting Folio Print / Export Modal */}
        {isPrintModalOpen && (
          <div className="fixed inset-0 z-50 bg-[#0B0C10]/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
            <div className="bg-[#12131D] border border-[#C5A059]/40 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl relative">
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center pb-8 border-b border-[#C5A059]/30">
                <span className="text-3xl font-serif font-bold tracking-widest text-[#E6C875]">AURELIA</span>
                <p className="text-xs uppercase tracking-[0.3em] text-[#C5A059] mt-1">42 Berkeley Square · Mayfair · London</p>
                <p className="text-sm font-serif italic text-slate-300 mt-2">Executive Chefs Jean-Luc Morisset & Arjun Sen</p>
              </div>

              <div className="py-6 space-y-8">
                {['starters', 'main', 'desserts', 'combos'].map((catKey) => {
                  const items = MENU_ITEMS.filter((i) => i.category === catKey);
                  return (
                    <div key={catKey}>
                      <h4 className="text-sm font-serif uppercase tracking-widest text-[#C5A059] border-b border-[#C5A059]/20 pb-1 mb-4">
                        {catKey === 'combos' ? 'Degustation Collections' : catKey}
                      </h4>
                      <div className="space-y-4">
                        {items.map((i) => (
                          <div key={i.id} className="flex justify-between items-baseline gap-4">
                            <div>
                              <div className="font-serif text-base text-[#F3F4F6] font-medium">{i.name}</div>
                              <div className="text-xs text-slate-400 font-light">{i.description}</div>
                            </div>
                            <div className="font-mono text-sm text-[#C5A059] shrink-0 font-bold">
                              £{i.price.toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-[#C5A059]/30 flex items-center justify-between">
                <p className="text-xs text-slate-400 italic">Discretionary 13.5% service charge added to final bill.</p>
                <button
                  onClick={() => window.print()}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0B0C10] bg-[#C5A059] hover:bg-[#D4AF37] flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Tasting Folio</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
