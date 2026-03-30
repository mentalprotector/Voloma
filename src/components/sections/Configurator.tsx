import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Settings2 } from 'lucide-react';

type Shape = 'square' | 'rect' | 'slim';
type Grade = 'premium' | 'standard';
type Extra = 'wheels' | 'static';

const shapes = {
  square: { name: 'Квадратное', desc: 'От 30х30 см', price: 'от 8 500 ₽' },
  rect: { name: 'Прямоугольное', desc: 'Для зонирования', price: 'от 12 400 ₽' },
  slim: { name: 'Узкое', desc: 'Для подоконников', price: 'от 6 200 ₽' }
};

const colors = [
  { name: 'Орех', hex: '#4A3728' },
  { name: 'Каштан', hex: '#5D3A1A' },
  { name: 'Дуб', hex: '#A67B5B' },
  { name: 'Тик', hex: '#B35C1E' },
  { name: 'Махагон', hex: '#7B241C' },
];

const PlanterConfigurator: React.FC = () => {
  const [shape, setShape] = useState<Shape>('square');
  const [grade, setGrade] = useState<Grade>('premium');
  const [extra, setExtra] = useState<Extra>('static');
  const [color, setColor] = useState('Орех');

  return (
    <section id="config" className="py-32 px-6 bg-slate text-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-wood/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-wood font-bold text-[10px] uppercase tracking-[0.3em] mb-4 block underline decoration-wood/30 underline-offset-8">Бриф: Конфигуратор</span>
            <h2 className="text-5xl md:text-6xl font-serif mb-6 italic text-cream leading-tight">Ваше кашпо</h2>
            <p className="opacity-40 text-lg leading-relaxed max-w-md">
              Настройте идеальное решение для озеленения. Индивидуальный подбор параметров под ваш проект.
            </p>
          </motion.div>

          {/* Shape Selection */}
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-widest opacity-30 text-cream">Форма изделия</p>
            <div className="grid grid-cols-3 gap-3">
              {(Object.keys(shapes) as Shape[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setShape(s)}
                  className={`py-4 px-2 rounded-2xl border transition-all text-center ${
                    shape === s ? 'bg-cream text-slate border-cream shadow-xl' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <span className="block font-bold text-[10px] uppercase">{shapes[s].name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Grade & Extras */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-widest opacity-30 text-cream font-bold">Качество</p>
              <div className="flex flex-col gap-2">
                <button onClick={() => setGrade('premium')} className={`py-3 px-4 rounded-xl border text-[10px] font-bold uppercase transition-all flex justify-between items-center ${grade === 'premium' ? 'bg-white text-slate' : 'border-white/10'}`}>
                  Премиум {grade === 'premium' && <Check size={12}/>}
                </button>
                <button onClick={() => setGrade('standard')} className={`py-3 px-4 rounded-xl border text-[10px] font-bold uppercase transition-all flex justify-between items-center ${grade === 'standard' ? 'bg-white text-slate' : 'border-white/10'}`}>
                  Стандарт {grade === 'standard' && <Check size={12}/>}
                </button>
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-widest opacity-30 text-cream font-bold">Опции</p>
              <div className="flex flex-col gap-2">
                <button onClick={() => setExtra('wheels')} className={`py-3 px-4 rounded-xl border text-[10px] font-bold uppercase transition-all flex justify-between items-center ${extra === 'wheels' ? 'bg-white text-slate' : 'border-white/10'}`}>
                  На колесах {extra === 'wheels' && <Check size={12}/>}
                </button>
                <button onClick={() => setExtra('static')} className={`py-3 px-4 rounded-xl border text-[10px] font-bold uppercase transition-all flex justify-between items-center ${extra === 'static' ? 'bg-white text-slate' : 'border-white/10'}`}>
                  Статичное {extra === 'static' && <Check size={12}/>}
                </button>
              </div>
            </div>
          </div>

          {/* Color Selection (Brief requirement: 5 colors) */}
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-widest opacity-30 text-cream">Цветовая палитра</p>
            <div className="flex flex-wrap gap-3">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-full border transition-all ${
                    color === c.name ? 'bg-cream text-slate border-cream shadow-lg scale-105' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: c.hex }}></span>
                  <span className="block text-[10px] font-bold uppercase leading-none">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex items-center justify-between gap-6">
            <div>
              <span className="block text-[10px] uppercase tracking-widest opacity-40">Стоимость конфигурации</span>
              <span className="text-3xl font-serif italic text-cream">{shapes[shape].price}</span>
            </div>
            <a href="https://t.me/MentalProtector" target="_blank" rel="noopener noreferrer" className="bg-wood text-cream px-10 py-5 rounded-2xl font-bold hover:scale-105 transition-all shadow-2xl">
              Заказать
            </a>
          </div>
        </div>

        <div className="sticky top-32">
          <div className="dark-glass p-2 rounded-[48px] shadow-2xl overflow-hidden group border border-white/10">
            <div className="bg-[#0a0a0a] rounded-[40px] overflow-hidden aspect-square flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`${shape}-${grade}-${extra}-${color}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center z-10 p-12"
                >
                  <p className="font-serif text-5xl mb-4 text-cream tracking-tight uppercase">
                    {shapes[shape].name}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-[8px] uppercase tracking-widest text-cream">{grade}</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-[8px] uppercase tracking-widest text-cream">{extra}</span>
                    <span className="px-3 py-1 bg-wood/40 rounded-full text-[8px] uppercase tracking-widest text-cream">{color}</span>
                  </div>
                  <p className="opacity-40 text-[10px] tracking-[0.4em] uppercase text-cream">
                    Карельское производство • 2026
                  </p>
                </motion.div>
              </AnimatePresence>
              
              <img 
                src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2072&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none mix-blend-screen"
                alt="Фактура кашпо"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </div>
          </div>
          
          <div className="mt-8 flex items-center gap-4 text-[10px] uppercase tracking-widest opacity-30 justify-center">
             <Settings2 size={14} />
             <span>Интерактивный вид</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanterConfigurator;
