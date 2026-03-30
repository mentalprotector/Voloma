import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const BTrust = () => {
  return (
    <section id="about" className="px-4 pb-16 pt-6 md:px-6 md:pb-24">
      <div className="mx-auto max-w-[1280px] overflow-hidden rounded-[44px] bg-[linear-gradient(135deg,#c89971_0%,#8d654a_48%,#5b4438_100%)] text-white shadow-[0_34px_100px_rgba(48,31,20,0.18)]">
        <div className="grid lg:grid-cols-[1.06fr_0.94fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14"
          >
            <div className="absolute left-[-8%] top-[-12%] h-[240px] w-[240px] rounded-full bg-white/10 blur-[90px]" />
            <div className="relative">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/58">
                О нас
              </p>
              <h2 className="mt-4 max-w-[12ch] text-[38px] font-semibold tracking-[-0.06em] text-white sm:text-[50px] lg:text-[64px]">
                Кашпо сильные, потому что за ними стоит производство.
              </h2>
              <p className="mt-5 max-w-[34rem] text-base leading-relaxed text-white/76">
                Voloma делает кашпо, мебель, сырьё и погонаж. Лучшее северное дерево, настоящее
                производство и дисциплина обработки дают изделию вес, который чувствуется без
                лишних слов.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {['Кашпо', 'Мебель', 'Сырьё', 'Погонаж'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white/12 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/88 ring-1 ring-white/10"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="relative min-h-[420px] border-t border-white/10 px-6 py-8 sm:px-8 sm:py-10 lg:border-l lg:border-t-0 lg:px-10 lg:py-14"
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0)_38%),repeating-linear-gradient(105deg,rgba(255,255,255,0.06)_0,rgba(255,255,255,0.06)_2px,transparent_2px,transparent_30px)] opacity-[0.35]" />

            <div className="relative flex h-full flex-col justify-between">
              <div className="space-y-5">
                {[
                  ['Лучшее сырьё', 'Северный лес с ровной плотной фактурой.'],
                  ['Северный характер', 'Спокойный дизайн и сильная база производства.'],
                  ['Настоящее дерево', 'Не имитация, а честный материал для долгой работы.'],
                ].map(([title, text]) => (
                  <div key={title} className="border-b border-white/12 pb-5 last:border-b-0 last:pb-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white/54">
                      {title}
                    </p>
                    <p className="mt-3 max-w-[24rem] text-sm leading-relaxed text-white/78">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[28px] bg-white/10 p-5 ring-1 ring-white/10 backdrop-blur-xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white/56">
                  Переход
                </p>
                <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <p className="max-w-[18rem] text-lg font-medium leading-snug text-white">
                    Конфигуратор живёт отдельно и открывается как следующая точка сценария.
                  </p>
                  <a
                    href="/b/configurator"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#171411]"
                  >
                    Перейти
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BTrust;
