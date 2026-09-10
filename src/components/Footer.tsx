import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Heart, ArrowUp } from 'lucide-react';
import { COMPANY_DETAILS, DESTINATIONS, TOUR_PACKAGES } from '../data/travelData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsAppUrl = `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(
    "Hello Travel Care Tours, I have an inquiry about Kerala travel packages."
  )}`;

  return (
    <footer className="bg-brand-navy-dark text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-2.5 rounded-xl inline-block shadow-sm">
              <img
                src={`${import.meta.env.BASE_URL}assets/TC_logo_horizontal.png`}
                alt="Travel Care Tours Pvt Ltd"
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `${import.meta.env.BASE_URL}assets/TC_logo_horizontal.svg`;
                }}
              />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Your Journey, Our Care. Licensed destination travel specialists providing personalized Kerala tour packages, romantic honeymoon escapes, luxury backwater houseboats, and private chauffeur transport.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-green-soft shrink-0" />
                <span>{COMPANY_DETAILS.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-green-soft shrink-0" />
                <a href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {COMPANY_DETAILS.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-green-soft shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:text-white transition-colors">
                  {COMPANY_DETAILS.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3 text-xs sm:text-sm">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs">
              Explore Kerala
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#packages" className="hover:text-brand-green-soft transition-colors">
                  Tour Packages
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-brand-green-soft transition-colors">
                  Destinations
                </a>
              </li>
              <li>
                <a href="#trip-planner" className="hover:text-brand-green-soft transition-colors">
                  Trip Planner & Quote
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-brand-green-soft transition-colors">
                  Why Travel Care
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-brand-green-soft transition-colors">
                  Travel FAQs
                </a>
              </li>
              <li>
                <a href="#enquiry" className="hover:text-brand-green-soft transition-colors">
                  Contact & Enquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Packages */}
          <div className="lg:col-span-3 space-y-3 text-xs sm:text-sm">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs">
              Featured Tours
            </h4>
            <ul className="space-y-2">
              {TOUR_PACKAGES.map((pkg) => (
                <li key={pkg.id}>
                  <a href="#packages" className="hover:text-brand-green-soft transition-colors flex items-center justify-between">
                    <span>{pkg.title}</span>
                    <span className="text-[10px] text-slate-500">{pkg.nights}N</span>
                  </a>
                </li>
              ))}
              <li>
                <a href="#trip-planner" className="text-brand-green-soft font-semibold hover:underline">
                  + Custom Tailor-Made Itinerary
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Destinations & Fast Connect */}
          <div className="lg:col-span-3 space-y-4 text-xs sm:text-sm">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs">
              Direct Assistance
            </h4>
            <p className="text-xs text-slate-400">
              Need urgent quotation for upcoming dates? Connect with our reservations team on WhatsApp:
            </p>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-brand-green hover:bg-brand-green-hover transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp: +91 8129070109</span>
            </a>

            <div className="pt-2 text-[11px] text-slate-500">
              Operating 24/7 for Guest Safety, Flight Pickups & Tour Coordination across Kerala.
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {currentYear} Travel Care Tours Pvt Ltd. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span>Made with care for Kerala travelers</span>
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1 cursor-pointer"
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
