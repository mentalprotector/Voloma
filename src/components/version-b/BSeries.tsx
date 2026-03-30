import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const series = [
  {
    code: '01',
    title: 'Квадратные',
    price: 'от 8 500 ₽',
    range: '30 x 30 · 45 x 45 · 60 x 60 см',
    desc: 'Собранная геометрия и спокойный силуэт для углов, входных групп и компактных посадок.',
    use: ['терраса', 'балкон', 'интерьер'],
    accent: 'bg-[#6a503d]',
  },
  {
    code: '02',
    title: 'Прямоугольные',
    price: 'от 12 400 ₽',
    range: '80 x 30 · 100 x 40 · 120 x 45 см',
    desc: 'Для зонирования пространства, коммерческих пространств и выразительных длинных композиций.',
    use: ['HoReCa', 'фасад', 'перегородка'],
    accent: 'bg-[#3d5a4d]',
    featured: true,
  },
  {
    code: '03',
    title: 'Узкие',
    price: 'от 6 200 ₽',
    range: '18 · 24 · 30 см по ширине',
    desc: 'Для подоконников, узких проходов и лоджий, где важны ритм, аккуратность и легкость.',
    use: ['подоконник', 'проход', 'лоджия'],
    accent: 'bg-[#b3784c]',
  },
];

const BSeries = () => {
  return (
    <section id="series" className="relative overflow-hidden px-4 py-24 md:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.7),rgba(233,228,218,0)_45%)]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-4"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-black/40">
              Коллекция
            </p>
            <h2 className="text-4xl font-semibold uppercase tracking-[-0.05em] text-[#171411] md:text-6xl">
              Три формы. Один характер.
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-black/55 md:text-base">
              Витрина без шума: сразу видно размер, цену и сценарий использования. Каждый формат
              выглядит как отдельный дорогой объект, а не как строка в каталоге.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-2 md:w-[360px]">
            {[
              ['3', 'серии'],
              ['5', 'цветов'],
              ['1', 'система'],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-[24px] border border-black/10 bg-white/75 p-4 text-center shadow-[0_16px_50px_rgba(0,0,0,0.05)] backdrop-blur-xl"
              >
                <div className="text-3xl font-semibold uppercase tracking-[-0.05em] text-[#171411]">
                  {value}
                </div>
                <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/40">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {series.map((item, index) => (
            <motion.article
              key={item.code}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className={`group relative overflow-hidden rounded-[32px] border border-black/10 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)] md:p-7 ${
                item.featured ? 'scale-[1.01] lg:translate-y-[-8px]' : ''
              }`}
            >
              <div className={`absolute inset-x-0 top-0 h-1 ${item.accent}`} />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/35">
                    Серия {item.code}
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold uppercase tracking-[-0.04em] text-[#171411] md:text-[2.15rem]">
                    {item.title}
                  </h3>
                </div>
                <div className="rounded-full bg-[#f4f0ea] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/55">
                  {item.price}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-black/35">
                    Размеры
                  </p>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#171411]">
                    {item.range}
                  </p>
                </div>

                <p className="max-w-md text-sm leading-relaxed text-black/60 md:text-base">
                  {item.desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {item.use.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/8 bg-[#f6f2eb] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-black/8 pt-5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/40">
                  Под заказ и под проект
                </span>
                <a
                  href="https://t.me/MentalProtector"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#171411] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:scale-[1.02]"
                >
                  Обсудить
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BSeries;
