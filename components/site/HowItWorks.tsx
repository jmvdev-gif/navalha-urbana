import { CheckCheck } from "lucide-react";
import { BookingButton } from "@/components/booking/BookingProvider";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Escolha o serviço",
    text: "Preço e duração aparecem antes de você decidir. Sem surpresa no caixa.",
  },
  {
    n: "02",
    title: "Barbeiro, dia e horário",
    text: "Você vê só os horários livres de verdade — de um barbeiro ou de toda a equipe.",
  },
  {
    n: "03",
    title: "Confirme pelo WhatsApp",
    text: "A mensagem vai pronta, com tudo preenchido. É só tocar em enviar.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-bone py-20 sm:py-28">
      <div className="container-site grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow text-poste-dark">Como funciona</p>
            <h2 className="display mt-4 text-[clamp(3rem,7vw,5.5rem)]">
              Marcar horário
              <br />
              <span className="accent text-[0.9em]">sem troca de mensagens.</span>
            </h2>
          </Reveal>

          <ol className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
            {STEPS.map((s, i) => (
              <li key={s.n}>
                <Reveal delay={i * 0.1} className="border-t-2 border-ink pt-4">
                  <span className="font-display text-5xl font-extrabold text-poste">{s.n}</span>
                  <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-stone">{s.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal delay={0.2}>
            <BookingButton className="btn-dark mt-10">Experimentar agora</BookingButton>
          </Reveal>
        </div>

        {/* Prévia da mensagem que chega no WhatsApp */}
        <Reveal delay={0.15} y={40}>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-6 -z-0 rotate-3 rounded-[2.5rem] bg-poste/90" aria-hidden />
            <figure className="relative rounded-[2rem] bg-ink p-3 shadow-2xl">
              <div className="overflow-hidden rounded-[1.5rem] bg-[#ECE5DA]">
                <div className="flex items-center gap-3 bg-[#1F2C26] px-4 py-3 text-white">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bone font-display text-lg font-extrabold text-ink">
                    NU
                  </span>
                  <span>
                    <span className="block text-sm font-semibold leading-tight">Navalha Urbana</span>
                    <span className="block text-[11px] text-white/60">online</span>
                  </span>
                </div>
                <div className="grain space-y-3 px-3 py-5 text-[13px] leading-relaxed text-[#1f2a1c]">
                  <div className="ml-auto max-w-[88%] rounded-xl rounded-tr-sm bg-[#DCF7C5] p-3 shadow-sm">
                    <p>Olá, Navalha Urbana! Quero agendar um horário:</p>
                    <p className="mt-2">
                      <strong>Serviço:</strong> Corte + barba
                      <br />
                      <strong>Profissional:</strong> Lucas Andrade
                      <br />
                      <strong>Data:</strong> sexta-feira, 14:30
                      <br />
                      <strong>Valor:</strong> R$ 90 (pago no local)
                    </p>
                    <p className="mt-1 flex items-center justify-end gap-1 text-[10px] text-[#1f2a1c]/50">
                      14:02 <CheckCheck className="h-3.5 w-3.5 text-sky-500" aria-hidden />
                    </p>
                  </div>
                  <div className="max-w-[80%] rounded-xl rounded-tl-sm bg-white p-3 shadow-sm">
                    <p>Fechado! Te esperamos sexta às 14:30. ✂️</p>
                    <p className="mt-1 text-right text-[10px] text-[#1f2a1c]/50">14:03</p>
                  </div>
                </div>
              </div>
              <figcaption className="sr-only">Exemplo da mensagem enviada pelo agendamento</figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
