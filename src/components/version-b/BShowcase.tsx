import { motion } from 'framer-motion';
import { Building2, DoorOpen, Home, Trees } from 'lucide-react';

const scenes = [
  {
    title: 'Терраса',
    label: 'Терраса',
    text: 'Ритм у входа в дом, на веранде и вдоль открытых зон.',
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
    icon: Trees,
  },
  {
    title: 'Входная группа',
    label: 'Вход',
    text: 'Собирает композицию у двери и сразу задает характер.',
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop',
    icon: DoorOpen,
  },
  {
    title: 'Интерьер',
    label: 'Интерьер',
    text: 'Работает как тихий предмет с дорогой фактурой и цветом.',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
    icon: Home,
  },
  {
    title: 'HoReCa',
    label: 'HoReCa',
    text: 'Для ресторанов, кофеен и лобби, где важна подача и масштаб.',
    image:
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=1200&auto=format&fit=crop',
    icon: Building2,
  },
];

const BShowcase = () => {
  return (
    <section className="px-4 py-8 md:px-6">
      <div className="mx-auto max-w-6xl rounded-[40px] border border-black/8 bg-white p-5 shadow-[0_30px_90px_rgba(0,0,0,0.06)] md:p-8">
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-black/35">
              Сценарии использования
            </p>
            <h2 className="text-4xl font-semibold uppercase tracking-[-0.05em] text-[#171411] md:text-6xl">
              Кашпо в пространстве
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-black/50">
            Не отдельная вещь, а часть дорогого пространства.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[32px] border border-black/8 bg-[#f7f3ec] lg:col-span-7 lg:row-span-2"
          >
            <img
              src="https://images.unsplash.com/photo-1466781783364-36c955e1e11d?q=80&w=1600&auto=format&fit=crop"
              alt="Терраса с кашпо"
              className="h-full min-h-[420px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(18,15,12,0.08)_38%,rgba(18,15,12,0.72)_100%)]" />
            <div className="absolute left-6 top-6 rounded-full border border-white/15 bg-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-xl">
              Терраса
            </div>
            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
              <div className="max-w-xl space-y-4 text-white">
                <h3 className="text-3xl font-semibold uppercase tracking-[-0.05em] md:text-5xl">
                  Мягкая архитектура для открытого воздуха
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-white/72">
                  Кашпо дают объём, дисциплину и спокойный ритм, не забирая внимание у пространства.
                </p>
              </div>
            </div>
          </motion.article>

          {scenes.map((scene, index) => {
            const Icon = scene.icon;

            return (
              <motion.article
                key={scene.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group overflow-hidden rounded-[32px] border border-black/8 bg-[#faf8f4] shadow-[0_20px_60px_rgba(0,0,0,0.04)] lg:col-span-5"
              >
                <div className="relative aspect-[1.25] overflow-hidden">
                  <img
                    src={scene.image}
                    alt={scene.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(18,15,12,0.08)_52%,rgba(18,15,12,0.72)_100%)]" />
                  <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-white/15 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-white backdrop-blur-xl">
                    {scene.label}
                  </div>
                  <div className="absolute right-5 top-5 rounded-full border border-white/15 bg-white/15 p-2.5 text-white backdrop-blur-xl">
                    <Icon size={14} />
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="rounded-[22px] border border-white/12 bg-white/88 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/38">
                            {scene.title}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-black/62">{scene.text}</p>
                        </div>
                        <span className="rounded-full bg-[#171411] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                          Вид
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
    </section>
  );
};

export default BShowcase;
