import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onPlanTripClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onPlanTripClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerLogoSrc = `${(import.meta.env.BASE_URL || './').replace(/\/$/, '')}/assets/TC_logo_horizontal.png`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group focus:outline-hidden py-1" aria-label="Travel Care Tours Home">
            <img
              src={headerLogoSrc}
              alt="Travel Care Tours"
              className="h-9 sm:h-11 w-auto max-h-12 object-contain transition-transform group-hover:scale-[1.01]"
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
          <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-xs sm:text-[13px] font-medium text-slate-700">
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

          {/* Desktop Plan Trip CTA */}
          <div className="hidden md:flex items-center">
            {onPlanTripClick && (
              <button
                onClick={onPlanTripClick}
                className="px-4 py-1.5 rounded-full text-xs font-bold bg-brand-green hover:bg-brand-green-hover text-white shadow-xs transition-all hover:scale-[1.02] cursor-pointer"
              >
                Plan Trip
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-brand-navy hover:bg-slate-100 transition-colors cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-xl animate-fadeIn">
          <nav className="flex flex-col space-y-1 text-sm font-semibold text-slate-800">
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
              onClick={() => {
                setMobileMenuOpen(false);
                onPlanTripClick?.();
              }}
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
        </div>
      )}
    </header>
  );
};
