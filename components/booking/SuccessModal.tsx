"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, Calendar, Clock, User, Scissors, X } from "lucide-react";
import { Service, Barber } from "@/lib/data";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: {
    service: Service;
    barber: Barber;
    date: string;
    time: string;
    userName: string;
    userPhone: string;
  };
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  bookingDetails,
}) => {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#F5B070", "#FFFFFF", "#E5A060"],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#141416] border border-brand-gold/40 rounded-2xl p-6 sm:p-8 shadow-2xl text-center gold-glow">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-full bg-brand-gold/10 border-2 border-brand-gold flex items-center justify-center mx-auto mb-4 text-brand-gold">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <h3 className="text-2xl font-bold text-white tracking-wide">
          Agendamento Confirmado!
        </h3>
        <p className="text-xs text-zinc-400 mt-1">
          Obrigado, <span className="text-white font-semibold">{bookingDetails.userName}</span>! Enviaremos um lembrete no seu WhatsApp.
        </p>

        {/* Details Card */}
        <div className="mt-6 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 text-left space-y-3">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-800">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5 text-brand-gold" /> Serviço
            </span>
            <span className="font-bold text-white">{bookingDetails.service.name}</span>
          </div>

          <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-800">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-brand-gold" /> Barbeiro
            </span>
            <span className="font-bold text-white">{bookingDetails.barber.name}</span>
          </div>

          <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-800">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-gold" /> Data
            </span>
            <span className="font-bold text-white">{bookingDetails.date}</span>
          </div>

          <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-800">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-gold" /> Horário
            </span>
            <span className="font-bold text-white">{bookingDetails.time}</span>
          </div>

          <div className="flex items-center justify-between text-sm pt-1 font-bold">
            <span className="text-white">Valor a Pagar (no local)</span>
            <span className="text-brand-gold">R$ {bookingDetails.service.price}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-brand-gold hover:bg-brand-gold-hover text-zinc-950 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md"
        >
          VOLTAR À PÁGINA INITIAL
        </button>
      </div>
    </div>
  );
};
