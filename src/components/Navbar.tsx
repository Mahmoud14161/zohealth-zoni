import React, { useState } from 'react';
import { Translations, Language } from '../i18n';
import { Leaf, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  t: Translations;
  lang: Language;
  setLang: (lang: Language) => void;
}

export function Navbar({ t, lang, setLang }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `/${sectionId}`);
    }
    closeMenu();
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed w-full top-0 z-50 bg-white/60 backdrop-blur-md border-b border-brand-accent-light"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          <div className="flex items-center cursor-pointer gap-3" onClick={() => {
            window.scrollTo({top: 0, behavior: 'smooth'});
            window.history.pushState(null, '', '/');
          }}>
            <img src="/logo.png?v=2" alt="ZoHealth Clinic Logo" className="h-[50px] md:h-[85px] object-contain py-1" />
            <span className="font-serif text-xl md:text-2xl text-brand-text tracking-wider whitespace-nowrap mt-1">ZoHealth Clinic</span>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="/philosophy" onClick={(e) => handleNavClick(e, 'philosophy')} className="text-sm tracking-wide text-brand-text/80 hover:text-brand-accent transition-colors">{t.nav.about}</a>
              <a href="/services" onClick={(e) => handleNavClick(e, 'services')} className="text-sm tracking-wide text-brand-text/80 hover:text-brand-accent transition-colors">{t.nav.services}</a>
              <a href="/booking" onClick={(e) => handleNavClick(e, 'booking')} className="text-sm tracking-wide bg-brand-accent text-white px-6 py-2.5 rounded-full hover:bg-brand-accent/90 transition-colors shadow-sm">{t.nav.book}</a>
            </div>

            {/* Language Switcher (Visible on Mobile and Desktop) */}
            <div className="flex items-center gap-2 border-l border-brand-accent-light/50 pl-4 md:pl-6">
              <button 
                onClick={() => setLang('es')} 
                className={`text-[10px] md:text-xs tracking-widest transition-colors ${lang === 'es' ? 'text-brand-text font-bold' : 'text-brand-text/50 hover:text-brand-accent'}`}
              >
                ES
              </button>
              <span className="text-brand-text/30 text-xs">|</span>
              <button 
                onClick={() => setLang('en')} 
                className={`text-[10px] md:text-xs tracking-widest transition-colors ${lang === 'en' ? 'text-brand-text font-bold' : 'text-brand-text/50 hover:text-brand-accent'}`}
              >
                EN
              </button>
            </div>

            {/* Mobile Hamburger Icon */}
            <div className="md:hidden flex items-center ml-2">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-brand-text hover:text-brand-accent transition-colors">
                {isMobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-b border-brand-accent/20 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-8 gap-6 items-center">
              <a href="/philosophy" onClick={(e) => handleNavClick(e, 'philosophy')} className="text-brand-text/80 font-medium hover:text-brand-accent transition-colors uppercase tracking-widest text-sm w-full text-center py-2 border-b border-brand-accent/10">{t.nav.about}</a>
              <a href="/services" onClick={(e) => handleNavClick(e, 'services')} className="text-brand-text/80 font-medium hover:text-brand-accent transition-colors uppercase tracking-widest text-sm w-full text-center py-2 border-b border-brand-accent/10">{t.nav.services}</a>
              <a href="/booking" onClick={(e) => handleNavClick(e, 'booking')} className="bg-brand-accent text-white px-8 py-3 rounded-full hover:bg-brand-accent/90 transition-colors uppercase tracking-widest text-sm font-bold mt-2 shadow-sm w-full text-center">{t.nav.book}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
