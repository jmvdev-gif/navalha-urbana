"use client";

import React from "react";
import Image from "next/image";

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const scrollToServices = () => {
    const el = document.getElementById("servicos");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full overflow-hidden py-12 md:py-16 lg:py-24 bg-[#0B0B0C]">
      {/* Full Hero Atmospheric Background Image (Dark Industrial Barbershop matching navalha_urbana_hero.png) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1920&q=90"
          alt="Navalha Urbana Industrial Ambience"
          fill
          priority
          className="object-cover object-center brightness-60 filter contrast-110 saturate-90"
        />
        {/* Soft Vignette & Gradient Overlay for Crisp Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C] via-[#0B0B0C]/75 to-[#0B0B0C]/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0C]/85 via-transparent to-[#0B0B0C]" />
      </div>

      {/* Mobile Hero View (Matches screen4.png) */}
      <div className="md:hidden relative z-10 w-full min-h-[480px] flex flex-col items-center justify-center text-center px-4 pt-8 pb-12">
        <div className="max-w-sm flex flex-col items-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white uppercase font-sans leading-none drop-shadow-lg">
            NAVALHA
            <br />
            URBANA
          </h1>
          <p className="text-base text-zinc-200 font-medium tracking-wide drop-shadow">
            O Seu Estilo Começa Aqui
          </p>

          <div className="pt-4">
            <button
              onClick={scrollToServices}
              className="bg-brand-gold hover:bg-brand-gold-hover text-zinc-950 px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 transform active:scale-95 shadow-lg shadow-brand-gold/20"
            >
              VER SERVIÇOS
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Hero View (Strictly Matches navalha_urbana_hero.png) */}
      <div className="hidden md:block relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column Text Content */}
          <div className="md:col-span-6 flex flex-col justify-center space-y-6 lg:space-y-8 pr-0 lg:pr-4">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white font-sans leading-tight drop-shadow-md">
              O Seu Estilo
              <br />
              Começa Aqui
            </h1>

            <p className="text-zinc-200 text-base lg:text-lg leading-relaxed max-w-xl font-normal drop-shadow-sm">
              Tradição artesanal encontra a estética industrial moderna. Experiencie o luxo silencioso de um corte preciso em um ambiente desenhado para o homem contemporâneo.
            </p>

            <div className="flex flex-row items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="bg-brand-gold hover:bg-brand-gold-hover text-zinc-950 font-bold px-8 py-3.5 rounded-[10px] text-xs uppercase tracking-widest transition-all duration-300 transform active:scale-95 shadow-xl shadow-brand-gold/20"
              >
                RESERVAR HORÁRIO
              </button>

              <button
                onClick={scrollToServices}
                className="bg-zinc-950/80 border border-brand-gold/90 text-white hover:bg-zinc-900 font-bold px-8 py-3.5 rounded-[10px] text-xs uppercase tracking-widest transition-all duration-300 backdrop-blur-sm shadow-md"
              >
                VER SERVIÇOS
              </button>
            </div>
          </div>

          {/* Right Column Visual Composition (Overlapping Gold-Bordered Cards from navalha_urbana_hero.png) */}
          <div className="md:col-span-6 relative flex items-center justify-end h-[480px] lg:h-[540px]">
            {/* Back Main Card (Barber working with straight razor - Unique Photo) */}
            <div className="absolute left-4 lg:left-12 top-4 w-[280px] lg:w-[330px] h-[380px] lg:h-[440px] rounded-[24px] overflow-hidden border-2 border-brand-gold shadow-2xl z-10 transform -rotate-1 hover:rotate-0 transition-transform duration-500 gold-glow-sm">
              <Image
                src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80"
                alt="Barber razor trim"
                fill
                priority
                className="object-cover object-center filter contrast-105 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/30 via-transparent to-transparent" />
            </div>

            {/* Front Overlapping Card (Traditional shaving tools flatlay - Unique Photo) */}
            <div className="absolute right-0 bottom-4 lg:bottom-6 w-[220px] lg:w-[270px] h-[240px] lg:h-[290px] rounded-[24px] overflow-hidden border-2 border-brand-gold shadow-2xl z-20 transform rotate-2 hover:rotate-0 transition-transform duration-500 gold-glow-sm">
              <Image
                src="https://images.unsplash.com/photo-1590540179852-2110a54f813a?auto=format&fit=crop&w=800&q=80"
                alt="Traditional shaving tools"
                fill
                priority
                className="object-cover object-center filter contrast-105 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/30 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
