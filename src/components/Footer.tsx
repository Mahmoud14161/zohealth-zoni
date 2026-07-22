import React from 'react';
import { Translations } from '../i18n';
import { Leaf, Heart } from 'lucide-react';

interface FooterProps {
  t: Translations;
}

export function Footer({ t }: FooterProps) {
  return (
    <footer className="bg-white/30 backdrop-blur-md pt-16 pb-8 border-t border-[#E0E8E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <div className="flex flex-col items-center gap-4 bg-white/40 backdrop-blur-xl px-12 py-8 rounded-[40px] shadow-xl border border-white/40 w-full max-w-2xl">
            <Heart className="w-8 h-8 text-brand-text mb-2" strokeWidth={1} />
            <p className="font-serif text-2xl text-brand-text italic tracking-wide">
              {t.footer.thanks}
            </p>
            <div className="h-px w-24 bg-brand-accent/50 my-2"></div>
            <p className="text-sm tracking-[0.3em] uppercase text-brand-text/80">
              {t.footer.brand}
            </p>
            <div className="flex items-center justify-center gap-4 mt-2 text-brand-accent/60">
              <Leaf className="w-4 h-4 rotate-[135deg]" />
              <div className="w-16 h-px bg-brand-accent/30"></div>
              <Leaf className="w-4 h-4 -rotate-45" />
            </div>
          </div>
          
          <div className="mt-12 text-sm text-brand-text/40 font-light flex flex-col items-center gap-2">
            <img 
              src="/logo.png?v=2" 
              alt="ZoHealth Signature" 
              className="h-32 object-contain opacity-90 -mb-2"
            />
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1">
                <span>ZoHealth Clinic &copy; 2026</span>
              </div>
              <span>{t.footer.rights}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
