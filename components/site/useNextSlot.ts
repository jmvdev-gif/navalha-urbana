"use client";

import { useEffect, useState } from "react";
import { SERVICES } from "@/lib/data";
import { formatTime, relativeDay } from "@/lib/format";
import { ANY_BARBER, nextAvailable } from "@/lib/schedule";

/**
 * Próximo horário livre para um corte, com qualquer barbeiro.
 * Calculado só no navegador (depende da hora atual), por isso começa vazio.
 */
export function useNextSlot() {
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const next = nextAvailable(SERVICES[0], ANY_BARBER, now);
      setLabel(next ? `${relativeDay(next.day, now)}, ${formatTime(next.slot.time)}` : null);
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);
  return label;
}
