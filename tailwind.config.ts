import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Tinta: quase preto, levemente frio
        ink: {
          DEFAULT: "#111214",
          800: "#1B1C1F",
          700: "#26282C",
          600: "#3A3C41",
        },
        // Osso / papel: fundos claros quentes
        bone: { DEFAULT: "#F1EBE1", dark: "#E6DDCF" },
        paper: "#FAF7F2",
        sand: "#D9CDBB",
        // Texto secundário
        stone: "#625D55",
        mist: "#ABA59B",
        // Vermelho do poste de barbearia
        poste: { DEFAULT: "#D23A2C", dark: "#B02E22", light: "#F6DCD6" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Impact", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
