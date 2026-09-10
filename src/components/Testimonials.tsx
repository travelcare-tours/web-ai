import React from 'react';
import { Star, StarHalf, Quote, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '../data/travelData';

export const Testimonials: React.FC = () => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
        );
      } else if (rating >= i - 0.5) {
        stars.push(
          <span key={i} className="relative inline-flex items-center justify-center w-4 h-4">
            <Star className="w-4 h-4 text-slate-200 fill-slate-200 absolute inset-0" />
            <StarHalf className="w-4 h-4 fill-amber-400 text-amber-400 absolute inset-0 z-10" />
          </span>
        );
      } else {
        stars.push(
          <Star key={i} className="w-4 h-4 text-slate-200 fill-slate-200" />
        );
      }
    }
    return stars;
  };

  return (
    <section className="py-20 md:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-extrabold tracking-widest text-brand-green uppercase">
            GUEST EXPERIENCES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-brand-navy">
            Loved by travelers across India & worldwide
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Read what our guests have to say about our verified drivers, handpicked resorts, and caring support.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-slate-50/80 rounded-3xl p-6 sm:p-8 border border-slate-200 flex flex-col justify-between relative shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                {/* Top rating stars & quote icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 ml-1">
                      {review.rating.toFixed(1)} / 5.0
                    </span>
                  </div>
                  <Quote className="w-8 h-8 text-slate-300" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {review.name}
                  </h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-brand-green" />
                    <span>{review.location}</span>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-semibold text-brand-green bg-emerald-50 px-2.5 py-1 rounded-full">
                    {review.tripType}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
