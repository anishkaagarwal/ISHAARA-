import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0C0A09",
          surface: "#1A1714",
          elevated: "#231F1B",
        },
        gold: {
          DEFAULT: "#E8A020",
          light: "#F5C050",
          dark: "#B87A10",
          muted: "rgba(232,160,32,0.15)",
        },
        rose: {
          kathak: "#C4386B",
          light: "#E05585",
          muted: "rgba(196,56,107,0.15)",
        },
        teal: {
          kathak: "#0F9B8E",
          light: "#14C4B4",
          muted: "rgba(15,155,142,0.15)",
        },
        cream: "#F5F0E8",
        muted: "#8B7D6B",
        border: "rgba(232,160,32,0.15)",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "gold-radial": "radial-gradient(ellipse at center, rgba(232,160,32,0.08) 0%, transparent 70%)",
        "rose-radial": "radial-gradient(ellipse at center, rgba(196,56,107,0.08) 0%, transparent 70%)",
      },
      animation: {
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(232,160,32,0)" },
          "50%": { boxShadow: "0 0 20px 4px rgba(232,160,32,0.3)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
