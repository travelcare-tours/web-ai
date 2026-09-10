import React from 'react';
import { Plus, Check, ArrowUpRight } from 'lucide-react';
import { DESTINATIONS } from '../data/travelData';

interface DestinationsGridProps {
  onSelectDestination: (destName: string) => void;
  selectedDestinations?: string[];
}

export const DestinationsGrid: React.FC<DestinationsGridProps> = ({
  onSelectDestination,
  selectedDestinations = [],
}) => {
  return (
    <section id="destinations" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-extrabold tracking-widest text-brand-green uppercase">
            EXPLORE KERALA
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-brand-navy">
            Destinations worth discovering
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Click any destination to include it in your customized trip request.
          </p>
        </div>

        {/* 8-Destination Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DESTINATIONS.map((dest) => {
            const isSelected = selectedDestinations.some(
              (d) => d.toLowerCase() === dest.name.toLowerCase()
            );

            return (
              <div
                key={dest.id}
                onClick={() => onSelectDestination(dest.name)}
                className={`group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 border ${
                  isSelected ? 'ring-4 ring-brand-green border-brand-green' : 'border-slate-200'
                }`}
              >
                {/* Destination Image */}
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Gradient Shading */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Top Badge: Selection Indicator */}
                <div className="absolute top-3 right-3 z-10">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full transition-all ${
                      isSelected
                        ? 'bg-brand-green text-white shadow-md'
                        : 'bg-black/40 text-white backdrop-blur-md group-hover:bg-brand-green group-hover:text-white'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Selected</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3" />
                        <span>Add to Trip</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white z-10 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-green-soft">
                    {dest.category}
                  </span>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold font-display text-white group-hover:text-brand-green-soft transition-colors">
                      {dest.name}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-200 line-clamp-2">
                    {dest.subtitle}
                  </p>
                  <p className="text-[11px] text-brand-green-soft font-semibold pt-1">
                    Best Season: {dest.bestTime}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
