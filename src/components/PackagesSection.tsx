import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { TourPackage } from '../types';
import { TOUR_PACKAGES } from '../data/travelData';
import { PackageCard } from './PackageCard';

interface PackagesSectionProps {
  onViewItinerary: (pkg: TourPackage) => void;
  onSelectPackageForEnquiry: (pkgTitle: string) => void;
  onCustomTripClick: () => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  onViewItinerary,
  onSelectPackageForEnquiry,
  onCustomTripClick,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Honeymoon', 'Family', 'Premium', 'Groups'];

  const filteredPackages =
    activeCategory === 'All'
      ? TOUR_PACKAGES
      : TOUR_PACKAGES.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="packages" className="pt-16 pb-8 sm:pt-20 sm:pb-10 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-brand-green uppercase">
              POPULAR EXPERIENCES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-brand-navy mt-1">
              Kerala packages made for you
            </h2>
          </div>
          <p className="text-slate-600 max-w-md text-sm md:text-base leading-relaxed">
            Choose a starting idea and let us customize the route, hotels, transport and experiences to match your dates and budget.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-brand-navy text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat === 'All' ? 'All Packages' : cat}
            </button>
          ))}
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredPackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              onViewItinerary={onViewItinerary}
              onSelectPackageForEnquiry={onSelectPackageForEnquiry}
            />
          ))}
        </div>

        {/* Custom Package Callout */}
        <div className="mt-14 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green/15 text-brand-green text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Need something different?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-brand-navy">
              Have specific dates, routes, or a special celebration?
            </h3>
            <p className="text-sm text-slate-600 max-w-2xl">
              We design 100% custom Kerala tours! Tell us which spots you wish to cover, your preferred resort style, or your exact travel budget.
            </p>
          </div>

          <button
            onClick={onCustomTripClick}
            className="shrink-0 px-8 py-4 rounded-full text-sm font-bold bg-brand-navy text-white hover:bg-brand-navy-dark shadow-lg shadow-brand-navy/20 transition-all hover:scale-105 cursor-pointer"
          >
            Design My Custom Tour
          </button>
        </div>
      </div>
    </section>
  );
};
