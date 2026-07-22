import React from 'react';
import { Translations } from '../i18n';
import { motion } from 'motion/react';

interface HeroProps {
  t: Translations;
}

export function Hero({ t }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-brand-bg-alt rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-[#D6E2D6] rounded-full blur-[100px] opacity-40"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="block text-sm md:text-base tracking-[0.2em] text-brand-accent uppercase mb-6">
            {t.hero.subtitle}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-brand-text mb-8 leading-tight">
            {t.hero.quote}
          </h1>
          <p className="text-lg md:text-xl text-brand-text/70 max-w-2xl mx-auto leading-relaxed mb-12 font-light">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a 
              href="#philosophy"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-[#4A5D4A] text-white rounded-full font-medium text-sm hover:shadow-lg transition-shadow uppercase tracking-widest"
            >
              {t.hero.cta}
            </motion.a>
            <motion.a 
              href="#booking"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-transparent border border-[#4A5D4A] text-brand-text rounded-full font-medium text-sm hover:bg-[#4A5D4A] hover:text-white hover:border-[#4A5D4A] transition-all uppercase tracking-widest"
            >
              {t.nav.book}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
