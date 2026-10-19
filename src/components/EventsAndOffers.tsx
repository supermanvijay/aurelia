import React, { useState } from 'react';
import { UPCOMING_EVENTS } from '../data/restaurantData';
import { RestaurantEvent } from '../types/restaurant';
import { Calendar, Clock, Ticket, Check, X, Sparkles } from 'lucide-react';

export const EventsAndOffers: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<RestaurantEvent | null>(null);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [tickets, setTickets] = useState(2);
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedEvent(null);
      setInquiryName('');
      setInquiryEmail('');
    }, 2200);
  };

  return (
    <section id="events" className="py-24 bg-[#0B0C10] light:bg-[#FCFBF9] text-[#F3F4F6] light:text-[#191817]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 text-xs tracking-[0.3em] uppercase text-[#C5A059] font-medium mb-3">
            <span className="w-6 h-[1px] bg-[#C5A059]" />
            <span>Salon Evenings & Curated Gatherings</span>
            <span className="w-6 h-[1px] bg-[#C5A059]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight">
            Events & Seasonal Salons
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-slate-400 light:text-slate-600 font-light leading-relaxed">
            Intimate gastronomic masterclasses, library vintage tastings, and Sunday acoustic jazz brunches.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {UPCOMING_EVENTS.map((evt) => (
            <div
              key={evt.id}
              className="bg-[#13141E] light:bg-white border border-[#C5A059]/20 hover:border-[#C5A059]/50 transition-colors p-8 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059] bg-[#0B0C10]/80 px-2.5 py-1">
                    {evt.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#E6C875]">
                    {evt.availableSeats} Seats Remaining
                  </span>
                </div>

                <h3 className="text-2xl font-serif text-[#F3F4F6] light:text-[#191817] mb-3 leading-snug">
                  {evt.title}
                </h3>

                <div className="space-y-1.5 text-xs text-slate-400 light:text-slate-600 mb-4 font-mono">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{evt.time}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 light:text-slate-700 leading-relaxed font-light mb-6">
                  {evt.description}
                </p>

                <div className="space-y-2 mb-6 pt-4 border-t border-[#C5A059]/15">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">
                    What is Included:
                  </span>
                  {evt.includes.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] text-slate-300 light:text-slate-600">
                      <Sparkles className="w-3 h-3 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#C5A059]/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 block">Tier Price</span>
                  <div className="font-serif font-bold text-base text-[#C5A059]">
                    {evt.price}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedEvent(evt)}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0B0C10] bg-[#C5A059] hover:bg-[#D4AF37] light:bg-[#9B7836] light:text-white transition-colors"
                >
                  Request Seats
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Event Request Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 bg-[#0B0C10]/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#141520] border border-[#C5A059]/40 max-w-lg w-full p-8 shadow-2xl relative">
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#C5A059]/20 border border-[#C5A059] mx-auto flex items-center justify-center text-[#C5A059]">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-serif">Salon Inquiry Received</h4>
                  <p className="text-xs text-slate-300">
                    Our Private Dining Sommelier will contact you at {inquiryEmail} within 4 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059]">
                      Salon Reservation Request
                    </span>
                    <h3 className="text-2xl font-serif text-[#F3F4F6] mt-1">
                      {selectedEvent.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {selectedEvent.date} · {selectedEvent.price}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0B0C10] border border-[#C5A059]/30 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="eleanor@domain.com"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0B0C10] border border-[#C5A059]/30 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                      Number of Places Requested
                    </label>
                    <select
                      value={tickets}
                      onChange={(e) => setTickets(parseInt(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-[#0B0C10] border border-[#C5A059]/30 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    >
                      {[1, 2, 3, 4, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Place' : 'Places'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedEvent(null)}
                      className="px-4 py-2 text-xs uppercase tracking-wider text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0B0C10] bg-[#C5A059] hover:bg-[#D4AF37]"
                    >
                      Submit Priority Inquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
