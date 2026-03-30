import BHeader from '../version-b/BHeader';
import BHero from '../version-b/BHero';
import BShowcase from '../version-b/BShowcase';
import BTrust from '../version-b/BTrust';

const VersionB = () => {
  return (
    <div className="min-h-screen bg-[#f2ede6] text-[#171411] selection:bg-[#735843]/15 selection:text-[#171411]">
      <BHeader />

      <main>
        <BHero />
        <BShowcase />
        <BTrust />
      </main>
    </div>
  );
};

export default VersionB;
