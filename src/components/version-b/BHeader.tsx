import { ArrowUpRight } from 'lucide-react';

type BHeaderProps = {
  mode?: 'home' | 'config';
};

const BHeader = ({ mode = 'home' }: BHeaderProps) => {
  const ctaHref = mode === 'home' ? '/b/configurator' : '/b';
  const ctaLabel = mode === 'home' ? 'Конфигуратор' : 'На главную';

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-6">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between rounded-full bg-white/88 px-4 py-3 shadow-[0_18px_50px_rgba(19,14,11,0.08)] ring-1 ring-black/5 backdrop-blur-xl md:px-6">
        <a href="/b" className="flex items-center gap-3 text-[#171411]">
          <span className="text-sm font-semibold uppercase tracking-[0.34em] md:text-[15px]">
            VOLOMA
          </span>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.28em] text-black/34 sm:block">
            северное дерево
          </span>
        </a>

        <a
          href={ctaHref}
          className="inline-flex items-center gap-2 rounded-full bg-[#171411] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition hover:translate-y-[-1px]"
        >
          {ctaLabel}
          <ArrowUpRight size={14} />
        </a>
      </div>
    </header>
  );
};

export default BHeader;
