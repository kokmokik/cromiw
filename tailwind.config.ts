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
        // shadcn system colors (CSS-variable driven)
        background:   "var(--background)",
        foreground:   "var(--foreground)",
        border:       "var(--border)",
        input:        "var(--input)",
        ring:         "var(--ring)",
        card:         { DEFAULT: "var(--card)",    foreground: "var(--card-foreground)" },
        popover:      { DEFAULT: "var(--popover)", foreground: "var(--popover-foreground)" },
        secondary:    { DEFAULT: "var(--secondary)",    foreground: "var(--secondary-foreground)" },
        accent:       { DEFAULT: "var(--accent)",       foreground: "var(--accent-foreground)" },
        destructive:  { DEFAULT: "var(--destructive)" },
        // Project brand colors (spec-defined hex)
        primary:  { DEFAULT: "#2563EB", foreground: "#FFFFFF" },
        success:  { DEFAULT: "#16A34A" },
        warning:  { DEFAULT: "#D97706" },
        danger:   { DEFAULT: "#DC2626" },
        dark:     { DEFAULT: "#0F172A" },
        muted:    { DEFAULT: "#64748B" },
      },
    },
  },
  plugins: [],
};
export default config;
