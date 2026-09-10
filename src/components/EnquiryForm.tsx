import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, Mail, MapPin, Send, CheckCircle2, Copy, Sparkles } from 'lucide-react';
import { COMPANY_DETAILS, TOUR_PACKAGES } from '../data/travelData';

interface EnquiryFormProps {
  selectedPackage?: string;
  selectedDestinations?: string[];
  customPlanData?: {
    nights: number;
    adults: number;
    children: number;
    destinations: string[];
    hotelTier: string;
    vehicle: string;
    houseboat: boolean;
  } | null;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  selectedPackage = 'Not decided yet',
  selectedDestinations = [],
  customPlanData = null,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    nights: '5',
    adults: '2',
    children: '0',
    package: selectedPackage,
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Synchronize when package or destination or custom plan updates
  useEffect(() => {
    if (selectedPackage && selectedPackage !== 'Not decided yet') {
      setFormData((prev) => ({ ...prev, package: selectedPackage }));
    }
  }, [selectedPackage]);

  useEffect(() => {
    if (selectedDestinations.length > 0) {
      setFormData((prev) => {
        const destStr = selectedDestinations.join(', ');
        const existing = prev.message.trim();
        if (existing.includes(destStr)) return prev;
        const updatedMsg = existing ? `${existing}\nDestinations: ${destStr}` : `Destinations: ${destStr}`;
        return { ...prev, message: updatedMsg };
      });
    }
  }, [selectedDestinations]);

  useEffect(() => {
    if (customPlanData) {
      setFormData((prev) => ({
        ...prev,
        nights: customPlanData.nights.toString(),
        adults: customPlanData.adults.toString(),
        children: customPlanData.children.toString(),
        message: `Custom Plan Details:\n- Destinations: ${customPlanData.destinations.join(', ') || 'Popular Kerala Spots'}\n- Hotel Category: ${customPlanData.hotelTier}\n- Vehicle: ${customPlanData.vehicle}${customPlanData.houseboat ? '\n- Includes Alleppey Houseboat Stay' : ''}`,
      }));
    }
  }, [customPlanData]);

  const generateWhatsAppMessage = () => {
    return [
      "Hello Travel Care Tours! I would like a Kerala tour quote.",
      "",
      `Name: ${formData.name || "-"}`,
      `WhatsApp / Phone: ${formData.phone || "-"}`,
      formData.email ? `Email: ${formData.email}` : "",
      `Arrival Date: ${formData.date || "-"}`,
      `Nights: ${formData.nights || "-"} Nights`,
      `Adults: ${formData.adults || "2"}`,
      `Children: ${formData.children || "0"}`,
      `Package: ${formData.package || "Not decided yet"}`,
      `Destinations / Requirements: ${formData.message || "Customized Kerala tour proposal"}`,
    ]
      .filter(Boolean)
      .join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = generateWhatsAppMessage();
    const url = `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateWhatsAppMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="enquiry" className="py-20 md:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact info & reassurance */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-extrabold tracking-widest text-brand-green uppercase">
                PLAN YOUR TRIP
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-brand-navy mt-1">
                Request your free quote
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
                Share a few details and your enquiry will be prepared as a WhatsApp message. No upfront payment is required to get your customized itinerary.
              </p>
            </div>

            {/* Contact Box */}
            <div className="bg-slate-50 border-l-4 border-brand-green p-6 rounded-2xl border-y border-r border-slate-200/80 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-brand-green">
                  <MessageCircle className="w-5 h-5 fill-brand-green" />
                </div>
                <div>
                  <strong className="block text-xs font-bold uppercase text-slate-500 tracking-wider">
                    WhatsApp (Direct & Fast)
                  </strong>
                  <a
                    href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-brand-navy hover:text-brand-green transition-colors"
                  >
                    {COMPANY_DETAILS.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-brand-navy">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-xs font-bold uppercase text-slate-500 tracking-wider">
                    Email Inquiries
                  </strong>
                  <a
                    href={`mailto:${COMPANY_DETAILS.email}`}
                    className="text-sm font-semibold text-brand-navy hover:text-brand-green transition-colors"
                  >
                    {COMPANY_DETAILS.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center shrink-0 text-slate-700">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-xs font-bold uppercase text-slate-500 tracking-wider">
                    Service Areas
                  </strong>
                  <span className="text-sm font-medium text-slate-700">
                    Kerala • South India • Houseboats • Chauffeur Cabs
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-900 space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-brand-green">
                <Sparkles className="w-4 h-4" />
                <span>Our Booking Promise</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                ✓ Free revisions until you are 100% happy with your plan <br />
                ✓ Direct WhatsApp updates with zero agent markups <br />
                ✓ Experienced local drivers with clean, air-conditioned cars
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg">
              {submitted ? (
                <div className="text-center py-8 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-brand-green flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-brand-navy">
                    Enquiry Prepared!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    WhatsApp has opened with your inquiry. If it didn't open automatically, you can copy your message or click the button below:
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const msg = generateWhatsAppMessage();
                        const url = `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(msg)}`;
                        window.open(url, '_blank');
                      }}
                      className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-bold text-white bg-brand-green hover:bg-brand-green-hover shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Open WhatsApp Chat</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopy}
                      className="w-full sm:w-auto px-5 py-3 rounded-full text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                      <span>{copied ? 'Copied to Clipboard!' : 'Copy Message'}</span>
                    </button>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-bold text-slate-500 hover:text-brand-navy underline cursor-pointer"
                    >
                      ← Submit another request or edit details
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full p-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-hidden focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        WhatsApp / Phone *
                      </label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full p-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-hidden focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Expected Arrival Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-hidden focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Number of Nights
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        name="nights"
                        value={formData.nights}
                        onChange={(e) => setFormData({ ...formData, nights: e.target.value })}
                        placeholder="e.g. 5"
                        className="w-full p-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-hidden focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Adults (12+ yrs)
                      </label>
                      <input
                        type="number"
                        min="1"
                        name="adults"
                        value={formData.adults}
                        onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-hidden focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Children (&lt;12 yrs)
                      </label>
                      <input
                        type="number"
                        min="0"
                        name="children"
                        value={formData.children}
                        onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-hidden focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full p-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-hidden focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Interested Tour Package
                    </label>
                    <select
                      name="package"
                      value={formData.package}
                      onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-hidden focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                    >
                      <option value="Not decided yet">Not decided yet / Need Recommendation</option>
                      {TOUR_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.title}>
                          {pkg.title} ({pkg.duration})
                        </option>
                      ))}
                      <option value="Fully Customized Kerala Tour">Fully Customized Kerala Tour</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Destinations / Special Requirements
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Example: Munnar, Thekkady, Alleppey houseboat stay. 4-star hotels. Private Toyota Innova."
                      className="w-full p-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-hidden focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full text-base font-bold text-white bg-brand-green hover:bg-brand-green-hover shadow-lg shadow-brand-green/25 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>Send Enquiry on WhatsApp →</span>
                  </button>

                  <p className="text-[11px] text-center text-slate-500 pt-1">
                    Your phone's WhatsApp application or WhatsApp Web will launch with your enquiry ready to send.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
