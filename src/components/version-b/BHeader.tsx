const BHeader = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-[24px] bg-white/82 px-4 py-3 shadow-[0_22px_70px_rgba(0,0,0,0.08)] backdrop-blur-2xl md:px-5">
        <a href="/b" className="group flex items-center gap-3 text-[#171411]">
          <span className="text-sm font-semibold uppercase tracking-[0.32em] md:text-[15px]">
            VOLOMA
          </span>
          <span className="hidden h-4 w-px bg-black/10 md:block" />
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.26em] text-black/40 md:block">
            кашпо
          </span>
        </a>

        <button
          type="button"
          aria-label="Открыть меню"
          className="rounded-full bg-[#171411] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white transition hover:scale-105 active:scale-95"
        >
          Меню
        </button>
      </div>
    </header>
  );
};

export default BHeader;
