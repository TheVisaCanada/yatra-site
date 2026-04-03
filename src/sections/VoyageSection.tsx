import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight, Wifi, Coffee, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface VoyageSectionProps {
  className?: string;
}

const VoyageSection = ({ className = '' }: VoyageSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const headlineBlockRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.1, opacity: 0.8 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        iconRef.current,
        { y: '-6vh', opacity: 0, rotate: -12 },
        { y: 0, opacity: 1, rotate: 0, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        headlineBlockRef.current?.children || [],
        { x: '10vw', opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.02, ease: 'power2.out' },
        0.05
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: '-10vw', opacity: 0, rotate: -2 },
        { x: 0, opacity: 1, rotate: 0, ease: 'power2.out' },
        0.1
      );

      // SETTLE (30-70%): Hold positions

      // EXIT (70-100%)
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0.35, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        iconRef.current,
        { y: 0, opacity: 1 },
        { y: '-4vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        headlineBlockRef.current,
        { x: 0, opacity: 1 },
        { x: '8vw', opacity: 0.25, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '-6vw', opacity: 0.2, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const comfortItems = [
    { icon: Wifi, text: 'Coach Wi-Fi + water' },
    { icon: Coffee, text: 'Hotel breakfast + dinner' },
    { icon: Briefcase, text: 'On-call medic kit' },
  ];

  return (
    <section
      ref={sectionRef}
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <img
          src="/voyage_road_vehicle.jpg"
          alt="Travel Comfort"
          className="w-full h-full object-cover image-cinematic"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-navy/80 via-navy/50 to-transparent" />
      </div>

      {/* Starburst Icon */}
      <div
        ref={iconRef}
        className="absolute top-[10vh] left-1/2 -translate-x-1/2 z-10"
      >
        <Sparkles className="w-7 h-7 text-gold" strokeWidth={1.5} />
      </div>

      {/* Headline Block (Right) */}
      <div
        ref={headlineBlockRef}
        className="absolute right-[8vw] top-1/2 -translate-y-1/2 z-10 max-w-[34vw] text-right"
      >
        <span className="eyebrow block mb-4">THE VOYAGE</span>
        <h2 className="font-serif text-h2 text-text-primary mb-6">
          Travel calm.<br />
          Rest well.
        </h2>
        <p className="text-text-secondary leading-relaxed mb-8 max-w-[30vw] ml-auto">
          Air-conditioned coaches, vetted hotels, and a daily rhythm designed 
          for seniors and families.
        </p>
        <a
          href="#contact"
          className="btn-outline inline-flex items-center gap-2 ml-auto"
        >
          See transport & hotels
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>

      {/* Info Card (Bottom Left) */}
      <div
        ref={cardRef}
        className="absolute left-[6vw] bottom-[14vh] z-10 w-[22vw] min-w-[280px]"
      >
        <div className="card-luxury p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-gold" />
            </div>
            <span className="font-serif text-lg text-text-primary">
              Daily comfort
            </span>
          </div>
          <ul className="space-y-3">
            {comfortItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-sm text-text-secondary"
              >
                <item.icon className="w-4 h-4 text-gold flex-shrink-0" />
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default VoyageSection;