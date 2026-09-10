import React, { useState } from 'react';
import { Phone, Mail, Menu, X, Clock, MapPin } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/travelData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeaderProps {
  onPlanTripClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onPlanTripClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const formatWhatsAppUrl = (msg?: string) => {
    const text = encodeURIComponent(msg || "Hello Travel Care Tours, I would like to plan a Kerala holiday trip.");
    return `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${text}`;
  };

  const headerLogoSrc = `${(import.meta.env.BASE_URL || './').replace(/\/$/, '')}/assets/TC_logo_horizontal.png`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group focus:outline-hidden py-1.5" aria-label="Travel Care Tours Home">
            <img
              src={headerLogoSrc}
              alt="Travel Care Tours"
              className="h-12 sm:h-14 md:h-16 w-auto max-h-18 object-contain transition-transform group-hover:scale-[1.02]"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                const step = Number(target.dataset.fallbackStep || '0');
                if (step === 0) {
                  target.dataset.fallbackStep = '1';
                  target.src = './TC_logo_horizontal.png';
                } else if (step === 1) {
                  target.dataset.fallbackStep = '2';
                  target.src = 'TC_logo_horizontal.png';
                } else if (step === 2) {
                  target.dataset.fallbackStep = '3';
                  target.src = 'assets/TC_logo_horizontal.png';
                }
              }}
            />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-semibold text-slate-700">
            <a href="#home" className="hover:text-brand-green transition-colors py-1">
              Home
            </a>
            <a href="#packages" className="hover:text-brand-green transition-colors py-1">
              Packages
            </a>
            <a href="#destinations" className="hover:text-brand-green transition-colors py-1">
              Destinations
            </a>
            <a href="#trip-planner" className="hover:text-brand-green transition-colors py-1">
              Trip Planner
            </a>
            <a href="#why-us" className="hover:text-brand-green transition-colors py-1">
              Why Us
            </a>
            <a href="#faqs" className="hover:text-brand-green transition-colors py-1">
              FAQs
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
              className="hidden lg:flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-brand-navy bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-full transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-green" />
              <span>{COMPANY_DETAILS.phone}</span>
            </a>
            <a
              href={formatWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-md shadow-[#25D366]/25 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <WhatsAppIcon variant="white" className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={formatWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#25D366] hover:bg-emerald-50 rounded-full transition-colors flex items-center justify-center"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon variant="official" className="w-7 h-7" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-brand-navy hover:bg-slate-100 transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <nav className="flex flex-col space-y-2 text-base font-semibold text-slate-800">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-brand-green transition-colors"
            >
              Home
            </a>
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-brand-green transition-colors"
            >
              Tour Packages
            </a>
            <a
              href="#destinations"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-brand-green transition-colors"
            >
              Kerala Destinations
            </a>
            <a
              href="#trip-planner"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-brand-green transition-colors"
            >
              Trip Planner
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-brand-green transition-colors"
            >
              Why Travel Care
            </a>
            <a
              href="#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-brand-green transition-colors"
            >
              FAQs
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <a
              href={formatWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl text-white font-bold bg-[#25D366] hover:bg-[#20bd5a] shadow-md"
            >
              <WhatsAppIcon variant="white" className="w-5 h-5 fill-white" />
              <span>Chat on WhatsApp (+91 8129070109)</span>
            </a>
            <a
              href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-brand-navy font-semibold bg-slate-100"
            >
              <Phone className="w-4 h-4 text-brand-navy" />
              <span>Call Us: {COMPANY_DETAILS.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
