import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, Menu, X, Clock, MapPin } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/travelData';

interface HeaderProps {
  onPlanTripClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onPlanTripClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const formatWhatsAppUrl = (msg?: string) => {
    const text = encodeURIComponent(msg || "Hello Travel Care Tours, I would like to plan a Kerala holiday trip.");
    return `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${text}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top micro-bar for quick contact */}
      <div className="hidden lg:block bg-brand-navy-dark text-slate-200 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-brand-green-soft" />
              <span>Kerala & South India Tour Specialists</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-brand-green-soft" />
              <span>24/7 Guest Assistance & WhatsApp Support</span>
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${COMPANY_DETAILS.email}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-brand-green-soft" />
              <span>{COMPANY_DETAILS.email}</span>
            </a>
            <a
              href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-green-soft" />
              <span>{COMPANY_DETAILS.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group focus:outline-hidden" aria-label="Travel Care Tours Home">
            <img
              src={`${import.meta.env.BASE_URL}assets/TC_logo_horizontal.png`}
              alt="Travel Care Tours Pvt Ltd logo"
              className="h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              onError={(e) => {
                // Fallback to svg if png issue
                (e.target as HTMLImageElement).src = `${import.meta.env.BASE_URL}assets/TC_logo_horizontal.svg`;
              }}
            />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-700">
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
            <a href="#enquiry" className="hover:text-brand-green transition-colors py-1">
              Contact
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onPlanTripClick}
              className="hidden lg:inline-flex items-center px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-brand-navy border border-brand-navy/20 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Plan Custom Trip
            </button>
            <a
              href={formatWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-brand-green hover:bg-brand-green-hover shadow-md shadow-brand-green/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={formatWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-brand-green hover:bg-emerald-50 rounded-full transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-6 h-6 fill-brand-green" />
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
              Instant Trip Planner & Quote
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
            <a
              href="#enquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-brand-green transition-colors"
            >
              Contact Us
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <a
              href={formatWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-bold bg-brand-green shadow-md"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
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
