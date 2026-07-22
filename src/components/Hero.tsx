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
        {/* Lighter overlay to let the video shine through while keeping text readable */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-brand-light/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10 md:mt-0">
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
            className="h-28 md:h-48 object-contain mx-auto mb-6 md:mb-10 opacity-90 drop-shadow-sm"
          />
          <h2 className="text-brand-accent font-medium tracking-[0.15em] md:tracking-[0.3em] text-xs md:text-sm uppercase mb-4 md:mb-8">{t.hero.subtitle}</h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-brand-text mb-6 md:mb-8 leading-tight">
            {t.hero.quote}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-brand-text/80 max-w-2xl mx-auto leading-relaxed mb-10 font-light px-2">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 sm:px-0">
            <motion.a 
              href="/philosophy"
              onClick={(e) => handleNavClick(e, 'philosophy')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-block px-8 py-4 bg-[#4A5D4A] text-white rounded-full font-medium text-sm hover:shadow-lg transition-shadow uppercase tracking-widest text-center"
            >
              {t.hero.cta}
            </motion.a>
            <motion.a 
              href="/booking"
              onClick={(e) => handleNavClick(e, 'booking')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-block px-8 py-4 bg-transparent border border-[#4A5D4A] text-brand-text rounded-full font-medium text-sm hover:bg-[#4A5D4A] hover:text-white hover:border-[#4A5D4A] transition-all uppercase tracking-widest text-center"
            >
              {t.nav.book}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
