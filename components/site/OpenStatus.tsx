"use client";

import { useEffect, useState } from "react";
import { OPENING_HOURS, OPENING_SUMMARY } from "@/lib/data";
import { formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";

function statusNow(now: Date) {
  const hours = OPENING_HOURS[now.getDay()];
  const minutes = now.getHours() * 60 + now.getMinutes();
  if (hours && minutes >= hours.open && minutes < hours.close) {
    return { open: true, text: `Aberto agora · fecha às ${formatTime(hours.close)}` };
  }
  // procura a próxima abertura
  for (let i = 0; i < 8; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const h = OPENING_HOURS[d.getDay()];
    if (!h) continue;
    if (i === 0 && minutes >= h.open) continue;
    const when = i === 0 ? "hoje" : i === 1 ? "amanhã" : ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"][d.getDay()];
    return { open: false, text: `Fechado agora · abre ${when} às ${formatTime(h.open)}` };
  }
  return { open: false, text: "Fechado agora" };
}

/** Selo "Aberto agora / Fechado" + tabela de horários com o dia de hoje destacado. */
export function OpenStatus() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const status = now ? statusNow(now) : null;
  const today = now?.getDay();

  return (
    <div>
      <p
        className={cn(
          "inline-flex min-h-[2rem] items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold transition-opacity",
          !status && "opacity-0",
          status?.open ? "bg-emerald-100 text-emerald-900" : "bg-bone-dark text-ink",
        )}
        aria-live="polite"
      >
        <span className={cn("h-2 w-2 rounded-full", status?.open ? "bg-emerald-500" : "bg-stone")} aria-hidden />
        {status?.text ?? "Carregando horário"}
      </p>
      <dl className="mt-5 divide-y divide-sand border-y border-sand">
        {OPENING_SUMMARY.map((row) => {
          const isToday = today !== undefined && row.weekdays.includes(today);
          return (
            <div key={row.days} className={cn("flex items-center justify-between py-3.5", isToday && "font-semibold")}>
              <dt className="flex items-center gap-2">
                {row.days}
                {isToday && (
                  <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-bone">
                    Hoje
                  </span>
                )}
              </dt>
              <dd className={cn(row.hours === "Fechado" && "text-stone")}>{row.hours}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
