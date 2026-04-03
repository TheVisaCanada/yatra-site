import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '../sections/HeroSection';
import SacredCircuitSection from '../sections/SacredCircuitSection';
import AncestralJourneySection from '../sections/AncestralJourneySection';
import SignatureExperiencesSection from '../sections/SignatureExperiencesSection';
import VoyageSection from '../sections/VoyageSection';
import TrustSafetySection from '../sections/TrustSafetySection';
import ItinerarySection from '../sections/ItinerarySection';
import TestimonialsSection from '../sections/TestimonialsSection';
import ContactSection from '../sections/ContactSection';
import SEOHead from '../components/SEOHead';

gsap.registerPlugin(ScrollTrigger);

const travelAgencySchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Baarik Travel & Tours Inc.',
  url: 'https://yatra.baariktravel.ca',
  logo: 'https://yatra.baariktravel.ca/barrik-logo-orange.png',
  description: 'Elite, secure, and curated Sikh pilgrimage experiences to Pakistan.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1965 Britannia Road West, Unit 208',
    addressLocality: 'Mississauga',
    addressRegion: 'ON',
    postalCode: 'L5M 4Y4',
    addressCountry: 'CA',
  },
  telephone: '+16472497545',
  email: 'yatra@baariktravel.ca',
  areaServed: 'CA',
};

const touristTripSchema = {
  '@context': 'https://schema.org',
  '@type': 'TouristTrip',
  name: 'Sikh Pilgrimage to Pakistan — Sacred Circuit',
  description: 'A 5-day guided pilgrimage to Nankana Sahib, Kartarpur, and Panja Sahib in Pakistan for Canadian Sikh families.',
  touristType: 'Sikh pilgrims',
  itinerary: {
    '@type': 'ItemList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Nankana Sahib — Birthplace of Guru Nanak Dev Ji' },
      { '@type': 'ListItem', position: 2, name: 'Kartarpur — Gurdwara Darbar Sahib' },
      { '@type': 'ListItem', position: 3, name: 'Panja Sahib — Hasan Abdal' },
    ],
  },
  provider: {
    '@type': 'TravelAgency',
    name: 'Baarik Travel & Tours Inc.',
    url: 'https://yatra.baariktravel.ca',
  },
};

const HomePage = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <>
      <SEOHead
        title="Baarik Yatra — Sikh Pilgrimage to Pakistan"
        description="Elite, secure, and curated Sikh pilgrimage experiences to Pakistan. Walk where history was written."
        canonical="https://yatra.baariktravel.ca/"
        ogImage="https://yatra.baariktravel.ca/Darbar%20Sahib%20Kartarpur.jpg"
        schema={[travelAgencySchema, touristTripSchema]}
      />
      <div ref={mainRef} className="relative bg-navy min-h-screen">
        <main className="relative">
          <HeroSection className="z-10" />
          <SacredCircuitSection className="z-20" />
          <AncestralJourneySection className="z-30" />
          <SignatureExperiencesSection className="z-40" />
          <VoyageSection className="z-50" />
          <TrustSafetySection className="z-[60]" />
          <ItinerarySection className="z-[70]" />
          <TestimonialsSection className="z-[80]" />
          <ContactSection className="z-[90]" />
        </main>
      </div>
    </>
  );
};

export default HomePage;
