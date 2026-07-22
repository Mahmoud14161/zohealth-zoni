import React from 'react';
import { Translations } from '../i18n';
import { motion } from 'motion/react';

interface HeroProps {
  t: Translations;
}

export function Hero({ t }: HeroProps) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `/${sectionId}`);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 md:pt-32">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full bg-white overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/zonia%20zo.webm" type="video/webm" />
        </video>
        {/* Strong white frosted glass effect for perfect text legibility */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[6px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-white/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4 md:mt-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center z-10 px-2 max-w-4xl mx-auto"
        >
          <motion.img 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            src="/logo.png?v=2" 
            alt="ZoHealth Clinic Logo" 
            className="h-32 md:h-56 object-contain mx-auto mb-2 md:mb-4 opacity-90 drop-shadow-sm"
          />
          <h2 className="text-brand-accent font-medium tracking-[0.1em] md:tracking-[0.2em] text-[10px] md:text-xs uppercase mb-3 md:mb-6">{t.hero.subtitle}</h2>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif text-brand-text mb-4 md:mb-6 leading-tight">
            {t.hero.quote}
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-brand-text/80 max-w-2xl mx-auto leading-relaxed mb-6 md:mb-10 font-light px-2">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full px-4 sm:px-0">
            <motion.a 
              href="/philosophy"
              onClick={(e) => handleNavClick(e, 'philosophy')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-block px-6 py-3 md:px-8 md:py-4 bg-[#4A5D4A] text-white rounded-full font-medium text-xs md:text-sm hover:shadow-lg transition-shadow uppercase tracking-widest text-center"
            >
              {t.hero.cta}
            </motion.a>
            <motion.a 
              href="/booking"
              onClick={(e) => handleNavClick(e, 'booking')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-block px-6 py-3 md:px-8 md:py-4 bg-transparent border border-[#4A5D4A] text-brand-text rounded-full font-medium text-xs md:text-sm hover:bg-[#4A5D4A] hover:text-white hover:border-[#4A5D4A] transition-all uppercase tracking-widest text-center"
            >
              {t.nav.book}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
