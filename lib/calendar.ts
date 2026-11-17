const pad = (n: number) => String(n).padStart(2, "0");

/** Data/hora "flutuante" (sem fuso): o app de agenda usa o fuso do aparelho. */
const icsDate = (d: Date) =>
  `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

const escape = (s: string) => s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");

export function buildIcs(opts: { title: string; start: Date; durationMin: number; location: string; description: string }) {
  const end = new Date(opts.start.getTime() + opts.durationMin * 60_000);
  const stamp = new Date();
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Navalha Urbana//Agendamento//PT-BR",
    "BEGIN:VEVENT",
    `UID:${stamp.getTime()}@navalhaurbana`,
    `DTSTAMP:${icsDate(stamp)}`,
    `DTSTART:${icsDate(opts.start)}`,
    `DTEND:${icsDate(end)}`,
    `SUMMARY:${escape(opts.title)}`,
    `LOCATION:${escape(opts.location)}`,
    `DESCRIPTION:${escape(opts.description)}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Lembrete do seu horário",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
