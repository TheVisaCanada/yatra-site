import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Download, Users, Calendar, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SignatureExperiencesSectionProps {
  className?: string;
}

const SignatureExperiencesSection = ({ className = '' }: SignatureExperiencesSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current?.children || [],
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.experience-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.12,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              end: 'top 40%',
              scrub: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const experiences = [
    {
      image: '/experience_card_1_nankana.jpg',
      title: 'The Sacred Circuit',
      bullets: ['5 days • 3 Gurdwaras', 'Small group (max 12)'],
      link: 'See dates & pricing',
      href: '#itinerary',
      icon: Calendar,
    },
    {
      image: '/experience_card_2_village.jpg',
      title: 'Ancestral Journey',
      bullets: ['Village research + visits', 'Flexible duration'],
      link: 'Request a plan',
      href: '#contact',
      icon: Users,
    },
    {
      image: '/experience_card_3_charter.jpg',
      title: 'Private Charter',
      bullets: ['Custom group • Your dates', 'Armored transport option'],
      link: 'Build a private trip',
      href: '#contact',
      icon: Shield,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`relative bg-navy py-24 lg:py-32 ${className}`}
    >
      <div className="w-full px-6 lg:px-12">
        {/* Heading Group */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="eyebrow block mb-4">SIGNATURE EXPERIENCES</span>
          <h2 className="font-serif text-h2 text-text-primary mb-6">
            Three ways to travel—<br className="hidden md:block" />
            each built for depth.
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Choose a guided circuit, a roots-focused trip, or a fully private plan. 
            We handle permits, transport, and daily pacing.
          </p>
        </div>

        {/* Triptych Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="experience-card group card-luxury overflow-hidden transition-transform duration-300 hover:scale-[1.01]"
            >
              {/* Card Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-navy/80 backdrop-blur-sm flex items-center justify-center">
                  <exp.icon className="w-5 h-5 text-gold" />
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="font-serif text-2xl text-text-primary mb-4">
                  {exp.title}
                </h3>
                <ul className="space-y-2 mb-6">
                  {exp.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="text-sm text-text-secondary flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-gold" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <a
                  href={exp.href}
                  className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:gap-3 transition-all duration-300"
                >
                  {exp.link}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a
            href="#"
            className="btn-outline inline-flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download the full brochure (PDF)
          </a>
        </div>
      </div>
    </section>
  );
};

export default SignatureExperiencesSection;