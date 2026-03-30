import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import BPlanterVisual from './BPlanterVisual';

type ModelKey = 'rect' | 'square' | 'slim';

const models: Record<
  ModelKey,
  {
    title: string;
    shape: 'rect' | 'square' | 'slim';
    price: string;
    sizes: string[];
  }
> = {
  rect: {
    title: 'Прямоугольное',
    shape: 'rect',
    price: 'от 18 900 ₽',
    sizes: ['100 × 40 × 40', '120 × 45 × 45', '140 × 50 × 50'],
  },
  square: {
    title: 'Квадратное',
    shape: 'square',
    price: 'от 14 200 ₽',
    sizes: ['45 × 45 × 45', '60 × 60 × 60', '80 × 80 × 80'],
  },
  slim: {
    title: 'Узкое',
    shape: 'slim',
    price: 'от 12 800 ₽',
    sizes: ['80 × 24 × 40', '100 × 24 × 45', '120 × 30 × 50'],
  },
};

const cutTypes = ['Радиальный', 'Тангенциальный'];
const colors = ['Светлый дуб', 'Орех', 'Тик', 'Графит'];
const finishes = ['Для интерьера', 'Для улицы'];

const BConfigurator = () => {
  const [modelKey, setModelKey] = useState<ModelKey>('rect');
  const [size, setSize] = useState(models.rect.sizes[0]);
  const [cutType, setCutType] = useState(cutTypes[0]);
  const [color, setColor] = useState(colors[0]);
  const [finish, setFinish] = useState(finishes[1]);

  const model = models[modelKey];
  const telegramMessage = encodeURIComponent(
    [
      'Здравствуйте.',
      'Хочу обсудить кашпо Voloma.',
      `Форма: ${model.title}`,
      `Размер: ${size}`,
      `Спил: ${cutType}`,
      `Цвет: ${color}`,
      `Назначение: ${finish}`,
    ].join('\n'),
  );
  const telegramHref = `https://t.me/MentalProtector?text=${telegramMessage}`;

  const selectModel = (nextModel: ModelKey) => {
    setModelKey(nextModel);
    setSize(models[nextModel].sizes[0]);
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[34px] bg-white p-5 shadow-[0_24px_70px_rgba(29,21,14,0.08)] ring-1 ring-black/5 sm:p-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/34">
            Серия
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {(Object.keys(models) as ModelKey[]).map((key) => {
              const item = models[key];
              const selected = modelKey === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => selectModel(key)}
                  className={`rounded-[24px] px-4 py-4 text-left transition ${
                    selected
                      ? 'bg-[#171411] text-white'
                      : 'bg-[#f6f1ea] text-[#171411] hover:bg-[#f0e8de]'
                  }`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] opacity-70">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm opacity-75">{item.price}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 border-t border-black/8 pt-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/34">
            Размер
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {model.sizes.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSize(item)}
                className={`rounded-full px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
                  size === item
                    ? 'bg-[#171411] text-white'
                    : 'bg-[#f6f1ea] text-black/58 hover:bg-[#f0e8de]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 border-t border-black/8 pt-6 sm:grid-cols-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/34">
              Тип спила
            </p>
            <div className="mt-4 space-y-2">
              {cutTypes.map((item) => {
                const selected = cutType === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCutType(item)}
                    className={`flex w-full items-center justify-between rounded-[22px] px-4 py-4 text-left transition ${
                      selected
                        ? 'bg-[#171411] text-white'
                        : 'bg-[#f6f1ea] text-[#171411] hover:bg-[#f0e8de]'
                    }`}
                  >
                    <span className="text-sm font-medium">{item}</span>
                    {selected ? <Check size={16} /> : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/34">
              Назначение
            </p>
            <div className="mt-4 space-y-2">
              {finishes.map((item) => {
                const selected = finish === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFinish(item)}
                    className={`flex w-full items-center justify-between rounded-[22px] px-4 py-4 text-left transition ${
                      selected
                        ? 'bg-[#171411] text-white'
                        : 'bg-[#f6f1ea] text-[#171411] hover:bg-[#f0e8de]'
                    }`}
                  >
                    <span className="text-sm font-medium">{item}</span>
                    {selected ? <Check size={16} /> : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-black/8 pt-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/34">
            Цвет
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {colors.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setColor(item)}
                className={`rounded-full px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
                  color === item
                    ? 'bg-[#171411] text-white'
                    : 'bg-[#f6f1ea] text-black/58 hover:bg-[#f0e8de]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[34px] bg-[linear-gradient(180deg,#f8f4ed_0%,#eee7dc_100%)] p-5 shadow-[0_24px_70px_rgba(29,21,14,0.08)] ring-1 ring-black/5 sm:p-6">
        <div className="overflow-hidden rounded-[30px] bg-[linear-gradient(180deg,#faf7f1_0%,#ece5db_58%,#dccfbc_59%,#cebca0_100%)] p-5 sm:p-7">
          <div className="relative mx-auto flex min-h-[360px] max-w-[520px] items-center justify-center">
            <div className="absolute inset-x-[14%] bottom-[16%] h-[16%] rounded-full bg-[#715741]/12 blur-[34px]" />
            <div className="absolute inset-x-[16%] top-[8%] h-[14%] rounded-full bg-white/42 blur-[36px]" />
            <div
              className={`w-full max-w-[460px] ${
                model.shape === 'slim' ? 'max-w-[220px]' : model.shape === 'square' ? 'max-w-[320px]' : ''
              }`}
            >
              <BPlanterVisual
                shape={model.shape}
                tone={finish === 'Для улицы' ? 'warm' : 'natural'}
                foliage
              />
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-[28px] bg-white/92 p-5 ring-1 ring-black/5 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/34">
                Сборка
              </p>
              <h2 className="mt-3 text-[28px] font-semibold tracking-[-0.06em] text-[#171411]">
                {model.title}
              </h2>
            </div>
            <span className="rounded-full bg-[#f3eee7] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/54">
              {model.price}
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] bg-[#f6f1ea] px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/34">
                Размер
              </p>
              <p className="mt-2 text-sm font-medium text-[#171411]">{size}</p>
            </div>
            <div className="rounded-[22px] bg-[#f6f1ea] px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/34">
                Спил
              </p>
              <p className="mt-2 text-sm font-medium text-[#171411]">{cutType}</p>
            </div>
            <div className="rounded-[22px] bg-[#f6f1ea] px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/34">
                Цвет
              </p>
              <p className="mt-2 text-sm font-medium text-[#171411]">{color}</p>
            </div>
            <div className="rounded-[22px] bg-[#f6f1ea] px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/34">
                Назначение
              </p>
              <p className="mt-2 text-sm font-medium text-[#171411]">{finish}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-black/8 pt-4">
            <p className="text-sm leading-relaxed text-black/54">
              Отправьте конфигурацию менеджеру и уточните финиш, посадку и срок.
            </p>
            <a
              href={telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#171411] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white"
            >
              Отправить
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BConfigurator;
