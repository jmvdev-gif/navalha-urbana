"use client";

import Image from "next/image";
import { CalendarPlus, Check, Clock, MessageCircle, Pencil, RotateCcw, Shuffle } from "lucide-react";
import { BARBERS, BUSINESS, CATEGORIES, SERVICES, type Barber, type Service } from "@/lib/data";
import {
  MONTHS_SHORT,
  WEEKDAYS_SHORT,
  formatDateLong,
  formatDuration,
  formatPrice,
  formatTime,
  relativeDay,
  workDaysLabel,
} from "@/lib/format";
import { ANY_BARBER, type Slot } from "@/lib/schedule";
import { cn } from "@/lib/utils";

function StepTitle({ title, subtitle }: { title: React.ReactNode; subtitle?: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="display text-4xl sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-2 max-w-xl text-sm text-stone sm:text-base">{subtitle}</p>}
    </div>
  );
}

/* ───────────── 1. Serviço ───────────── */

export function StepService({ selectedId, onSelect }: { selectedId?: string; onSelect: (id: string) => void }) {
  return (
    <div>
      <StepTitle
        title={
          <>
            Qual <span className="accent">serviço?</span>
          </>
        }
        subtitle="Preço e duração já aparecem aqui. O pagamento é feito só na barbearia."
      />
      <div className="space-y-7">
        {CATEGORIES.map((cat) => (
          <div key={cat.id}>
            <h3 className="eyebrow mb-3 text-stone">{cat.label}</h3>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {SERVICES.filter((s) => s.category === cat.id).map((s) => {
                const active = s.id === selectedId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onSelect(s.id)}
                    className={cn(
                      "relative flex flex-col rounded-2xl border p-4 text-left transition",
                      active
                        ? "border-poste bg-poste-light/50 ring-1 ring-poste"
                        : "border-sand bg-white/70 hover:border-ink/40 hover:bg-white",
                    )}
                  >
                    {s.highlight && (
                      <span className="absolute -top-2.5 left-4 rounded-full bg-ink px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-bone">
                        {s.highlight}
                      </span>
                    )}
                    <span className="flex items-start justify-between gap-3">
                      <span className="font-semibold leading-snug">{s.name}</span>
                      <span className="font-display text-2xl font-extrabold leading-none">{formatPrice(s.price)}</span>
                    </span>
                    <span className="mt-1 text-sm leading-snug text-stone">{s.description}</span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-stone">
                      <Clock className="h-3.5 w-3.5" aria-hidden /> {formatDuration(s.durationMin)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────── 2. Profissional ───────────── */

export function StepBarber({
  selectedId,
  onSelect,
  nextByBarber,
  now,
}: {
  selectedId?: string;
  onSelect: (id: string) => void;
  nextByBarber: Record<string, { day: Date; slot: Slot } | null>;
  now: Date;
}) {
  const nextLabel = (id: string) => {
    const n = nextByBarber[id];
    return n ? `Próximo horário: ${relativeDay(n.day, now)}, ${formatTime(n.slot.time)}` : "Sem horários nas próximas 2 semanas";
  };

  return (
    <div>
      <StepTitle
        title={
          <>
            Com <span className="accent">quem?</span>
          </>
        }
        subtitle="Escolha um barbeiro ou deixe que a gente encaixe você no primeiro horário livre."
      />
      <div className="grid gap-2.5 sm:grid-cols-2">
        <button
          type="button"
          aria-pressed={selectedId === ANY_BARBER}
          onClick={() => onSelect(ANY_BARBER)}
          className={cn(
            "flex items-center gap-4 rounded-2xl border p-4 text-left transition sm:col-span-2",
            selectedId === ANY_BARBER
              ? "border-poste bg-poste-light/50 ring-1 ring-poste"
              : "border-sand bg-white/70 hover:border-ink/40 hover:bg-white",
          )}
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-ink text-bone">
            <Shuffle className="h-6 w-6" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block font-semibold">Sem preferência</span>
            <span className="block text-sm text-stone">Qualquer barbeiro — mais opções de horário.</span>
            <span className="mt-1 block text-xs font-medium text-poste-dark">{nextLabel(ANY_BARBER)}</span>
          </span>
        </button>

        {BARBERS.map((b: Barber) => {
          const active = b.id === selectedId;
          return (
            <button
              key={b.id}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(b.id)}
              className={cn(
                "flex items-center gap-4 rounded-2xl border p-4 text-left transition",
                active
                  ? "border-poste bg-poste-light/50 ring-1 ring-poste"
                  : "border-sand bg-white/70 hover:border-ink/40 hover:bg-white",
              )}
            >
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-ink">
                <Image src={b.photo} alt="" fill sizes="56px" className="object-cover" />
              </span>
              <span className="min-w-0">
                <span className="block font-semibold">{b.name}</span>
                <span className="block text-sm text-stone">
                  {b.specialty} · {workDaysLabel(b.workDays)}
                </span>
                <span className="mt-1 block text-xs font-medium text-poste-dark">{nextLabel(b.id)}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────── 3. Dia e horário ───────────── */

export interface DayInfo {
  key: string;
  day: Date;
  slots: Slot[];
  status: "fechado" | "folga" | "lotado" | "livre";
}

const PERIODS = [
  { label: "Manhã", from: 0, to: 12 * 60 },
  { label: "Tarde", from: 12 * 60, to: 18 * 60 },
  { label: "Noite", from: 18 * 60, to: 24 * 60 },
];

export function StepDateTime({
  days,
  activeKey,
  selectedTime,
  onSelectDay,
  onSelectTime,
  assignedBarber,
  anyBarber,
  barberFirstName,
  now,
}: {
  days: DayInfo[];
  activeKey?: string;
  selectedTime?: number;
  onSelectDay: (key: string) => void;
  onSelectTime: (slot: Slot) => void;
  assignedBarber?: Barber;
  anyBarber: boolean;
  barberFirstName?: string;
  now: Date;
}) {
  const active = days.find((d) => d.key === activeKey);
  const statusText: Record<DayInfo["status"], string> = {
    fechado: "Fechado",
    folga: "Folga",
    lotado: "Lotado",
    livre: "",
  };

  return (
    <div>
      <StepTitle
        title={
          <>
            Que dia <span className="accent">e hora?</span>
          </>
        }
        subtitle={
          anyBarber
            ? "Mostrando os horários livres de toda a equipe."
            : `Mostrando os horários livres de ${barberFirstName}.`
        }
      />

      <div className="-mx-5 overflow-x-auto px-5 pb-2 no-scrollbar sm:-mx-8 sm:px-8">
        <ul className="flex gap-2" role="listbox" aria-label="Dias disponíveis">
          {days.map((d) => {
            const selected = d.key === activeKey;
            const disabled = d.status !== "livre";
            return (
              <li key={d.key}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  disabled={disabled}
                  onClick={() => onSelectDay(d.key)}
                  className={cn(
                    "flex w-[4.6rem] flex-col items-center rounded-2xl border px-2 py-3 transition",
                    selected
                      ? "border-ink bg-ink text-bone"
                      : disabled
                        ? "cursor-not-allowed border-sand/70 bg-transparent text-stone/50"
                        : "border-sand bg-white/70 hover:border-ink/40 hover:bg-white",
                  )}
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider">
                    {relativeDay(d.day, now) === "hoje" ? "hoje" : WEEKDAYS_SHORT[d.day.getDay()]}
                  </span>
                  <span className="font-display text-3xl font-extrabold leading-none">{d.day.getDate()}</span>
                  <span className={cn("text-[11px]", selected ? "text-bone/70" : "text-stone")}>
                    {d.status === "livre" ? MONTHS_SHORT[d.day.getMonth()] : statusText[d.status]}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {active ? (
        <div className="mt-6">
          <p className="font-semibold first-letter:uppercase">{formatDateLong(active.day)}</p>
          <div className="mt-4 space-y-5">
            {PERIODS.map((p) => {
              const slots = active.slots.filter((s) => s.time >= p.from && s.time < p.to);
              if (!slots.length) return null;
              return (
                <div key={p.label}>
                  <h3 className="eyebrow mb-2 text-stone">{p.label}</h3>
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                    {slots.map((s) => {
                      const sel = s.time === selectedTime;
                      return (
                        <button
                          key={s.time}
                          type="button"
                          aria-pressed={sel}
                          onClick={() => onSelectTime(s)}
                          className={cn(
                            "rounded-xl border py-2.5 text-sm font-semibold tabular-nums transition",
                            sel
                              ? "border-poste bg-poste text-white"
                              : "border-sand bg-white/70 hover:border-ink/40 hover:bg-white",
                          )}
                        >
                          {formatTime(s.time)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          {anyBarber && assignedBarber && selectedTime !== undefined && (
            <p className="mt-5 flex items-center gap-2 rounded-xl bg-white/70 p-3 text-sm">
              <Check className="h-4 w-4 shrink-0 text-poste" aria-hidden />
              <span>
                Neste horário você será atendido por <strong>{assignedBarber.name}</strong>.
              </span>
            </p>
          )}
        </div>
      ) : (
        <p className="mt-6 rounded-xl bg-white/70 p-4 text-sm text-stone">
          Nenhum horário livre nas próximas duas semanas. Tente outro profissional.
        </p>
      )}
    </div>
  );
}

/* ───────────── 4. Seus dados ───────────── */

export function StepDetails({
  name,
  phone,
  notes,
  errors,
  onChange,
  onSubmit,
}: {
  name: string;
  phone: string;
  notes: string;
  errors: { name?: string; phone?: string };
  onChange: (field: "name" | "phone" | "notes", value: string) => void;
  onSubmit: () => void;
}) {
  const field =
    "w-full rounded-xl border bg-white px-4 py-3.5 text-base outline-none transition placeholder:text-stone/60 focus:border-ink focus:ring-2 focus:ring-ink/10";
  return (
    <form
      id="booking-details"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <StepTitle
        title={
          <>
            Quase <span className="accent">lá.</span>
          </>
        }
        subtitle="Só o necessário para a barbearia saber quem vem."
      />
      <div className="grid max-w-xl gap-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Seu nome</span>
          <input
            className={cn(field, errors.name ? "border-poste" : "border-sand")}
            value={name}
            onChange={(e) => onChange("name", e.target.value)}
            autoComplete="name"
            placeholder="Como podemos te chamar?"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "erro-nome" : undefined}
          />
          {errors.name && (
            <span id="erro-nome" className="mt-1 block text-sm text-poste-dark">
              {errors.name}
            </span>
          )}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Seu WhatsApp</span>
          <input
            className={cn(field, errors.phone ? "border-poste" : "border-sand")}
            value={phone}
            onChange={(e) => onChange("phone", e.target.value)}
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="(11) 98888-7777"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "erro-telefone" : undefined}
          />
          {errors.phone && (
            <span id="erro-telefone" className="mt-1 block text-sm text-poste-dark">
              {errors.phone}
            </span>
          )}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">
            Observação <span className="font-normal text-stone">(opcional)</span>
          </span>
          <textarea
            className={cn(field, "min-h-[96px] resize-none border-sand")}
            value={notes}
            maxLength={200}
            onChange={(e) => onChange("notes", e.target.value)}
            placeholder="Ex.: quero manter o comprimento em cima"
          />
        </label>
        <p className="text-xs leading-relaxed text-stone">
          Seus dados não ficam guardados no site: eles vão apenas na mensagem que você mesmo envia pelo WhatsApp.
        </p>
      </div>
    </form>
  );
}

/* ───────────── 5. Confirmação ───────────── */

export function StepReview({
  service,
  barberLabel,
  day,
  time,
  name,
  phone,
  notes,
  message,
  onEdit,
}: {
  service: Service;
  barberLabel: string;
  day: Date;
  time: number;
  name: string;
  phone: string;
  notes: string;
  message: string;
  onEdit: (step: number) => void;
}) {
  const rows: { label: string; value: string; step: number }[] = [
    { label: "Serviço", value: `${service.name} · ${formatDuration(service.durationMin)}`, step: 0 },
    { label: "Profissional", value: barberLabel, step: 1 },
    { label: "Quando", value: `${formatDateLong(day)} às ${formatTime(time)}`, step: 2 },
    { label: "Nome", value: name.trim(), step: 3 },
    { label: "WhatsApp", value: phone, step: 3 },
  ];
  if (notes.trim()) rows.push({ label: "Observação", value: notes.trim(), step: 3 });

  return (
    <div>
      <StepTitle
        title={
          <>
            Confere <span className="accent">pra gente?</span>
          </>
        }
        subtitle="Está tudo certo? Ao tocar em “Enviar pelo WhatsApp”, o app abre com esta mensagem pronta."
      />
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-2xl border border-sand bg-white">
          <dl className="divide-y divide-sand/70">
            {rows.map((r) => (
              <div key={r.label} className="flex items-start gap-3 px-5 py-3.5">
                <dt className="w-24 shrink-0 pt-0.5 text-xs font-semibold uppercase tracking-wider text-stone">{r.label}</dt>
                <dd className="min-w-0 flex-1 break-words font-medium first-letter:uppercase">{r.value}</dd>
                <button
                  type="button"
                  onClick={() => onEdit(r.step)}
                  className="shrink-0 rounded-full p-1.5 text-stone transition hover:bg-bone hover:text-ink"
                  aria-label={`Alterar ${r.label.toLowerCase()}`}
                >
                  <Pencil className="h-3.5 w-3.5" aria-hidden />
                </button>
              </div>
            ))}
          </dl>
          <div className="relative border-t-2 border-dashed border-sand bg-paper px-5 py-4">
            <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-bone" aria-hidden />
            <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-bone" aria-hidden />
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-stone">Total</p>
                <p className="text-xs text-stone">Pago no local · {BUSINESS.payment}</p>
              </div>
              <p className="font-display text-4xl font-extrabold leading-none">{formatPrice(service.price)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#E9E2D6] p-4">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone">
            <MessageCircle className="h-3.5 w-3.5" aria-hidden /> Prévia da mensagem
          </p>
          <div className="relative max-h-72 overflow-y-auto rounded-xl rounded-tr-sm bg-[#DCF7C5] p-3.5 text-[13px] leading-relaxed text-[#1f2a1c] shadow-sm">
            <WhatsAppText text={message} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Renderiza *negrito* do WhatsApp na prévia. */
function WhatsAppText({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <span key={i} className="block min-h-[1em]">
          {line.split(/(\*[^*]+\*)/g).map((part, j) =>
            part.startsWith("*") && part.endsWith("*") ? <strong key={j}>{part.slice(1, -1)}</strong> : part,
          )}
        </span>
      ))}
    </>
  );
}

/* ───────────── Concluído ───────────── */

export function StepDone({
  name,
  whatsappHref,
  onAddToCalendar,
  onRestart,
}: {
  name: string;
  whatsappHref: string;
  onAddToCalendar: () => void;
  onRestart: () => void;
}) {
  const first = name.trim().split(/\s+/)[0];
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center py-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-poste text-white">
        <Check className="h-8 w-8" strokeWidth={3} aria-hidden />
      </span>
      <h2 className="display mt-6 text-5xl">
        Valeu, <span className="accent">{first}!</span>
      </h2>
      <p className="mt-3 text-stone">
        O WhatsApp abriu com a mensagem pronta. É só tocar em <strong className="text-ink">enviar</strong> — a barbearia
        responde confirmando o seu horário.
      </p>
      <div className="mt-7 flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-dark">
          <MessageCircle className="h-4 w-4" aria-hidden /> Abrir o WhatsApp de novo
        </a>
        <button type="button" onClick={onAddToCalendar} className="btn-outline">
          <CalendarPlus className="h-4 w-4" aria-hidden /> Salvar na agenda
        </button>
      </div>
      <button
        type="button"
        onClick={onRestart}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-stone underline-offset-4 hover:text-ink hover:underline"
      >
        <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Fazer outro agendamento
      </button>
      <p className="mt-8 rounded-xl bg-white/70 p-3 text-xs leading-relaxed text-stone">
        Este é um projeto conceito: o número {BUSINESS.whatsappDisplay} é fictício, então a mensagem não chega a ninguém.
      </p>
    </div>
  );
}
