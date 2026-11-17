import Image from "next/image";
import { AtSign, Coffee, MapPin, MessageCircle, Wifi, Baby } from "lucide-react";
import { BUSINESS, PHOTOS } from "@/lib/data";
import { OpenStatus } from "./OpenStatus";
import { Reveal } from "./Reveal";

const PERKS = [
  { icon: Coffee, label: "Café por conta da casa" },
  { icon: Wifi, label: "Wi-Fi liberado" },
  { icon: Baby, label: "Corte infantil" },
];

export function Visit() {
  return (
    <section id="visite" className="bg-paper py-20 sm:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[560px]">
            <Image
              src={PHOTOS.interior}
              alt="Interior da barbearia com cadeiras de couro e parede de tijolos"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <MapCard />
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col">
          <p className="eyebrow text-poste-dark">Visite</p>
          <h2 className="display mt-4 text-[clamp(3rem,7vw,5.5rem)]">
            Passa
            <span className="accent text-[0.9em]"> aqui.</span>
          </h2>

          <address className="mt-6 not-italic">
            <p className="flex items-start gap-3 text-lg font-semibold">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-poste" aria-hidden />
              <span>
                {BUSINESS.street}
                <span className="block text-base font-normal text-stone">
                  {BUSINESS.district}, {BUSINESS.city} · a 5 min do metrô
                </span>
              </span>
            </p>
          </address>

          <div className="mt-8">
            <OpenStatus />
          </div>

          <ul className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
            <li className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-poste" aria-hidden />
              <span>
                <span className="block font-semibold">WhatsApp</span>
                <span className="text-stone">{BUSINESS.whatsappDisplay}</span>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <AtSign className="h-5 w-5 text-poste" aria-hidden />
              <span>
                <span className="block font-semibold">Instagram</span>
                <span className="text-stone">{BUSINESS.instagram}</span>
              </span>
            </li>
          </ul>

          <ul className="mt-8 flex flex-wrap gap-2">
            {PERKS.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2 rounded-full border border-sand px-3.5 py-2 text-sm">
                <Icon className="h-4 w-4 text-stone" aria-hidden /> {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/** Mapa ilustrativo (endereço fictício, por isso não usamos um mapa real). */
function MapCard() {
  return (
    <figure className="absolute -bottom-8 right-4 w-[min(260px,70%)] overflow-hidden rounded-2xl border border-sand bg-bone shadow-xl sm:right-6">
      <svg viewBox="0 0 260 150" className="block h-auto w-full" aria-hidden>
        <rect width="260" height="150" fill="#EDE6DA" />
        <rect x="150" y="12" width="70" height="46" rx="6" fill="#D5DDC4" />
        <g stroke="#FAF7F2" strokeLinecap="round">
          <path d="M-10 110 L280 70" strokeWidth="14" />
          <path d="M60 -10 L110 170" strokeWidth="10" />
          <path d="M180 -10 L200 170" strokeWidth="8" />
          <path d="M-10 40 L280 20" strokeWidth="6" />
          <path d="M-10 140 L130 170" strokeWidth="6" />
        </g>
        <g transform="translate(118 64)">
          <circle r="16" fill="#D23A2C" opacity="0.18" />
          <path d="M0 6 C-7 -2 -9 -6 -9 -10 A9 9 0 0 1 9 -10 C9 -6 7 -2 0 6 Z" fill="#D23A2C" />
          <circle cy="-10" r="3.2" fill="#FAF7F2" />
        </g>
      </svg>
      <figcaption className="flex items-center justify-between px-3.5 py-2.5 text-xs">
        <span className="font-semibold">Navalha Urbana</span>
        <span className="text-stone">mapa ilustrativo</span>
      </figcaption>
    </figure>
  );
}
