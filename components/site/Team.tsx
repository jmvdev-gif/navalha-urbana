import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BookingButton } from "@/components/booking/BookingProvider";
import { BARBERS } from "@/lib/data";
import { workDaysLabel } from "@/lib/format";
import { Reveal } from "./Reveal";

export function Team() {
  return (
    <section id="equipe" className="bg-ink py-20 text-bone sm:py-28">
      <div className="container-site">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-poste">A equipe</p>
            <h2 className="display mt-4 text-[clamp(3rem,7vw,5.5rem)]">
              Quatro cadeiras,
              <br />
              <span className="accent text-[0.9em]">quatro estilos.</span>
            </h2>
          </div>
          <p className="max-w-sm leading-relaxed text-bone/65">
            Cada barbeiro tem a sua especialidade. Escolha um ou deixe que a gente encaixe você no primeiro horário livre.
          </p>
        </Reveal>

        {/* No celular vira um carrossel com rolagem lateral */}
        <ul className="no-scrollbar -mx-4 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {BARBERS.map((b, i) => (
            <li key={b.id} className="group w-[80%] shrink-0 snap-start sm:w-auto">
              <Reveal delay={i * 0.08}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-ink-800">
                  <Image
                    src={b.photo}
                    alt={`${b.name}, barbeiro`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover grayscale-[35%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" aria-hidden />
                  <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium backdrop-blur">
                    {workDaysLabel(b.workDays)}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="display text-4xl">{b.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-poste">{b.specialty}</p>
                  </div>
                </div>
                <p className="mt-4 min-h-[3rem] text-sm leading-relaxed text-bone/65">{b.bio}</p>
                <BookingButton
                  barberId={b.id}
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-bone underline-offset-4 transition hover:text-poste hover:underline"
                >
                  Agendar com {b.firstName} <ArrowRight className="h-4 w-4" aria-hidden />
                </BookingButton>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
