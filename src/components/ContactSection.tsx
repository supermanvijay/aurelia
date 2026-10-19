import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Navigation, Car } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'General Inquiry',
          message: '',
        });
      }, 3000);
    }, 600);
  };

  return (
    <section id="contact" className="py-24 bg-[#0F1016] light:bg-[#F4F1EA] text-[#F3F4F6] light:text-[#191817]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 text-xs tracking-[0.3em] uppercase text-[#C5A059] font-medium mb-3">
            <span className="w-6 h-[1px] bg-[#C5A059]" />
            <span>Mayfair Sanctuary</span>
            <span className="w-6 h-[1px] bg-[#C5A059]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight">
            Contact & Location
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-slate-400 light:text-slate-600 font-light leading-relaxed">
            Conveniently situated on Berkeley Square in the heart of Mayfair, London.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info & Google Map */}
          <div className="lg:col-span-6 space-y-8">
            <div className="p-8 bg-[#141520] light:bg-white border border-[#C5A059]/20 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-serif mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#C5A059]" />
                  <span>The Address</span>
                </h3>
                <p className="text-sm text-slate-300 light:text-slate-700 font-light">
                  {RESTAURANT_INFO.address}
                </p>
                <p className="text-xs text-slate-400 light:text-slate-500 mt-1">
                  Nearest Underground: {RESTAURANT_INFO.metroStop}
                </p>
              </div>

              <div className="pt-4 border-t border-[#C5A059]/15">
                <h4 className="text-xs uppercase tracking-widest text-[#C5A059] font-medium mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Service Hours</span>
                </h4>
                <div className="text-xs text-slate-300 light:text-slate-700 space-y-1 font-mono">
                  <p>{RESTAURANT_INFO.openingHours.lunch}</p>
                  <p>{RESTAURANT_INFO.openingHours.dinner}</p>
                  <p className="text-slate-500">{RESTAURANT_INFO.openingHours.monday}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#C5A059]/15">
                <h4 className="text-xs uppercase tracking-widest text-[#C5A059] font-medium mb-2 flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  <span>Valet & Dress Code</span>
                </h4>
                <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed">
                  {RESTAURANT_INFO.valet} {RESTAURANT_INFO.dressCode}
                </p>
              </div>
            </div>

            {/* Custom Google Map Interactive Embed */}
            <div className="relative aspect-[16/9] border border-[#C5A059]/30 overflow-hidden shadow-md">
              <iframe
                title="Aurelia Mayfair Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.2847970891784!2d-0.14911762338000494!3d51.50974391065097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604d55b0a3d4d%3A0x88f98d57d5a5cf2b!2sBerkeley%20Square%2C%20London%20W1J%205AW!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.05) saturate(0.8)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-3 left-3 bg-[#0B0C10]/90 border border-[#C5A059]/40 px-3 py-1.5 flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="text-[11px] font-mono text-white">42 Berkeley Sq, Mayfair</span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-6 bg-[#13141F] light:bg-white border border-[#C5A059]/25 p-8 sm:p-10 shadow-xl">
            <h3 className="text-2xl font-serif mb-2">Private Dining & Inquiries</h3>
            <p className="text-xs text-slate-400 light:text-slate-600 mb-6 font-light">
              For private salon buyouts, sommelier consultations, wedding receptions, or media relations.
            </p>

            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#C5A059] mx-auto" />
                <h4 className="text-2xl font-serif">Message Dispatched</h4>
                <p className="text-xs text-slate-300 light:text-slate-700 max-w-sm mx-auto">
                  Our hospitality director has received your dispatch and will reply to {formData.email} within 6 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 light:text-slate-700 mb-1.5 font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sebastian Sterling"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0B0C10] light:bg-[#FAF8F5] border border-[#C5A059]/30 text-xs text-[#F3F4F6] light:text-[#191817] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 light:text-slate-700 mb-1.5 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sebastian@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0B0C10] light:bg-[#FAF8F5] border border-[#C5A059]/30 text-xs text-[#F3F4F6] light:text-[#191817] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 light:text-slate-700 mb-1.5 font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+44 20 7946 0928"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0B0C10] light:bg-[#FAF8F5] border border-[#C5A059]/30 text-xs text-[#F3F4F6] light:text-[#191817] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 light:text-slate-700 mb-1.5 font-medium">
                    Subject / Area of Interest
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0B0C10] light:bg-[#FAF8F5] border border-[#C5A059]/30 text-xs text-[#F3F4F6] light:text-[#191817] focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="General Inquiry">General Dining Inquiry</option>
                    <option value="Private Dining & Buyout">Private Dining Salon & Buyouts</option>
                    <option value="Wine Cellar Tasting">Cellar Tasting & Rare Acquisitions</option>
                    <option value="Press & Media">Press, Photography & Editorial</option>
                    <option value="Careers">Culinary & Front-of-House Careers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 light:text-slate-700 mb-1.5 font-medium">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How may our hospitality concierge assist you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0B0C10] light:bg-[#FAF8F5] border border-[#C5A059]/30 text-xs text-[#F3F4F6] light:text-[#191817] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0B0C10] bg-[#C5A059] hover:bg-[#D4AF37] light:bg-[#9B7836] light:text-white transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Sending...' : 'Transmit Message'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
