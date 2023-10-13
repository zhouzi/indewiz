import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-lightest": "#DCEAF5",
        "primary-lighter": "#ABD4F5",
        primary: "#1789E5",
        "primary-dark": "#095594",
        text: "#021626",
        background: "#F5F7FA",
        secondary: "#475766",
        "secondary-lighter": "#A1AAB2",
        "secondary-lightest": "#CFDAE5",
        "positive-light": "#E7FAE1",
        "positive-dark": "#021626",
        "negative-light": "#FAE1EA",
        "negative-dark": "#6F213D",
      },
    },
  },
  plugins: [],
};

export default config;
