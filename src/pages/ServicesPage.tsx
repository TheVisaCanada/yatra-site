import { useParams, Link } from 'react-router-dom';
import { Check, X, ArrowRight, Calendar, Users, Shield } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Pilgrimage Travel',
  provider: {
    '@type': 'TravelAgency',
    name: 'Baarik Travel & Tours Inc.',
    url: 'https://yatra.baariktravel.ca',
  },
  areaServed: 'CA',
  description: 'Curated Sikh pilgrimage packages to Pakistan — Sacred Circuit, Ancestral Journey, and Private Charter.',
};

type ServiceKey = 'sacred-circuit' | 'ancestral-journey' | 'private-charter';

const services: Record<ServiceKey, {
  id: ServiceKey;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  image: string;
  tagline: string;
  description: string;
  duration: string;
  groupSize: string;
  itinerary: { day: string; title: string; details: string }[];
  tiers: { name: string; price: string; features: string[] }[];
  included: string[];
  excluded: string[];
}> = {
  'sacred-circuit': {
    id: 'sacred-circuit',
    title: 'The Sacred Circuit',
    subtitle: 'Nankana Sahib • Kartarpur • Panja Sahib',
    icon: Calendar,
    image: '/nankana-sahib.jpg',
    tagline: 'Five days through the geography of Guru Nanak\'s life.',
    description: 'Our flagship pilgrimage covers the three most sacred Sikh sites in Pakistan in a structured, supported five-day journey. Designed for families and small groups seeking depth over speed.',
    duration: '5 days / 4 nights',
    groupSize: 'Max 12 pilgrims',
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Lahore', details: 'Airport pickup, hotel check-in, evening orientation briefing, Gurdwara Dera Sahib visit.' },
      { day: 'Day 2', title: 'Nankana Sahib', details: 'Full day at the birthplace of Guru Nanak — Janam Asthan, Bal Leela, Patti Sahib, Kiara Sahib. Langar lunch.' },
      { day: 'Day 3', title: 'Kartarpur Sahib', details: 'Gurdwara Darbar Sahib Kartarpur — the world\'s largest gurdwara. Morning hukamnama, guided tour, afternoon reflection time.' },
      { day: 'Day 4', title: 'Panja Sahib + Lahore Heritage', details: 'Morning drive to Hasan Abdal, Gurdwara Panja Sahib. Afternoon: Lahore Fort, Badshahi Mosque area (optional cultural visit).' },
      { day: 'Day 5', title: 'Departure', details: 'Morning at leisure, airport transfer, departure.' },
    ],
    tiers: [
      {
        name: 'Shared Group',
        price: 'From $3,200 CAD',
        features: ['Join an existing group (max 12)', 'Shared AC coach transport', '4-star hotel twin share', 'All gurdwara entry & permits', 'Daily heritage briefings', 'PSGPC visa letter'],
      },
      {
        name: 'Private Group',
        price: 'From $5,400 CAD',
        features: ['Your group only (min 4)', 'Dedicated private vehicle', 'Hotel of your choice', 'All gurdwara entry & permits', 'Personal heritage guide', 'PSGPC visa letter', 'Flexible itinerary adjustments'],
      },
    ],
    included: [
      'Return airport transfers (Lahore)',
      'All ground transport',
      'Hotel accommodation (4 nights)',
      'PSGPC invitation letter for visa',
      'All gurdwara entry arrangements',
      'On-ground heritage guide',
      '24/7 support contact',
      'Daily water & snacks in vehicle',
    ],
    excluded: [
      'International flights',
      'Pakistan e-visa fee (approx. $20 CAD)',
      'Travel insurance',
      'Personal expenses & souvenirs',
      'Optional security escort (available on request)',
      'Meals outside langar',
    ],
  },
  'ancestral-journey': {
    id: 'ancestral-journey',
    title: 'Ancestral Journey',
    subtitle: 'Village research • Local visits • Heritage documentation',
    icon: Users,
    image: '/experience_card_2_village.jpg',
    tagline: 'Find your village. Meet your history.',
    description: 'A deeply personal service that traces your family\'s roots in Pakistani Punjab — mapping ancestral villages, researching land records, and arranging meetings with local community members who may share your heritage.',
    duration: 'Flexible (3–10 days)',
    groupSize: 'Families & individuals',
    itinerary: [
      { day: 'Phase 1', title: 'Pre-Trip Research', details: 'Our team works with your family documents to identify your ancestral village, tehsil, and district. We begin local record searches before you land.' },
      { day: 'Phase 2', title: 'Lahore Base + Briefing', details: 'Arrival in Lahore, detailed briefing on research findings, introduction to your dedicated fixer and translator.' },
      { day: 'Phase 3', title: 'Village Visit', details: 'Private transport to your ancestral village. Local introductions, land record access (where available), photography documentation.' },
      { day: 'Phase 4', title: 'Sacred Sites + Reflection', details: 'Combined with Sacred Circuit sites where geographic overlap allows — Nankana Sahib, Kartarpur, or others relevant to your family region.' },
      { day: 'Phase 5', title: 'Documentation & Departure', details: 'Compiled heritage report delivered digitally — maps, photographs, records found, contacts made.' },
    ],
    tiers: [
      {
        name: 'Research + Day Visit',
        price: 'From $2,800 CAD',
        features: ['Pre-trip village research', 'One village day visit', 'Local fixer + translator', 'Transport from Lahore', 'Photography documentation', 'Digital heritage report'],
      },
      {
        name: 'Full Heritage Package',
        price: 'From $4,900 CAD',
        features: ['Extended pre-trip research', 'Multiple village visits', 'Dedicated fixer + translator (full trip)', 'Private transport throughout', 'Professional photo documentation', 'Comprehensive digital heritage report', 'Combined with Sacred Circuit sites'],
      },
    ],
    included: [
      'Pre-trip village & archive research',
      'Local fixer and Punjabi/Urdu translator',
      'Private transport for village visits',
      'Photography documentation session',
      'Digital heritage report',
      'PSGPC visa letter if gurdwaras included',
      '24/7 support contact',
    ],
    excluded: [
      'International flights',
      'Pakistan e-visa fee',
      'Hotel accommodation (arranged separately or bundled)',
      'Travel insurance',
      'Official document notarization fees',
      'Personal expenses',
    ],
  },
  'private-charter': {
    id: 'private-charter',
    title: 'Private Charter',
    subtitle: 'Custom group • Your dates • Your itinerary',
    icon: Shield,
    image: '/experience_card_3_charter.jpg',
    tagline: 'The full Baarik experience, built entirely around your group.',
    description: 'A fully bespoke journey for families, sangat groups, or corporate wellness trips. Every element — dates, sites, accommodation, pace, and security level — is designed around your specific requirements.',
    duration: 'Custom (4–14 days)',
    groupSize: 'Any size (minimum 6)',
    itinerary: [
      { day: 'Consultation', title: 'Custom Planning Session', details: 'A dedicated planning call with our team to define your group\'s priorities, spiritual goals, and logistical requirements.' },
      { day: 'Design', title: 'Bespoke Itinerary', details: 'We build your complete itinerary — sacred sites, ancestral research, cultural visits, rest days — mapped to your group\'s pace and needs.' },
      { day: 'Execution', title: 'On-Ground Management', details: 'Dedicated trip manager for your group throughout. Private vehicles, vetted hotels, pre-cleared permits, security coordination.' },
      { day: 'Extension', title: 'Islamabad & Panja Sahib', details: 'Optional 2-day extension to Hasan Abdal (Panja Sahib), Taxila Museum, and Rawalpindi.' },
      { day: 'Legacy', title: 'Documentation Package', details: 'Professional trip photography and a printed heritage journal delivered post-trip.' },
    ],
    tiers: [
      {
        name: 'Standard Charter',
        price: 'Quoted per group',
        features: ['Full bespoke itinerary', 'Private AC transport fleet', 'Dedicated trip manager', 'Hotel selection & booking', 'All permits & PSGPC letters', 'Daily heritage briefings', '24/7 support'],
      },
      {
        name: 'Premium Charter',
        price: 'Quoted per group',
        features: ['Everything in Standard', 'Licensed security escort (optional)', 'Armored vehicle option', 'Luxury hotel tier', 'Professional trip photographer', 'Printed heritage journal', 'Airport lounge access (Lahore)', 'Post-trip debrief call'],
      },
    ],
    included: [
      'All ground transport (private)',
      'Dedicated trip manager',
      'All gurdwara entry & permit arrangements',
      'PSGPC invitation letters',
      'Hotel accommodation (your tier)',
      'Pre-trip planning sessions',
      '24/7 emergency support line',
      'Daily filtered water in vehicles',
    ],
    excluded: [
      'International flights',
      'Pakistan e-visa fees',
      'Travel insurance (strongly recommended)',
      'Personal expenses',
      'Security escort (available — quoted separately)',
      'Meals outside langar',
    ],
  },
};

const ServicesPage = () => {
  const { serviceSlug } = useParams<{ serviceSlug?: string }>();
  const activeKey: ServiceKey = (serviceSlug as ServiceKey) || 'sacred-circuit';
  const active = services[activeKey] || services['sacred-circuit'];

  return (
    <>
      <SEOHead
        title={`${active.title} — Baarik Yatra`}
        description={active.description}
        canonical={`https://yatra.baariktravel.ca/services/${active.id}`}
        ogImage={active.image}
        schema={serviceSchema}
      />
      <div className="bg-navy min-h-screen pt-24">
        {/* Page Header */}
        <div className="w-full px-6 lg:px-12 py-12 border-b border-gold-dim">
          <div className="max-w-6xl mx-auto">
            <span className="eyebrow block mb-4">OUR SERVICES</span>
            <h1 className="font-serif text-h2 text-text-primary mb-8">
              Three ways to travel.<br />Each built for depth.
            </h1>

            {/* Service Tabs */}
            <div className="flex flex-wrap gap-3">
              {(Object.keys(services) as ServiceKey[]).map((key) => {
                const s = services[key];
                return (
                  <Link
                    key={key}
                    to={`/services/${s.id}`}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                      activeKey === key
                        ? 'bg-gold text-navy border-gold'
                        : 'bg-transparent text-text-secondary border-gold-dim hover:border-gold hover:text-text-primary'
                    }`}
                  >
                    {s.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Service Detail */}
        <div className="w-full px-6 lg:px-12 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Hero Row */}
            <div className="flex flex-col lg:flex-row gap-12 mb-16">
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden gold-border">
                  <img
                    src={active.image}
                    alt={active.title}
                    className="w-full h-full object-cover image-cinematic"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <span className="eyebrow block mb-4">{active.subtitle}</span>
                <h2 className="font-serif text-h2 text-text-primary mb-4">{active.title}</h2>
                <p className="text-gold font-serif text-xl mb-6 italic">{active.tagline}</p>
                <p className="text-text-secondary leading-relaxed mb-8">{active.description}</p>
                <div className="flex gap-6 text-sm text-text-secondary mb-8">
                  <span><span className="text-gold">Duration:</span> {active.duration}</span>
                  <span><span className="text-gold">Group:</span> {active.groupSize}</span>
                </div>
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2 w-fit">
                  Enquire about this package
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Itinerary */}
            <div className="mb-16">
              <h3 className="font-serif text-2xl text-text-primary mb-8">Itinerary</h3>
              <div className="space-y-4">
                {active.itinerary.map((item, i) => (
                  <div key={i} className="flex gap-6 p-6 rounded-lg bg-charcoal/40 gold-border">
                    <div className="w-20 flex-shrink-0">
                      <span className="font-mono text-xs text-gold uppercase tracking-wider">{item.day}</span>
                    </div>
                    <div>
                      <h4 className="font-serif text-lg text-text-primary mb-1">{item.title}</h4>
                      <p className="text-sm text-text-secondary leading-relaxed">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Tiers */}
            <div className="mb-16">
              <h3 className="font-serif text-2xl text-text-primary mb-8">Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {active.tiers.map((tier, i) => (
                  <div key={i} className={`p-8 rounded-lg ${i === 1 ? 'bg-charcoal gold-border' : 'bg-charcoal/40 border border-gold-dim'}`}>
                    {i === 1 && (
                      <span className="inline-block text-xs font-mono uppercase tracking-wider text-navy bg-gold px-3 py-1 rounded-full mb-4">
                        Most Popular
                      </span>
                    )}
                    <h4 className="font-serif text-xl text-text-primary mb-2">{tier.name}</h4>
                    <p className="text-gold text-2xl font-serif mb-6">{tier.price}</p>
                    <ul className="space-y-3">
                      {tier.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-text-secondary">
                          <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/contact"
                      className={`mt-8 w-full flex items-center justify-center gap-2 py-3 px-6 rounded text-sm font-medium transition-all duration-300 ${
                        i === 1
                          ? 'bg-gold text-navy hover:bg-gold/90'
                          : 'border border-gold-dim text-text-primary hover:border-gold'
                      }`}
                    >
                      Get a quote
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Included / Excluded */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div>
                <h3 className="font-serif text-xl text-text-primary mb-6">What's included</h3>
                <ul className="space-y-3">
                  {active.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                      <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-xl text-text-primary mb-6">Not included</h3>
                <ul className="space-y-3">
                  {active.excluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                      <X className="w-4 h-4 text-text-secondary/50 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center py-12 border-t border-gold-dim">
              <h3 className="font-serif text-2xl text-text-primary mb-4">Ready to begin?</h3>
              <p className="text-text-secondary mb-8 max-w-md mx-auto">
                Contact us with your dates, group size, and any questions. We respond within 24 hours.
              </p>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Start planning your yatra
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
