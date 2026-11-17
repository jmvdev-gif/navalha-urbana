import { BUSINESS, type Service } from "./data";
import { formatDateLong, formatDuration, formatPrice, formatTime } from "./format";

export interface BookingSummary {
  service: Service;
  barberName: string;
  /** true quando o cliente escolheu "sem preferência" */
  barberAssigned: boolean;
  day: Date;
  time: number;
  name: string;
  phone: string;
  notes: string;
}

export function buildBookingMessage(b: BookingSummary) {
  const lines = [
    `Olá, ${BUSINESS.name}! Quero agendar um horário:`,
    "",
    `*Serviço:* ${b.service.name} · ${formatDuration(b.service.durationMin)}`,
    `*Profissional:* ${b.barberName}${b.barberAssigned ? " (primeiro disponível)" : ""}`,
    `*Data:* ${formatDateLong(b.day)}`,
    `*Horário:* ${formatTime(b.time)}`,
    `*Valor:* ${formatPrice(b.service.price)} (pago no local)`,
    "",
    `*Nome:* ${b.name.trim()}`,
    `*WhatsApp:* ${b.phone}`,
  ];
  if (b.notes.trim()) lines.push(`*Observação:* ${b.notes.trim()}`);
  lines.push("", "Agendamento feito pelo site.");
  return lines.join("\n");
}

export const whatsappUrl = (text: string) =>
  `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(text)}`;
