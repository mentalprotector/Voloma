import { ArrowUpRight, Factory, Layers3, Trees, Triangle } from 'lucide-react';

const cards = [
  {
    icon: Trees,
    title: 'Северный характер',
    text: 'Карельское дерево, спокойная фактура и предметная подача без суеты.',
  },
  {
    icon: Factory,
    title: 'Своё производство',
    text: 'От сырья до готового изделия без потери качества на каждом этапе.',
  },
  {
    icon: Layers3,
    title: 'Мебель и погонаж',
    text: 'Делаем не только кашпо, но и мебель, сырьё, погонаж и изделия под проект.',
  },
  {
    icon: Triangle,
    title: 'Лучшее сырьё',
    text: 'Сильная заготовка, чистый отбор и дисциплина обработки на каждом этапе.',
  },
];

const BTrust = () => {
  return (
    <section className="px-4 py-8 md:px-6">
      <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[36px] bg-[#171411] p-8 text-white shadow-[0_24px_90px_rgba(23,20,17,0.14)] md:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-white/42">
            О нас
          </p>
          <h2 className="mt-4 max-w-md text-4xl font-semibold uppercase tracking-[-0.05em] md:text-5xl">
            Северное дерево.
            <br />
            Настоящее производство.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/62">
            Voloma делает кашпо, мебель, сырьё и погонаж. Северный характер, сильное дерево и
            производственная база, которая держит качество на уровне предмета, а не заготовки.
          </p>

          <div className="mt-8 flex items-center justify-between gap-4 rounded-[28px] bg-white/6 p-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/42">
                От сырья до изделия
              </p>
              <p className="mt-2 text-lg font-semibold uppercase tracking-[-0.03em]">
                Кашпо, мебель, погонаж
              </p>
            </div>
            <span className="rounded-full bg-white/10 p-3 text-white">
              <ArrowUpRight size={18} />
            </span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-[30px] bg-white/72 p-7 shadow-[0_18px_60px_rgba(0,0,0,0.04)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f2ede5] text-[#6a503d]">
                  <Icon size={18} />
                </div>
                <h3 className="mt-6 text-2xl font-semibold uppercase tracking-[-0.04em] text-[#171411]">
                  {card.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-black/60">{card.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BTrust;
