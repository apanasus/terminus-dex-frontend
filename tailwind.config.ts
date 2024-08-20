import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "background-color": "(var(--background-color))",
        "accent-800": "rgb(var(--accent-800))",
        "accent-900": "rgb(var(--accent-900))",
        "bg-form": "rgb(var(--bg-form))",
        blue: "rgb(var(--blue))",
        "dark-600": "rgb(var(--dark-600))",
        "dark-800": "rgb(var(--dark-800))",
        "dark-900": "rgb(var(--dark-900))",
        "grey-blue": "rgb(var(--grey-blue))",
        "light-800": "rgb(var(--light-800))",
        "light-900": "rgb(var(--light-900))",
        red: "rgb(var(--red))",
        "second-red": "rgb(var(--second-red))",
        "soft-100": "rgb(var(--soft-100))",
        "soft-200": "rgb(var(--soft-200))",
        "soft-300": "rgb(var(--soft-300))",
      },
    },
  },
  plugins: [],
};
export default config;
