import React from 'react';
import { motion } from 'framer-motion';

const planters = [
  {
    title: 'Квадратные',
    desc: 'От 30х30 до 60x60 см. Идеальная симметрия для угловых зон и акцентов.',
    img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2072&auto=format&fit=crop'
  },
  {
    title: 'Прямоугольные',
    desc: 'Массивные формы для зонирования пространства и крупных растений.',
    img: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=2091&auto=format&fit=crop'
  },
  {
    title: 'Узкие (Slim)',
    desc: '3 размера по ширине. Для подоконников, узких проходов и лоджий.',
    img: 'https://images.unsplash.com/photo-1509423358714-9dc33d1f1144?q=80&w=1911&auto=format&fit=crop'
  }
];

const Planters: React.FC = () => {
  return (
    <section id="planters" className="py-32 px-6 bg-white/50">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] uppercase tracking-[0.3em] text-wood font-bold block mb-4"
        >
          Коллекция 2026
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl font-serif italic mb-6 text-slate leading-tight"
        >
          Кашпо
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="opacity-50 max-w-xl mx-auto text-slate leading-relaxed"
        >
          Премиальные решения из массива для озеленения террас, офисов и вашего дома.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        {planters.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group space-y-8"
          >
            <div className="rounded-[2.5rem] overflow-hidden aspect-square bg-slate/5 border border-slate/5 shadow-sm group-hover:shadow-2xl transition-all duration-500">
              <img 
                src={item.img} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                alt={item.title}
              />
            </div>
            <div className="space-y-3 px-2">
              <h4 className="text-2xl font-bold uppercase tracking-tighter text-slate">{item.title}</h4>
              <p className="text-sm opacity-50 text-slate leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Planters;
