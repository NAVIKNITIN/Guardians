import type { Config } from "tailwindcss";

const nexaStack = ["var(--font-nexa)"] as const;
const qasbyneStack = ["var(--font-qasbyne)"] as const;

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [...nexaStack],
        nexa: [...nexaStack],
        qasbyne: [...qasbyneStack],
      },
    },
  },
};

export default config;
