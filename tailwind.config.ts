import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1B4FFF", // Royal Blue - trust + professional
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#0A0A0A", // Deep Black - premium finish
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#E0ECFF", // Sky Blue - soft calming CTAs
          foreground: "#0A0A0A",
        },
        success: {
          DEFAULT: "#2ECC71",
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#F1C40F",
          foreground: "#0A0A0A",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
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
      borderRadius: {
        lg: "18px",
        md: "16px",
        sm: "14px",
        xl: "20px",
      },
      fontFamily: {
        heading: ['"Poppins"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'medium': '0 8px 30px rgba(0, 0, 0, 0.08)',
        'strong': '0 12px 40px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;