import { cn } from "@/lib/utils";

/** Poste de barbearia estilizado — símbolo da marca. */
export function PoleMark({ className, id = "pole" }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 14 32" className={className} aria-hidden>
      <defs>
        <clipPath id={id}>
          <rect x="1" y="1" width="12" height="30" rx="6" />
        </clipPath>
      </defs>
      <rect x="1" y="1" width="12" height="30" rx="6" fill="#F1EBE1" />
      <g clipPath={`url(#${id})`} fill="#D23A2C">
        <path d="M-2 6 L16 -3 L16 2 L-2 11 Z" />
        <path d="M-2 15 L16 6 L16 11 L-2 20 Z" />
        <path d="M-2 24 L16 15 L16 20 L-2 29 Z" />
        <path d="M-2 33 L16 24 L16 29 L-2 38 Z" />
      </g>
      <rect x="1" y="1" width="12" height="30" rx="6" fill="none" stroke="currentColor" strokeOpacity="0.25" />
    </svg>
  );
}

export function Logo({ className, id }: { className?: string; id?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <PoleMark id={id} className="h-8 w-auto" />
      <span className="font-display text-[1.65rem] font-extrabold uppercase leading-[0.8] tracking-tight">
        Navalha
        <br />
        <span className="text-poste">Urbana</span>
      </span>
    </span>
  );
}
