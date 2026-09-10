import React from 'react';
import { Coffee, Anchor, Sun, Trees, Sparkles, HeartHandshake } from 'lucide-react';

export const FeatureStory: React.FC = () => {
  return (
    <section className="bg-brand-navy-dark text-white py-20 md:py-28 relative overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-extrabold tracking-widest text-brand-green-soft uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE KERALA EXPERIENCE</span>
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white leading-tight">
              One trip. <br />
              <span className="text-brand-green-soft">Many unforgettable moments.</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Wake up to morning mist drifting over tea estates in Munnar. Spot wild herds along the lakes of Thekkady. Drift through calm Alleppey waters on a handcrafted wooden houseboat, and watch the sun sink into the Arabian Sea from the cliffs of Varkala.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <Coffee className="w-5 h-5 text-brand-green-soft shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Misty Highland Escapes</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Tea tastings, hill waterfalls & cool climate</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <Anchor className="w-5 h-5 text-brand-green-soft shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Backwater Houseboats</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Freshly cooked Kerala meals on quiet canals</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <Trees className="w-5 h-5 text-brand-green-soft shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Spice Trails & Wildlife</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Cardamom plantations & Periyar lake safaris</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <Sun className="w-5 h-5 text-brand-green-soft shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Sun-Kissed Beaches</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Lighthouse viewpoints & coastal promenades</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Collage with High Quality Imagery */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/5] relative group">
                <img
                  src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=700&q=85"
                  alt="Alleppey Kerala Backwaters Houseboat"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold text-white">
                  Alleppey Houseboat
                </span>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-lg aspect-square relative group">
                <img
                  src="https://images.unsplash.com/photo-1716404985743-8c0e007cb358?auto=format&fit=crop&w=700&q=85"
                  alt="Thekkady Wildlife and Forest"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold text-white">
                  Thekkady Spices & Nature
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-square relative group">
                <img
                  src="https://images.unsplash.com/photo-1576748135861-f254c1582530?auto=format&fit=crop&w=700&q=85"
                  alt="Kovalam Lighthouse Beach"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold text-white">
                  Kovalam Beach
                </span>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/5] relative group">
                <img
                  src="https://images.unsplash.com/photo-1660314159014-79d411e1c53d?auto=format&fit=crop&w=700&q=85"
                  alt="Varkala Cliff Sunset"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold text-white">
                  Varkala Sunset Cliffs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
