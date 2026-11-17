"use client";

import React from "react";
import Image from "next/image";
import { BARBERS } from "@/lib/data";

export const BarbersSection: React.FC = () => {
  return (
    <section id="barbeiros" className="w-full py-16 md:py-24 bg-[#0B0B0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center md:text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-sans">
            <span className="hidden md:inline">Nossos Barbeiros</span>
            <span className="md:hidden">Nossos Profissionais</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 tracking-wide font-normal">
            Mestres do ofício. Precisão em cada detalhe.
          </p>
        </div>

        {/* Desktop View Cards Grid (Matches screen3.png) */}
        <div className="hidden md:grid grid-cols-4 gap-6">
          {BARBERS.map((barber) => (
            <div
              key={barber.id}
              className="group relative h-96 rounded-xl overflow-hidden bg-[#141416] border border-zinc-800 transition-all duration-300 hover:border-brand-gold/40"
            >
              {/* Photo */}
              <Image
                src={barber.imageUrl}
                alt={barber.name}
                fill
                className="object-cover object-center grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />

              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/40 to-transparent" />

              {/* Content overlay bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-center flex flex-col items-center">
                <h3 className="text-lg font-bold text-white tracking-wide">
                  {barber.name}
                </h3>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-gold mt-1">
                  {barber.role}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View Cards Container (Matches screen4.png) */}
        <div className="md:hidden flex space-x-4 overflow-x-auto no-scrollbar pb-4 pt-2 -mx-4 px-4">
          {BARBERS.map((barber) => (
            <div
              key={barber.id}
              className="flex-shrink-0 w-64 p-5 rounded-2xl bg-[#141416] border border-zinc-800 flex flex-col items-center text-center"
            >
              {/* Circle Portrait */}
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-brand-gold/40 mb-4">
                <Image
                  src={barber.imageUrl}
                  alt={barber.name}
                  fill
                  className="object-cover grayscale contrast-125"
                />
              </div>

              <h3 className="text-base font-bold text-white">{barber.name}</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold mt-1">
                {barber.role}
              </span>
              <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                {barber.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
