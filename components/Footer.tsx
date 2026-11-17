"use client";

import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#070708] border-t border-zinc-800/60 py-12 px-4 sm:px-6 lg:px-8 text-center md:text-left">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-white tracking-wider font-sans uppercase">
            Navalha Urbana
          </h3>
        </div>

        <div className="flex items-center space-x-6 text-xs font-semibold text-zinc-400">
          <a href="#" className="hover:text-brand-gold transition-colors">
            Privacidade
          </a>
          <a href="#" className="hover:text-brand-gold transition-colors">
            Termos
          </a>
          <a href="#" className="hover:text-brand-gold transition-colors">
            Contato
          </a>
        </div>

        <div>
          <p className="text-xs text-zinc-500">
            © 2024 Barbearia Navalha Urbana. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
