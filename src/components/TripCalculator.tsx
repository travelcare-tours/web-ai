import React, { useState } from 'react';
import { Calculator, Check, MessageCircle, Sparkles, MapPin, Users, Calendar, ShieldCheck, Car } from 'lucide-react';
import { DESTINATIONS, COMPANY_DETAILS } from '../data/travelData';

interface TripCalculatorProps {
  selectedDests: string[];
  onToggleDest: (name: string) => void;
  onSendToEnquiry: (details: {
    nights: number;
    adults: number;
    children: number;
    destinations: string[];
    hotelTier: string;
    vehicle: string;
    houseboat: boolean;
  }) => void;
}

export const TripCalculator: React.FC<TripCalculatorProps> = ({
  selectedDests,
  onToggleDest,
  onSendToEnquiry,
}) => {
  const [nights, setNights] = useState<number>(5);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [hotelTier, setHotelTier] = useState<string>('Deluxe 4-Star');
  const [vehicle, setVehicle] = useState<string>('Private Sedan (Dzire / Etios)');
  const [houseboat, setHouseboat] = useState<boolean>(true);
  const [spiceTour, setSpiceTour] = useState<boolean>(true);
  const [jeepSafari, setJeepSafari] = useState<boolean>(false);

  // Auto-switch vehicle recommendation based on passenger count
  const totalGuests = adults + children;

  const handleAdultsChange = (val: number) => {
    const num = Math.max(1, val);
    setAdults(num);
    if (num + children > 4 && vehicle.includes('Sedan')) {
      setVehicle('Private SUV (Toyota Innova Crysta)');
    }
    if (num + children > 7) {
      setVehicle('AC Tempo Traveller (12-17 Seater)');
    }
  };

  const handleSendWhatsApp = () => {
    const destList = selectedDests.length > 0 ? selectedDests.join(', ') : 'Munnar, Thekkady, Alleppey';
    const extras: string[] = [];
    if (houseboat) extras.push('Private Houseboat Stay');
    if (spiceTour) extras.push('Spice Plantation Tour');
    if (jeepSafari) extras.push('Off-road Jeep Safari');

    const msg = [
      'Hello Travel Care Tours! I calculated a custom Kerala trip plan:',
      '',
      `• Duration: ${nights} Nights / ${nights + 1} Days`,
      `• Guests: ${adults} Adult(s)${children > 0 ? `, ${children} Child(ren)` : ''}`,
      `• Selected Destinations: ${destList}`,
      `• Resort Category: ${hotelTier}`,
      `• Private Transport: ${vehicle}`,
      extras.length > 0 ? `• Inclusions/Experiences: ${extras.join(', ')}` : '',
      '',
      'Please send me the day-wise itinerary proposal and best price quote. Thank you!'
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="trip-planner" className="py-20 md:py-28 bg-gradient-to-b from-white to-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>INSTANT TRIP PLANNER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-brand-navy">
            Design Your Ideal Kerala Holiday
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Customize destinations, duration, resort category, and vehicle to instantly format a proposal for our local team on WhatsApp.
          </p>
        </div>

        {/* Planner Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Options Controls */}
            <div className="lg:col-span-8 space-y-8">
              {/* 1. Destinations selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-green" />
                    <span>1. Choose Kerala Destinations</span>
                  </span>
                  <span className="text-xs text-brand-green font-semibold">
                    {selectedDests.length} selected
                  </span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {DESTINATIONS.map((d) => {
                    const isPicked = selectedDests.includes(d.name);
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => onToggleDest(d.name)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          isPicked
                            ? 'bg-brand-navy text-white shadow-sm ring-2 ring-brand-navy/20'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                        }`}
                      >
                        {isPicked ? <Check className="w-3.5 h-3.5 text-brand-green-soft" /> : null}
                        <span>{d.name}</span>
                      </button>
                    );
                  })}
                </div>
                {selectedDests.length === 0 && (
                  <p className="text-xs text-slate-500 mt-2 italic">
                    Tip: Tap one or more destinations above (e.g. Munnar, Thekkady, Alleppey)
                  </p>
                )}
              </div>

              {/* 2. Duration & Guest count */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-brand-green" />
                    <span>Nights: {nights}</span>
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="14"
                    value={nights}
                    onChange={(e) => setNights(Number(e.target.value))}
                    className="w-full accent-brand-green cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-semibold">
                    <span>3 Nights</span>
                    <span className="text-brand-green font-bold">{nights}N / {nights + 1}D</span>
                    <span>14 Nights</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-brand-green" />
                    <span>Adults</span>
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                    <button
                      type="button"
                      onClick={() => handleAdultsChange(adults - 1)}
                      className="px-3 py-2 text-slate-600 hover:bg-slate-200 font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center text-sm font-bold text-slate-800">
                      {adults}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAdultsChange(adults + 1)}
                      className="px-3 py-2 text-slate-600 hover:bg-slate-200 font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-brand-green" />
                    <span>Children (&lt;12 yrs)</span>
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                    <button
                      type="button"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="px-3 py-2 text-slate-600 hover:bg-slate-200 font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center text-sm font-bold text-slate-800">
                      {children}
                    </span>
                    <button
                      type="button"
                      onClick={() => setChildren(children + 1)}
                      className="px-3 py-2 text-slate-600 hover:bg-slate-200 font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. Resort Tier & Vehicle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Resort / Hotel Category
                  </label>
                  <select
                    value={hotelTier}
                    onChange={(e) => setHotelTier(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                  >
                    <option value="Comfort 3-Star">Comfort 3-Star (Clean, cozy & central)</option>
                    <option value="Deluxe 4-Star">Deluxe 4-Star (Valley/pool views & breakfast)</option>
                    <option value="Luxury 5-Star & Heritage">Luxury 5-Star & Heritage (Premium luxury)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-brand-green" />
                    <span>Dedicated Private Vehicle</span>
                  </label>
                  <select
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                  >
                    <option value="Private Sedan (Dzire / Etios)">Private Sedan (Dzire / Etios — 1 to 3 Pax)</option>
                    <option value="Private SUV (Toyota Innova Crysta)">Private SUV (Toyota Innova Crysta — 4 to 6 Pax)</option>
                    <option value="AC Tempo Traveller (12-17 Seater)">AC Tempo Traveller (12-17 Seater — Group)</option>
                    <option value="Luxury Urbania (9-16 Seater)">Luxury Force Urbania (Executive Group)</option>
                  </select>
                </div>
              </div>

              {/* 4. Experiences Add-ons */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Signature Experiences to Include
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    houseboat ? 'bg-emerald-50 border-brand-green text-emerald-950 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    <input
                      type="checkbox"
                      checked={houseboat}
                      onChange={(e) => setHouseboat(e.target.checked)}
                      className="accent-brand-green w-4 h-4 rounded-sm"
                    />
                    <span className="text-xs">Alleppey Houseboat Stay</span>
                  </label>

                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    spiceTour ? 'bg-emerald-50 border-brand-green text-emerald-950 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    <input
                      type="checkbox"
                      checked={spiceTour}
                      onChange={(e) => setSpiceTour(e.target.checked)}
                      className="accent-brand-green w-4 h-4 rounded-sm"
                    />
                    <span className="text-xs">Thekkady Spice Walk</span>
                  </label>

                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    jeepSafari ? 'bg-emerald-50 border-brand-green text-emerald-950 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    <input
                      type="checkbox"
                      checked={jeepSafari}
                      onChange={(e) => setJeepSafari(e.target.checked)}
                      className="accent-brand-green w-4 h-4 rounded-sm"
                    />
                    <span className="text-xs">Vagamon 4x4 Jeep Safari</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Summary Box */}
            <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Trip Summary</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-green text-white">
                    Custom Plan
                  </span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Duration:</span>
                    <span className="font-bold text-slate-900">{nights} Nights / {nights + 1} Days</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Guests:</span>
                    <span className="font-bold text-slate-900">{adults} Adults {children > 0 ? `+ ${children} Kids` : ''}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Destinations:</span>
                    <span className="font-bold text-slate-900 text-right">
                      {selectedDests.length > 0 ? selectedDests.join(', ') : 'Popular Highlights'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Resort Tier:</span>
                    <span className="font-bold text-slate-900">{hotelTier}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Vehicle:</span>
                    <span className="font-bold text-slate-900 truncate max-w-[170px]" title={vehicle}>{vehicle}</span>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-brand-navy flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-brand-green" />
                    <span>Guaranteed Inclusions</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Daily Breakfast • Private Cab & Chauffeur • Tolls & Parking • 24/7 WhatsApp Coordination
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold text-white bg-brand-green hover:bg-brand-green-hover shadow-lg shadow-brand-green/25 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send to WhatsApp for Quote →</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSendToEnquiry({
                      nights,
                      adults,
                      children,
                      destinations: selectedDests,
                      hotelTier,
                      vehicle,
                      houseboat,
                    });
                  }}
                  className="w-full py-2.5 rounded-full text-xs font-bold text-brand-navy bg-white hover:bg-slate-100 border border-slate-300 transition-colors cursor-pointer"
                >
                  Use in Online Form Below
                </button>

                <p className="text-[11px] text-center text-slate-500">
                  No payment required now. Custom quote generated in minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
