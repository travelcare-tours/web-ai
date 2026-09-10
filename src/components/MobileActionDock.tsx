import React from 'react';
import { Phone, CalendarCheck } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/travelData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface MobileActionDockProps {
  onPlanTripClick: () => void;
}

export const MobileActionDock: React.FC<MobileActionDockProps> = ({ onPlanTripClick }) => {
  const whatsAppUrl = `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(
    "Hello Travel Care Tours! I am browsing your Kerala packages on mobile and would like to get a customized holiday quote."
  )}`;

  return (
    <nav
      aria-label="Mobile quick contact actions"
      className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-3 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] transition-all"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Direct Call Button */}
        <a
          href={`tel:${COMPANY_DETAILS.phone.replace(/[^0-9+]/g, '')}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all active:scale-[0.98] border border-slate-200"
          aria-label="Call Travel Care Tours"
        >
          <Phone className="w-3.5 h-3.5 text-brand-green" />
          <span>Call Us</span>
        </a>

        {/* Plan Trip Button */}
        <button
          onClick={onPlanTripClick}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-brand-navy hover:bg-brand-navy-dark text-white text-xs font-bold transition-all active:scale-[0.98] shadow-sm cursor-pointer"
          aria-label="Open Trip Planner"
        >
          <CalendarCheck className="w-3.5 h-3.5 text-brand-green-soft" />
          <span>Plan Trip</span>
        </button>

        {/* WhatsApp Button (Prominent) */}
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.4] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all active:scale-[0.98] shadow-md shadow-[#25D366]/25"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon variant="white" className="w-4 h-4 fill-white shrink-0" />
          <span className="truncate">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
};
