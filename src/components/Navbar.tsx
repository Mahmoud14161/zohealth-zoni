import React from 'react';
import { Translations, Language } from '../i18n';
import { Leaf } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  t: Translations;
  lang: Language;
  setLang: (lang: Language) => void;
}

export function Navbar({ t, lang, setLang }: NavbarProps) {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed w-full top-0 z-50 bg-white/60 backdrop-blur-md border-b border-brand-accent-light"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img src="/logo.png?v=2" alt="ZoHealth Clinic Logo" className="h-[85px] object-contain py-1" />
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#philosophy" className="text-sm tracking-wide text-brand-text/80 hover:text-brand-accent transition-colors">{t.nav.about}</a>
            <a href="#services" className="text-sm tracking-wide text-brand-text/80 hover:text-brand-accent transition-colors">{t.nav.services}</a>
            <a href="#booking" className="text-sm tracking-wide bg-brand-accent text-white px-6 py-2.5 rounded-full hover:bg-brand-accent/90 transition-colors shadow-sm">{t.nav.book}</a>
            
            <div className="flex items-center gap-2 border-l border-brand-accent-light/50 pl-6 ml-2">
              <button 
                onClick={() => setLang('es')} 
                className={`text-xs tracking-widest transition-colors ${lang === 'es' ? 'text-brand-text font-bold' : 'text-brand-text/50 hover:text-brand-accent'}`}
              >
                ES
              </button>
              <span className="text-brand-text/30">|</span>
              <button 
                onClick={() => setLang('en')} 
                className={`text-xs tracking-widest transition-colors ${lang === 'en' ? 'text-brand-text font-bold' : 'text-brand-text/50 hover:text-brand-accent'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
