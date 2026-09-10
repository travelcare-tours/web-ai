import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStats } from './components/TrustStats';
import { HighlightsCarousel } from './components/HighlightsCarousel';
import { PackagesSection } from './components/PackagesSection';
import { FeatureStory } from './components/FeatureStory';
import { DestinationsGrid } from './components/DestinationsGrid';
import { TripCalculator } from './components/TripCalculator';
import { WhyUs } from './components/WhyUs';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { CtaBanner } from './components/CtaBanner';
import { EnquiryForm } from './components/EnquiryForm';
import { Footer } from './components/Footer';
import { ItineraryModal } from './components/ItineraryModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { TourPackage } from './types';

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState<string>('Not decided yet');
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([
    'Munnar',
    'Thekkady',
    'Alleppey',
  ]);
  const [activeModalPackage, setActiveModalPackage] = useState<TourPackage | null>(null);
  const [customPlanData, setCustomPlanData] = useState<{
    nights: number;
    adults: number;
    children: number;
    destinations: string[];
    hotelTier: string;
    vehicle: string;
    houseboat: boolean;
  } | null>(null);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleDestination = (destName: string) => {
    setSelectedDestinations((prev) => {
      if (prev.includes(destName)) {
        return prev.filter((d) => d !== destName);
      } else {
        return [...prev, destName];
      }
    });
  };

  const handleSelectDestination = (destName: string) => {
    if (!selectedDestinations.includes(destName)) {
      setSelectedDestinations((prev) => [...prev, destName]);
    }
    scrollToSection('enquiry');
  };

  const handleSelectPackageForEnquiry = (pkgTitle: string) => {
    setSelectedPackage(pkgTitle);
    scrollToSection('enquiry');
  };

  const handleCustomTripPlan = (data: {
    nights: number;
    adults: number;
    children: number;
    destinations: string[];
    hotelTier: string;
    vehicle: string;
    houseboat: boolean;
  }) => {
    setCustomPlanData(data);
    setSelectedPackage('Fully Customized Kerala Tour');
    if (data.destinations.length > 0) {
      setSelectedDestinations(data.destinations);
    }
    scrollToSection('enquiry');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Header */}
      <Header onPlanTripClick={() => scrollToSection('trip-planner')} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 1. Hero */}
        <Hero
          onPlanTripClick={() => scrollToSection('trip-planner')}
          onExplorePackagesClick={() => scrollToSection('packages')}
        />

        {/* 2. Quick Assurance Stats */}
        <TrustStats />

        {/* 3. Destination Carousel */}
        <HighlightsCarousel onSelectDestination={handleSelectDestination} />

        {/* 4. Tour Packages Grid with Filters */}
        <PackagesSection
          onViewItinerary={(pkg) => setActiveModalPackage(pkg)}
          onSelectPackageForEnquiry={handleSelectPackageForEnquiry}
          onCustomTripClick={() => scrollToSection('trip-planner')}
        />

        {/* 5. The Kerala Experience Story Band */}
        <FeatureStory />

        {/* 6. All 8 Kerala Destinations Showcase */}
        <DestinationsGrid
          onSelectDestination={handleSelectDestination}
          selectedDestinations={selectedDestinations}
        />

        {/* 7. Interactive Instant Trip Planner & WhatsApp Quote */}
        <TripCalculator
          selectedDests={selectedDestinations}
          onToggleDest={handleToggleDestination}
          onSendToEnquiry={handleCustomTripPlan}
        />

        {/* 8. Why Choose Travel Care Tours */}
        <WhyUs />

        {/* 9. Traveler Reviews & Testimonials */}
        <Testimonials />

        {/* 10. Frequently Asked Questions */}
        <FaqSection />

        {/* 11. Ready to Travel CTA */}
        <CtaBanner onPlanTripClick={() => scrollToSection('enquiry')} />

        {/* 12. Complete Enquiry & WhatsApp Booking Form */}
        <EnquiryForm
          selectedPackage={selectedPackage}
          selectedDestinations={selectedDestinations}
          customPlanData={customPlanData}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Day-by-Day Itinerary Modal */}
      <ItineraryModal
        pkg={activeModalPackage}
        onClose={() => setActiveModalPackage(null)}
        onBookNow={handleSelectPackageForEnquiry}
      />

      {/* Floating WhatsApp Quick Connect Button */}
      <FloatingWhatsApp />
    </div>
  );
}
