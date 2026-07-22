/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { translations, Language } from './i18n';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { Services } from './components/Services';
import { Booking } from './components/Booking';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CustomCursor } from './components/CustomCursor';
import { ServiceLandingPage } from './components/ServiceLandingPage';

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const t = translations[lang];

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      
      const path = window.location.pathname.substring(1);
      if (path && !path.startsWith('service/')) {
        setTimeout(() => {
          const element = document.getElementById(path);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else if (!path) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    // Trigger once on mount
    handleLocationChange();

    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const isServicePage = currentPath.startsWith('/service/');
  const serviceId = isServicePage ? currentPath.split('/')[2] : null;

  return (
    <div className="min-h-screen font-sans selection:bg-brand-accent selection:text-white relative overflow-hidden">
      <CustomCursor />
      
      {/* Background Video with Gradient Overlay */}
      <div className="fixed inset-0 z-[-1]">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/zonia%20zo.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-bg/95 via-brand-bg/80 to-brand-accent-light/90"></div>
      </div>

      <div className="relative z-10">
        <Navbar t={t} lang={lang} setLang={setLang} />
        
        <main>
          {isServicePage && serviceId ? (
            <ServiceLandingPage t={t} serviceId={serviceId} />
          ) : (
            <>
              <Hero t={t} />
              <Philosophy t={t} />
              <Services t={t} />
              <Booking t={t} />
              <FAQ t={t} />
            </>
          )}
        </main>

        <Footer t={t} />
        <WhatsAppButton />
      </div>
    </div>
  );
}


