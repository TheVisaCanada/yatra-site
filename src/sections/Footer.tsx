import { Shield, Award, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-charcoal py-12 border-t border-gold-dim">
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Top Row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10">
            {/* Logo */}
            <div className="flex items-center">
              <img src="/barrik-logo-orange.png" alt="Baarik Yatra" className="h-10 w-auto" />
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-text-secondary">
                <Shield className="w-5 h-5 text-gold" />
                <span className="text-sm">RCIC Regulated</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <Award className="w-5 h-5 text-gold" />
                <span className="text-sm">TICO Registered</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <MapPin className="w-5 h-5 text-gold" />
                <span className="text-sm">On-Ground Pakistan</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gold-dim mb-10" />

          {/* Bottom Row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Address & Contact */}
            <div className="text-text-secondary text-sm space-y-1">
              <p>1965 Britannia Road West, Unit 208, Mississauga, ON L5M 4Y4, Canada</p>
              <p>yatra@baariktravel.ca | (647) 249-7545</p>
            </div>

            {/* Legal */}
            <div className="text-text-secondary/60 text-xs max-w-md text-right">
              <p>
                Baarik Travel & Tours Inc. is a registered Ontario travel agency.
                TICO Registration Pending. RCIC Oversight by Amer Rehman.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-10 pt-6 border-t border-gold-dim/50 text-center">
            <p className="text-text-secondary/60 text-sm">
              © {new Date().getFullYear()} Baarik Travel. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;