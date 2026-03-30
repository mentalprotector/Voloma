import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const boxes = [
  { left: '9%', bottom: '18%', size: '5.5rem', color: '#6e4c37', rotate: '-16deg' },
  { left: '22%', bottom: '29%', size: '6.75rem', color: '#b3784c', rotate: '10deg' },
  { left: '41%', bottom: '15%', size: '8.5rem', color: '#d8b78d', rotate: '-8deg' },
  { left: '63%', bottom: '31%', size: '6.25rem', color: '#3d5a4d', rotate: '14deg' },
  { left: '78%', bottom: '14%', size: '5.25rem', color: '#8f8a74', rotate: '-12deg' },
];

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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(223,212,199,0.48),rgba(255,255,255,0)_34%),radial-gradient(circle_at_50%_75%,rgba(243,238,231,0.4),rgba(255,255,255,0)_42%),linear-gradient(180deg,#ffffff_0%,#fcfbf9_100%)]" />
          <div className="relative min-h-[74svh] overflow-hidden">
            <div className="relative flex items-center justify-center overflow-hidden px-5 py-6 sm:px-8 lg:px-10">
              <div className="absolute inset-x-[14%] top-[8%] h-[18%] rounded-full bg-[#8d6f57]/18 blur-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.94),rgba(248,245,240,0.18)_46%,rgba(255,255,255,0.2)_100%)]" />

              <div className="relative h-[52svh] min-h-[380px] w-full max-w-4xl translate-y-6 sm:translate-y-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.52),rgba(255,255,255,0)_40%)]" />

                {boxes.map((box, index) => (
                  <div
                    key={index}
                    className="absolute rounded-[24px] shadow-[0_28px_80px_rgba(0,0,0,0.14)]"
                    style={{
                      left: box.left,
                      bottom: box.bottom,
                      width: box.size,
                      height: box.size,
                      backgroundColor: box.color,
                      transform: `rotate(${box.rotate})`,
                    }}
                  />
                ))}

                <div className="absolute bottom-[10%] left-[16%] right-[16%] h-16 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.12),rgba(0,0,0,0)_72%)] blur-2xl" />

                <motion.a
                  href="#series"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.18 }}
                  className="absolute bottom-[2%] left-1/2 right-auto z-10 w-[calc(100%-2rem)] -translate-x-1/2 rounded-[28px] bg-white p-4 shadow-[0_24px_80px_rgba(0,0,0,0.12)] sm:bottom-[0%] sm:w-[420px]"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=900&auto=format&fit=crop"
                      alt="Кашпо Волома"
                      className="h-24 w-24 rounded-[20px] object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-black/40">Модель</p>
                      <h2 className="mt-2 text-xl font-semibold uppercase tracking-[-0.04em] text-[#171411] sm:text-2xl">
                        Тангенциальное / 100
                      </h2>
                      <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/48">
                        <span className="rounded-full bg-[#f2ede5] px-3 py-2">100 x 40 см</span>
                        <span className="rounded-full bg-[#f2ede5] px-3 py-2">Тангенциальный спил</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-black/8 pt-4">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/52">
                      от 12 400 ₽
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#171411] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                      Открыть
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </motion.a>

                <div className="absolute left-4 top-4 rounded-full bg-white/85 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-black/58 backdrop-blur-xl sm:left-6 sm:top-6">
                  Волома
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BHero;
