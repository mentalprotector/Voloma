import { motion } from 'framer-motion';
import { Building2, DoorOpen, Home, Trees, ArrowUpRight } from 'lucide-react';

const highlights = [
  {
    title: 'Радиальный спил',
    text: 'Чистый рисунок древесины и спокойная геометрия.',
  },
  {
    title: 'Настоящее дерево',
    text: 'Северное сырьё, без визуального шума и имитаций.',
  },
  {
    title: 'Погодостойкость',
    text: 'Для улицы, террас и входных зон.',
  },
];

const featureTiles = [
  {
    title: 'Любые цвета',
    text: 'Тон под интерьер, фасад или проект.',
  },
  {
    title: 'Современный дизайн',
    text: 'Лаконичный силуэт без лишнего декора.',
  },
  {
    title: 'Обработка и защита',
    text: 'Чистая поверхность и аккуратный финиш.',
  },
  {
    title: 'Сырьё и погонаж',
    text: 'Сильная база производства, а не только витрина.',
  },
];

const scenes = [
  {
    title: 'Терраса',
    label: 'Терраса',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop',
    icon: Trees,
  },
  {
    title: 'Входная группа',
    label: 'Вход',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop',
    icon: DoorOpen,
  },
  {
    title: 'Интерьер',
    label: 'Интерьер',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop',
    icon: Home,
  },
  {
    title: 'HoReCa',
    label: 'HoReCa',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=1600&auto=format&fit=crop',
    icon: Building2,
  },
];

const BShowcase = () => {
  return (
    <section className="px-4 py-8 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-4"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-black/35">
              Фактура и сцена
            </p>
            <h2 className="text-4xl font-semibold uppercase tracking-[-0.05em] text-[#171411] md:text-6xl">
              Кашпо в пространстве
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-black/50 md:text-base">
              Один большой экран, где продукт виден в среде, а фичи читаются сразу и коротко.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-2 md:w-[340px]">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-[22px] border border-black/6 bg-white/54 p-4 backdrop-blur-xl"
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/38">
                  {item.title}
                </div>
                <div className="mt-3 text-xs leading-relaxed text-black/60">{item.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[36px] bg-[#171411] shadow-[0_30px_90px_rgba(0,0,0,0.08)]"
          >
            <img
              src="https://images.unsplash.com/photo-1466781783364-36c955e1e11d?q=80&w=1800&auto=format&fit=crop"
              alt="Кашпо в пространстве"
              className="h-[56vh] min-h-[420px] w-full object-cover opacity-92"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(18,15,12,0.08)_38%,rgba(18,15,12,0.72)_100%)]" />

            <div className="absolute left-6 top-6 rounded-full bg-white/14 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-xl">
              Терраса
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="max-w-2xl text-white">
                <h3 className="text-3xl font-semibold uppercase tracking-[-0.05em] md:text-5xl">
                  Мягкая архитектура для открытого воздуха
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/74 md:text-base">
                  Кашпо дают объём, дисциплину и спокойный ритм, не перетягивая внимание на себя.
                </p>
              </div>
            </div>

            <div className="absolute right-6 top-6 hidden rounded-full bg-white/14 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-xl md:block">
              Сценарии
            </div>
          </motion.article>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {scenes.map((scene, index) => {
              const Icon = scene.icon;

              return (
                <motion.article
                  key={scene.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="group relative overflow-hidden rounded-[30px] bg-white/86"
                >
                  <div className="relative aspect-[1.1] overflow-hidden">
                    <img
                      src={scene.image}
                      alt={scene.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(18,15,12,0.06)_50%,rgba(18,15,12,0.66)_100%)]" />
                    <div className="absolute left-4 top-4 rounded-full bg-white/16 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-xl">
                      {scene.label}
                    </div>
                    <div className="absolute right-4 top-4 rounded-full bg-white/16 p-2.5 text-white backdrop-blur-xl">
                      <Icon size={14} />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="rounded-[22px] bg-white/88 p-4 backdrop-blur-xl">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/38">
                              {scene.title}
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-black/60">
                              Видит пространство и усиливает его.
                            </p>
                          </div>
                          <span className="rounded-full bg-[#171411] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                            Сцена
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-[32px] bg-[#171411] p-8 text-white shadow-[0_24px_90px_rgba(23,20,17,0.14)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-white/42">
              Ключевые фичи
            </p>
            <h3 className="mt-4 max-w-md text-3xl font-semibold uppercase tracking-[-0.05em] md:text-4xl">
              Дерево, спил, защита.
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/62">
              Всё, что нужно для премиального ощущения продукта: честный материал, аккуратный
              финиш и готовность к улице.
            </p>
            <a
              href="#config"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#171411]"
            >
              Собрать кашпо
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {featureTiles.map((tile) => (
              <div
                key={tile.title}
                className="rounded-[30px] border border-black/6 bg-white/74 p-6"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/38">
                  {tile.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-black/60">{tile.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BShowcase;
