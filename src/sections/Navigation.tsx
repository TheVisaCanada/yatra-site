import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Pilgrimages', href: '#pilgrimages' },
    { label: 'Heritage', href: '#heritage' },
    { label: 'Safety', href: '#safety' },
    { label: 'Journal', href: '#journal' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-navy/90 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="font-serif text-2xl text-text-primary">Baarik</span>
            <span className="text-gold text-lg">◆</span>
            <span className="font-serif text-2xl text-text-secondary">Yatra</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+18005550138"
              className="btn-outline flex items-center gap-2 text-sm py-3 px-6"
            >
              <Phone className="w-4 h-4" />
              Request a private call
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-text-primary p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[99] bg-navy/98 backdrop-blur-lg transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="font-serif text-3xl text-text-primary hover:text-gold transition-colors duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.label}
            </button>
          ))}
          <a
            href="tel:+18005550138"
            className="btn-primary flex items-center gap-2 mt-8"
          >
            <Phone className="w-5 h-5" />
            Request a private call
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;