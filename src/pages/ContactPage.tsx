import { useState } from 'react';
import { Mail, Phone, Clock, Send, MapPin } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('https://n8n.baariktravel.ca/webhook/yatra-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });
    } catch (err) {
      console.error('Contact form submission error:', err);
    }
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'yatra@baariktravel.ca' },
    { icon: Phone, label: 'Phone', value: '+1 (647) 249-7545' },
    { icon: Clock, label: 'Hours', value: 'Mon–Sat, 9am–7pm ET' },
    { icon: MapPin, label: 'Address', value: '1965 Britannia Road West, Unit 208, Mississauga, ON L5M 4Y4, Canada' },
  ];

  return (
    <>
      <SEOHead
        title="Contact Baarik Yatra — Plan Your Sikh Pilgrimage to Pakistan"
        description="Get in touch with Baarik Travel to plan your yatra. We respond within 24 hours. Phone: +1 (647) 249-7545. Email: yatra@baariktravel.ca"
        canonical="https://yatra.baariktravel.ca/contact"
      />
      <div className="bg-navy min-h-screen pt-24">
        <div className="w-full px-6 lg:px-12 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-16">
              <span className="eyebrow block mb-4">GET IN TOUCH</span>
              <h1 className="font-serif text-h2 text-text-primary mb-6">
                Ready to walk<br />the path?
              </h1>
              <p className="text-text-secondary leading-relaxed max-w-xl">
                Tell us your dates, your group size, and any roots you want to trace.
                We'll reply within 24 hours.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-16">
              {/* Left — Contact Info */}
              <div className="w-full lg:w-1/2">
                <div className="space-y-6 mb-12">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <span className="text-xs text-text-secondary uppercase tracking-wider block mb-1">
                          {item.label}
                        </span>
                        <p className="text-text-primary">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 rounded-lg bg-charcoal/40 gold-border">
                  <h3 className="font-serif text-lg text-text-primary mb-3">What happens next?</h3>
                  <ol className="space-y-3 text-sm text-text-secondary">
                    <li className="flex gap-3">
                      <span className="text-gold font-mono">01</span>
                      We receive your message and review your dates and requirements.
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gold font-mono">02</span>
                      Within 24 hours, we reply with availability, pricing, and any questions.
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gold font-mono">03</span>
                      If you'd like to proceed, we schedule a call to finalize your itinerary.
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gold font-mono">04</span>
                      We begin your visa documentation and trip preparation.
                    </li>
                  </ol>
                </div>
              </div>

              {/* Right — Form */}
              <div className="w-full lg:w-1/2">
                <div className="card-luxury p-8">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                        <Send className="w-8 h-8 text-gold" />
                      </div>
                      <h3 className="font-serif text-2xl text-text-primary mb-3">Thank you</h3>
                      <p className="text-text-secondary">
                        We've received your request and will be in touch within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm text-text-secondary mb-2">Full Name</label>
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
                          <label className="block text-sm text-text-secondary mb-2">Email</label>
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
                          <label className="block text-sm text-text-secondary mb-2">Phone</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 bg-charcoal gold-border rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-gold transition-colors"
                            placeholder="+1 (647) 249-7545"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-text-secondary mb-2">Message</label>
                        <textarea
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 bg-charcoal gold-border rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-gold transition-colors resize-none"
                          placeholder="Tell us about your journey — preferred dates, group size, any ancestral research needs..."
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
        </div>
      </div>
    </>
  );
};

export default ContactPage;
