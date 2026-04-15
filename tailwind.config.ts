import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ── Custom Color Palette: Neon Gaming Theme ── */
      colors: {
        neon: {
          blue: "#00f0ff",
          purple: "#b000ff",
          pink: "#ff00e5",
          green: "#39ff14",
          orange: "#ff6600",
        },
        dark: {
          900: "#0a0a0f",
          800: "#12121a",
          700: "#1a1a2e",
          600: "#252540",
        },
      },

      /* ── Font Family ── */
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },

      /* ── Custom Animations ── */
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-neon": "pulseNeon 2s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.8s ease-out",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseNeon: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #00f0ff, 0 0 10px #00f0ff" },
          "100%": { boxShadow: "0 0 20px #00f0ff, 0 0 40px #00f0ff, 0 0 60px #00f0ff" },
        },
        slideUp: {
          "0%": { transform: "translateY(100px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },

      /* ── Glassmorphism Backdrop ── */
      backdropBlur: {
        xs: "2px",
      },

      /* ── Box Shadows for Neon Effects ── */
      boxShadow: {
        "neon-blue": "0 0 15px rgba(0, 240, 255, 0.5), 0 0 30px rgba(0, 240, 255, 0.3)",
        "neon-purple": "0 0 15px rgba(176, 0, 255, 0.5), 0 0 30px rgba(176, 0, 255, 0.3)",
        "neon-green": "0 0 15px rgba(57, 255, 20, 0.5), 0 0 30px rgba(57, 255, 20, 0.3)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
    },
  },
  plugins: [],
};

export default config;