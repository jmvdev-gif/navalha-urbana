import { Plus } from "lucide-react";
import { FAQ } from "@/lib/data";
import { Reveal } from "./Reveal";

export function Faq() {
  return (
    <section className="bg-bone py-20 sm:py-28">
      <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow text-poste-dark">Dúvidas</p>
          <h2 className="display mt-4 text-[clamp(3rem,7vw,5.5rem)]">
            Antes de
            <br />
            <span className="accent text-[0.9em]">você perguntar.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="divide-y divide-sand border-y border-sand">
            {FAQ.map((item) => (
              <details key={item.q} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <Plus className="h-5 w-5 shrink-0 transition-transform duration-300 group-open:rotate-45" aria-hidden />
                </summary>
                <p className="pb-5 pr-10 leading-relaxed text-stone">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
