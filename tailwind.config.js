/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
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
        border: "var(--color-border)" /* gray-200 */,
        input: "var(--color-input)" /* stone-50 */,
        ring: "var(--color-ring)" /* gray-800 */,
        background: "var(--color-background)" /* white */,
        foreground: "var(--color-foreground)" /* gray-900 */,
        primary: {
          DEFAULT: "var(--color-primary)" /* gray-800 */,
          foreground: "var(--color-primary-foreground)" /* white */,
        },
        secondary: {
          DEFAULT: "var(--color-secondary)" /* amber-700 */,
          foreground: "var(--color-secondary-foreground)" /* white */,
        },
        destructive: {
          DEFAULT: "var(--color-destructive)" /* orange-800 */,
          foreground: "var(--color-destructive-foreground)" /* white */,
        },
        muted: {
          DEFAULT: "var(--color-muted)" /* stone-50 */,
          foreground: "var(--color-muted-foreground)" /* gray-500 */,
        },
        accent: {
          DEFAULT: "var(--color-accent)" /* yellow-600 */,
          foreground: "var(--color-accent-foreground)" /* gray-900 */,
        },
        popover: {
          DEFAULT: "var(--color-popover)" /* white */,
          foreground: "var(--color-popover-foreground)" /* gray-900 */,
        },
        card: {
          DEFAULT: "var(--color-card)" /* white */,
          foreground: "var(--color-card-foreground)" /* gray-900 */,
        },
        success: {
          DEFAULT: "var(--color-success)" /* green-700 */,
          foreground: "var(--color-success-foreground)" /* white */,
        },
        warning: {
          DEFAULT: "var(--color-warning)" /* yellow-700 */,
          foreground: "var(--color-warning-foreground)" /* white */,
        },
        error: {
          DEFAULT: "var(--color-error)" /* orange-800 */,
          foreground: "var(--color-error-foreground)" /* white */,
        },
        surface: {
          DEFAULT: "var(--color-surface)" /* stone-50 */,
          foreground: "var(--color-surface-foreground)" /* gray-900 */,
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
        accent: ["Crimson Text", "serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
        "fluid-sm": "clamp(0.875rem, 2vw, 1rem)",
        "fluid-base": "clamp(1rem, 2.5vw, 1.125rem)",
        "fluid-lg": "clamp(1.125rem, 3vw, 1.25rem)",
        "fluid-xl": "clamp(1.25rem, 3.5vw, 1.5rem)",
        "fluid-2xl": "clamp(1.5rem, 4vw, 2rem)",
        "fluid-3xl": "clamp(1.875rem, 4.5vw, 2.5rem)",
        "fluid-4xl": "clamp(2.25rem, 5vw, 3.2rem)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pulse-gentle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-in": "slide-in 0.4s ease-out",
        "pulse-gentle": "pulse-gentle 2s infinite",
        float: "float 3s ease-in-out infinite",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
