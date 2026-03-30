import { Wind } from 'lucide-react';

const StickyMobileCta = () => {
  return (
    <div className="fixed bottom-6 left-6 right-6 z-50 sm:hidden">
      <div className="dark-glass rounded-2xl border border-white/10 p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <span className="font-serif text-sm font-bold uppercase tracking-widest text-cream italic">
            Контакт
          </span>
          <div className="flex gap-2">
            <a href="tel:+79218003040" className="rounded-lg bg-white/10 p-2 text-cream">
              <Wind size={16} />
            </a>
            <a
              href="https://t.me/MentalProtector"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-white px-6 py-2 text-xs font-bold uppercase text-slate shadow-lg"
            >
              Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyMobileCta;
