"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { BarbersSection } from "@/components/BarbersSection";
import { GallerySection } from "@/components/GallerySection";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { Footer } from "@/components/Footer";
import { BookingView } from "@/components/booking/BookingView";
import { Service, Barber } from "@/lib/data";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | undefined>();
  const [selectedBarber, setSelectedBarber] = useState<Barber | undefined>();

  const handleOpenBooking = (service?: Service, barber?: Barber) => {
    setSelectedService(service);
    setSelectedBarber(barber);
    setIsBookingOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#0B0B0C]">
      {isBookingOpen ? (
        <BookingView
          initialService={selectedService}
          initialBarber={selectedBarber}
          onClose={handleCloseBooking}
        />
      ) : (
        <>
          <Navbar
            onOpenBooking={() => handleOpenBooking()}
            isBookingOpen={isBookingOpen}
            onCloseBooking={handleCloseBooking}
          />
          <HeroSection onOpenBooking={() => handleOpenBooking()} />
          <ServicesSection />
          <BarbersSection />
          <GallerySection />
          <Footer />
          <StickyMobileCTA
            onOpenBooking={() => handleOpenBooking()}
            isVisible={!isBookingOpen}
          />
        </>
      )}
    </main>
  );
}
