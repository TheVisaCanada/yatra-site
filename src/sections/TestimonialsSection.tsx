import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialsSectionProps {
  className?: string;
}

const TestimonialsSection = ({ className = '' }: TestimonialsSectionProps) => {
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

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.testimonial-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
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

  const testimonials = [
    {
      quote: "Everything was handled—permits, transport, even the langar schedule. All we did was focus on the darshan.",
      location: "Toronto, Canada",
    },
    {
      quote: "They found my grandfather's village and arranged a meeting with locals. It changed how I see my family.",
      location: "London, UK",
    },
    {
      quote: "Professional, respectful, and calm. I'd recommend this to any senior traveler.",
      location: "California, USA",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="journal"
      className={`relative bg-navy py-24 lg:py-32 ${className}`}
    >
      <div className="w-full px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="eyebrow block mb-4">SANGAT STORIES</span>
          <h2 className="font-serif text-h2 text-text-primary">
            Words from the road.
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card card-luxury p-8 relative group transition-transform duration-300 hover:scale-[1.01]"
            >
              {/* Gold top border */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
              
              {/* Quote icon */}
              <div className="mb-6">
                <Quote className="w-8 h-8 text-gold/40" />
              </div>

              {/* Quote text */}
              <p className="text-text-primary leading-relaxed mb-8 font-serif text-lg">
                "{testimonial.quote}"
              </p>

              {/* Location */}
              <div className="flex items-center gap-2 text-text-secondary">
                <MapPin className="w-4 h-4 text-gold" />
                <span className="text-sm">{testimonial.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;