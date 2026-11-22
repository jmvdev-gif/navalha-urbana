import { BookingProvider } from "@/components/booking/BookingProvider";
import { Faq } from "@/components/site/Faq";
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";
import { Gallery } from "@/components/site/Gallery";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Marquee } from "@/components/site/Marquee";
import { MobileBookingBar } from "@/components/site/MobileBookingBar";
import { Services } from "@/components/site/Services";
import { Team } from "@/components/site/Team";
import { Visit } from "@/components/site/Visit";

export default function Home() {
  return (
    <BookingProvider>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <HowItWorks />
        <Services />
        <Team />
        <Gallery />
        <Visit />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileBookingBar />
    </BookingProvider>
  );
}
