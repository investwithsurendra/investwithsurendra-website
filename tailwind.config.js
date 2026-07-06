/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#071C34",
          foreground: "#FFFFFF",
          50: "#E6EAF0",
          100: "#B8C2D2",
          900: "#071C34",
        },
        gold: {
          DEFAULT: "#C89B3C",
          light: "#E5C77A",
          dark: "#A17A25",
          foreground: "#071C34",
        },
        secondary: {
          DEFAULT: "#F5F5F7",
          foreground: "#071C34",
        },
        muted: {
          DEFAULT: "#F5F5F7",
          foreground: "#6B7280",
        },
        accent: {
          DEFAULT: "#C89B3C",
          foreground: "#071C34",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#071C34",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#071C34",
        },
        destructive: {
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.15)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out forwards",
        "fade-in": "fade-in 1s ease-out forwards",
        "slow-zoom": "slow-zoom 20s ease-out forwards",
        shimmer: "shimmer 3s linear infinite",
        float: "float 3s ease-in-out infinite",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C89B3C 0%, #E5C77A 50%, #C89B3C 100%)",
        "gold-shimmer": "linear-gradient(90deg, #C89B3C 0%, #E5C77A 25%, #FFF3D6 50%, #E5C77A 75%, #C89B3C 100%)",
        "dark-gradient": "linear-gradient(180deg, rgba(7,28,52,0.6) 0%, rgba(7,28,52,0.85) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
