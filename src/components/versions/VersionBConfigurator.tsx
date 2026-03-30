import BConfigurator from '../version-b/BConfigurator';
import BHeader from '../version-b/BHeader';

const VersionBConfigurator = () => {
  return (
    <div className="min-h-screen bg-[#f2ede6] text-[#171411] selection:bg-[#735843]/15 selection:text-[#171411]">
      <BHeader mode="config" />

      <main className="px-4 pb-16 pt-24 md:px-6 md:pb-20">
        <section className="mx-auto max-w-[1280px] overflow-hidden rounded-[44px] bg-[linear-gradient(180deg,#faf8f4_0%,#f0eae1_100%)] px-4 py-6 shadow-[0_34px_110px_rgba(37,27,20,0.08)] sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/34">
                Конфигуратор
              </p>
              <h1 className="mt-3 max-w-[12ch] text-[38px] font-semibold tracking-[-0.06em] text-[#171411] sm:text-[50px] lg:text-[60px]">
                Отдельная точка сборки кашпо.
              </h1>
            </div>
            <p className="max-w-[24rem] text-sm leading-relaxed text-black/48">
              Главная B-версии остаётся витриной из трёх экранов, а вся сборка вынесена сюда как
              следующий шаг сценария.
            </p>
          </div>

          <BConfigurator />
        </section>
      </main>
    </div>
  );
};

export default VersionBConfigurator;
