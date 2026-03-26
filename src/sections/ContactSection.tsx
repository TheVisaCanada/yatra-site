import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Clock, Send, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left content animation
      gsap.fromTo(
        leftRef.current?.children || [],
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 45%',
            scrub: true,
          },
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'journeys@baarik.travel' },
    { icon: Phone, label: 'Phone', value: '+1 (800) 555-0138' },
    { icon: Clock, label: 'Hours', value: 'Mon–Sat, 9am–7pm ET' },
    { icon: MapPin, label: 'Address', value: '1965 Britannia Road West, Mississauga, ON' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative bg-navy py-24 lg:py-32 ${className}`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left Content */}
          <div ref={leftRef} className="w-full lg:w-1/2">
            <h2 className="font-serif text-h2 text-text-primary mb-6">
              Ready to walk<br />the path?
            </h2>
            <p className="text-text-secondary leading-relaxed mb-10 max-w-md">
              Tell us your dates, your group size, and any roots you want to trace. 
              We'll reply within 24 hours.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <span className="text-xs text-text-secondary uppercase tracking-wider">
                      {item.label}
                    </span>
                    <p className="text-text-primary">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form */}
          <div ref={formRef} className="w-full lg:w-1/2">
            <div className="card-luxury p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                    <Send className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-serif text-2xl text-text-primary mb-3">
                    Thank you
                  </h3>
                  <p className="text-text-secondary">
                    We've received your request and will be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-charcoal gold-border rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-gold transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-text-secondary mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-charcoal gold-border rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-gold transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-charcoal gold-border rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-gold transition-colors"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-text-secondary mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-charcoal gold-border rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-gold transition-colors resize-none"
                      placeholder="Tell us about your journey..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send my request
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;