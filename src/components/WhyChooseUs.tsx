import React from 'react';
import { Flame, ShieldCheck, Wine, Sparkles, Sprout, HeartHandshake } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <Sprout className="w-6 h-6 text-[#C5A059]" />,
      title: 'Somerset Biodynamic Estate',
      description: 'Daily harvest of heritage vegetables, wild edible flowers, and cold-pressed botanical oils from our dedicated 40-acre Somerset organic partner farm.',
    },
    {
      icon: <Flame className="w-6 h-6 text-[#C5A059]" />,
      title: 'Binchotan & Woodfire Mastery',
      description: 'Ancient Awadhi dum slow-braising met with Japanese white Kishu binchotan coals at 900°C, delivering subtle aromatic smokiness without char bitterness.',
    },
    {
      icon: <Wine className="w-6 h-6 text-[#C5A059]" />,
      title: '800-Label Subterranean Cellar',
      description: 'Curated by Head Sommelier, featuring rare biodynamic vintages, pre-phylloxera specimens, and bespoke non-alcoholic fermented tea flights.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#C5A059]" />,
      title: 'Michelin Two Stars & Green Star',
      description: 'Recognized by international gastronomy guides for exceptional culinary rigor, zero food waste initiatives, and closed-loop kitchen composting.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#C5A059]" />,
      title: 'Immaculate Tableside Theatrics',
      description: 'Hand-carved tableside presentations, cold-smoked cloches, molten chocolate spheres, and customized embossed tasting menus for special anniversaries.',
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#C5A059]" />,
      title: 'Dedicated Dining Concierge',
      description: 'Seamless handling of dietary requirements, allergen isolation in a dedicated prep suite, and complimentary Mayfair valet service.',
    },
  ];

  return (
    <section className="py-24 bg-[#0F1016] light:bg-[#F4F1EA] text-[#F3F4F6] light:text-[#191817] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 text-xs tracking-[0.3em] uppercase text-[#C5A059] font-medium mb-3">
            <span className="w-6 h-[1px] bg-[#C5A059]" />
            <span>The Aurelia Distinction</span>
            <span className="w-6 h-[1px] bg-[#C5A059]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight">
            Why Dine With Us
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-slate-400 light:text-slate-600 font-light leading-relaxed">
            Every element—from the acoustics of the Crystal Salon to the provenance of every salt crystal—is calibrated for an unforgettable evening.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-8 bg-[#14151F] light:bg-white border border-[#C5A059]/20 hover:border-[#C5A059]/45 transition-colors group shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-none bg-[#0B0C10] light:bg-[#F9F8F5] border border-[#C5A059]/30 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-serif text-[#F3F4F6] light:text-[#191817] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
