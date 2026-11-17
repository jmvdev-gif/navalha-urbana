"use client";

import React from "react";
import { Calendar } from "lucide-react";

interface StickyMobileCTAProps {
  onOpenBooking: () => void;
  isVisible: boolean;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({
  onOpenBooking,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/95 to-transparent backdrop-blur-md">
      <button
        onClick={onOpenBooking}
        className="w-full bg-brand-gold hover:bg-brand-gold-hover text-zinc-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider py-4 px-6 rounded-xl flex items-center justify-center space-x-2.5 shadow-xl shadow-brand-gold/25 transform active:scale-98 transition-all"
      >
        <Calendar className="w-4 h-4 text-zinc-950" />
        <span>AGENDAR HORÁRIO AGORA</span>
      </button>
    </div>
  );
};
