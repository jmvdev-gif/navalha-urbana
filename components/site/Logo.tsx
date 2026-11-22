import { cn } from "@/lib/utils";

/** Monograma "N": as hastes em osso e a diagonal em vermelho, como o fio de uma navalha. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="8" fill="#F1EBE1" />
      <rect x="8" y="7" width="4.5" height="18" fill="#111214" />
      <rect x="19.5" y="7" width="4.5" height="18" fill="#111214" />
      <path d="M8 7 H12.5 L24 25 H19.5 Z" fill="#D23A2C" />
    </svg>
  );
}

export function Logo({ className }: { className?: string; id?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-9 w-9" />
      <span className="font-display text-2xl font-extrabold uppercase leading-none tracking-wide">
        Navalha <span className="text-poste">Urbana</span>
      </span>
    </span>
  );
}
