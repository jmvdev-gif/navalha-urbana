"use client";

import React from "react";
import { SERVICES } from "@/lib/data";
import { Scissors, Sparkles, Crown, Clock } from "lucide-react";

export const ServicesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Scissors":
        return <Scissors className="w-5 h-5 text-brand-gold" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-brand-gold" />;
      case "Crown":
        return <Crown className="w-5 h-5 text-brand-gold" />;
      default:
        return <Scissors className="w-5 h-5 text-brand-gold" />;
    }
  };

  return (
    <section id="servicos" className="w-full py-16 md:py-24 bg-[#0B0B0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 pb-4 border-b border-zinc-800/40">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-sans">
            Nossos Serviços e Preços
          </h2>
        </div>

        {/* Desktop View Cards (Matches screen3.png) */}
        <div className="hidden md:flex flex-col space-y-4">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className={`relative flex items-center justify-between p-6 rounded-xl bg-[#141416] border transition-all duration-300 group ${
                service.isPremium
                  ? "border-brand-gold/60 gold-glow-sm"
                  : "border-zinc-800"
              }`}
            >
              {/* Left edge gold vertical accent stripe for premium */}
              {service.isPremium && (
                <div className="absolute left-0 top-3 bottom-3 w-1 bg-brand-gold rounded-r-full" />
              )}

              <div className="flex items-center space-x-5 pl-2">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center transition-all duration-300">
                  {getIcon(service.iconName)}
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-white">
                      {service.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{service.duration}</span>
                  </div>
                </div>
              </div>

              {/* Right Side Price and Badge */}
              <div className="flex items-center space-x-4 pr-2">
                {service.isPremium && (
                  <span className="bg-brand-gold/20 text-brand-gold border border-brand-gold/40 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                    PREMIUM
                  </span>
                )}
                <span className="text-2xl font-bold text-brand-gold tracking-tight">
                  R$ {service.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View Cards (Matches screen4.png) */}
        <div className="md:hidden flex flex-col space-y-4">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className={`relative p-5 rounded-2xl bg-[#141416] border transition-all ${
                service.isPremium
                  ? "border-brand-gold/80 gold-glow-sm"
                  : "border-zinc-800/90"
              }`}
            >
              {/* Premium Top Badge */}
              {service.isPremium && (
                <div className="absolute -top-3 right-4">
                  <span className="bg-brand-gold text-zinc-950 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md shadow-md">
                    PREMIUM
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between">
                <h3 className="text-lg font-bold text-white pr-2">
                  {service.name}
                </h3>
                <span className="text-xl font-extrabold text-brand-gold whitespace-nowrap">
                  R$ {service.price}
                </span>
              </div>

              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {service.description}
              </p>

              <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase mt-4 pt-3 border-t border-zinc-800/60">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>{service.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
