"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { GALLERY } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/** Tamanho de cada foto na grade (desktop: 4 colunas × 3 linhas, sem buracos). */
const SPANS = ["md:col-span-2 md:row-span-2", "", "", "", "", "md:col-span-2", "", ""];

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(() => setIndex((i) => (i === null ? i : (i - 1 + GALLERY.length) % GALLERY.length)), []);
  const next = useCallback(() => setIndex((i) => (i === null ? i : (i + 1) % GALLERY.length)), []);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, prev, next]);

  const current = index !== null ? GALLERY[index] : null;

  return (
    <section id="trabalhos" className="bg-bone py-20 sm:py-28">
      <div className="container-site">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-poste-dark">Trabalhos</p>
            <h2 className="display mt-4 text-[clamp(3rem,7vw,5.5rem)]">
              Saiu daqui
              <br />
              <span className="accent text-[0.9em]">desse jeito.</span>
            </h2>
          </div>
          <p className="max-w-sm leading-relaxed text-stone">
            Alguns cortes e barbas da semana. Toque em uma foto para ver maior.
          </p>
        </Reveal>

        <ul className="mt-12 grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:grid-cols-4 md:gap-4">
          {GALLERY.map((item, i) => (
            <li key={item.id} className={cn("relative", SPANS[i])}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group absolute inset-0 overflow-hidden rounded-2xl bg-ink-800 sm:rounded-3xl"
                aria-label={`Ver foto: ${item.title}`}
              >
                <Image
                  src={item.photo}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-90 transition group-hover:opacity-100" />
                <span className="absolute bottom-3 left-3 right-3 text-left text-bone sm:bottom-4 sm:left-4">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-bone/70">{item.detail}</span>
                  <span className="block text-sm font-semibold sm:text-base">{item.title}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-stone">Fotos ilustrativas: Unsplash.</p>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            className="fixed inset-0 z-[90] flex flex-col bg-ink/95 p-4 backdrop-blur sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <div className="flex items-center justify-between text-bone">
              <p className="text-sm">
                <span className="font-semibold">{current.title}</span>
                <span className="ml-3 text-bone/50">
                  {index! + 1} / {GALLERY.length}
                </span>
              </p>
              <button
                type="button"
                onClick={close}
                className="rounded-full p-2 hover:bg-white/10"
                aria-label="Fechar"
              >
                <X className="h-6 w-6" aria-hidden />
              </button>
            </div>
            <div className="relative mt-4 flex-1" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image src={current.photo} alt={current.title} fill sizes="100vw" className="object-contain" />
                </motion.div>
              </AnimatePresence>
              <button
                type="button"
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-ink/70 p-3 text-bone hover:bg-ink"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-ink/70 p-3 text-bone hover:bg-ink"
                aria-label="Próxima foto"
              >
                <ChevronRight className="h-6 w-6" aria-hidden />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
