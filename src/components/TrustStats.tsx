import React from 'react';
import { Compass, Users, Car, CheckCircle2, Headphones, Star } from 'lucide-react';

export const TrustStats: React.FC = () => {
  return (
    <section className="bg-brand-navy text-white py-6 border-y border-brand-navy-dark shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-brand-green-soft">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <strong className="block text-base font-bold text-white tracking-wide">Kerala Specialists</strong>
              <span className="text-xs text-slate-300">Local routes & authentic experiences</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-brand-green-soft">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <strong className="block text-base font-bold text-white tracking-wide">Flexible Packages</strong>
              <span className="text-xs text-slate-300">Honeymoon • Family • Group tours</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-brand-green-soft">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <strong className="block text-base font-bold text-white tracking-wide">Complete Planning</strong>
              <span className="text-xs text-slate-300">Stay • Private Cab • Houseboat</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-brand-green-soft">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <strong className="block text-base font-bold text-white tracking-wide">24/7 On-Trip Care</strong>
              <span className="text-xs text-slate-300">Dedicated WhatsApp guest coordination</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
