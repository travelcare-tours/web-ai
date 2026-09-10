import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Car, Building, Sparkles, MessageCircle } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/travelData';

interface HeroProps {
  onPlanTripClick: () => void;
  onExplorePackagesClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPlanTripClick, onExplorePackagesClick }) => {
  const whatsAppUrl = `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(
    "Hello Travel Care Tours! I want to plan my Kerala trip."
  )}`;

  return (
    <section id="home" className="relative min-h-[640px] md:min-h-[720px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Vignette Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1742106854691-014b06968f74?auto=format&fit=crop&w=2000&q=85"
          alt="Munnar Tea Gardens Kerala"
          className="w-full h-full object-cover object-center scale-105 transform animate-pulse duration-[10000ms]"
        />
        {/* Deep cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-deep/92 via-brand-navy-dark/78 to-brand-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep/90 via-transparent to-black/30" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-white w-full">
        <div className="max-w-3xl space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-extrabold tracking-widest text-brand-green-soft uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-green-soft animate-spin duration-3000" />
            <span>YOUR JOURNEY, OUR CARE</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-[1.08] text-white">
            Discover Kerala. <br />
            <span className="text-brand-green-soft">Travel with care.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl">
            Misty tea hills of Munnar, tranquil backwater houseboats in Alleppey, and sun-kissed beaches in Kovalam — crafted into unforgettable, personalized holidays.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onExplorePackagesClick}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-base font-bold bg-brand-green hover:bg-brand-green-hover text-white shadow-lg shadow-brand-green/30 hover:shadow-brand-green/50 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>Explore Packages</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onPlanTripClick}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-base font-bold bg-white text-brand-navy hover:bg-slate-100 shadow-md transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Compass className="w-4 h-4 text-brand-green" />
              <span>Plan My Trip</span>
            </button>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full text-sm font-semibold bg-white/15 backdrop-blur-md hover:bg-white/25 border border-white/30 text-white transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Us Directly</span>
            </a>
          </div>

          {/* Trust Highlights Strip */}
          <div className="pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-200">
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
              <div className="p-2 rounded-lg bg-brand-green/25 text-brand-green-soft">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-white font-semibold">100% Customized</strong>
                <span className="text-slate-300 text-xs">Itineraries tailored to your pace</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
              <div className="p-2 rounded-lg bg-brand-green/25 text-brand-green-soft">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-white font-semibold">Verified Hotels & Resorts</strong>
                <span className="text-slate-300 text-xs">Comfort, cleanliness & scenic views</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
              <div className="p-2 rounded-lg bg-brand-green/25 text-brand-green-soft">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-white font-semibold">Private Chauffeur</strong>
                <span className="text-slate-300 text-xs">Courteous, verified drivers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
