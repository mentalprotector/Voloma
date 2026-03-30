import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 ${scrolled ? 'py-3' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center glass rounded-2xl px-6 py-3 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-tighter text-2xl uppercase text-slate">ВОЛОМА</span>
          <span className="h-4 w-px bg-slate/20"></span>
          <span className="text-[10px] uppercase tracking-widest opacity-50 hidden sm:block text-slate">Карельские Мастерские</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-2 md:flex">
            <a href="/a" className="rounded-full border border-slate/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate/60 transition hover:bg-slate hover:text-cream">/a</a>
            <a href="/b" className="rounded-full border border-slate/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate/60 transition hover:bg-slate hover:text-cream">/b</a>
          </div>
          <a href="tel:+79218003040" className="text-xs font-semibold hover:text-wood transition-colors text-slate">+7 921 800-30-40</a>
          <a href="https://t.me/MentalProtector" target="_blank" rel="noopener noreferrer" className="bg-slate text-cream px-5 py-2.5 rounded-xl text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-md">
            TG Менеджер
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
