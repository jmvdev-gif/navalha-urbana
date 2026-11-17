"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { GALLERY, GalleryItem } from "@/lib/data";
import { ArrowUpRight, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export const GallerySection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedItem: GalleryItem | null =
    selectedIndex !== null ? GALLERY[selectedIndex] : null;

  const handlePrev = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev === 0 ? GALLERY.length - 1 : (prev as number) - 1
      );
    }
  }, [selectedIndex]);

  const handleNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev === GALLERY.length - 1 ? 0 : (prev as number) + 1
      );
    }
  }, [selectedIndex]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    },
    [selectedIndex, handlePrev, handleNext]
  );

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, handleKeyDown]);

  return (
    <section id="galeria" className="w-full py-16 md:py-24 bg-[#0B0B0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-row items-end justify-between mb-8 pb-4 border-b border-zinc-800/40">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-sans">
              <span className="hidden md:inline">Cortes Finalizados</span>
              <span className="md:hidden">Galeria</span>
            </h2>
          </div>
          <div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-brand-gold hover:underline"
            >
              <span>SIGA NO INSTAGRAM</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Gallery Grid (2x2 on Mobile, 4x1 on Desktop - Matches screen3.png & screen4.png) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {GALLERY.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedIndex(index)}
              className="group relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-[#141416] border border-zinc-800/80 cursor-pointer shadow-lg hover:border-brand-gold/50 transition-all duration-300"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700 brightness-95"
              />

              {/* Hover Overlay with Zoom Icon */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/90 via-[#0B0B0C]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
                <span className="text-xs font-semibold text-white tracking-wide">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal (Responsive for Desktop & Mobile) */}
      {selectedItem !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Modal Container */}
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#141416] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Title and Close Button */}
            <div className="w-full flex items-center justify-between p-4 sm:p-5 border-b border-zinc-800 bg-[#0B0B0C]/80">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                  {selectedItem.title}
                </h3>
                <span className="text-xs text-brand-gold font-medium">
                  {selectedItem.tag}
                </span>
              </div>

              <button
                onClick={() => setSelectedIndex(null)}
                className="p-2 rounded-full text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-brand-gold/40 transition-colors"
                title="Fechar (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Enlarged Image Area - Scaled to fit viewport perfectly */}
            <div className="relative w-full h-[60vh] sm:h-[70vh] flex items-center justify-center p-2 sm:p-4 bg-zinc-950/60">
              <div className="relative w-full h-full">
                <Image
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  fill
                  priority
                  className="object-contain object-center"
                  sizes="100vw"
                />
              </div>

              {/* Prev Navigation Button */}
              <button
                onClick={handlePrev}
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-zinc-900/80 border border-zinc-700/80 text-white hover:text-brand-gold hover:border-brand-gold transition-all shadow-lg active:scale-95"
                title="Anterior (Seta Esquerda)"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Next Navigation Button */}
              <button
                onClick={handleNext}
                className="absolute right-3 sm:left-auto sm:right-5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-zinc-900/80 border border-zinc-700/80 text-white hover:text-brand-gold hover:border-brand-gold transition-all shadow-lg active:scale-95"
                title="Próximo (Seta Direita)"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Bottom Caption / Counter Indicator */}
            <div className="w-full py-3 px-4 bg-[#0B0B0C] border-t border-zinc-800 flex items-center justify-end text-xs text-zinc-400">
              <span className="font-semibold text-brand-gold">
                {(selectedIndex as number) + 1} / {GALLERY.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
