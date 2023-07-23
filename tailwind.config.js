const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "850px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        brandred: "#B51530",
        secondary: "#FACB76",
        primary: {
          100: "#eccccf",
          200: "#d9999f",
          300: "#c7666e",
          400: "#b4333e",
          500: "#a1000e",
          600: "#81000b",
          700: "#610008",
          800: "#400006",
          900: "#200003",
        },
        brand: {
          100: "#f0d0d6",
          200: "#e1a1ac",
          300: "#d37383",
          400: "#c44459",
          500: "#b51530",
          600: "#911126",
          700: "#6d0d1d",
          800: "#480813",
          900: "#24040a",
        },
        light: {
          100: "#fffbf5",
          200: "#fff7eb",
          300: "#fff3e0",
          400: "#ffefd6",
          500: "#ffebcc",
          600: "#ccbca3",
          700: "#998d7a",
          800: "#665e52",
          900: "#332f29",
        },
      },
      animation: {
        slidedown: "slidedown 0.4s ease-in-out ",
        slideup: "slideup 0.4s ease-in-out",
        slideout: "slideout 0.4s ease-in-out",
        slowspin: "spin 2s linear infinite",
        fadein: "fadein 0.4s ease-in-out",
        fadeout: "fadeout 0.4s ease-in-out",
      },
      keyframes: {
        slidedown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideup: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideout: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
        fadein: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeout: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      wiggle: {
        "0%, 100%": { transform: "rotate(-3deg)" },
        "50%": { transform: "rotate(3deg)" },
      },
      zIndex: {
        100: "100",
      },
      fontFamily: {
        primary: ["var(--ThaiSansNeue)"],
        secondary: ["var(--font_Tenor)"],
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
