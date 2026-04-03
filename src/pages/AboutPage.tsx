import { Link } from 'react-router-dom';
import { Shield, Award, MapPin, ArrowRight, Users, Heart } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Baarik Travel & Tours Inc.',
  url: 'https://yatra.baariktravel.ca',
  logo: 'https://yatra.baariktravel.ca/barrik-logo-orange.png',
  description: 'Registered Ontario travel agency specializing in Sikh pilgrimage to Pakistan. RCIC oversight by Amer Rehman.',
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
  foundingLocation: {
    '@type': 'Place',
    name: 'Mississauga, Ontario, Canada',
  },
};

const AboutPage = () => {
  return (
    <>
      <SEOHead
        title="About Baarik Travel — RCIC-Overseen Sikh Pilgrimage Specialists"
        description="Baarik Travel & Tours Inc. is a registered Ontario travel agency specializing in Sikh pilgrimage to Pakistan. RCIC oversight by Amer Rehman. TICO Registration Pending."
        canonical="https://yatra.baariktravel.ca/about"
        ogImage="https://yatra.baariktravel.ca/Darbar%20Sahib%20Kartarpur.jpg"
        schema={orgSchema}
      />
      <div className="bg-navy min-h-screen pt-24">
        {/* Hero */}
        <div className="w-full px-6 lg:px-12 py-16 border-b border-gold-dim">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <span className="eyebrow block mb-4">ABOUT US</span>
              <h1 className="font-serif text-h2 text-text-primary mb-6">
                We exist for one reason.
              </h1>
              <p className="text-gold font-serif text-2xl italic mb-8">
                To put Canadian Sikh families on the ground at Nankana Sahib, Kartarpur, and Panja Sahib — safely, comfortably, and with full context.
              </p>
              <p className="text-text-secondary leading-relaxed mb-6">
                Baarik Travel & Tours Inc. was founded in Mississauga, Ontario, by a team that understood both sides of this journey — the deep spiritual significance of these sacred sites and the practical complexity of getting Canadian families there safely.
              </p>
              <p className="text-text-secondary leading-relaxed">
                More than 80% of all Sikh heritage sites are in Pakistan. We believe every Sikh family in Canada deserves the opportunity to walk that ground. We handle everything that stands between them and that experience.
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden gold-border">
                <img
                  src="/Darbar Sahib Kartarpur.jpg"
                  alt="Gurdwara Darbar Sahib Kartarpur"
                  className="w-full h-full object-cover image-cinematic"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="w-full px-6 lg:px-12 py-16 border-b border-gold-dim">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-lg bg-charcoal/40 gold-border text-center">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-serif text-xl text-text-primary mb-4">Our Mission</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  To make the yatra to Pakistani Punjab accessible, safe, and deeply meaningful for every Canadian Sikh family — regardless of prior travel experience.
                </p>
              </div>
              <div className="p-8 rounded-lg bg-charcoal/40 gold-border text-center">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-serif text-xl text-text-primary mb-4">On-Ground Presence</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  We maintain active relationships with the PSGPC, local fixers, vetted hotels, and licensed security providers in Pakistan — so our planning is grounded in real, current conditions.
                </p>
              </div>
              <div className="p-8 rounded-lg bg-charcoal/40 gold-border text-center">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <Users className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-serif text-xl text-text-primary mb-4">Community First</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Our pricing is designed to be accessible to families across income levels. Group departures allow smaller families to benefit from the same logistics and security as larger private groups.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div className="w-full px-6 lg:px-12 py-16 border-b border-gold-dim">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              <div className="w-full lg:w-1/2">
                <span className="eyebrow block mb-4">CREDENTIALS & OVERSIGHT</span>
                <h2 className="font-serif text-3xl text-text-primary mb-8">
                  Registered, overseen, and accountable.
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-6 rounded-lg bg-charcoal/40 gold-border">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg text-text-primary mb-1">TICO Registration Pending</h4>
                      <p className="text-sm text-text-secondary">
                        Baarik Travel & Tours Inc. is in the process of completing registration with the Travel Industry Council of Ontario (TICO), the regulatory body governing Ontario travel agencies.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-6 rounded-lg bg-charcoal/40 gold-border">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg text-text-primary mb-1">RCIC Oversight by Amer Rehman</h4>
                      <p className="text-sm text-text-secondary">
                        All immigration-adjacent documentation and visa guidance provided by Baarik Yatra is conducted under the oversight of a Regulated Canadian Immigration Consultant (RCIC). This ensures that families receive compliant, accurate guidance on the Pakistani pilgrim visa process.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-6 rounded-lg bg-charcoal/40 gold-border">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg text-text-primary mb-1">PSGPC Partnership</h4>
                      <p className="text-sm text-text-secondary">
                        We work directly with the Pakistan Sikh Gurdwara Parbandhak Committee (PSGPC) — the official body managing Sikh holy sites in Pakistan — to secure invitation letters and coordinate access for our pilgrims.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <span className="eyebrow block mb-4">OUR TEAM</span>
                <h2 className="font-serif text-3xl text-text-primary mb-8">
                  People who know both worlds.
                </h2>
                <div className="space-y-6">
                  <div className="p-6 rounded-lg bg-charcoal/40 gold-border">
                    <h4 className="font-serif text-xl text-text-primary mb-1">Amer Rehman</h4>
                    <p className="text-gold text-sm mb-3">RCIC — Immigration Oversight</p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Regulated Canadian Immigration Consultant providing oversight on all visa documentation and pilgrim travel compliance. Ensures every client receives accurate, current guidance on the Pakistani e-visa process.
                    </p>
                  </div>
                  <div className="p-6 rounded-lg bg-charcoal/40 gold-border">
                    <h4 className="font-serif text-xl text-text-primary mb-1">On-Ground Pakistan Team</h4>
                    <p className="text-gold text-sm mb-3">Lahore & Punjab Operations</p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Our Pakistan-based team includes experienced heritage guides, licensed fixers, vetted drivers, and coordination staff at each major pilgrimage site. These are people who have accompanied hundreds of yatri groups across the Sacred Circuit.
                    </p>
                  </div>
                  <div className="p-6 rounded-lg bg-charcoal/40 gold-border">
                    <h4 className="font-serif text-xl text-text-primary mb-1">Canada Operations</h4>
                    <p className="text-gold text-sm mb-3">Mississauga, Ontario</p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Our Canadian office handles all client communication, visa documentation preparation, trip planning, and post-journey support. One team, one point of contact for your entire journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="w-full px-6 lg:px-12 py-16">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="font-serif text-3xl text-text-primary mb-4">
              Questions about who we are?
            </h2>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              We're happy to speak with you before you book. No obligation, no pressure.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Talk to our team
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
