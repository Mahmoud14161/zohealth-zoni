import React from 'react';
import { Translations } from '../i18n';
import { motion } from 'motion/react';
import { HeartHandshake } from 'lucide-react';

interface PhilosophyProps {
  t: Translations;
}

export function Philosophy({ t }: PhilosophyProps) {
  return (
    <section id="philosophy" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden relative shadow-lg border border-white/20">
              <img 
                src="/zohealth.png" 
                alt="ZoHealth Care" 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-brand-accent/10 mix-blend-multiply"></div>
            </div>
            {/* Decorative leaf/shape overlay */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-brand-bg-alt rounded-full -z-10"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <HeartHandshake className="w-6 h-6 text-brand-accent" strokeWidth={1.5} />
              <h2 className="text-3xl md:text-4xl font-serif text-brand-text">{t.philosophy.title}</h2>
            </div>
            
            <div className="space-y-6 text-brand-text/80 text-lg leading-relaxed font-light">
              <p>{t.philosophy.p1}</p>
              <p>{t.philosophy.p2}</p>
              <p>{t.philosophy.p3}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
