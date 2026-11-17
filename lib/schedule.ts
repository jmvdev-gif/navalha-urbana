/**
 * Agenda simulada. Num projeto real estes dados viriam de um banco ou de uma
 * agenda (Google Agenda, por exemplo). Aqui os horários ocupados são gerados de
 * forma determinística a partir do barbeiro + dia + horário, para a agenda
 * parecer real e não mudar a cada recarga da página.
 */
import { BARBERS, OPENING_HOURS, type Barber, type Service } from "./data";
import { isSameDay } from "./format";

export const SLOT_STEP = 30;
/** Antecedência mínima para marcar no mesmo dia (minutos). */
const MIN_NOTICE = 30;
/** Fração aproximada da agenda já ocupada. */
const BUSY_RATE = 0.3;

export const ANY_BARBER = "any";

export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const dateKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function fromDateKey(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function upcomingDays(count: number, now: Date) {
  const start = startOfDay(now);
  return Array.from({ length: count }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
}

export const hoursFor = (d: Date) => OPENING_HOURS[d.getDay()];

export const worksOn = (barber: Barber, d: Date) => barber.workDays.includes(d.getDay());

/** Hash FNV-1a -> número entre 0 e 1. */
function hash01(input: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0) / 4294967296;
}

const isBlockBusy = (barberId: string, key: string, minute: number) => hash01(`${barberId}|${key}|${minute}`) < BUSY_RATE;

export interface Slot {
  /** Minutos desde 00:00 */
  time: number;
  /** Barbeiros livres neste horário */
  barberIds: string[];
}

export function availableSlots(day: Date, service: Service, barberId: string, now: Date): Slot[] {
  const hours = hoursFor(day);
  if (!hours) return [];
  const key = dateKey(day);
  const blocks = Math.ceil(service.durationMin / SLOT_STEP);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const today = isSameDay(day, now);
  if (startOfDay(day) < startOfDay(now)) return [];

  const candidates = BARBERS.filter(
    (b) => (barberId === ANY_BARBER || b.id === barberId) && worksOn(b, day),
  );

  const slots: Slot[] = [];
  for (let t = hours.open; t + service.durationMin <= hours.close; t += SLOT_STEP) {
    if (today && t < nowMinutes + MIN_NOTICE) continue;
    const free = candidates.filter((b) =>
      Array.from({ length: blocks }, (_, k) => t + k * SLOT_STEP).every((m) => !isBlockBusy(b.id, key, m)),
    );
    if (free.length) slots.push({ time: t, barberIds: free.map((b) => b.id) });
  }
  return slots;
}

export function nextAvailable(service: Service, barberId: string, now: Date, horizonDays = 14) {
  for (const day of upcomingDays(horizonDays, now)) {
    const slots = availableSlots(day, service, barberId, now);
    if (slots.length) return { day, slot: slots[0] };
  }
  return null;
}
