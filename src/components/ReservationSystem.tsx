import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  Utensils,
  Wine,
  Phone,
  Mail,
  User,
  ShieldCheck,
  Copy,
  Download,
  AlertCircle
} from 'lucide-react';
import { DiningArea, ReservationFormData, ConfirmedReservation } from '../types/restaurant';
import { useTastingBag } from '../context/TastingBagContext';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const ReservationSystem: React.FC = () => {
  const { items, totalEstimatedPrice } = useTastingBag();

  // Tomorrow as min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState<ReservationFormData>({
    fullName: '',
    email: '',
    phone: '',
    date: minDateStr,
    time: '19:30',
    guests: 2,
    area: 'crystal-salon',
    occasion: 'Anniversary',
    dietaryNotes: '',
    specialRequests: '',
  });

  const [includeTastingBag, setIncludeTastingBag] = useState(true);
  const [errors, setErrors] = useState<Partial<Record<keyof ReservationFormData, string>>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedReservation | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = {
    lunch: ['12:00', '12:30', '13:00', '13:30', '14:00'],
    dinner: ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'],
  };

  const diningAreas: { id: DiningArea; name: string; desc: string; vibe: string }[] = [
    {
      id: 'crystal-salon',
      name: 'The Crystal Dining Salon',
      desc: 'Our grand main hall beneath Venetian chandeliers with intimate booth spacing.',
      vibe: 'Classic Mayfair Glamour',
    },
    {
      id: 'sommelier-vault',
      name: 'The Subterranean Vault',
      desc: 'Surrounded by 800 rare vintages. Candlelight, acoustic privacy, and dedicated sommelier.',
      vibe: 'Intimate & Connoisseur',
    },
    {
      id: 'chefs-counter',
      name: 'The Charcoal & Omakase Counter',
      desc: 'Front-row view of the binchotan grills. Direct course presentation by Executive Chefs.',
      vibe: 'Immersive & Theatrical',
    },
    {
      id: 'glass-veranda',
      name: 'The Botanical Glass Veranda',
      desc: 'Overlooking Mayfair garden greenery. Bright and airy with subtropical botanical accents.',
      vibe: 'Daylight & Serene',
    },
  ];

  const occasions = [
    'Anniversary',
    'Birthday Celebration',
    'Romantic Date',
    'Business Dinner',
    'Family Gathering',
    'Gastronomy Exploration',
    'Other Special Occasion',
  ];

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ReservationFormData, string>> = {};

    if (!formData.fullName.trim() || formData.fullName.length < 3) {
      newErrors.fullName = 'Please enter your full legal name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.phone.trim() || formData.phone.length < 8) {
      newErrors.phone = 'Please provide a valid contact telephone number.';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a reservation date.';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a dining time.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const randomRef = `AUR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const confirmed: ConfirmedReservation = {
        ...formData,
        bookingId: randomRef,
        createdAt: new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        status: 'Confirmed',
        depositWaived: true,
      };

      setConfirmedBooking(confirmed);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C5A059', '#E6C875', '#ffffff'],
        });
      } catch (err) {
        console.log('Confetti triggered', err);
      }
    }, 600);
  };

  const copyBookingId = () => {
    if (confirmedBooking) {
      navigator.clipboard.writeText(confirmedBooking.bookingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const downloadCalendarFile = () => {
    if (!confirmedBooking) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Aurelia Mayfair//Table Reservation//EN
BEGIN:VEVENT
UID:${confirmedBooking.bookingId}@aureliadining.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${confirmedBooking.date.replace(/-/g, '')}T${confirmedBooking.time.replace(':', '')}00
SUMMARY:Table Reservation at Aurelia Mayfair (${confirmedBooking.guests} Guests)
DESCRIPTION:Reservation reference ${confirmedBooking.bookingId}. Area: ${confirmedBooking.area}. Occasion: ${confirmedBooking.occasion}.
LOCATION:42 Berkeley Square, Mayfair, London W1J 5AW
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Aurelia-Reservation-${confirmedBooking.bookingId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="reservation" className="py-24 bg-[#0F1016] light:bg-[#F4F1EA] text-[#F3F4F6] light:text-[#191817]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 text-xs tracking-[0.3em] uppercase text-[#C5A059] font-medium mb-3">
            <span className="w-6 h-[1px] bg-[#C5A059]" />
            <span>Exclusive Seating</span>
            <span className="w-6 h-[1px] bg-[#C5A059]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight">
            Reserve Your Table
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-slate-400 light:text-slate-600 font-light leading-relaxed">
            Reservations open 60 days in advance. For parties exceeding 8 guests or private salon buyouts, please contact our concierge directly.
          </p>
        </div>

        {confirmedBooking ? (
          /* Confirmation Pass Screen */
          <div className="max-w-2xl mx-auto bg-[#141520] light:bg-white border border-[#C5A059]/40 p-8 sm:p-12 shadow-2xl animate-in zoom-in-95 duration-400 relative">
            <div className="text-center pb-8 border-b border-[#C5A059]/20">
              <div className="w-16 h-16 rounded-full bg-[#C5A059]/15 border border-[#C5A059] mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#C5A059]" />
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium">
                Reservation Confirmed
              </span>
              <h3 className="text-3xl font-serif mt-1 mb-2">We Look Forward to Welcoming You</h3>
              <p className="text-xs text-slate-400 light:text-slate-600">
                A formal confirmation digest has been dispatched to <strong className="text-slate-200 light:text-slate-900">{confirmedBooking.email}</strong>.
              </p>
            </div>

            {/* Reference & Summary Box */}
            <div className="py-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#0B0C10] light:bg-[#FAF8F5] border border-[#C5A059]/25">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#C5A059]">
                    Booking Reference
                  </div>
                  <div className="font-mono text-xl font-bold tracking-wider text-[#F3F4F6] light:text-[#191817]">
                    {confirmedBooking.bookingId}
                  </div>
                </div>
                <button
                  onClick={copyBookingId}
                  className="px-3 py-1.5 text-xs text-slate-300 light:text-slate-700 hover:text-[#C5A059] border border-[#C5A059]/30 flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs py-2">
                <div className="p-3 bg-[#11121A] light:bg-[#F6F4EE] border border-[#C5A059]/15">
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Date</span>
                  <span className="font-semibold text-slate-200 light:text-slate-800 font-mono mt-0.5 block">
                    {confirmedBooking.date}
                  </span>
                </div>
                <div className="p-3 bg-[#11121A] light:bg-[#F6F4EE] border border-[#C5A059]/15">
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Time</span>
                  <span className="font-semibold text-slate-200 light:text-slate-800 font-mono mt-0.5 block">
                    {confirmedBooking.time}
                  </span>
                </div>
                <div className="p-3 bg-[#11121A] light:bg-[#F6F4EE] border border-[#C5A059]/15">
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Guests</span>
                  <span className="font-semibold text-slate-200 light:text-slate-800 font-mono mt-0.5 block">
                    {confirmedBooking.guests} Guests
                  </span>
                </div>
                <div className="p-3 bg-[#11121A] light:bg-[#F6F4EE] border border-[#C5A059]/15">
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Occasion</span>
                  <span className="font-semibold text-slate-200 light:text-slate-800 mt-0.5 block truncate">
                    {confirmedBooking.occasion}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-[#11121A] light:bg-[#F6F4EE] border border-[#C5A059]/15 text-xs text-slate-300 light:text-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-[#C5A059] font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Dining Salon: {diningAreas.find((a) => a.id === confirmedBooking.area)?.name}</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Location: {RESTAURANT_INFO.address}. Complimentary Valet attendant is on station at the main entrance.
                </p>
                {includeTastingBag && items.length > 0 && (
                  <div className="pt-2 border-t border-[#C5A059]/15 text-[11px]">
                    <span className="text-[#C5A059] font-medium">Attached Tasting Itinerary: </span>
                    <span>{items.map((i) => `${i.dish.name} (x${i.quantity})`).join(', ')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-[#C5A059]/20 flex flex-col sm:flex-row gap-4 justify-between">
              <button
                onClick={downloadCalendarFile}
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#0B0C10] bg-[#C5A059] hover:bg-[#D4AF37] flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Add to Apple / Google Calendar</span>
              </button>

              <button
                onClick={() => setConfirmedBooking(null)}
                className="px-6 py-3 text-xs uppercase tracking-wider text-slate-300 light:text-slate-700 hover:text-white border border-[#C5A059]/30 transition-colors"
              >
                Make Another Reservation
              </button>
            </div>
          </div>
        ) : (
          /* The Interactive Booking Form */
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto bg-[#13141E] light:bg-white border border-[#C5A059]/25 p-8 sm:p-12 shadow-2xl"
          >
            {/* Step 1: Party, Date, & Time */}
            <div className="mb-10 pb-8 border-b border-[#C5A059]/20">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059] font-medium mb-4">
                <span>01. Table Specification</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Party Size */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 light:text-slate-700 mb-2 font-medium">
                    Party Size
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-[#C5A059] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData({ ...formData, guests: parseInt(e.target.value) })
                      }
                      className="w-full pl-10 pr-4 py-3 bg-[#0B0C10] light:bg-[#FAF8F5] border border-[#C5A059]/30 text-xs text-[#F3F4F6] light:text-[#191817] focus:outline-none focus:border-[#C5A059]"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date Picker */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 light:text-slate-700 mb-2 font-medium">
                    Reservation Date
                  </label>
                  <div className="relative">
                    <CalendarIcon className="w-4 h-4 text-[#C5A059] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      min={minDateStr}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-[#0B0C10] light:bg-[#FAF8F5] border border-[#C5A059]/30 text-xs text-[#F3F4F6] light:text-[#191817] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  {errors.date && (
                    <span className="text-[11px] text-red-400 mt-1 block">{errors.date}</span>
                  )}
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 light:text-slate-700 mb-2 font-medium">
                    Dining Time
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-[#C5A059] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-[#0B0C10] light:bg-[#FAF8F5] border border-[#C5A059]/30 text-xs text-[#F3F4F6] light:text-[#191817] focus:outline-none focus:border-[#C5A059]"
                    >
                      <optgroup label="Dinner Seating (5:30 PM – 9:30 PM)">
                        {timeSlots.dinner.map((t) => (
                          <option key={t} value={t}>
                            {t} (Dinner)
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Luncheon Seating (12:00 PM – 2:00 PM)">
                        {timeSlots.lunch.map((t) => (
                          <option key={t} value={t}>
                            {t} (Lunch)
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Dining Salon Ambience Selection */}
            <div className="mb-10 pb-8 border-b border-[#C5A059]/20">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059] font-medium mb-4">
                <span>02. Preferred Salon & Atmosphere</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {diningAreas.map((area) => (
                  <div
                    key={area.id}
                    onClick={() => setFormData({ ...formData, area: area.id })}
                    className={`p-4 cursor-pointer transition-all border ${
                      formData.area === area.id
                        ? 'bg-[#181A28] light:bg-[#EFEBE1] border-[#C5A059] shadow-md'
                        : 'bg-[#0B0C10]/60 light:bg-[#FAF8F5] border-[#C5A059]/15 hover:border-[#C5A059]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-serif text-sm font-semibold text-[#F3F4F6] light:text-[#191817]">
                        {area.name}
                      </span>
                      <span className="text-[10px] uppercase font-mono text-[#C5A059]">
                        {area.vibe}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 light:text-slate-600 leading-relaxed">
                      {area.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Contact Credentials & Occasion */}
            <div className="mb-10 pb-8 border-b border-[#C5A059]/20">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059] font-medium mb-4">
                <span>03. Guest Details & Occasion</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 light:text-slate-700 mb-2 font-medium">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#C5A059] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Lady Evelyn Montgomery"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-[#0B0C10] light:bg-[#FAF8F5] border border-[#C5A059]/30 text-xs text-[#F3F4F6] light:text-[#191817] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  {errors.fullName && (
                    <span className="text-[11px] text-red-400 mt-1 block">{errors.fullName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 light:text-slate-700 mb-2 font-medium">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#C5A059] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="evelyn@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-[#0B0C10] light:bg-[#FAF8F5] border border-[#C5A059]/30 text-xs text-[#F3F4F6] light:text-[#191817] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  {errors.email && (
                    <span className="text-[11px] text-red-400 mt-1 block">{errors.email}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 light:text-slate-700 mb-2 font-medium">
                    Telephone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#C5A059] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="+44 7911 123456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-[#0B0C10] light:bg-[#FAF8F5] border border-[#C5A059]/30 text-xs text-[#F3F4F6] light:text-[#191817] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  {errors.phone && (
                    <span className="text-[11px] text-red-400 mt-1 block">{errors.phone}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 light:text-slate-700 mb-2 font-medium">
                    Occasion
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0B0C10] light:bg-[#FAF8F5] border border-[#C5A059]/30 text-xs text-[#F3F4F6] light:text-[#191817] focus:outline-none focus:border-[#C5A059]"
                  >
                    {occasions.map((occ) => (
                      <option key={occ} value={occ}>
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 light:text-slate-700 mb-2 font-medium">
                    Dietary Requirements or Allergens
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1 Gluten-Free, 1 Shellfish Allergy"
                    value={formData.dietaryNotes}
                    onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0B0C10] light:bg-[#FAF8F5] border border-[#C5A059]/30 text-xs text-[#F3F4F6] light:text-[#191817] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-xs uppercase tracking-wider text-slate-300 light:text-slate-700 mb-2 font-medium">
                  Special Table Requests or Wine Preferences (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Quiet corner table requested; interest in 2010 Bordeaux library vintages."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#0B0C10] light:bg-[#FAF8F5] border border-[#C5A059]/30 text-xs text-[#F3F4F6] light:text-[#191817] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              {/* Attach Tasting Bag option */}
              {items.length > 0 && (
                <div className="mt-4 p-3 bg-[#0B0C10] light:bg-[#FAF8F5] border border-[#C5A059]/25 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="includeTasting"
                    checked={includeTastingBag}
                    onChange={(e) => setIncludeTastingBag(e.target.checked)}
                    className="w-4 h-4 accent-[#C5A059]"
                  />
                  <label htmlFor="includeTasting" className="text-xs text-slate-300 light:text-slate-700 cursor-pointer">
                    Forward my current Tasting Itinerary ({items.length} curated courses, est. £{totalEstimatedPrice.toFixed(2)}) to the kitchen brigade.
                  </label>
                </div>
              )}
            </div>

            {/* Submission & Policy Summary */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-xs text-slate-400 light:text-slate-600 space-y-1">
                <p>• Complimentary cancellation up to 24 hours prior to service.</p>
                <p>• Smart Elegant attire requested. Valet assistance upon arrival.</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-10 py-4 text-xs font-semibold uppercase tracking-widest text-[#0B0C10] bg-[#C5A059] hover:bg-[#D4AF37] light:bg-[#9B7836] light:text-white transition-all shadow-lg hover:shadow-[#C5A059]/25 whitespace-nowrap"
              >
                {isSubmitting ? 'Confirming...' : 'Complete Online Reservation'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
