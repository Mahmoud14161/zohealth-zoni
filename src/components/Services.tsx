import React from 'react';
import { Translations } from '../i18n';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface ServicesProps {
  t: Translations;
}

export function Services({ t }: ServicesProps) {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-40 -left-40 w-[600px] h-[600px] bg-[#E8F0E8] rounded-full blur-[100px] opacity-50 -z-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif text-brand-text mb-4">{t.services.title}</h2>
            <div className="w-24 h-px bg-brand-accent mx-auto"></div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.services.items.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => {
                window.history.pushState(null, '', `/service/${service.id}`);
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className={`bg-white/40 backdrop-blur-xl p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-shadow border border-white/40 relative overflow-hidden group cursor-pointer ${service.id === 'women' ? 'ring-1 ring-brand-accent/30' : ''}`}
            >
              {service.id === 'women' && (
                <div className="absolute top-0 right-0 p-4">
                  <Sparkles className="w-5 h-5 text-brand-accent opacity-50" />
                </div>
              )}
              <h3 className="text-xl font-serif text-brand-text mb-4 group-hover:text-brand-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-brand-text/70 leading-relaxed font-light">
                {service.description}
              </p>
              
              {/* Decorative bottom border hover effect */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
