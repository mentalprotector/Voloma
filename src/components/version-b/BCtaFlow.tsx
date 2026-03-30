import Configurator from '../sections/Configurator';
import { ArrowUpRight, Palette, Ruler, Sparkles } from 'lucide-react';

const BCtaFlow = () => {
  return (
    <section className="px-4 py-6 md:px-6 md:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[36px] border border-black/10 bg-white/70 p-8 shadow-[0_24px_90px_rgba(23,20,17,0.06)] backdrop-blur-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-black/40">
              Следующий шаг
            </p>
            <h2 className="mt-4 max-w-md text-4xl font-semibold uppercase tracking-[-0.05em] text-[#171411] md:text-6xl">
              Соберите
              <br />
              своё кашпо
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-black/56">
              Выберите форму, качество, опции и оттенок. Затем отправьте конфигурацию в Telegram
              и получите живой расчёт под ваш проект.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[24px] bg-[#f6f2eb] p-4">
                <Ruler size={18} className="text-[#6a503d]" />
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-black/42">
                  Форма и размер
                </p>
              </div>
              <div className="rounded-[24px] bg-[#f6f2eb] p-4">
                <Palette size={18} className="text-[#6a503d]" />
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-black/42">
                  Оттенок и отделка
                </p>
              </div>
              <div className="rounded-[24px] bg-[#f6f2eb] p-4">
                <Sparkles size={18} className="text-[#6a503d]" />
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-black/42">
                  Расчёт и заказ
                </p>
              </div>
            </div>

            <a
              href="https://t.me/MentalProtector"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#171411] px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:translate-y-[-1px]"
            >
              Обсудить проект
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="rounded-[42px] border border-black/10 bg-[#171411] p-3 shadow-[0_34px_110px_rgba(23,20,17,0.16)]">
            <Configurator />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BCtaFlow;
