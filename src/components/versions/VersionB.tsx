import BHeader from '../version-b/BHeader';
import BHero from '../version-b/BHero';
import BSeries from '../version-b/BSeries';
import BShowcase from '../version-b/BShowcase';
import BTrust from '../version-b/BTrust';
import BCtaFlow from '../version-b/BCtaFlow';
import StickyMobileCta from '../StickyMobileCta';

const VersionB = () => {
  return (
    <div className="min-h-screen bg-[#e9e4da] text-[#171411] selection:bg-[#6a503d]/20 selection:text-[#6a503d]">
      <BHeader />

      <main className="pb-16 pt-20">
        <BHero />
        <BSeries />
        <BShowcase />
        <BTrust />
        <BCtaFlow />
      </main>

      <StickyMobileCta />
    </div>
  );
};

export default VersionB;
