import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PackagesSection } from './components/PackagesSection';
import { DestinationsGrid } from './components/DestinationsGrid';
import { ServicesSection } from './components/ServicesSection';
import { TripCalculator } from './components/TripCalculator';
import { WhyUs } from './components/WhyUs';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ItineraryModal } from './components/ItineraryModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileActionDock } from './components/MobileActionDock';
import { TourPackage } from './types';

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState<string>('Not decided yet');
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([
    'Munnar',
    'Thekkady',
    'Alleppey',
  ]);
  const [activeModalPackage, setActiveModalPackage] = useState<TourPackage | null>(null);

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
    scrollToSection('trip-planner');
  };

  const handleSelectPackageForEnquiry = (pkgTitle: string) => {
    setSelectedPackage(pkgTitle);
    scrollToSection('trip-planner');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 selection:bg-emerald-100 selection:text-emerald-900 pb-16 sm:pb-0">
      {/* Top Header */}
      <Header onPlanTripClick={() => scrollToSection('trip-planner')} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 1. Hero with Scenic Kerala Background Slideshow */}
        <Hero
          onPlanTripClick={() => scrollToSection('trip-planner')}
          onExplorePackagesClick={() => scrollToSection('packages')}
        />

        {/* 2. Tour Packages Grid with Filters */}
        <PackagesSection
          onViewItinerary={(pkg) => setActiveModalPackage(pkg)}
          onSelectPackageForEnquiry={handleSelectPackageForEnquiry}
          onCustomTripClick={() => scrollToSection('trip-planner')}
        />

        {/* 3. All Kerala Destinations Showcase */}
        <DestinationsGrid
          onSelectDestination={handleSelectDestination}
          selectedDestinations={selectedDestinations}
        />

        {/* 4. Standalone Services: Cab Services, Hotel & Houseboat Booking */}
        <ServicesSection onPlanTripClick={() => scrollToSection('trip-planner')} />

        {/* 5. Interactive Instant Trip Planner & WhatsApp Quote */}
        <TripCalculator
          selectedDests={selectedDestinations}
          onToggleDest={handleToggleDestination}
          selectedPackageTitle={selectedPackage}
        />

        {/* 5. Why Choose Travel Care Tours */}
        <WhyUs />

        {/* 6. Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Minimalist Brand Footer */}
      <Footer />

      {/* Day-by-Day Itinerary Modal */}
      <ItineraryModal
        pkg={activeModalPackage}
        onClose={() => setActiveModalPackage(null)}
        onBookNow={handleSelectPackageForEnquiry}
      />

      {/* Floating WhatsApp Quick Connect Button for Tablets & Desktop */}
      <FloatingWhatsApp />

      {/* Mobile Sticky Action Dock (Call, Plan Trip, WhatsApp) */}
      <MobileActionDock onPlanTripClick={() => scrollToSection('trip-planner')} />
    </div>
  );
}
