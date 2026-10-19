import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top of page"
      className="fixed bottom-6 left-6 z-40 p-3 bg-[#13141F] light:bg-white text-[#C5A059] border border-[#C5A059]/40 hover:border-[#C5A059] shadow-xl hover:scale-105 transition-all duration-200"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
};
