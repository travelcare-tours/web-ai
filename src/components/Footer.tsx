import React from 'react';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { COMPANY_DETAILS, TOUR_PACKAGES } from '../data/travelData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-navy-dark text-slate-300 pt-12 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-slate-800/80">
          {/* Col 1: Brand & Contact Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-block">
              <img
                src={`${(import.meta.env.BASE_URL || './').replace(/\/$/, '')}/assets/TC_logo_footer.png`}
                alt="Travel Care Tours"
                className="h-20 sm:h-24 md:h-26 w-auto max-h-32 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const step = Number(target.dataset.fallbackStep || '0');
                  if (step === 0) {
                    target.dataset.fallbackStep = '1';
                    target.src = './TC_logo_footer.png';
                  } else if (step === 1) {
                    target.dataset.fallbackStep = '2';
                    target.src = 'TC_logo_footer.png';
                  } else if (step === 2) {
                    target.dataset.fallbackStep = '3';
                    target.src = 'assets/TC_logo_footer.png';
                  }
                }}
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Your Journey, Our Care. Licensed destination travel specialists crafting personalized Kerala holidays, backwater houseboats, and private chauffeur journeys.
            </p>

            <div className="pt-1 space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-brand-green-soft shrink-0 mt-0.5" />
                <span className="leading-snug text-slate-400">
                  {COMPANY_DETAILS.address}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-brand-green-soft shrink-0" />
                <a
                  href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_DETAILS.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-brand-green-soft shrink-0" />
                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_DETAILS.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3 text-xs sm:text-sm">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs">
              Quick Links
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#packages" className="hover:text-brand-green-soft transition-colors">
                  Tour Packages
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-brand-green-soft transition-colors">
                  Kerala Destinations
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-brand-green-soft transition-colors">
                  Cab, Hotel &amp; Houseboat Services
                </a>
              </li>
              <li>
                <a href="#trip-planner" className="hover:text-brand-green-soft transition-colors">
                  Instant Trip Planner
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-brand-green-soft transition-colors">
                  Why Travel Care
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-brand-green-soft transition-colors">
                  FAQs & Tips
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Packages */}
          <div className="lg:col-span-4 space-y-3 text-xs sm:text-sm">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs">
              Popular Packages
            </h4>
            <ul className="space-y-2 text-slate-400">
              {TOUR_PACKAGES.slice(0, 4).map((pkg) => (
                <li key={pkg.id}>
                  <a
                    href="#packages"
                    className="hover:text-brand-green-soft transition-colors flex items-center justify-between gap-2"
                  >
                    <span className="truncate">{pkg.title}</span>
                    <span className="text-[11px] text-slate-500 shrink-0 font-medium">{pkg.nights}N / {pkg.nights + 1}D</span>
                  </a>
                </li>
              ))}
              <li className="pt-1">
                <a href="#trip-planner" className="text-brand-green-soft font-semibold hover:underline text-xs">
                  + Custom Tailor-Made Itinerary →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} Travel Care Tours Pvt Ltd. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <span>Ground Flr, Mannath Bld, Thrikkakara, Ernakulam</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[11px]">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
