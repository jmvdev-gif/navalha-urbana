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
      <p className="relative z-[60] bg-poste px-4 py-1.5 text-center text-[11px] font-medium text-white sm:text-xs">
        <span className="sm:hidden">Projeto conceito · dados fictícios</span>
        <span className="hidden sm:inline">Projeto conceito · barbearia fictícia — endereço e contatos não são reais</span>
      </p>
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
