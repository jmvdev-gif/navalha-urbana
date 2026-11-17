import { BUSINESS, OPENING_SUMMARY } from "@/lib/data";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-ink pb-28 pt-16 text-bone md:pb-10">
      <div className="container-site">
        <div className="grid gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo id="pole-footer" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone/60">
              Barbearia de bairro com hora marcada. Corte, barba e conversa boa.
            </p>
          </div>
          <div className="text-sm">
            <p className="eyebrow text-bone/40">Endereço</p>
            <p className="mt-3 leading-relaxed text-bone/80">
              {BUSINESS.street}
              <br />
              {BUSINESS.district}
              <br />
              {BUSINESS.city}
            </p>
          </div>
          <div className="text-sm">
            <p className="eyebrow text-bone/40">Horários</p>
            <ul className="mt-3 space-y-1 text-bone/80">
              {OPENING_SUMMARY.map((r) => (
                <li key={r.days}>
                  {r.days}: {r.hours.toLowerCase()}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-sm">
            <p className="eyebrow text-bone/40">Contato</p>
            <p className="mt-3 leading-relaxed text-bone/80">
              WhatsApp {BUSINESS.whatsappDisplay}
              <br />
              Instagram {BUSINESS.instagram}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-8 text-xs text-bone/50 md:flex-row md:items-center md:justify-between">
          <p>
            <span className="mr-2 rounded-full border border-white/20 px-2 py-0.5 font-semibold uppercase tracking-wider text-bone/70">
              Projeto conceito
            </span>
            Barbearia fictícia: endereço, telefone e Instagram não são reais. Fotos: Unsplash.
          </p>
          <p>
            Design e desenvolvimento: <span className="font-semibold text-bone/80">JMVTECH</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
