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
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
