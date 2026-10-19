import React from 'react';
import { useTastingBag } from '../context/TastingBagContext';
import { SafeImage } from './common/SafeImage';
import { X, Trash2, Wine, Plus, Minus, Calendar, ShoppingBag } from 'lucide-react';

export const TastingBagDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
    removeItem,
    updateQuantity,
    toggleWinePairing,
    clearBag,
    totalEstimatedPrice,
  } = useTastingBag();

  if (!isDrawerOpen) return null;

  const scrollToReservation = () => {
    setIsDrawerOpen(false);
    const target = document.querySelector('#reservation');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#12131D] light:bg-white border-l border-[#C5A059]/30 text-[#F3F4F6] light:text-[#191817] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-[#C5A059]/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
              <div>
                <h3 className="font-serif text-lg font-bold">Your Tasting Itinerary</h3>
                <p className="text-[11px] text-slate-400 light:text-slate-500">
                  {items.length} Curated Courses Selected
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white light:hover:text-black transition-colors"
              aria-label="Close Itinerary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body items */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="font-serif text-base text-slate-400">
                  Your tasting list is currently empty.
                </p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse our À La Carte & Degustation sections and click "Add to Taste List" to compose your journey.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.dish.id}
                  className="p-4 bg-[#181926] light:bg-[#FAF8F5] border border-[#C5A059]/20 space-y-3"
                >
                  <div className="flex gap-3">
                    <div className="w-16 h-16 shrink-0 overflow-hidden border border-[#C5A059]/20">
                      <SafeImage
                        src={item.dish.image}
                        alt={item.dish.name}
                        title={item.dish.name}
                        fallbackType="food"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-semibold truncate text-[#F3F4F6] light:text-[#191817]">
                          {item.dish.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.dish.id)}
                          className="text-slate-500 hover:text-red-400 transition-colors p-0.5"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] uppercase font-mono text-[#C5A059] block">
                        {item.dish.cuisine} · £{item.dish.price.toFixed(2)}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.dish.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-none bg-[#0B0C10] light:bg-white border border-slate-700 light:border-slate-300 flex items-center justify-center text-xs hover:border-[#C5A059]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold px-2">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.dish.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-none bg-[#0B0C10] light:bg-white border border-slate-700 light:border-slate-300 flex items-center justify-center text-xs hover:border-[#C5A059]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Sommelier Wine Pairing Add-on */}
                  <div
                    onClick={() => toggleWinePairing(item.dish.id)}
                    className={`p-2 cursor-pointer flex items-center justify-between text-xs border transition-colors ${
                      item.withWinePairing
                        ? 'bg-[#C5A059]/15 border-[#C5A059] text-[#E6C875]'
                        : 'bg-[#11121A] light:bg-white border-slate-800 light:border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Wine className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span className="text-[11px]">Sommelier Cru Pairing</span>
                    </div>
                    <span className="text-[11px] font-mono">
                      {item.withWinePairing ? '+£45.00' : 'Add (+£45)'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#C5A059]/20 bg-[#0B0C10]/80 light:bg-[#FAF8F5] space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Estimated Tasting Total</span>
                <span className="font-mono text-lg font-bold text-[#C5A059]">
                  £{totalEstimatedPrice.toFixed(2)}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 italic">
                *Estimated prices excluding discretionary 13.5% service charge. Items will be pre-communicated to the Executive Chef.
              </p>

              <button
                onClick={scrollToReservation}
                className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0B0C10] bg-[#C5A059] hover:bg-[#D4AF37] light:bg-[#9B7836] light:text-white transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Attach to Table Reservation</span>
              </button>

              <div className="flex justify-center">
                <button
                  onClick={clearBag}
                  className="text-[11px] text-slate-400 hover:text-red-400 uppercase tracking-widest transition-colors"
                >
                  Clear Itinerary
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
