import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HERO_VIDEOS = [
  '/12237616_1920_1080_50fps.mp4',
  '/12237608_1920_1080_50fps.mp4',
  '/12237584_1920_1080_50fps.mp4',
];

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoIndex, setVideoIndex] = useState(0);

  const handleVideoEnded = () => {
    setVideoIndex(i => (i + 1) % HERO_VIDEOS.length);
  };

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.load();
    vid.play().catch(() => {});
  }, [videoIndex]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
    }
  }, [videoIndex]);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Background entrance
      tl.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.2 }
      );

      // Headline entrance
      tl.fromTo(
        headlineRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.8'
      );

      // Subline entrance
      tl.fromTo(
        sublineRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.5'
      );

      // CTAs entrance
      tl.fromTo(
        ctaRef.current?.children || [],
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
        '-=0.3'
      );

      // Scroll cue entrance
      tl.fromTo(
        scrollCueRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        '-=0.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
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
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headlineRef.current, sublineRef.current, ctaRef.current], {
              opacity: 1,
              y: 0,
            });
            gsap.set(bgRef.current, { scale: 1, y: 0 });
          },
        },
      });

      // ENTRANCE (0-30%): Hold at fully visible (matches load end state)
      // SETTLE (30-70%): Static
      // EXIT (70-100%): Elements exit

      // Headline block exit
      scrollTl.fromTo(
        contentRef.current,
        { y: 0, opacity: 1 },
        { y: '-22vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Background exit
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.06, y: '-4vh', ease: 'none' },
        0.7
      );

      // Scroll cue exit
      scrollTl.fromTo(
        scrollCueRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0 }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover"
        >
          <source src={HERO_VIDEOS[videoIndex]} type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/35 via-navy/50 to-navy/75" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col items-center justify-center px-6"
      >
        {/* Headline Block */}
        <div className="text-center max-w-4xl mx-auto">
          <h1
            ref={headlineRef}
            className="font-serif text-hero text-text-primary mb-6"
            style={{ opacity: 0 }}
          >
            Walk where history<br />was written.
          </h1>
          <p
            ref={sublineRef}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ opacity: 0 }}
          >
            A curated journey to the sacred sites of Punjab—designed for comfort, 
            clarity, and connection.
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#pilgrimages" className="btn-primary flex items-center gap-2">
              Explore journeys
              <ChevronRight className="w-5 h-5" />
            </a>
            <a href="tel:+16472497545" className="btn-outline flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Request a call
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Micro Labels */}
      <div className="absolute bottom-8 left-0 right-0 z-10 px-6 lg:px-12 flex items-end justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">
          Sikh Pilgrimage to Pakistan
        </span>
        
        {/* Scroll Cue */}
        <div
          ref={scrollCueRef}
          className="absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center gap-3"
        >
          <div className="gold-line" />
        </div>

        <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">
          Private groups • 2026–2027
        </span>
      </div>
    </section>
  );
};

export default HeroSection;