import React, { useState } from 'react';
import { X } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/travelData';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsAppUrl = `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(
    "Hello Travel Care Tours, I would like to plan a trip to Kerala."
  )}`;

  return (
    <div className="fixed right-5 bottom-5 z-40 flex flex-col items-end gap-2">
      {/* Mini greeting bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 p-3 rounded-2xl shadow-xl border border-slate-200 text-xs font-semibold max-w-xs animate-bounce duration-1000">
          <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-ping" />
          <span>Plan your Kerala trip on WhatsApp!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 ml-1 p-0.5"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 hover:shadow-[#25D366]/40 transition-all duration-300 focus:outline-hidden"
        aria-label="Chat on WhatsApp with Travel Care Tours"
      >
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />

        <WhatsAppIcon variant="white" className="w-8 h-8 sm:w-9 sm:h-9 fill-white relative z-10" />
      </a>
    </div>
  );
};
