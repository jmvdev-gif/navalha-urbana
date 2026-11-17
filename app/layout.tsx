import type { Metadata, Viewport } from "next";
import { Big_Shoulders, DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const display = Big_Shoulders({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  // A fonte é nova no Google Fonts e o Next ainda não tem as métricas de fallback dela
  adjustFontFallback: false,
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Navalha Urbana — Barbearia em Vila Madalena",
  description:
    "Corte, barba e degradê com hora marcada. Escolha serviço, barbeiro e horário pelo site e confirme pelo WhatsApp. Projeto conceito com dados fictícios.",
  keywords: ["barbearia", "corte masculino", "barba", "degradê", "agendamento online", "Vila Madalena"],
  openGraph: {
    title: "Navalha Urbana — Corte bom, na hora marcada",
    description: "Escolha serviço, barbeiro e horário em menos de um minuto. Projeto conceito.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#111214",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
