import React, { useState } from 'react';
import {
  Calculator,
  Check,
  MapPin,
  Users,
  Calendar,
  ShieldCheck,
  Car,
  User,
  Phone,
  CalendarDays,
  FileText,
  AlertCircle,
  Plus,
  X,
} from 'lucide-react';
import { DESTINATIONS, COMPANY_DETAILS } from '../data/travelData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface TripCalculatorProps {
  selectedDests: string[];
  onToggleDest: (name: string) => void;
  selectedPackageTitle?: string;
}

export const TripCalculator: React.FC<TripCalculatorProps> = ({
  selectedDests,
  onToggleDest,
  selectedPackageTitle,
}) => {
  const [nights, setNights] = useState<number>(5);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [hotelTier, setHotelTier] = useState<string>('Deluxe 4-Star');
  const [vehicle, setVehicle] = useState<string>('Private Sedan (Dzire / Etios)');
  const [houseboat, setHouseboat] = useState<boolean>(true);
  const [spiceTour, setSpiceTour] = useState<boolean>(true);
  const [jeepSafari, setJeepSafari] = useState<boolean>(false);

  // Custom places added by the guest
  const [customPlaces, setCustomPlaces] = useState<string[]>([]);
  const [newPlaceInput, setNewPlaceInput] = useState<string>('');

  // Guest Information (Required for personal proposal)
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [travelMonth, setTravelMonth] = useState<string>('');
  const [specialNote, setSpecialNote] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

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

  const handleAddPlace = () => {
    const trimmed = newPlaceInput.trim();
    if (!trimmed) return;
    if (customPlaces.some((p) => p.toLowerCase() === trimmed.toLowerCase())) {
      setNewPlaceInput('');
      return;
    }
    if (selectedDests.some((d) => d.toLowerCase() === trimmed.toLowerCase())) {
      setNewPlaceInput('');
      return;
    }
    setCustomPlaces((prev) => [...prev, trimmed]);
    setNewPlaceInput('');
  };

  const handleRemovePlace = (placeToRemove: string) => {
    setCustomPlaces((prev) => prev.filter((p) => p !== placeToRemove));
  };

  const handleSendWhatsApp = () => {
    if (!guestName.trim()) {
      setValidationError('Please provide your Name so we can personalize your itinerary.');
      return;
    }
    if (!guestPhone.trim()) {
      setValidationError('Please provide your WhatsApp or Phone number to receive the proposal.');
      return;
    }
    setValidationError(null);

    const allPlaces = [...selectedDests, ...customPlaces];
    const destList = allPlaces.length > 0 ? allPlaces.join(', ') : 'Munnar, Thekkady, Alleppey';
    const extras: string[] = [];
    if (houseboat) extras.push('Private Houseboat Stay');
    if (spiceTour) extras.push('Spice Plantation Tour');
    if (jeepSafari) extras.push('Off-road Jeep Safari');

    const msg = [
      'Hello Travel Care Tours! I calculated a custom Kerala holiday plan:',
      '',
      `• Guest Name: ${guestName.trim()}`,
      `• WhatsApp / Phone: ${guestPhone.trim()}`,
      travelMonth.trim() ? `• Travel Month / Dates: ${travelMonth.trim()}` : '',
      `• Duration: ${nights} Nights / ${nights + 1} Days`,
      `• Guests: ${adults} Adult(s)${children > 0 ? `, ${children} Child(ren)` : ''}`,
      selectedPackageTitle && selectedPackageTitle !== 'Not decided yet' ? `• Package Theme: ${selectedPackageTitle}` : '',
      `• Selected Destinations: ${destList}`,
      `• Resort Category: ${hotelTier}`,
      `• Private Transport: ${vehicle}`,
      extras.length > 0 ? `• Inclusions / Activities: ${extras.join(', ')}` : '',
      specialNote.trim() ? `• Special Notes: ${specialNote.trim()}` : '',
      '',
      'Please send me the day-wise itinerary proposal and best price quote. Thank you!'
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const allSelectedCount = selectedDests.length + customPlaces.length;

  return (
    <section id="trip-planner" className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>INSTANT TRIP PLANNER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-brand-navy">
            Design Your Ideal Kerala Holiday
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Customize destinations, duration, resort category, vehicle, and your contact details to instantly receive a personalized itinerary on WhatsApp.
          </p>
        </div>

        {/* Planner Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Options Controls */}
            <div className="lg:col-span-8 space-y-8">
              {/* 1. Destinations selector + Custom Places Input */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-green" />
                    <span>1. Choose Kerala Destinations</span>
                  </label>
                  <span className="text-xs text-brand-green font-semibold">
                    {allSelectedCount} place{allSelectedCount === 1 ? '' : 's'} included
                  </span>
                </div>

                {/* Major Kerala Destination Badges */}
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

                {/* Space to Add Custom Places / Offbeat Stops */}
                <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">
                      Add More Places or Offbeat Stops:
                    </label>
                    <span className="text-[11px] text-slate-400">e.g. Kumarakom, Jatayu Rock, Marari, Bekal</span>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newPlaceInput}
                      onChange={(e) => setNewPlaceInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddPlace();
                        }
                      }}
                      placeholder="Type a town, beach, or attraction..."
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                    />
                    <button
                      type="button"
                      onClick={handleAddPlace}
                      className="px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5 text-brand-green-soft" />
                      <span>Add Place</span>
                    </button>
                  </div>

                  {customPlaces.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1.5">
                      {customPlaces.map((place) => (
                        <span
                          key={place}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-950 border border-emerald-200 text-xs font-semibold shadow-2xs"
                        >
                          <span>{place}</span>
                          <button
                            type="button"
                            onClick={() => handleRemovePlace(place)}
                            className="text-emerald-700 hover:text-rose-600 font-bold ml-0.5 p-0.5 rounded-full hover:bg-emerald-100 transition-colors cursor-pointer"
                            aria-label={`Remove ${place}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
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

              {/* 5. Required Guest Information */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-brand-green" />
                    <span>5. Your Contact Information (Required for Itinerary)</span>
                  </label>
                  <span className="text-[11px] text-slate-400 font-medium">Direct WhatsApp Quote</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={guestName}
                        onChange={(e) => {
                          setGuestName(e.target.value);
                          if (validationError) setValidationError(null);
                        }}
                        className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                          validationError && !guestName.trim()
                            ? 'border-rose-400 bg-rose-50/40 focus:ring-rose-400'
                            : 'border-slate-200 bg-white focus:border-brand-green focus:ring-brand-green'
                        }`}
                      />
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone / WhatsApp Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={guestPhone}
                        onChange={(e) => {
                          setGuestPhone(e.target.value);
                          if (validationError) setValidationError(null);
                        }}
                        className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                          validationError && !guestPhone.trim()
                            ? 'border-rose-400 bg-rose-50/40 focus:ring-rose-400'
                            : 'border-slate-200 bg-white focus:border-brand-green focus:ring-brand-green'
                        }`}
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Travel Month / Dates (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. October 2025 / Diwali week"
                        value={travelMonth}
                        onChange={(e) => setTravelMonth(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:border-brand-green focus:ring-brand-green"
                      />
                      <CalendarDays className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Special Requests / Airport Pickup (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Cochin Airport pickup, veg food"
                        value={specialNote}
                        onChange={(e) => setSpecialNote(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:border-brand-green focus:ring-brand-green"
                      />
                      <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {validationError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}
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
                  {guestName.trim() && (
                    <div className="flex justify-between py-1 border-b border-slate-200/60 pb-1.5">
                      <span className="text-slate-500">Guest:</span>
                      <span className="font-bold text-slate-900 truncate max-w-[170px]">{guestName.trim()}</span>
                    </div>
                  )}
                  {guestPhone.trim() && (
                    <div className="flex justify-between py-1 border-b border-slate-200/60 pb-1.5">
                      <span className="text-slate-500">Phone:</span>
                      <span className="font-bold text-slate-900">{guestPhone.trim()}</span>
                    </div>
                  )}
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
                    <span className="font-bold text-slate-900 text-right max-w-[180px] truncate" title={[...selectedDests, ...customPlaces].join(', ')}>
                      {[...selectedDests, ...customPlaces].length > 0
                        ? [...selectedDests, ...customPlaces].join(', ')
                        : 'Popular Highlights'}
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
                    Daily Breakfast • Private Cab & Chauffeur • Tolls & Parking • 16/7 WhatsApp Coordination
                  </p>
                </div>
              </div>

              {/* Single, Perfectly Fitted Action Button */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-lg shadow-[#25D366]/25 hover:scale-[1.01] transition-all cursor-pointer whitespace-nowrap"
                >
                  <WhatsAppIcon variant="white" className="w-5 h-5 fill-white shrink-0" />
                  <span className="truncate">Get WhatsApp Quote</span>
                </button>

                <p className="text-[11px] text-center text-slate-500">
                  No payment required. Custom itinerary quote sent to your WhatsApp in minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
