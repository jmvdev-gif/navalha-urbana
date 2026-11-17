"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { useNextSlot } from "./useNextSlot";

/** Barra fixa no rodapé do celular: aparece depois da primeira dobra. */
export function MobileBookingBar() {
  const { open, isOpen } = useBooking();
  const nextSlot = useNextSlot();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && !isOpen && (
        <motion.div
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ type: "spring", stiffness: 420, damping: 38 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden"
        >
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1 text-bone">
              <p className="text-xs text-bone/60">Próximo horário livre</p>
              <p className="truncate text-sm font-semibold">{nextSlot ?? "—"}</p>
            </div>
            <button type="button" onClick={() => open()} className="btn-primary shrink-0 px-5 py-3">
              <CalendarDays className="h-4 w-4" aria-hidden /> Agendar horário
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
