import { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    container: {},
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: "var(--primary-500)",
          50: "var(--primary-50)",
          500: "var(--primary-500)",
          700: "var(--primary-700)",
        },
        secondary: {
          DEFAULT: "var(--secondary-50)",
          50: "var(--secondary-50)",
        },
        text: {
          DEFAULT: "var(--text-500)",
          300: "var(--text-300)",
          500: "var(--text-500)",
        },
        positive: {
          DEFAULT: "var(--positive-500)",
          50: "var(--positive-50)",
          500: "var(--positive-500)",
        },
        negative: {
          DEFAULT: "var(--negative-500)",
          50: "var(--negative-50)",
          500: "var(--negative-500)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
