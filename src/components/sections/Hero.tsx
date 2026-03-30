import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <header className="relative min-h-[90vh] flex items-center pt-32 pb-20 px-6 overflow-hidden bg-cream">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-3 py-1 bg-wood/10 text-wood text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
            Кашпо из массива
          </span>
          <h1 className="text-6xl md:text-8xl font-serif leading-[0.9] tracking-tight mb-8 text-slate">
            Кашпо из спила.<br /><em className="opacity-40 italic font-serif">Чистый север.</em>
          </h1>
          <p className="text-lg opacity-60 max-w-md mb-10 leading-relaxed text-slate">
            Волома делает выразительные кашпо из радиального и тангенциального спила для террас, дома и коммерческих пространств.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#planters" className="bg-wood text-cream px-8 py-4 rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all">
              Смотреть формы
            </a>
            <a href="#config" className="glass text-slate px-8 py-4 rounded-2xl font-bold hover:bg-white/80 transition-all shadow-sm">
              Собрать кашпо
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 2 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl hover:rotate-0 transition-transform duration-700 border-8 border-white/20">
            <img 
              src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2069&auto=format&fit=crop" 
              alt="Кашпо Волома" 
              className="w-full object-cover aspect-[4/5]"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl shadow-2xl max-w-[240px] border border-white/50">
            <p className="text-xs opacity-50 uppercase tracking-widest mb-2 text-slate font-bold">Актуальная модель</p>
            <p className="font-serif text-3xl italic leading-none text-slate text-wood">SLIM / RECT</p>
            <div className="mt-4 flex justify-between items-end">
              <span className="text-sm font-bold text-slate/60">от 30x30 см</span>
              <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Hero;
