import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import { BookingButton } from "@/components/booking/BookingProvider";
import { BUSINESS, CATEGORIES, PHOTOS, SERVICES } from "@/lib/data";
import { formatDuration, formatPrice } from "@/lib/format";
import { Reveal } from "./Reveal";

export function Services() {
  return (
    <section id="servicos" className="bg-paper py-20 sm:py-28">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Coluna da esquerda: título + foto (fixa no desktop) */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <p className="eyebrow text-poste-dark">Serviços e preços</p>
              <h2 className="display mt-4 text-[clamp(3rem,7vw,5.5rem)]">
                Preço na tela,
                <br />
                <span className="accent text-[0.9em]">sem surpresa.</span>
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-stone">
                Toque em qualquer serviço para agendar. Tudo é pago no local, depois do atendimento — {BUSINESS.payment}.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 hidden lg:block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src={PHOTOS.tools}
                  alt="Máquinas, tesoura e pente sobre a bancada"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Cardápio */}
          <div className="space-y-12">
            {CATEGORIES.map((cat) => (
              <Reveal key={cat.id}>
                <h3 className="flex items-baseline justify-between border-b-2 border-ink pb-2">
                  <span className="display text-3xl sm:text-4xl">{cat.label}</span>
                  <span className="text-xs font-medium uppercase tracking-wider text-stone">
                    {SERVICES.filter((s) => s.category === cat.id).length} opções
                  </span>
                </h3>
                <ul className="divide-y divide-sand">
                  {SERVICES.filter((s) => s.category === cat.id).map((s) => (
                    <li key={s.id}>
                      <BookingButton
                        serviceId={s.id}
                        ariaLabel={`Agendar ${s.name}, ${formatPrice(s.price)}`}
                        className="group grid w-full grid-cols-[1fr_auto] items-start gap-x-6 gap-y-1 py-5 text-left transition-colors hover:bg-bone/60 sm:px-3"
                      >
                        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="text-lg font-semibold">{s.name}</span>
                          {s.highlight && (
                            <span className="rounded-full bg-poste px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                              {s.highlight}
                            </span>
                          )}
                        </span>
                        <span className="display row-span-2 text-right text-3xl sm:text-4xl">{formatPrice(s.price)}</span>
                        <span className="text-sm leading-relaxed text-stone">{s.description}</span>
                        <span className="col-span-2 mt-2 flex items-center justify-between text-xs font-medium text-stone">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" aria-hidden /> {formatDuration(s.durationMin)}
                          </span>
                          <span className="inline-flex items-center gap-1 font-semibold text-poste-dark opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                            Agendar <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                          </span>
                        </span>
                      </BookingButton>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
