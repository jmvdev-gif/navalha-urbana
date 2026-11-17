"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Clock, CreditCard, MapPin } from "lucide-react";
import { useRef } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { BUSINESS, PHOTOS } from "@/lib/data";
import { useNextSlot } from "./useNextSlot";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { open } = useBooking();
  const nextSlot = useNextSlot();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.22]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      id="topo"
      className="relative -mt-[4.5rem] flex min-h-[100svh] flex-col overflow-hidden bg-ink text-bone"
    >
      <motion.div className="absolute inset-0" style={{ scale: imageScale, y: imageY }}>
        <Image
          src={PHOTOS.hero}
          alt="Barbeiro finalizando um corte com topete na Navalha Urbana"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_30%]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/10" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" aria-hidden />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-site relative flex flex-1 flex-col justify-end pb-10 pt-32 sm:pb-14 lg:pb-16"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="eyebrow inline-flex items-center gap-2 text-bone/80"
        >
          <span className="h-2 w-2 rounded-full bg-poste" aria-hidden />
          Barbearia em {BUSINESS.district} · SP
        </motion.p>

        <h1 className="mt-5 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="display block text-[clamp(4.25rem,15vw,11rem)]"
          >
            Corte bom,
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease }}
            className="accent -mt-1 block text-[clamp(3rem,9.5vw,7rem)] leading-[0.95] text-bone"
          >
            na hora <span className="text-poste">marcada.</span>
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
        >
          <p className="mt-6 max-w-xl text-base leading-relaxed text-bone/80 sm:text-lg">
            Escolha o serviço, o barbeiro e o horário aqui mesmo. A mensagem chega pronta no nosso WhatsApp — nada de
            ficar esperando resposta para saber se tem vaga.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button type="button" onClick={() => open()} className="btn-primary px-7 py-4 text-base">
              Agendar horário <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
            <a href="#servicos" className="btn-light px-7 py-4 text-base">
              Ver serviços e preços
            </a>
          </div>

          <div className="mt-5 h-6 text-sm text-bone/80" aria-live="polite">
            {nextSlot && (
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => open({ serviceId: "corte" })}
                className="inline-flex items-center gap-2 underline-offset-4 hover:text-bone hover:underline"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Próximo horário livre: <strong className="font-semibold text-bone">{nextSlot}</strong>
              </motion.button>
            )}
          </div>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 hidden grid-cols-3 gap-6 border-t border-white/15 pt-6 text-sm md:grid"
        >
          <HeroFact icon={<Clock className="h-4 w-4" />} title="Ter a sex · 9h às 20h" text="Sábado das 8h às 18h" />
          <HeroFact icon={<MapPin className="h-4 w-4" />} title={BUSINESS.street} text={`${BUSINESS.district}, ${BUSINESS.city}`} />
          <HeroFact icon={<CreditCard className="h-4 w-4" />} title="Pagamento no local" text={BUSINESS.payment} />
        </motion.dl>
      </motion.div>
    </section>
  );
}

function HeroFact({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 text-poste" aria-hidden>
        {icon}
      </span>
      <div>
        <dt className="font-semibold text-bone">{title}</dt>
        <dd className="text-bone/60">{text}</dd>
      </div>
    </div>
  );
}
