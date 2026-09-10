import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/travelData';

interface CtaBannerProps {
  onPlanTripClick: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onPlanTripClick }) => {
  const whatsAppUrl = `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(
    "Hello Travel Care Tours! I want to plan my Kerala trip. Please guide me."
  )}`;

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 border-y border-emerald-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <span className="text-xs font-black tracking-widest text-brand-green uppercase">
              READY TO TRAVEL?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-brand-navy">
              Let's plan your Kerala holiday.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl">
              Tell us your preferred dates and what you wish to see. We will craft the route, arrange the best stays, and share a free quotation.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <button
              onClick={onPlanTripClick}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold bg-brand-navy text-white hover:bg-brand-navy-dark shadow-lg shadow-brand-navy/20 transition-all hover:scale-105 cursor-pointer"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-sm font-bold bg-brand-green text-white hover:bg-brand-green-hover shadow-lg shadow-brand-green/20 transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
