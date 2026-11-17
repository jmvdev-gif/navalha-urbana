import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Navalha Urbana | Barbearia Premium",
  description:
    "Tradição artesanal encontra a estética industrial moderna. Agende seu corte ou barba na Navalha Urbana.",
  keywords: ["barbearia", "corte masculino", "barba", "navalha urbana", "agendamento online"],
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`dark ${plusJakartaSans.variable}`}>
      <body className="bg-[#0B0B0C] text-zinc-100 min-h-screen selection:bg-brand-gold selection:text-zinc-950">
        {children}
      </body>
    </html>
  );
};
