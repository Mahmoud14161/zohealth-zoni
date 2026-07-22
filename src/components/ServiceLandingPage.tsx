import React, { useEffect } from 'react';
import { Translations } from '../i18n';
import { motion } from 'motion/react';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';

interface ServiceLandingPageProps {
  t: Translations;
  serviceId: string;
}

export function ServiceLandingPage({ t, serviceId }: ServiceLandingPageProps) {
  const service = t.services.items.find((s) => s.id === serviceId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-brand-text mb-4">Service not found</h1>
          <button 
            onClick={() => {
              window.history.pushState(null, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="text-brand-accent hover:underline flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleBookClick = () => {
    window.history.pushState(null, '', '/booking');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleBackClick = () => {
    window.history.pushState(null, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const serviceImages: Record<string, string> = {
    individual: '/Psicoterapia%20Individual.webp',
    women: '/Programa%20de%20Empoderamiento%20Femenino.webp',
    oncology: '/Psicooncolog%C3%ADa.jpg',
    neuro: '/Neuropsychology.jpg',
    career: '/Career%20Guidance.jpg',
    workshops: '/Workshops%20&%20Conferences.jpg'
  };

  const imageSrc = serviceImages[serviceId];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-6 mb-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => {
            window.history.pushState(null, '', '/services');
            window.dispatchEvent(new PopStateEvent('popstate'));
          }}
          className="flex items-center gap-2 text-brand-text/60 hover:text-brand-accent transition-colors uppercase tracking-widest text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.nav.services}
        </motion.button>
        
        <div className="w-px h-4 bg-brand-text/20"></div>

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={handleBackClick}
          className="flex items-center gap-2 text-brand-text/60 hover:text-brand-accent transition-colors uppercase tracking-widest text-sm font-medium"
        >
          {t.nav.home}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="order-2 lg:order-1"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-text mb-6 leading-tight">
            {service.title}
          </h1>
          <div className="w-24 h-px bg-brand-accent mb-8"></div>
          
          <div className="prose prose-lg prose-p:text-brand-text/80 prose-p:leading-relaxed prose-p:font-light">
            <p className="text-lg md:text-xl font-medium text-brand-text/90">
              {service.description}
            </p>
            {/* Extended content for the landing page */}
            <p className="mt-6">
              En ZoHealth, entendemos que cada proceso es único. Nos enfocamos en brindarte las herramientas necesarias para que puedas alcanzar un bienestar emocional duradero. Nuestro enfoque es empático, profesional y basado en evidencia científica.
            </p>
            <p className="mt-6">
              A través de este servicio, te acompañamos paso a paso en tu camino hacia el autoconocimiento y la sanación, creando un espacio seguro donde puedes expresarte sin juicios.
            </p>
          </div>

          <div className="mt-12">
            <motion.button 
              onClick={handleBookClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-[#4A5D4A] text-white rounded-full font-medium text-sm hover:shadow-lg transition-shadow uppercase tracking-widest text-center w-full sm:w-auto"
            >
              {t.nav.book}
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-[40px] overflow-hidden bg-white/40 backdrop-blur-sm border border-white/40 shadow-xl aspect-square lg:aspect-[4/5] flex items-center justify-center group order-1 lg:order-2"
        >
          {imageSrc ? (
            <img 
              src={imageSrc} 
              alt={service.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-brand-text/30 group-hover:text-brand-accent/50 transition-colors">
              <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
              <span className="text-sm uppercase tracking-widest font-medium">Espacio para imagen</span>
              <span className="text-xs mt-2 opacity-70 px-8 text-center">Puedes subir la imagen relacionada a {service.title} aquí</span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
