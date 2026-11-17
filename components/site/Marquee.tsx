const WORDS = ["Corte", "Barba", "Degradê", "Navalha", "Toalha quente", "Sobrancelha", "Pigmentação", "Infantil"];

export function Marquee() {
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden}>
      {WORDS.map((w) => (
        <li key={w} className="flex items-center">
          <span className="display px-6 text-4xl sm:text-5xl">{w}</span>
          <span className="text-2xl text-ink/40" aria-hidden>
            ✶
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden bg-poste py-4 text-white sm:py-5">
      <div className="flex w-max animate-marquee">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
