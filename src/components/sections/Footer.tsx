import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-24 pb-12 px-6 border-t border-slate/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <span className="font-bold tracking-tighter text-2xl uppercase text-slate">ВОЛОМА</span>
            <span className="h-6 w-px bg-slate/20"></span>
            <span className="text-xs uppercase tracking-widest opacity-50 text-slate font-sans">Карельские Мастерские</span>
          </div>
          <h3 className="text-4xl font-serif italic mb-8 text-slate">Подберем кашпо под ваш проект</h3>
          <div className="space-y-4 text-slate">
            <a href="tel:+79218003040" className="block text-2xl font-bold hover:text-wood transition-colors font-sans">+7 (921) 800-30-40</a>
            <a href="mailto:kbw.ptz@gmail.com" className="block opacity-50 hover:opacity-100 transition-opacity font-sans">kbw.ptz@gmail.com</a>
          </div>
        </div>
        <div className="md:text-right">
          <p className="text-xs uppercase tracking-widest opacity-30 mb-6 text-slate font-sans">Социальные сети</p>
          <div className="flex md:justify-end gap-6 text-slate font-sans">
            <a href="https://t.me/MentalProtector" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline underline-offset-8">Telegram</a>
            <a href="https://wa.me/79218003040" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline underline-offset-8">WhatsApp</a>
            <a href="#" className="font-bold hover:underline underline-offset-8 text-wood">Messenger Max</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-12 border-t border-slate/5 flex flex-col sm:flex-row justify-between text-[10px] uppercase tracking-[0.2em] opacity-30 text-slate font-sans">   
        <p>© 2026 ВОЛОМА Карельские Мастерские</p>
        <p>Кашпо из радиального и тангенциального спила</p>
      </div>
    </footer>
  );
};

export default Footer;
