"use client";

import { AnimatePresence, MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { BookingDialog } from "./BookingDialog";

export interface OpenBookingOptions {
  serviceId?: string;
  barberId?: string;
}

interface BookingContextValue {
  isOpen: boolean;
  open: (options?: OpenBookingOptions) => void;
  close: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ isOpen: boolean; options: OpenBookingOptions; session: number }>({
    isOpen: false,
    options: {},
    session: 0,
  });

  const open = useCallback((options: OpenBookingOptions = {}) => {
    setState((s) => ({ isOpen: true, options, session: s.session + 1 }));
  }, []);

  const close = useCallback(() => setState((s) => ({ ...s, isOpen: false })), []);

  // Link direto: /#agendar abre o agendamento
  useEffect(() => {
    if (window.location.hash === "#agendar") open();
  }, [open]);

  const value = useMemo(() => ({ isOpen: state.isOpen, open, close }), [state.isOpen, open, close]);

  return (
    <MotionConfig reducedMotion="user">
      <BookingContext.Provider value={value}>
        {/* Com o agendamento aberto, o resto da página fica inacessível (teclado e leitor de tela) */}
        <div inert={state.isOpen}>{children}</div>
        <AnimatePresence>
          {state.isOpen && <BookingDialog key={state.session} initial={state.options} onClose={close} />}
        </AnimatePresence>
      </BookingContext.Provider>
    </MotionConfig>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking precisa estar dentro de <BookingProvider>");
  return ctx;
}

/** Botão que abre o agendamento — pode ser usado dentro de componentes de servidor. */
export function BookingButton({
  children,
  className,
  serviceId,
  barberId,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  serviceId?: string;
  barberId?: string;
  ariaLabel?: string;
}) {
  const { open } = useBooking();
  return (
    <button type="button" aria-label={ariaLabel} className={className} onClick={() => open({ serviceId, barberId })}>
      {children}
    </button>
  );
}
