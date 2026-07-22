import React, { useState } from 'react';
import { Translations } from '../i18n';
import { motion } from 'motion/react';
import { Clock, Laptop, Award, UserCheck, Mail, Bell, Landmark } from 'lucide-react';

interface BookingProps {
  t: Translations;
}

export function Booking({ t }: BookingProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const name = formData.get('name');
    const age = formData.get('age');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const serviceId = formData.get('service');
    
    const serviceTitle = t.services.items.find(s => s.id === serviceId)?.title || serviceId;

    const message = `
🌟 *Nueva Solicitud de Cita* 🌟
👤 *Nombre:* ${name}
🎂 *Edad:* ${age}
📱 *Teléfono:* ${phone}
📧 *Email:* ${email}
🩺 *Servicio:* ${serviceTitle}
`;

    const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '8859591552:AAHaNm9SsJLuMZymvfz6QG4BG1sG3l9aFHs';
    let CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    // Auto-discover Chat ID if missing
    if (!CHAT_ID) {
      try {
        const updatesRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`);
        const updatesData = await updatesRes.json();
        if (updatesData.ok && updatesData.result.length > 0) {
          CHAT_ID = updatesData.result[updatesData.result.length - 1].message.chat.id.toString();
        }
      } catch (error) {
        console.error('Error fetching Chat ID:', error);
      }
    }

    if (CHAT_ID) {
      try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'Markdown',
          }),
        });
      } catch (error) {
        console.error('Error enviando mensaje a Telegram:', error);
      }
    }

    // Send data to Google Sheets
    try {
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzZkyCbIVEiUWaRTVpsu9rb5UZUTAHai_O6wFd3_bGK3uTCYyym6nDhwT-aQZQSRJqcnQ/exec';
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Important to avoid CORS issues with Google Apps Script
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          age: age,
          phone: phone,
          email: email,
          serviceTitle: serviceTitle
        }),
      });
    } catch (error) {
      console.error('Error saving data to Google Sheets:', error);
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      form.reset();
    }, 5000);
  };

  const icons = [Clock, Laptop, Award, UserCheck, Mail, Bell];

  return (
    <section id="booking" className="py-24 relative overflow-hidden">
      {/* Decorative background element matching the image */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-[800px] bg-[#f4ebe1] rounded-l-full opacity-60 -z-10 blur-xl hidden lg:block"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Instructions side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center lg:text-left mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-brand-text mb-2 tracking-wide uppercase">
                {t.booking.title}
              </h2>
              <div className="flex justify-center lg:justify-start items-center gap-4 mb-8">
                <div className="w-12 h-px bg-brand-accent"></div>
                <LeafIcon />
                <div className="w-12 h-px bg-brand-accent"></div>
              </div>
            </div>

            <div className="space-y-6">
              {t.booking.instructions.map((inst, idx) => {
                const Icon = icons[idx % icons.length];
                return (
                  <div key={idx} className="flex items-start gap-6 border-b border-brand-accent-light/30 pb-6 last:border-0">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full border border-brand-accent/40 flex items-center justify-center text-brand-text bg-white">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <p className="text-brand-text/80 leading-relaxed font-light text-sm md:text-base pt-1">
                      {/* Highlight specific words based on the image style */}
                      {highlightText(inst)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center relative py-8 px-6 bg-[#eae1d8]/30 rounded-xl border border-brand-accent/20">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-8 h-px bg-brand-accent/50"></div>
                <h3 className="text-lg font-serif tracking-widest uppercase text-brand-text">
                  {t.booking.paymentTitle}
                </h3>
                <div className="w-8 h-px bg-brand-accent/50"></div>
              </div>
              <div className="flex items-center justify-center gap-6">
                <div className="w-14 h-14 bg-brand-accent/10 rounded-lg flex items-center justify-center">
                  <Landmark className="w-6 h-6 text-brand-text" strokeWidth={1.5} />
                </div>
                <p className="text-brand-text/80 text-sm md:text-base font-light text-left max-w-xs">
                  {highlightText(t.booking.paymentDesc)}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/40 backdrop-blur-xl border border-white/40 p-8 md:p-12 rounded-[40px] shadow-2xl w-full"
          >
            <h3 className="text-2xl font-serif text-brand-text mb-2 text-center">{t.booking.form.title}</h3>
            <p className="text-center text-brand-text/60 mb-8 font-light text-sm">{t.booking.subtitle}</p>
            
            {isSubmitted ? (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-4">
                  <UserCheck className="w-8 h-8 text-brand-accent" />
                </div>
                <p className="text-lg text-brand-text font-serif">{t.booking.form.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-1 ml-1">{t.booking.form.name}</label>
                  <input name="name" required type="text" className="w-full bg-white/50 border border-white/20 rounded-2xl px-4 py-3 text-sm outline-none focus:border-brand-accent transition-all" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-1 ml-1">{t.booking.form.age}</label>
                    <input name="age" required type="number" min="1" className="w-full bg-white/50 border border-white/20 rounded-2xl px-4 py-3 text-sm outline-none focus:border-brand-accent transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-1 ml-1">{t.booking.form.phone}</label>
                    <input name="phone" required type="tel" className="w-full bg-white/50 border border-white/20 rounded-2xl px-4 py-3 text-sm outline-none focus:border-brand-accent transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-1 ml-1">{t.booking.form.email}</label>
                  <input name="email" required type="email" className="w-full bg-white/50 border border-white/20 rounded-2xl px-4 py-3 text-sm outline-none focus:border-brand-accent transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-1 ml-1">{t.booking.form.service}</label>
                  <select name="service" required defaultValue="" className="w-full bg-white/50 border border-white/20 rounded-2xl px-4 py-3 text-sm outline-none focus:border-brand-accent transition-all appearance-none cursor-pointer">
                    <option value="" disabled>{t.booking.form.selectService}</option>
                    {t.services.items.map(s => (
                      <option key={s.id} value={s.id} className="text-brand-text">{s.title}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="w-full py-4 bg-brand-accent hover:bg-[#7A977A] text-white rounded-2xl tracking-widest uppercase text-xs font-bold transition-colors shadow-sm mt-4">
                  {t.booking.form.submit}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// Helper to bold specific key phrases to match the image's typographic style
function highlightText(text: string) {
  const highlights = [
    '60 minutos', '100% en línea', 'certificación de consulta', 
    'datos completos:', 'nombre, edad, teléfono y correo electrónico.',
    'correo institucional', '15 minutos antes', 'confirmar la sesión',
    'transferencia bancaria'
  ];
  
  // English counterparts roughly
  const enHighlights = [
    '60 minutes', '100% online', 'consultation certificate',
    'full details:', 'name, age, phone number, and email.',
    'institutional email', '15 minutes before', 'confirm the session',
    'bank transfer'
  ];

  const allHighlights = [...highlights, ...enHighlights];

  let result: React.ReactNode[] = [text];

  allHighlights.forEach(phrase => {
    result = result.flatMap(part => {
      if (typeof part === 'string') {
        const parts = part.split(new RegExp(`(${phrase})`, 'gi'));
        return parts.map((p, i) => 
          p.toLowerCase() === phrase.toLowerCase() ? <strong key={`${phrase}-${i}`} className="font-semibold text-brand-text">{p}</strong> : p
        );
      }
      return part;
    });
  });

  return <>{result}</>;
}

function LeafIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C12 22 4 16 4 10C4 6.68629 6.68629 4 10 4C11.6569 4 13.1569 4.67157 14.2426 5.75736C15.3284 6.84315 16 8.34315 16 10C16 16 12 22 12 22Z" fill="#8b9c8a" fillOpacity="0.4"/>
      <path d="M12 22C12 22 20 16 20 10C20 6.68629 17.3137 4 14 4C12.3431 4 10.8431 4.67157 9.75736 5.75736C8.67157 6.84315 8 8.34315 8 10C8 16 12 22 12 22Z" fill="#8b9c8a" fillOpacity="0.6"/>
    </svg>
  );
}
