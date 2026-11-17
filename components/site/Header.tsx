"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#equipe", label: "Equipe" },
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#visite", label: "Como chegar" },
];

export function Header() {
  const { open } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 text-bone transition-colors duration-300",
        solid ? "bg-ink/90 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-6">
        <a href="#topo" aria-label="Navalha Urbana — início" onClick={() => setMenuOpen(false)}>
          <Logo id="pole-header" />
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex" aria-label="Principal">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-bone/80 transition hover:text-bone">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" onClick={() => open()} className="btn-primary hidden px-5 py-2.5 sm:inline-flex">
            Agendar horário
          </button>
          <button
            type="button"
            className="rounded-full p-2 md:hidden"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 md:hidden"
          >
            <ul className="container-site py-4">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="display block py-2.5 text-4xl text-bone"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <button
                  type="button"
                  className="btn-primary w-full"
                  onClick={() => {
                    setMenuOpen(false);
                    open();
                  }}
                >
                  Agendar horário
                </button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
