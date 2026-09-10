import React from 'react';
import { X, Calendar, MapPin, CheckCircle2, Clock, Utensils, BedDouble, Car } from 'lucide-react';
import { TourPackage } from '../types';
import { COMPANY_DETAILS } from '../data/travelData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ItineraryModalProps {
  pkg: TourPackage | null;
  onClose: () => void;
  onBookNow: (pkgTitle: string) => void;
}

export const ItineraryModal: React.FC<ItineraryModalProps> = ({ pkg, onClose, onBookNow }) => {
  if (!pkg) return null;

  const whatsAppUrl = `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(
    `Hello Travel Care Tours! I am interested in the "${pkg.title}" (${pkg.duration}). Please share customized quote and details.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white rounded-t-3xl sm:rounded-3xl max-w-4xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile top pill indicator */}
        <div className="w-12 h-1.5 bg-white/80 rounded-full mx-auto absolute top-2.5 left-1/2 -translate-x-1/2 z-30 sm:hidden shadow-sm" />

        {/* Modal Header with Package Banner */}
        <div className="relative h-48 sm:h-64 shrink-0 overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep via-brand-navy-dark/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Package Title & Badges */}
          <div className="absolute bottom-4 inset-x-4 sm:inset-x-8 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-brand-green text-white">
                {pkg.tag}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-slate-100 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{pkg.duration}</span>
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {pkg.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-green-soft shrink-0" />
              <span>Route: {pkg.route.join(' → ')}</span>
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 divide-y divide-slate-100">
          {/* Key Inclusions & Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-emerald-50/70 border border-emerald-100 p-4 sm:p-5 rounded-2xl">
              <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-brand-green" />
                <span>Package Highlights</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {pkg.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green shrink-0 mt-1.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-2xl">
              <h4 className="text-sm font-bold uppercase tracking-wider text-brand-navy flex items-center gap-2 mb-3">
                <Car className="w-4 h-4 text-brand-navy" />
                <span>What's Included</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Day-by-day Itinerary */}
          <div className="pt-6">
            <h4 className="text-lg font-bold font-display text-brand-navy mb-5 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-green" />
              <span>Day-by-Day Journey Plan</span>
            </h4>

            <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
              {pkg.itinerary.map((day) => (
                <div key={day.day} className="relative flex items-start gap-4 pl-1">
                  {/* Step circle */}
                  <div className="w-7 h-7 rounded-full bg-brand-navy text-white text-xs font-bold flex items-center justify-center shrink-0 ring-4 ring-white z-10">
                    {day.day}
                  </div>

                  {/* Day Content */}
                  <div className="bg-slate-50 hover:bg-slate-100/80 transition-colors p-4 sm:p-5 rounded-2xl border border-slate-200 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-brand-green">
                        Day {day.day}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        Sightseeing & Relaxation
                      </span>
                    </div>
                    <h5 className="text-base font-bold text-slate-900 mb-2">
                      {day.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {day.description}
                    </p>

                    {/* Activities pills */}
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-200">
                      {day.activities.map((act, aIdx) => (
                        <span
                          key={aIdx}
                          className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-slate-700 border border-slate-200 shadow-2xs"
                        >
                          {act}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-3 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          <div className="hidden sm:block">
            <span className="text-xs text-slate-500 font-semibold uppercase">Pricing & Inclusions</span>
            <p className="text-sm font-bold text-slate-900">Customized Quotes Available Instantly</p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onBookNow(pkg.title);
              }}
              className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-brand-navy bg-white hover:bg-slate-100 border border-slate-300 transition-colors cursor-pointer text-center"
            >
              Plan Trip
            </button>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-md shadow-[#25D366]/25 transition-all hover:scale-105 cursor-pointer text-center"
            >
              <WhatsAppIcon variant="white" className="w-4 h-4 fill-white shrink-0" />
              <span>Quote on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
