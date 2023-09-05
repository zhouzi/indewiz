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
        primary: "#1789E5",
        "primary-dark": "#095594",
        text: "#021626",
        background: "#F5F7FA",
        secondary: "#5C6166",
        "secondary-lighter": "#A1AAB2",
        "secondary-lightest": "#CFDAE5",
        "positive-light": "#E8FAE1",
        "positive-dark": "#268006",
        "negative-light": "#FAE2E1",
        "negative-dark": "#800A06",
      },
    },
  },
  plugins: [],
};
export default config;
