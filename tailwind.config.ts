import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        wzrd: {
          pink: "#FFE5E5",
          purple: "#F0E5FF",
          blue: "#E5F0FF",
        },
        teleprompter: {
          bg: "#0F172A",
          text: "#F8FAFC",
          dimmed: "#94A3B8",
          control: "#1E293B",
          highlight: "#3B82F6",
          "highlight-strong": "rgba(59, 130, 246, 0.5)",
          "highlight-glow": "rgba(59, 130, 246, 0.1)",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        "magnetic-float": {
          "0%, 100%": { transform: "translate(calc(var(--mouse-x, 0) * 0.1px), calc(var(--mouse-y, 0) * 0.1px)) scale(1)" },
          "50%": { transform: "translate(calc(var(--mouse-x, 0) * 0.15px), calc(var(--mouse-y, 0) * 0.15px)) scale(1.02)" },
        },
        "card-hover": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-8px) scale(1.02)" },
        },
        "glow-pulse": {
          "0%, 100%": { 
            opacity: "1",
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.3)"
          },
          "50%": { 
            opacity: "0.8",
            boxShadow: "0 0 40px rgba(255, 255, 255, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.5)"
          },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(255, 255, 255, 0.3)" },
          "50%": { borderColor: "rgba(255, 255, 255, 0.8)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "magnetic-float": "magnetic-float 3s ease-in-out infinite",
        "card-hover": "card-hover 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "border-glow": "border-glow 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
