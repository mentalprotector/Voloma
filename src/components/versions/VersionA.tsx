import Navbar from '../sections/Navbar';
import Hero from '../sections/Hero';
import Planters from '../sections/Planters';
import Configurator from '../sections/Configurator';
import Footer from '../sections/Footer';
import StickyMobileCta from '../StickyMobileCta';

const VersionA = () => {
  return (
    <div className="min-h-screen bg-cream font-sans selection:bg-wood/20 selection:text-wood">
      <Navbar />
      <main>
        <Hero />
        <Planters />
        <Configurator />
      </main>
      <Footer />
      <StickyMobileCta />
    </div>
  );
};

export default VersionA;
