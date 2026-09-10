import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Compass } from 'lucide-react';
import { DESTINATIONS } from '../data/travelData';

interface HighlightsCarouselProps {
  onSelectDestination: (destName: string) => void;
}

export const HighlightsCarousel: React.FC<HighlightsCarouselProps> = ({ onSelectDestination }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = DESTINATIONS.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, total]);

  const currentDest = DESTINATIONS[currentIndex];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden" aria-label="Kerala highlights">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-brand-green uppercase">
              KERALA HIGHLIGHTS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-brand-navy mt-1">
              See where your journey can take you
            </h2>
          </div>
          <p className="text-slate-600 max-w-md text-sm md:text-base leading-relaxed">
            From the tea-carpeted slopes of Munnar to the golden shores of Kovalam, experience the natural beauty that defines God’s Own Country.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative group rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-200"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Stage Viewport */}
          <div className="relative aspect-[16/10] sm:aspect-[16/8] md:aspect-[21/9] w-full overflow-hidden">
            {DESTINATIONS.map((dest, idx) => (
              <div
                key={dest.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-7000 ease-out"
                />
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent hidden md:block" />

                {/* Caption Details */}
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 md:p-12 text-white flex flex-col md:flex-row md:items-end justify-between gap-6 z-20">
                  <div className="space-y-2 max-w-xl">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green/80 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-white">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{dest.category}</span>
                    </div>
                    <h3 className="text-3xl sm:text-5xl font-bold font-display text-white drop-shadow-sm">
                      {dest.name}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-200 font-medium">
                      {dest.subtitle} • {dest.tagline}
                    </p>
                    <div className="hidden sm:flex flex-wrap gap-2 pt-2">
                      {dest.keyAttractions.slice(0, 3).map((attr, i) => (
                        <span key={i} className="text-xs bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md text-slate-100">
                          {attr}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onSelectDestination(dest.name)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold bg-white text-brand-navy hover:bg-brand-green hover:text-white transition-all shadow-lg hover:scale-105 cursor-pointer"
                    >
                      <Compass className="w-4 h-4" />
                      <span>Include {dest.name}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 hover:bg-white text-brand-navy flex items-center justify-center shadow-lg transition-all hover:scale-110 cursor-pointer focus:outline-hidden"
            aria-label="Previous destination"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 hover:bg-white text-brand-navy flex items-center justify-center shadow-lg transition-all hover:scale-110 cursor-pointer focus:outline-hidden"
            aria-label="Next destination"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Slide Indicator Strip & Thumbnails */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {DESTINATIONS.map((dest, idx) => (
            <button
              key={dest.id}
              onClick={() => setCurrentIndex(idx)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                idx === currentIndex
                  ? 'bg-brand-green text-white shadow-sm ring-2 ring-brand-green/30'
                  : 'bg-slate-200/70 text-slate-700 hover:bg-slate-300'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${idx === currentIndex ? 'bg-white' : 'bg-slate-500'}`} />
              <span>{dest.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
