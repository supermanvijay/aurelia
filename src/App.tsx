/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { TastingBagProvider, useTastingBag } from './context/TastingBagContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { FeaturedDishes } from './components/FeaturedDishes';
import { WhyChooseUs } from './components/WhyChooseUs';
import { MenuSection } from './components/MenuSection';
import { ReservationSystem } from './components/ReservationSystem';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { EventsAndOffers } from './components/EventsAndOffers';
import { ContactSection } from './components/ContactSection';
import { InstagramFeed } from './components/InstagramFeed';
import { Footer } from './components/Footer';
import { TastingBagDrawer } from './components/TastingBagDrawer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { BackToTop } from './components/BackToTop';
import { Check } from 'lucide-react';

const ToastNotification: React.FC = () => {
  const { toastMessage } = useTastingBag();
  if (!toastMessage) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#13141F] text-[#F3F4F6] border border-[#C5A059] px-5 py-2.5 shadow-2xl flex items-center gap-2.5 text-xs font-serif animate-in fade-in slide-in-from-top-4 duration-200">
      <div className="w-4 h-4 rounded-full bg-[#C5A059] text-[#0B0C10] flex items-center justify-center shrink-0">
        <Check className="w-2.5 h-2.5" />
      </div>
      <span>{toastMessage}</span>
    </div>
  );
};

const RestaurantAppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B0C10] dark:bg-[#0B0C10] light:bg-[#FCFBF9] text-[#F3F4F6] light:text-[#191817] transition-colors duration-300">
      <ToastNotification />
      <Navbar />
      <main>
        <Hero />
        <FeaturedDishes />
        <AboutUs />
        <WhyChooseUs />
        <MenuSection />
        <ReservationSystem />
        <GallerySection />
        <TestimonialsSection />
        <EventsAndOffers />
        <ContactSection />
        <InstagramFeed />
      </main>
      <Footer />

      {/* Floating & Interactive Drawer Overlays */}
      <TastingBagDrawer />
      <WhatsAppFloat />
      <BackToTop />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <TastingBagProvider>
        <RestaurantAppContent />
      </TastingBagProvider>
    </ThemeProvider>
  );
}
