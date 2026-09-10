import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Compass,
  ShieldCheck,
  Building,
  Car,
  Headphones,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from 'lucide-react';

// Scenic Kerala background slides for the hero carousel
const HERO_BACKGROUND_SLIDES = [
  {
    title: "Munnar",
    subtitle: "Misty Tea Plantations & Rolling Hills",
    image: "https://images.unsplash.com/photo-1742106854691-014b06968f74?auto=format&fit=crop&w=2000&q=85",
  },
  {
    title: "Alleppey",
    subtitle: "Tranquil Backwaters & Houseboat Cruises",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=2000&q=85",
  },
  {
    title: "Kovalam",
    subtitle: "Golden Sands & Iconic Lighthouse Coast",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2000&q=85",
  },
  {
    title: "Thekkady",
    subtitle: "Periyar Wildlife Reserve & Spice Groves",
    image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=2000&q=85",
  },
  {
    title: "Wayanad",
    subtitle: "Misty Rainforests, Waterfalls & Treks",
    image: "https://images.unsplash.com/photo-1588665555327-a67c73b3cc23?auto=format&fit=crop&w=2000&q=85",
  },
  {
    title: "Kochi",
    subtitle: "Historic Fort Cochin & Chinese Fishing Nets",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=2000&q=85",
  },
];

interface HeroProps {
  onPlanTripClick: () => void;
  onExplorePackagesClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onPlanTripClick,
  onExplorePackagesClick,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = HERO_BACKGROUND_SLIDES.length;

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(nextSlide, 5500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, totalSlides]);

  const activeSlide = HERO_BACKGROUND_SLIDES[currentSlideIndex];

  return (
    <section
      id="home"
      className="relative h-[calc(100svh-4rem)] sm:h-[calc(100svh-5rem)] min-h-[580px] max-h-[920px] flex flex-col justify-between overflow-hidden pt-5 sm:pt-8 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slideshow Carousel */}
      <div className="absolute inset-0 z-0 bg-brand-navy-deep">
        {HERO_BACKGROUND_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlideIndex;
          return (
            <div
              key={slide.title}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={`${slide.title} - Kerala`}
                className={`w-full h-full object-cover object-center transition-transform duration-[6500ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        {/* Cinematic overlays for crisp text legibility */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-brand-navy-deep/95 via-brand-navy-dark/80 to-brand-navy-deep/55" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-brand-navy-deep/90 via-transparent to-black/40" />
      </div>

      {/* Main Hero Content (Vertically Centered) */}
      <div className="relative z-30 max-w-7xl mx-auto w-full my-auto text-white">
        <div className="max-w-3xl space-y-4 sm:space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-extrabold tracking-widest text-brand-green-soft uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-green-soft" />
            <span>YOUR JOURNEY, OUR CARE • KERALA SPECIALISTS</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-[1.08] text-white drop-shadow-sm">
            Discover Kerala. <br />
            <span className="text-brand-green-soft">Travel with care.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl drop-shadow-xs">
            Misty tea hills of Munnar, tranquil backwater houseboats in Alleppey, and sun-kissed beaches in Kovalam — crafted into personalized, unforgettable holidays.
          </p>

          {/* Action Buttons: Explore Packages & Plan My Trip */}
          <div className="pt-1 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={onExplorePackagesClick}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold bg-brand-green hover:bg-brand-green-hover text-white shadow-lg shadow-brand-green/35 hover:shadow-brand-green/50 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>Explore Packages</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onPlanTripClick}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold bg-white text-brand-navy hover:bg-slate-100 shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Compass className="w-4 h-4 text-brand-green" />
              <span>Plan My Trip</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Consolidated Section: Transparent Glass Badges + Carousel Controls */}
      <div className="relative z-30 max-w-7xl mx-auto w-full pt-3 sm:pt-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 sm:gap-3">
          {/* Consolidated 4 Glass-like Selling Points Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 flex-1">
            <div className="bg-black/35 hover:bg-black/45 backdrop-blur-md border border-white/20 rounded-xl p-2 sm:px-3 sm:py-2.5 transition-all text-white flex items-center gap-2.5 shadow-sm">
              <div className="p-1.5 rounded-lg bg-brand-green/30 text-brand-green-soft shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <strong className="block text-xs font-bold text-white tracking-wide truncate">100% Customized</strong>
                <span className="text-[10px] sm:text-[11px] text-slate-300 block truncate">Your pace & route</span>
              </div>
            </div>

            <div className="bg-black/35 hover:bg-black/45 backdrop-blur-md border border-white/20 rounded-xl p-2 sm:px-3 sm:py-2.5 transition-all text-white flex items-center gap-2.5 shadow-sm">
              <div className="p-1.5 rounded-lg bg-brand-green/30 text-brand-green-soft shrink-0">
                <Building className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <strong className="block text-xs font-bold text-white tracking-wide truncate">Verified Hotels</strong>
                <span className="text-[10px] sm:text-[11px] text-slate-300 block truncate">Comfort & views</span>
              </div>
            </div>

            <div className="bg-black/35 hover:bg-black/45 backdrop-blur-md border border-white/20 rounded-xl p-2 sm:px-3 sm:py-2.5 transition-all text-white flex items-center gap-2.5 shadow-sm">
              <div className="p-1.5 rounded-lg bg-brand-green/30 text-brand-green-soft shrink-0">
                <Car className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <strong className="block text-xs font-bold text-white tracking-wide truncate">Private Chauffeur</strong>
                <span className="text-[10px] sm:text-[11px] text-slate-300 block truncate">Dedicated AC cab</span>
              </div>
            </div>

            <div className="bg-black/35 hover:bg-black/45 backdrop-blur-md border border-white/20 rounded-xl p-2 sm:px-3 sm:py-2.5 transition-all text-white flex items-center gap-2.5 shadow-sm">
              <div className="p-1.5 rounded-lg bg-brand-green/30 text-brand-green-soft shrink-0">
                <Headphones className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <strong className="block text-xs font-bold text-white tracking-wide truncate">16/7 On-Trip Care</strong>
                <span className="text-[10px] sm:text-[11px] text-slate-300 block truncate">6 AM – 10 PM support</span>
              </div>
            </div>
          </div>

          {/* Carousel Slide Controls & Active Destination Indicator */}
          <div className="flex items-center justify-between lg:justify-end gap-2.5 bg-black/45 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 text-xs text-white shadow-md self-end lg:self-center shrink-0">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-green-soft shrink-0" />
              <span className="font-bold text-white tracking-wide">{activeSlide.title}</span>
              <span className="hidden xl:inline text-slate-300 text-[11px]">• {activeSlide.subtitle}</span>
            </div>

            <div className="h-3 w-px bg-white/20 mx-0.5" />

            <div className="flex items-center gap-1">
              <button
                onClick={prevSlide}
                type="button"
                className="w-6 h-6 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-slate-200 hover:text-white"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-[11px] text-slate-300 font-semibold px-1 min-w-[28px] text-center">
                {currentSlideIndex + 1}/{totalSlides}
              </span>

              <button
                onClick={nextSlide}
                type="button"
                className="w-6 h-6 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-slate-200 hover:text-white"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
