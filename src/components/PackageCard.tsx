import React from 'react';
import { Clock, MapPin, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { TourPackage } from '../types';
import { COMPANY_DETAILS } from '../data/travelData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface PackageCardProps {
  pkg: TourPackage;
  onViewItinerary: (pkg: TourPackage) => void;
  onSelectPackageForEnquiry: (pkgTitle: string) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  onViewItinerary,
  onSelectPackageForEnquiry,
}) => {
  const whatsAppUrl = `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(
    `Hello Travel Care Tours! I am inquiring about the "${pkg.title}" (${pkg.duration}). Please send me package pricing and custom options.`
  )}`;

  return (
    <article className="group bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Card Image */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-100">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

        {/* Category Tag */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-brand-green text-white shadow-xs">
            {pkg.tag}
          </span>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
          <span className="flex items-center gap-1.5 bg-black/45 backdrop-blur-md px-3 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5 text-brand-green-soft" />
            <span>{pkg.duration}</span>
          </span>
          <span className="bg-brand-navy/85 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-100">
            {pkg.nights}N / {pkg.days}D
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-brand-navy group-hover:text-brand-green transition-colors leading-tight mb-2">
            {pkg.title}
          </h3>

          {/* Route details */}
          <div className="flex items-start gap-1.5 text-xs text-slate-600 mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <MapPin className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
            <span className="font-medium text-slate-700">
              {pkg.route.join(' • ')}
            </span>
          </div>

          {/* Key highlights (top 2) */}
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
            {pkg.highlights.slice(0, 2).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer meta & actions */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Hotel + Cab + Meals</span>
            <span className="font-extrabold text-brand-navy bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-md">
              Custom Quote
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onViewItinerary(pkg)}
              type="button"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-brand-navy bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Full Plan</span>
            </button>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-xs transition-all cursor-pointer"
            >
              <WhatsAppIcon variant="white" className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </a>
          </div>

          <button
            onClick={() => onSelectPackageForEnquiry(pkg.title)}
            type="button"
            className="w-full text-center text-xs font-bold text-brand-green hover:text-brand-green-hover py-1 flex items-center justify-center gap-1 cursor-pointer transition-colors"
          >
            <span>Customise & Send Enquiry Form</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </article>
  );
};
