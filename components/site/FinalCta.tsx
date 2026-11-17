import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BookingButton } from "@/components/booking/BookingProvider";
import { PHOTOS } from "@/lib/data";
import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink text-bone">
      <div className="absolute inset-0 lg:left-1/2">
        <Image src={PHOTOS.chair} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-60 lg:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent lg:via-ink/20" aria-hidden />
      </div>
      <div className="container-site relative py-24 sm:py-32">
        <Reveal className="max-w-xl">
          <h2 className="display text-[clamp(3.5rem,9vw,7rem)]">
            Sua cadeira
            <br />
            <span className="accent text-[0.9em] text-poste">já está esperando.</span>
          </h2>
          <p className="mt-6 text-lg text-bone/75">Leva menos de um minuto. Sem cadastro, sem senha, sem pagamento antecipado.</p>
          <BookingButton className="btn-primary mt-8 px-8 py-4 text-base">
            Agendar horário <ArrowRight className="h-4 w-4" aria-hidden />
          </BookingButton>
        </Reveal>
      </div>
    </section>
  );
}
