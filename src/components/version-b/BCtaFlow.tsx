import Configurator from '../sections/Configurator';
import { ArrowUpRight, Palette, Ruler, Sparkles } from 'lucide-react';

const BCtaFlow = () => {
  return (
    <section className="px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[36px] bg-[#171411] p-8 text-white shadow-[0_24px_90px_rgba(23,20,17,0.14)] md:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-white/42">
              Конфигуратор
            </p>
            <h2 className="mt-4 max-w-md text-4xl font-semibold uppercase tracking-[-0.05em] md:text-6xl">
              Соберите
              <br />
              своё кашпо
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/62">
              Размер, сорт древесины, тип обработки и цвет. Сразу отправляйте конфигурацию
              менеджеру и получайте живой расчёт под ваш проект.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[24px] bg-white/8 p-4">
                <Ruler size={18} className="text-white/82" />
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/54">
                  Размеры
                </p>
              </div>
              <div className="rounded-[24px] bg-white/8 p-4">
                <Sparkles size={18} className="text-white/82" />
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/54">
                  Премиум / с сучками
                </p>
              </div>
              <div className="rounded-[24px] bg-white/8 p-4">
                <Palette size={18} className="text-white/82" />
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/54">
                  Цвет и финиш
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="https://t.me/MentalProtector"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#171411] transition hover:translate-y-[-1px]"
              >
                Написать менеджеру
                <ArrowUpRight size={15} />
              </a>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38">
                Ответ в рабочее время
              </span>
            </div>
          </div>

          <div className="rounded-[42px] bg-white/72 p-2.5 shadow-[0_34px_110px_rgba(23,20,17,0.12)] backdrop-blur-xl">
            <Configurator />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BCtaFlow;
