import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import SacredCircuitSection from './sections/SacredCircuitSection';
import AncestralJourneySection from './sections/AncestralJourneySection';
import SignatureExperiencesSection from './sections/SignatureExperiencesSection';
import VoyageSection from './sections/VoyageSection';
import TrustSafetySection from './sections/TrustSafetySection';
import ItinerarySection from './sections/ItinerarySection';
import TestimonialsSection from './sections/TestimonialsSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for all sections to mount before setting up global snap
    const timer = setTimeout(() => {
      setupGlobalSnap();
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const setupGlobalSnap = () => {
    const pinned = ScrollTrigger.getAll()
      .filter(st => st.vars.pin)
      .sort((a, b) => a.start - b.start);
    
    const maxScroll = ScrollTrigger.maxScroll(window);
    if (!maxScroll || pinned.length === 0) return;

    const pinnedRanges = pinned.map(st => ({
      start: st.start / maxScroll,
      end: (st.end ?? st.start) / maxScroll,
      center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
    }));

    ScrollTrigger.create({
      snap: {
        snapTo: (value: number) => {
          const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
          if (!inPinned) return value;

          const target = pinnedRanges.reduce((closest, r) =>
            Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
          pinnedRanges[0]?.center ?? 0);
          
          return target;
        },
        duration: { min: 0.15, max: 0.35 },
        delay: 0,
        ease: "power2.out",
      }
    });
  };

  return (
    <div ref={mainRef} className="relative bg-navy min-h-screen">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Gateway Hero */}
        <HeroSection className="z-10" />
        
        {/* Section 2: The Sacred Circuit */}
        <SacredCircuitSection className="z-20" />
        
        {/* Section 3: Ancestral Journey */}
        <AncestralJourneySection className="z-30" />
        
        {/* Section 4: Signature Experiences */}
        <SignatureExperiencesSection className="z-40" />
        
        {/* Section 5: The Voyage */}
        <VoyageSection className="z-50" />
        
        {/* Section 6: Trust & Safety */}
        <TrustSafetySection className="z-[60]" />
        
        {/* Section 7: Itinerary */}
        <ItinerarySection className="z-[70]" />
        
        {/* Section 8: Sangat Stories */}
        <TestimonialsSection className="z-[80]" />
        
        {/* Section 9: Contact */}
        <ContactSection className="z-[90]" />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;