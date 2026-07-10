/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "var(--color-surface)",
          muted: "var(--color-surface-muted)",
          subtle: "var(--color-surface-subtle)",
          soft: "var(--color-surface-soft)",
        },
        foreground: {
          DEFAULT: "var(--color-foreground)",
          muted: "var(--color-foreground-muted)",
          subtle: "var(--color-foreground-subtle)",
          disabled: "var(--color-foreground-disabled)",
          inverse: "var(--color-foreground-inverse)",
          link: "var(--color-foreground-link-hover)",
        },
        line: {
          DEFAULT: "var(--color-border)",
          strong: "var(--color-border-strong)",
          focus: "var(--color-border-focus)",
          game: "var(--color-border-game)",
          brand: "var(--color-border-brand)",
          danger: "var(--color-border-danger)",
        },
        brand: {
          400: "var(--color-brand-400)",
          500: "var(--color-brand-500)",
          600: "var(--color-brand-600)",
          700: "var(--color-brand-700)",
          800: "var(--color-brand-800)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
        },
        danger: {
          DEFAULT: "var(--color-danger)",
        },
        overlay: {
          DEFAULT: "var(--color-overlay)",
        },
        canvas: {
          DEFAULT: "var(--color-canvas)",
        },
        snake: {
          head: "var(--color-snake-head)",
          body: "var(--color-snake-body)",
          food: "var(--color-snake-food)",
        },
        ring: {
          focus: "var(--color-ring-focus)",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        button: "var(--radius-button)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        elevated: "var(--shadow-xl)",
        overlay: "var(--shadow-2xl)",
      },
      zIndex: {
        modal: "var(--z-modal)",
      },
      transitionDuration: {
        normal: "var(--duration-normal)",
      },
      maxWidth: {
        form: "var(--layout-max-form)",
        modal: "var(--layout-max-modal)",
        game: "var(--layout-max-game)",
      },
    },
  },
  plugins: [],
};
