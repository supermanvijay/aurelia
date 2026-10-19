import React from 'react';
import { Instagram, ArrowUpRight, Heart, MessageCircle } from 'lucide-react';
import { SafeImage } from './common/SafeImage';

export const InstagramFeed: React.FC = () => {
  const posts = [
    {
      id: 'ig-1',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      likes: '1,420',
      comments: '68',
      caption: 'Evening prep in the atelier: A5 Miyazaki Wagyu ribcap resting over binchotan embers. #AureliaMayfair #HauteGastronomy',
    },
    {
      id: 'ig-2',
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop',
      likes: '2,110',
      comments: '94',
      caption: 'Hand-dived Norfolk scallop carpaccio, Calabrian bergamot reduction & Imperial Oscietra. Pure coastal clarity. #MichelinGuide',
    },
    {
      id: 'ig-3',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop',
      likes: '980',
      comments: '42',
      caption: 'Descend into the Vault: over 800 library vintages curated by Head Sommelier. #SommelierSelect #FineWineLondon',
    },
    {
      id: 'ig-4',
      image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?q=80&w=800&auto=format&fit=crop',
      likes: '3,250',
      comments: '128',
      caption: 'Tableside theater: Valrhona Guanaja gold sphere melted with warm espresso cocoa nectar. #DessertArt #MayfairDining',
    },
  ];

  return (
    <section className="py-20 bg-[#0B0C10] light:bg-[#FCFBF9] text-[#F3F4F6] light:text-[#191817] border-t border-[#C5A059]/15">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-[#C5A059] font-medium mb-2">
              <Instagram className="w-4 h-4" />
              <span>@AureliaMayfair</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-normal">
              Follow Our Daily Culinary Journal
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059] hover:text-[#E6C875] transition-colors py-1 border-b border-[#C5A059]/40 self-start sm:self-end"
          >
            <span>Follow on Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {posts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-[#13141F] border border-[#C5A059]/20"
            >
              <SafeImage
                src={post.image}
                alt="Instagram feed image"
                title="Aurelia Mayfair Instagram"
                fallbackType="food"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-[#0B0C10]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="flex items-center justify-between text-xs text-[#E6C875] font-mono">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-[#E6C875]" />
                    <span>{post.likes}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{post.comments}</span>
                  </span>
                </div>

                <p className="text-[11px] text-slate-200 line-clamp-3 font-light leading-relaxed">
                  {post.caption}
                </p>

                <div className="text-[10px] text-[#C5A059] uppercase tracking-wider font-mono">
                  View Post →
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
