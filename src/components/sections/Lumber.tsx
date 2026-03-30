import React from 'react';
import { motion } from 'framer-motion';

const items = [
  { 
    id: '01', 
    title: 'Вагонка и имитация бруса', 
    desc: 'Безупречная геометрия и текстура северной древесины.',
    specs: ['Влажность 12-14%', 'Сорт Экстра/АВ', 'Длина до 6м']
  },
  { 
    id: '02', 
    title: 'Доска пола', 
    desc: 'Высокая плотность и износостойкость карельской сосны.',
    specs: ['Толщина 28/35мм', 'Шип-паз', 'Массив сосны']
  },
  { 
    id: '03', 
    title: 'Мебельный щит', 
    desc: 'С сучками и без. Идеальная влажность для столярных работ.',
    specs: ['Цельноламельный', 'Влажность 8-10%', 'Толщина 20/40мм']
  }
];

const Lumber: React.FC = () => {
  return (
    <section id="lumber" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 text-slate">
                <div className="rounded-2xl h-64 w-full bg-slate/5 overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Wood texture 1" />
                </div>
                <div className="rounded-2xl h-40 w-full bg-slate/5 overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Wood texture 2" />
                </div>
              </div>
              <div className="pt-12 space-y-4">
                <div className="rounded-2xl h-40 w-full bg-slate/5 overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1505691938895-1758d7eaa511?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Wood texture 3" />
                </div>
                <div className="rounded-2xl h-64 w-full bg-slate/5 overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Wood texture 4" />
                </div>
              </div>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-8"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-wood font-bold">Сырье и материалы</span>
            <h2 className="text-5xl md:text-6xl font-serif italic text-wood leading-tight text-slate">Погонаж</h2>
            <p className="opacity-50 text-lg text-slate">Качественные пиломатериалы из карельской сосны для отделки и строительства. Мы контролируем весь цикл: от заготовки до финальной сушки.</p>
            
            <ul className="space-y-8">
              {items.map((item) => (
                <li key={item.id} className="group pb-8 border-b border-slate/5 last:border-0">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="w-6 h-6 rounded-full bg-wood/10 text-wood flex items-center justify-center text-[10px] font-bold">{item.id}</span>
                    <h4 className="font-bold uppercase tracking-tight text-slate text-xl">{item.title}</h4>
                  </div>
                  <p className="text-sm opacity-50 mb-4 ml-10 text-slate">{item.desc}</p>
                  <div className="flex flex-wrap gap-2 ml-10">
                    {item.specs.map(spec => (
                      <span key={spec} className="px-3 py-1 bg-slate/5 rounded-full text-[9px] uppercase font-bold tracking-wider text-slate/60">
                        {spec}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Lumber;
