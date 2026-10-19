import React, { useState } from 'react';
import { Utensils, Wine, Sparkles, Building2 } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackType?: 'food' | 'interior' | 'cocktail' | 'portrait' | 'chef';
  title?: string;
  containerClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  fallbackType = 'food',
  title,
  ...rest
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getFallbackIcon = () => {
    switch (fallbackType) {
      case 'cocktail':
        return <Wine className="w-8 h-8 text-[#C5A059]" />;
      case 'interior':
        return <Building2 className="w-8 h-8 text-[#C5A059]" />;
      case 'portrait':
      case 'chef':
        return <Sparkles className="w-8 h-8 text-[#C5A059]" />;
      default:
        return <Utensils className="w-8 h-8 text-[#C5A059]" />;
    }
  };

  return (
    <div className={`relative overflow-hidden bg-[#15161E] ${containerClassName}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#12131A] via-[#1C1E2A] to-[#12131A] animate-pulse" />
      )}

      {error ? (
        <div className="w-full h-full min-h-[180px] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#12131A] to-[#1E202C] border border-[#C5A059]/20">
          <div className="w-14 h-14 rounded-full bg-[#C5A059]/10 flex items-center justify-center mb-3 border border-[#C5A059]/30">
            {getFallbackIcon()}
          </div>
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-medium mb-1">
            Haute Culinary Atelier
          </span>
          <p className="text-sm font-serif text-[#F3F4F6] max-w-xs italic line-clamp-2">
            {title || alt || 'Artisanal Gastronomy'}
          </p>
        </div>
      ) : (
        <img
          src={src}
          alt={alt || 'Aurelia Restaurant'}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          {...rest}
        />
      )}
    </div>
  );
};
