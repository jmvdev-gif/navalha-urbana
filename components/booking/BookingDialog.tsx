"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MessageCircle, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BARBERS, BUSINESS, SERVICES } from "@/lib/data";
import { downloadIcs, buildIcs } from "@/lib/calendar";
import { formatDateLong, formatDateShort, formatDuration, formatPrice, formatTime, maskPhone } from "@/lib/format";
import {
  ANY_BARBER,
  availableSlots,
  dateKey,
  fromDateKey,
  hoursFor,
  nextAvailable,
  upcomingDays,
  worksOn,
  type Slot,
} from "@/lib/schedule";
import { buildBookingMessage, whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import type { OpenBookingOptions } from "./BookingProvider";
import { StepBarber, StepDateTime, StepDetails, StepDone, StepReview, StepService, type DayInfo } from "./steps";

const STEPS = ["Serviço", "Profissional", "Dia e horário", "Seus dados", "Confirmação"];
const DAYS_AHEAD = 14;

interface Draft {
  serviceId?: string;
  barberId?: string;
  dayKey?: string;
  time?: number;
  assignedBarberId?: string;
  name: string;
  phone: string;
  notes: string;
}

function validate(d: Draft) {
  const errors: { name?: string; phone?: string } = {};
  if (d.name.trim().length < 2) errors.name = "Digite seu nome.";
  const digits = d.phone.replace(/\D/g, "");
  if (digits.length < 10) errors.phone = "Digite um WhatsApp com DDD, por exemplo (11) 98888-7777.";
  return errors;
}

export function BookingDialog({ initial, onClose }: { initial: OpenBookingOptions; onClose: () => void }) {
  const now = useMemo(() => new Date(), []);
  const validService = SERVICES.some((s) => s.id === initial.serviceId) ? initial.serviceId : undefined;
  const validBarber = BARBERS.some((b) => b.id === initial.barberId) ? initial.barberId : undefined;

  const [draft, setDraft] = useState<Draft>({
    serviceId: validService,
    barberId: validBarber,
    name: "",
    phone: "",
    notes: "",
  });
  const [step, setStep] = useState(() => (!validService ? 0 : !validBarber ? 1 : 2));
  const [direction, setDirection] = useState(1);
  const [showErrors, setShowErrors] = useState(false);
  const [sent, setSent] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const service = SERVICES.find((s) => s.id === draft.serviceId);
  const anyBarber = draft.barberId === ANY_BARBER;
  const chosenBarber = BARBERS.find((b) => b.id === draft.barberId);
  const assignedBarber = BARBERS.find((b) => b.id === (anyBarber ? draft.assignedBarberId : draft.barberId));
  const errors = validate(draft);

  /* ── Bloqueia a rolagem da página, ESC fecha, foco no painel ── */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      clearTimeout(advanceTimer.current);
    };
  }, [onClose]);

  const goTo = useCallback(
    (to: number) => {
      setDirection(to >= step ? 1 : -1);
      setStep(to);
      bodyRef.current?.scrollTo({ top: 0 });
    },
    [step],
  );

  /* ── Disponibilidade ── */
  const days: DayInfo[] = useMemo(() => {
    if (!service || !draft.barberId) return [];
    return upcomingDays(DAYS_AHEAD, now).map((day) => {
      const key = dateKey(day);
      if (!hoursFor(day)) return { key, day, slots: [], status: "fechado" as const };
      if (chosenBarber && !worksOn(chosenBarber, day)) return { key, day, slots: [], status: "folga" as const };
      const slots = availableSlots(day, service, draft.barberId!, now);
      return { key, day, slots, status: slots.length ? ("livre" as const) : ("lotado" as const) };
    });
  }, [service, draft.barberId, chosenBarber, now]);

  const activeDayKey = draft.dayKey ?? days.find((d) => d.status === "livre")?.key;

  const nextByBarber = useMemo(() => {
    if (!service) return {};
    const map: Record<string, ReturnType<typeof nextAvailable>> = {};
    for (const id of [ANY_BARBER, ...BARBERS.map((b) => b.id)]) map[id] = nextAvailable(service, id, now, DAYS_AHEAD);
    return map;
  }, [service, now]);

  /* ── Ações ── */
  const autoAdvance = (to: number) => {
    clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => goTo(to), 220);
  };

  const selectService = (id: string) => {
    setDraft((d) => ({ ...d, serviceId: id, time: undefined, assignedBarberId: undefined }));
    autoAdvance(draft.barberId ? 2 : 1);
  };

  const selectBarber = (id: string) => {
    setDraft((d) => ({ ...d, barberId: id, dayKey: undefined, time: undefined, assignedBarberId: undefined }));
    autoAdvance(2);
  };

  const selectDay = (key: string) =>
    setDraft((d) => ({ ...d, dayKey: key, time: undefined, assignedBarberId: undefined }));

  const selectTime = (slot: Slot) =>
    setDraft((d) => ({
      ...d,
      dayKey: activeDayKey,
      time: slot.time,
      assignedBarberId: d.barberId === ANY_BARBER ? slot.barberIds[0] : d.barberId,
    }));

  const submitDetails = () => {
    setShowErrors(true);
    if (Object.keys(errors).length === 0) goTo(4);
  };

  const restart = () => {
    setSent(false);
    setShowErrors(false);
    setDraft((d) => ({ name: d.name, phone: d.phone, notes: "" }));
    setDirection(-1);
    setStep(0);
  };

  /* ── Mensagem final ── */
  const day = draft.dayKey ? fromDateKey(draft.dayKey) : undefined;
  const ready = !!(service && assignedBarber && day && draft.time !== undefined);
  const message = ready
    ? buildBookingMessage({
        service: service!,
        barberName: assignedBarber!.name,
        barberAssigned: anyBarber,
        day: day!,
        time: draft.time!,
        name: draft.name,
        phone: draft.phone,
        notes: draft.notes,
      })
    : "";
  const waHref = whatsappUrl(message);

  const addToCalendar = () => {
    if (!ready) return;
    const start = new Date(day!.getFullYear(), day!.getMonth(), day!.getDate(), 0, draft.time!);
    downloadIcs(
      "navalha-urbana-horario.ics",
      buildIcs({
        title: `${service!.name} — ${BUSINESS.name}`,
        start,
        durationMin: service!.durationMin,
        location: `${BUSINESS.street}, ${BUSINESS.district}, ${BUSINESS.city}`,
        description: `Com ${assignedBarber!.name}. Valor: ${formatPrice(service!.price)} (pago no local).`,
      }),
    );
  };

  const barberLabel = anyBarber
    ? assignedBarber
      ? `${assignedBarber.name} (primeiro disponível)`
      : "Sem preferência"
    : (chosenBarber?.name ?? "");

  /* ── Rodapé ── */
  const canContinue = step === 2 ? draft.time !== undefined && !!draft.dayKey : true;

  let primary: React.ReactNode = null;
  if (sent) {
    primary = (
      <button type="button" className="btn-dark" onClick={onClose}>
        Fechar
      </button>
    );
  } else if (step === 2) {
    primary = (
      <button type="button" className="btn-primary" disabled={!canContinue} onClick={() => goTo(3)}>
        Continuar <ArrowRight className="h-4 w-4" aria-hidden />
      </button>
    );
  } else if (step === 3) {
    primary = (
      <button type="submit" form="booking-details" className="btn-primary">
        Revisar <ArrowRight className="h-4 w-4" aria-hidden />
      </button>
    );
  } else if (step === 4) {
    primary = (
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setSent(true)}
        className="btn-primary whitespace-nowrap"
      >
        <MessageCircle className="h-4 w-4" aria-hidden /> Enviar pelo WhatsApp
      </a>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/70 backdrop-blur-sm md:items-center md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        tabIndex={-1}
        initial={{ y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 48, opacity: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 36 }}
        className="flex h-[100dvh] w-full flex-col overflow-hidden bg-bone outline-none md:h-[min(820px,92vh)] md:max-w-6xl md:rounded-[28px] md:shadow-2xl"
      >
        {/* Cabeçalho */}
        <header className="shrink-0 border-b border-sand/80 px-5 pb-4 pt-4 sm:px-8">
          <div className="flex items-center gap-3">
            {step > 0 && !sent ? (
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                className="-ml-2 rounded-full p-2 transition hover:bg-bone-dark"
                aria-label="Voltar"
              >
                <ArrowLeft className="h-5 w-5" aria-hidden />
              </button>
            ) : null}
            <div className="min-w-0 flex-1">
              <p id="booking-title" className="font-display text-2xl font-extrabold uppercase leading-none">
                Agendar horário
              </p>
              <p className="mt-1 text-xs text-stone">
                {sent ? "Mensagem pronta" : `Passo ${step + 1} de ${STEPS.length} · ${STEPS[step]}`}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="-mr-2 rounded-full p-2 transition hover:bg-bone-dark"
              aria-label="Fechar agendamento"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <ol className="mt-4 grid grid-cols-5 gap-1.5" aria-label="Etapas">
            {STEPS.map((label, i) => {
              const done = sent || i < step;
              const current = !sent && i === step;
              return (
                <li key={label}>
                  <button
                    type="button"
                    disabled={!done || sent}
                    onClick={() => goTo(i)}
                    className="group block w-full text-left disabled:cursor-default"
                    aria-current={current ? "step" : undefined}
                  >
                    <span
                      className={cn(
                        "block h-1 rounded-full transition-colors",
                        done ? "bg-ink" : current ? "bg-poste" : "bg-sand",
                      )}
                    />
                    <span
                      className={cn(
                        "mt-1.5 hidden text-[11px] font-semibold uppercase tracking-wider md:block",
                        current ? "text-ink" : "text-stone",
                        done && !sent && "group-hover:text-ink",
                      )}
                    >
                      {label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </header>

        {/* Corpo */}
        <div className="flex min-h-0 flex-1">
          <div ref={bodyRef} className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-5 py-6 sm:px-8 sm:py-8">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={sent ? "done" : step}
                custom={direction}
                initial={{ opacity: 0, x: direction * 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -28 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                {sent ? (
                  <StepDone name={draft.name} whatsappHref={waHref} onAddToCalendar={addToCalendar} onRestart={restart} />
                ) : step === 0 ? (
                  <StepService selectedId={draft.serviceId} onSelect={selectService} />
                ) : step === 1 ? (
                  <StepBarber selectedId={draft.barberId} onSelect={selectBarber} nextByBarber={nextByBarber} now={now} />
                ) : step === 2 ? (
                  <StepDateTime
                    days={days}
                    activeKey={activeDayKey}
                    selectedTime={draft.time}
                    onSelectDay={selectDay}
                    onSelectTime={selectTime}
                    assignedBarber={assignedBarber}
                    anyBarber={anyBarber}
                    barberFirstName={chosenBarber?.firstName}
                    now={now}
                  />
                ) : step === 3 ? (
                  <StepDetails
                    name={draft.name}
                    phone={draft.phone}
                    notes={draft.notes}
                    errors={showErrors ? errors : {}}
                    onChange={(field, value) =>
                      setDraft((d) => ({ ...d, [field]: field === "phone" ? maskPhone(value) : value }))
                    }
                    onSubmit={submitDetails}
                  />
                ) : ready ? (
                  <StepReview
                    service={service!}
                    barberLabel={barberLabel}
                    day={day!}
                    time={draft.time!}
                    name={draft.name}
                    phone={draft.phone}
                    notes={draft.notes}
                    message={message}
                    onEdit={goTo}
                  />
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Resumo lateral (desktop) */}
          <aside className="hidden w-[320px] shrink-0 flex-col bg-ink p-7 text-bone lg:flex">
            <p className="eyebrow text-mist">Seu horário</p>
            <dl className="mt-6 space-y-5 text-sm">
              <SummaryRow label="Serviço" value={service ? service.name : undefined} sub={service ? formatDuration(service.durationMin) : undefined} />
              <SummaryRow label="Profissional" value={draft.barberId ? barberLabel : undefined} />
              <SummaryRow
                label="Quando"
                value={draft.dayKey && draft.time !== undefined ? formatDateLong(fromDateKey(draft.dayKey)) : undefined}
                sub={draft.time !== undefined ? `às ${formatTime(draft.time)}` : undefined}
              />
            </dl>
            <div className="mt-auto border-t border-white/10 pt-5">
              <div className="flex items-end justify-between">
                <span className="text-sm text-mist">Total</span>
                {service ? (
                  <span className="font-display text-5xl font-extrabold leading-none">{formatPrice(service.price)}</span>
                ) : (
                  <span className="text-sm text-mist/60">a definir</span>
                )}
              </div>
              <p className="mt-2 text-xs text-mist">Pago no local · {BUSINESS.payment}</p>
            </div>
          </aside>
        </div>

        {/* Rodapé */}
        <footer className="flex shrink-0 items-center gap-4 border-t border-sand/80 bg-paper px-5 py-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] sm:px-8">
          <div className="min-w-0 flex-1 text-sm lg:invisible">
            {service ? (
              <>
                <p className="truncate font-semibold">{service.name}</p>
                <p className="truncate text-xs text-stone">
                  {formatPrice(service.price)}
                  {draft.dayKey && draft.time !== undefined
                    ? ` · ${formatDateShort(fromDateKey(draft.dayKey))} às ${formatTime(draft.time)}`
                    : ` · ${formatDuration(service.durationMin)}`}
                </p>
              </>
            ) : (
              <p className="text-xs text-stone">Toque em uma opção para continuar.</p>
            )}
          </div>
          {primary ?? (
            <p className="hidden text-xs text-stone sm:block lg:block">Toque em uma opção para continuar</p>
          )}
        </footer>
      </motion.div>
    </motion.div>
  );
}

function SummaryRow({ label, value, sub }: { label: string; value?: string; sub?: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-mist">{label}</dt>
      <dd className={cn("mt-1 font-semibold first-letter:uppercase", !value && "text-mist/60")}>{value ?? "—"}</dd>
      {sub && value && <dd className="text-mist">{sub}</dd>}
    </div>
  );
}
