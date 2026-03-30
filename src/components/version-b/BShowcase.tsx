import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import BPlanterVisual from './BPlanterVisual';

const featureModules = [
  {
    title: 'Радиальный спил',
    text: 'Спокойный рисунок волокон.',
    desktopClass: 'left-[3%] top-[7%] max-w-[190px]',
  },
  {
    title: 'Высококачественное сырьё',
    text: 'Северный отбор без компромиссов.',
    desktopClass: 'right-[4%] top-[10%] max-w-[210px]',
  },
  {
    title: 'Настоящее дерево',
    text: 'Честная фактура и живая глубина.',
    desktopClass: 'left-[2%] top-[42%] max-w-[180px]',
  },
  {
    title: 'Любые цвета',
    text: 'Под фасад, интерьер и проект.',
    desktopClass: 'right-[6%] top-[38%] max-w-[180px]',
  },
  {
    title: 'Современный дизайн',
    text: 'Чистая геометрия без лишнего шума.',
    desktopClass: 'left-[10%] bottom-[13%] max-w-[190px]',
  },
  {
    title: 'Устойчивость к погодным условиям',
    text: 'Для улицы, террасы и входных групп.',
    desktopClass: 'right-[9%] bottom-[18%] max-w-[220px]',
  },
  {
    title: 'Обработка и защита',
    text: 'Финиш, рассчитанный на долгую работу.',
    desktopClass: 'left-[32%] top-[6%] max-w-[180px]',
  },
];

const BShowcase = () => {
  return (
    <section id="features" className="px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-[1280px] overflow-hidden rounded-[44px] bg-[#f4efe8] px-4 py-6 shadow-[0_28px_90px_rgba(32,22,14,0.06)] sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-6 flex flex-col gap-4 sm:mb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/34">
                Преимущества
              </p>
              <h2 className="mt-3 max-w-[34rem] text-[36px] font-semibold tracking-[-0.06em] text-[#171411] sm:text-[48px] lg:text-[60px]">
                Большой кадр.
                <br />
                Короткие фичи вокруг.
              </h2>
            </div>
            <p className="max-w-[22rem] text-sm leading-relaxed text-black/48">
              Экран работает как showcase продукта: один крупный образ, короткие модули и прямой
              переход в конфигуратор.
            </p>
          </div>

          <div className="relative min-h-[78svh] overflow-hidden rounded-[40px] bg-[linear-gradient(180deg,#f7f4ee_0%,#ece5db_100%)] p-3 sm:p-5 lg:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_12%,rgba(255,255,255,0.92),rgba(255,255,255,0)_26%),radial-gradient(circle_at_18%_22%,rgba(230,220,208,0.72),rgba(230,220,208,0)_28%)]" />

            {featureModules.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className={`absolute hidden rounded-[24px] bg-white/86 px-4 py-3 shadow-[0_16px_36px_rgba(19,14,11,0.06)] ring-1 ring-black/5 backdrop-blur-xl lg:block ${item.desktopClass}`}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/34">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-black/52">{item.text}</p>
              </motion.div>
            ))}

            <div className="relative mx-auto h-[50svh] min-h-[360px] w-full max-w-[760px] overflow-hidden rounded-[36px] bg-[linear-gradient(180deg,#faf7f1_0%,#ece5d8_54%,#d8cbb8_55%,#cdbca3_100%)] shadow-[0_30px_90px_rgba(41,29,20,0.12)] lg:mt-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(255,255,255,0.98),rgba(255,255,255,0)_30%),linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0)_32%)]" />
              <div className="absolute inset-x-[14%] top-[10%] h-[16%] rounded-full bg-white/42 blur-[42px]" />
              <div className="absolute right-[6%] top-[18%] h-[38%] w-[16%] rounded-full bg-[#c7b6a0]/40 blur-[28px]" />
              <div className="absolute inset-x-[10%] bottom-[10%] h-[14%] rounded-full bg-[#715741]/14 blur-[34px]" />

              <div className="absolute left-[52%] top-[18%] h-[28%] w-[18%] -translate-x-1/2 opacity-60">
                <BPlanterVisual shape="square" tone="dark" ghost className="w-full" />
              </div>

              <div className="absolute left-1/2 top-[24%] w-[70%] max-w-[520px] -translate-x-1/2">
                <BPlanterVisual
                  shape="rect"
                  tone="warm"
                  foliage
                  className="[transform:rotateX(12deg)_rotateY(-10deg)] [perspective:1400px]"
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.55 }}
              className="absolute bottom-4 left-4 right-4 rounded-[30px] bg-white/96 p-5 shadow-[0_20px_60px_rgba(19,14,11,0.1)] ring-1 ring-black/5 backdrop-blur-xl sm:p-6 lg:bottom-8 lg:left-8 lg:right-auto lg:w-[360px]"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/34">
                Feature scene
              </p>
              <h3 className="mt-3 text-[28px] font-semibold tracking-[-0.06em] text-[#171411]">
                R100 / терраса
              </h3>
              <div className="mt-4 space-y-2 text-sm leading-relaxed text-black/56">
                <p>Настоящее дерево.</p>
                <p>Сильный силуэт.</p>
                <p>Для улицы и интерьера.</p>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-black/8 pt-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/42">
                  от 18 900 ₽
                </span>
                <a
                  href="/b/configurator"
                  className="inline-flex items-center gap-2 rounded-full bg-[#171411] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white"
                >
                  Собрать
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:hidden">
            {featureModules.map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] bg-white/88 px-4 py-4 shadow-[0_14px_30px_rgba(19,14,11,0.05)] ring-1 ring-black/5"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/34">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-black/52">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BShowcase;
