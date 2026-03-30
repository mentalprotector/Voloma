import { ArrowUpRight, Paintbrush, Ruler, ScissorsSquare, Factory } from 'lucide-react';

const points = [
  {
    icon: ScissorsSquare,
    title: 'Радиальный и тангенциальный спил',
    text: 'Два рисунка древесины, два характера формы.',
  },
  {
    icon: Paintbrush,
    title: 'Премиальное покрытие',
    text: 'Сдержанный тон, чистая фактура, аккуратная защита.',
  },
  {
    icon: Factory,
    title: 'Своё производство',
    text: 'Без случайных посредников и лишнего шума в качестве.',
  },
  {
    icon: Ruler,
    title: 'Кастомные размеры',
    text: 'Под окно, террасу, входную группу или проект целиком.',
  },
];

const BTrust = () => {
  return (
    <section className="px-4 py-6 md:px-6">
      <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[36px] border border-black/10 bg-[#171411] p-8 text-white shadow-[0_24px_90px_rgba(23,20,17,0.14)] md:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-white/42">
            Почему это премиально
          </p>
          <h2 className="mt-4 max-w-md text-4xl font-semibold uppercase tracking-[-0.05em] md:text-5xl">
            Не просто кашпо.
            <br />
            Предмет для пространства.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/62">
            Упор на рисунок спила, чистую геометрию и спокойную фактуру. За счёт этого
            кашпо выглядит не массовым товаром, а дорогой вещью для пространства.
          </p>

          <div className="mt-8 flex items-center justify-between gap-4 rounded-[28px] border border-white/10 bg-white/6 p-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/42">
                Детали важны
              </p>
              <p className="mt-2 text-lg font-semibold uppercase tracking-[-0.03em]">Спил, покрытие, размер</p>
            </div>
            <span className="rounded-full border border-white/12 bg-white/10 p-3 text-white">
              <ArrowUpRight size={18} />
            </span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {points.map((point) => {
            const Icon = point.icon;

            return (
              <div
                key={point.title}
                className="rounded-[32px] border border-black/10 bg-white/72 p-7 shadow-[0_18px_60px_rgba(0,0,0,0.05)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f2ede5] text-[#6a503d]">
                  <Icon size={18} />
                </div>
                <h3 className="mt-6 text-2xl font-semibold uppercase tracking-[-0.04em] text-[#171411]">
                  {point.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-black/60">{point.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BTrust;
