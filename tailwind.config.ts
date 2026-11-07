import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        surface: {
          DEFAULT: "var(--color-surface)",
          secondary: "var(--color-surface-secondary)",
        },
        foreground: "var(--color-foreground)",
        "text-secondary": "var(--color-text-secondary)",
        accent: {
          DEFAULT: "var(--color-accent)",
          soft: "var(--color-accent-soft)",
          hover: "#A84121",
          dark: "#8F3417",
        },
        border: "var(--color-border)",
        studio: {
          cream: "#F6EEE2",
          sand: "#ECE3D4",
          card: "#FFFDF6",
          terracotta: "#C6532E",
          softPeach: "#FCEAE3",
          ink: "#231F20",
          muted: "#77716D",
          darkTech: "#181516",
          darkCard: "#231F20",
          darkBorder: "#383234",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(35, 31, 32, 0.04)",
        card: "0 10px 30px -10px rgba(35, 31, 32, 0.07)",
        hover: "0 20px 40px -15px rgba(35, 31, 32, 0.12)",
        tech: "0 20px 50px -15px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
