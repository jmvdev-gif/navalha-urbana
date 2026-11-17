export const WEEKDAYS = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
];
export const WEEKDAYS_SHORT = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
export const MONTHS_SHORT = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

const pad = (n: number) => String(n).padStart(2, "0");

export const formatPrice = (value: number) => `R$ ${value}`;

export function formatDuration(min: number) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h}h ${m}min` : `${h}h`;
}

/** 570 -> "09:30" */
export const formatTime = (minutes: number) => `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;

/** "quinta-feira, 20/11" */
export const formatDateLong = (d: Date) => `${WEEKDAYS[d.getDay()]}, ${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;

/** "20/11" */
export const formatDateShort = (d: Date) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;

export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/** "hoje", "amanhã" ou "qui, 20/11" */
export function relativeDay(d: Date, now: Date) {
  if (isSameDay(d, now)) return "hoje";
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  if (isSameDay(d, tomorrow)) return "amanhã";
  return `${WEEKDAYS_SHORT[d.getDay()]}, ${formatDateShort(d)}`;
}

/** [2,3,4,5,6] -> "Ter a sáb"; [2,4,5,6] -> "Ter, qui, sex e sáb" */
export function workDaysLabel(days: number[]) {
  const sorted = [...days].sort((a, b) => a - b);
  const consecutive = sorted.every((d, i) => i === 0 || d === sorted[i - 1] + 1);
  const names = sorted.map((d) => WEEKDAYS_SHORT[d]);
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  if (sorted.length > 2 && consecutive) return `${cap(names[0])} a ${names[names.length - 1]}`;
  if (names.length === 1) return cap(names[0]);
  return cap(`${names.slice(0, -1).join(", ")} e ${names[names.length - 1]}`);
}

/** Máscara de telefone brasileiro: (11) 98888-7777 */
export function maskPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
