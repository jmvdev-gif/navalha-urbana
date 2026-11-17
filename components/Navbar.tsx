"use client";

import React from "react";
import Link from "next/link";
import { Scissors } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
  isBookingOpen?: boolean;
  onCloseBooking?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  isBookingOpen,
  onCloseBooking,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0B0B0C]/85 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={(e) => {
            if (isBookingOpen && onCloseBooking) {
              e.preventDefault();
              onCloseBooking();
            }
          }}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-lg bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-zinc-950 transition-all duration-300">
            <Scissors className="w-5 h-5 -rotate-45" />
          </div>
          <span className="font-bold tracking-wider text-xl sm:text-2xl text-white font-sans uppercase">
            NAVALHA URBANA
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-widest text-zinc-300">
          <a
            href="#servicos"
            className="hover:text-brand-gold transition-colors duration-200"
          >
            Serviços
          </a>
          <a
            href="#barbeiros"
            className="hover:text-brand-gold transition-colors duration-200"
          >
            Profissionais
          </a>
          <a
            href="#galeria"
            className="hover:text-brand-gold transition-colors duration-200"
          >
            Galeria
          </a>
        </nav>

        {/* Action CTA Button */}
        <div>
          <button
            onClick={onOpenBooking}
            className="bg-brand-gold hover:bg-brand-gold-hover text-zinc-950 px-6 py-2.5 rounded-md font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 transform active:scale-95 shadow-md shadow-brand-gold/10"
          >
            Agendar Agora
          </button>
        </div>
      </div>
    </header>
  );
};
