import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, FileCheck, Phone, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TrustSafetySectionProps {
  className?: string;
}

const TrustSafetySection = ({ className = '' }: TrustSafetySectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(
        imageRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 40%',
            scrub: true,
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: true,
          },
        }
      );

      // Features animation
      const features = featuresRef.current?.querySelectorAll('.feature-item');
      if (features) {
        gsap.fromTo(
          features,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 80%',
              end: 'top 50%',
              scrub: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Shield,
      title: 'Licensed security escorts',
      description: 'Optional armed detail for private groups.',
    },
    {
      icon: FileCheck,
      title: 'Document handling',
      description: 'Permits, letters, and border paperwork—managed.',
    },
    {
      icon: Phone,
      title: '24/7 support line',
      description: 'One number. Real humans. Always on.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="safety"
      className={`relative bg-navy py-24 lg:py-32 ${className}`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left Image */}
          <div
            ref={imageRef}
            className="w-full lg:w-[45%] relative"
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden gold-border">
              <img
                src="/security.jpg"
                alt="Licensed security and document handling for Canadian Sikh pilgrims to Pakistan"
                className="w-full h-full object-cover image-cinematic"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            </div>
            {/* Decorative line */}
            <div className="absolute -left-4 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-gold to-transparent opacity-50" />
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-[55%]">
            <div ref={contentRef}>
              <span className="eyebrow block mb-4">TRUST & SAFETY</span>
              <h2 className="font-serif text-h2 text-text-primary mb-6">
                You're in safe hands.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-10 max-w-lg">
                We coordinate with local authorities, provide licensed security 
                options, and keep your documents organized from start to finish.
              </p>
            </div>

            {/* Features */}
            <div ref={featuresRef} className="space-y-6 mb-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-item flex items-start gap-4 p-4 rounded-lg bg-charcoal/50 gold-border"
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-text-primary mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              Speak with our team
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSafetySection;