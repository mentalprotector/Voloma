import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import BPlanterVisual from './BPlanterVisual';

const heroObjects = [
  {
    title: 'Квадратное',
    note: 'скоро',
    href: '/b/configurator',
    wrapClass: 'absolute left-[24%] top-[10%] hidden w-[17%] md:block',
    labelClass: 'left-1/2 top-[-2.75rem] -translate-x-1/2',
    visualClass: '',
    shape: 'square' as const,
    tone: 'dark' as const,
    ghost: true,
  },
  {
    title: 'Прямоугольное',
    note: 'основная серия',
    href: '/b/configurator',
    wrapClass:
      'absolute left-1/2 top-[14%] w-[48%] max-w-[260px] -translate-x-1/2 sm:w-[40%] lg:w-[28%]',
    labelClass: 'left-1/2 top-[-3rem] -translate-x-1/2',
    visualClass: 'aspect-[0.92/1.42]',
    shape: 'rect' as const,
    tone: 'natural' as const,
    ghost: false,
  },
  {
    title: 'Узкое',
    note: 'скоро',
    href: '/b/configurator',
    wrapClass: 'absolute right-[22%] top-[24%] hidden w-[12%] md:block',
    labelClass: 'left-1/2 top-[-2.75rem] -translate-x-1/2',
    visualClass: '',
    shape: 'slim' as const,
    tone: 'warm' as const,
    ghost: true,
  },
];

const BHero = () => {
  return (
    <section className="px-4 pb-6 pt-24 md:px-6 md:pb-8">
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-[44px] bg-[linear-gradient(180deg,#faf8f4_0%,#f2ede6_100%)] shadow-[0_34px_110px_rgba(37,27,20,0.08)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.92),rgba(255,255,255,0)_34%),radial-gradient(circle_at_18%_22%,rgba(231,224,214,0.7),rgba(231,224,214,0)_34%),radial-gradient(circle_at_84%_18%,rgba(235,228,219,0.85),rgba(235,228,219,0)_30%)]" />

          <div className="relative min-h-[calc(100svh-2rem)] px-4 pb-40 pt-6 sm:px-8 lg:px-12 lg:pb-28 lg:pt-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/34">
                  VOLOMA
                </p>
                <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-black/48">
                  Прямоугольные кашпо для спокойных и сильных пространств.
                </p>
              </div>
              <a
                href="/b/configurator"
                className="hidden rounded-full bg-white/84 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#171411] ring-1 ring-black/5 backdrop-blur-xl md:inline-flex"
              >
                Собрать
              </a>
            </div>

            <div className="relative mt-6 min-h-[48svh] sm:mt-8 lg:min-h-[50svh]">
              <div className="absolute left-1/2 top-[66%] h-[14%] w-[42%] -translate-x-1/2 rounded-full bg-[#7b6049]/10 blur-[44px]" />

              {heroObjects.map((item, index) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.12 + index * 0.08, ease: 'easeOut' }}
                  className={`${item.wrapClass} group`}
                >
                  <span
                    className={`absolute ${item.labelClass} whitespace-nowrap rounded-full bg-white/84 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-black/42 shadow-[0_12px_28px_rgba(0,0,0,0.04)] ring-1 ring-black/5 backdrop-blur-xl`}
                  >
                    {item.title} · {item.note}
                  </span>

                  <BPlanterVisual
                    shape={item.shape}
                    tone={item.tone}
                    ghost={item.ghost}
                    className={`${item.visualClass} transition duration-500 group-hover:translate-y-[-4px]`}
                  />
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28, ease: 'easeOut' }}
              className="absolute bottom-4 left-1/2 z-20 w-[min(100%,500px)] -translate-x-1/2 rounded-[32px] bg-white/96 p-5 shadow-[0_28px_70px_rgba(24,18,14,0.12)] ring-1 ring-black/5 backdrop-blur-xl sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/34">
                    Серия
                  </p>
                  <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.06em] text-[#171411] sm:text-[34px]">
                    Прямоугольное / R100
                  </h1>
                </div>
                <span className="rounded-full bg-[#f3eee7] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/54">
                  от 18 900 ₽
                </span>
              </div>

              <div className="mt-5 grid gap-3 text-sm text-black/58 sm:grid-cols-2">
                <div className="rounded-[22px] bg-[#f6f1ea] px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-black/34">
                    Размер
                  </p>
                  <p className="mt-2 font-medium text-[#171411]">100 × 40 × 40 см</p>
                </div>
                <div className="rounded-[22px] bg-[#f6f1ea] px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-black/34">
                    Тип спила
                  </p>
                  <p className="mt-2 font-medium text-[#171411]">Радиальный</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-black/8 pt-4">
                <a
                  href="/b/configurator"
                  className="inline-flex items-center gap-2 rounded-full bg-[#171411] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition hover:translate-y-[-1px]"
                >
                  Открыть
                  <ArrowUpRight size={14} />
                </a>
                <a
                  href="/b/configurator"
                  className="inline-flex items-center gap-2 rounded-full bg-[#f4efe8] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#171411] transition hover:translate-y-[-1px]"
                >
                  Собрать
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BHero;
