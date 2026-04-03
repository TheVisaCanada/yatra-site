import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSafetyClick = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.querySelector('#safety');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector('#safety');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  };

  const navLinks = [
    { label: 'Pilgrimages', to: '/services' },
    { label: 'Heritage', to: '/about' },
    { label: 'Safety', to: null, onClick: handleSafetyClick },
    { label: 'Yatra Diaries', to: '/yatra-diaries' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0a0a14]/90 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/barrik-logo-orange.png" alt="Baarik Yatra" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={link.onClick}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
                >
                  {link.label}
                </button>
              )
            )}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/contact"
              className="btn-outline flex items-center gap-2 text-sm py-3 px-6"
            >
              <Phone className="w-4 h-4" />
              Request a private call
            </Link>
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
          {navLinks.map((link, index) =>
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                className="font-serif text-3xl text-text-primary hover:text-gold transition-colors duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={link.onClick}
                className="font-serif text-3xl text-text-primary hover:text-gold transition-colors duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.label}
              </button>
            )
          )}
          <a
            href="tel:+16472497545"
            className="btn-primary flex items-center gap-2 mt-8"
          >
            <Phone className="w-5 h-5" />
            +1 (647) 249-7545
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
