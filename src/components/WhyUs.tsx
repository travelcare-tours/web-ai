import React from 'react';
import { Route, Hotel, Compass, MessageSquareQuote, ShieldCheck, HeartHandshake } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const pillars = [
    {
      number: "01",
      icon: Route,
      title: "Personalized Itineraries",
      description: "Your trip is planned strictly around your dates, interests, group size, and preferred travel pace — never rigid mass-tour timetables.",
    },
    {
      number: "02",
      icon: Hotel,
      title: "Stay & Transport Together",
      description: "We bundle handpicked resorts, private houseboats, and dedicated AC chauffeur vehicles into one seamless, stress-free package.",
    },
    {
      number: "03",
      icon: Compass,
      title: "Local Kerala Knowledge",
      description: "Our local team knows which mountain roads are smoothest, the best times to spot wildlife, and authentic culinary stops.",
    },
    {
      number: "04",
      icon: MessageSquareQuote,
      title: "Easy WhatsApp Communication",
      description: "Direct answers in minutes, transparent pricing with zero surprise charges, and continuous support before and during your vacation.",
    },
  ];

  return (
    <section id="why-us" className="py-20 md:py-28 bg-brand-green-pale/50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold tracking-widest text-brand-green uppercase">
            WHY TRAVEL CARE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-brand-navy">
            Travel planning without the stress
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From your first enquiry to your safe airport drop-off, experience genuine South Indian hospitality.
          </p>
        </div>

        {/* 4 Pillar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-sm font-extrabold text-brand-green tracking-wider">
                      {p.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-display text-brand-navy mb-2.5">
                    {p.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-brand-green">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Quality Assured</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
