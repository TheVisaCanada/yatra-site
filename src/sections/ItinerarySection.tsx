import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plane, Landmark, DoorOpen, Hand, Building2, Flag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ItinerarySectionProps {
  className?: string;
}

const ItinerarySection = ({ className = '' }: ItinerarySectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current?.children || [],
        { y: 18, opacity: 0 },
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

      // Timeline line draw animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 50%',
            scrub: true,
          },
        }
      );

      // Day items animation
      const days = timelineRef.current?.querySelectorAll('.day-item');
      if (days) {
        gsap.fromTo(
          days,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
              end: 'bottom 40%',
              scrub: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const days = [
    {
      day: 'Day 1',
      title: 'Lahore arrival',
      description: 'Meet the team, evening briefing.',
      icon: Plane,
    },
    {
      day: 'Day 2',
      title: 'Nankana Sahib',
      description: 'Janam Asthan, langar, kirtan.',
      icon: Landmark,
    },
    {
      day: 'Day 3',
      title: 'Kartarpur Corridor',
      description: 'Crossing day, full darshan.',
      icon: DoorOpen,
    },
    {
      day: 'Day 4',
      title: 'Panja Sahib',
      description: 'Hassan Abdal, history walk.',
      icon: Hand,
    },
    {
      day: 'Day 5',
      title: 'Lahore heritage',
      description: 'Fort, museum, farewell dinner.',
      icon: Building2,
    },
    {
      day: 'Day 6',
      title: 'Departure',
      description: 'Airport transfer.',
      icon: Flag,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="itinerary"
      className={`relative bg-navy py-24 lg:py-32 ${className}`}
    >
      <div className="w-full px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="eyebrow block mb-4">ITINERARY</span>
          <h2 className="font-serif text-h2 text-text-primary">
            Day by day.
          </h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div
            ref={lineRef}
            className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold to-gold/50 origin-top"
          />

          {/* Days */}
          <div className="space-y-12">
            {days.map((item, index) => (
              <div
                key={index}
                className={`day-item relative flex items-start gap-6 lg:gap-12 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 pl-12 lg:pl-0 ${
                  index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'
                }`}>
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-gold mb-2 block">
                    {item.day}
                  </span>
                  <h3 className="font-serif text-2xl text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary">
                    {item.description}
                  </p>
                </div>

                {/* Center Dot */}
                <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 w-8 h-8 rounded-full bg-navy gold-border flex items-center justify-center z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItinerarySection;