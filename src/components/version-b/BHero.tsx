import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const BHero = () => {
  return (
    <section className="px-4 pt-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-[34px] bg-white shadow-[0_40px_120px_rgba(29,24,20,0.12)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(244,235,224,0.9),rgba(255,255,255,0)_28%),radial-gradient(circle_at_78%_20%,rgba(235,225,212,0.68),rgba(255,255,255,0)_26%),linear-gradient(180deg,#fffdfa_0%,#f8f4ee_58%,#f2ebe1_100%)]" />

          <div className="relative min-h-[74svh] overflow-hidden px-5 pb-6 pt-6 sm:px-8 lg:px-10">
            <div className="absolute inset-x-[14%] top-[10%] h-28 rounded-full bg-[#a78160]/10 blur-3xl sm:h-36" />

            <div className="relative flex min-h-[calc(74svh-3rem)] flex-col justify-between">
              <div className="flex items-start justify-start">
                <div className="rounded-full bg-white/78 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/56 shadow-[0_16px_40px_rgba(41,29,20,0.06)] backdrop-blur-xl">
                  Волома
                </div>
              </div>

              <div className="relative flex flex-1 items-center justify-center py-10 sm:py-12 lg:py-14">
                <motion.div
                  initial={{ opacity: 0, y: 18, rotateX: 6 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.75, delay: 0.12, ease: 'easeOut' }}
                  className="relative w-full max-w-[900px] px-2 [perspective:1800px] sm:px-6"
                >
                  <div className="relative mx-auto aspect-[2.1/1] w-[84%] min-w-[280px] max-w-[840px] translate-y-2 [transform:rotateX(16deg)_rotateY(-14deg)_rotateZ(1.5deg)] sm:w-[80%]">
                    <div className="absolute inset-0 rounded-[34px] bg-[linear-gradient(180deg,#d4b392_0%,#b67f58_100%)] shadow-[0_52px_100px_rgba(70,48,28,0.22),inset_0_1px_0_rgba(255,255,255,0.42)]" />
                    <div className="absolute inset-[1.5%] rounded-[32px] bg-[linear-gradient(135deg,rgba(255,255,255,0.24),rgba(255,255,255,0)_36%,rgba(104,68,43,0.14)_100%)]" />
                    <div className="absolute inset-x-[5%] top-[10%] h-[12%] rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.24),rgba(255,255,255,0.03))] opacity-90" />
                    <div className="absolute inset-y-[8%] right-0 w-[8%] rounded-r-[32px] bg-[linear-gradient(180deg,#8f6444_0%,#704b30_100%)] opacity-95 shadow-[inset_1px_0_0_rgba(255,255,255,0.16)]" />
                    <div className="absolute left-[8%] top-[20%] h-[50%] w-[30%] rounded-[24px] bg-[linear-gradient(90deg,rgba(255,255,255,0.16),rgba(255,255,255,0.02))] blur-[2px]" />
                    <div className="absolute right-[12%] top-[22%] h-[24%] w-[20%] rounded-[28px] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.22),rgba(255,255,255,0)_72%)]" />
                  </div>
                </motion.div>

                <motion.a
                  href="#series"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.22 }}
                  className="absolute bottom-[4%] left-1/2 z-10 w-[min(92%,420px)] -translate-x-1/2 rounded-[28px] bg-white/96 p-4 shadow-[0_24px_70px_rgba(31,22,14,0.14)] ring-1 ring-black/5 backdrop-blur-xl sm:bottom-[6%] sm:p-5"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-black/38">Модель</p>
                  <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.06em] text-[#171411] sm:text-[32px]">
                    Прямоугольное / 100
                  </h2>

                  <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/48">
                    <span className="rounded-full bg-[#f4efe8] px-3 py-2">100 x 40 см</span>
                    <span className="rounded-full bg-[#f4efe8] px-3 py-2">Тангенциальный спил</span>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-black/8 pt-4">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/52">
                      от 12 400 ₽
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#171411] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                      Открыть
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BHero;
