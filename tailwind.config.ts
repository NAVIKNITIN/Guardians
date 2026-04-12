import type { Config } from "tailwindcss";

const nexaStack = ["var(--font-nexa)", "system-ui", "sans-serif"] as const;
const qasbyneStack = ["var(--font-qasbyne)", "system-ui", "sans-serif"] as const;

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nexa: [...nexaStack],
        qasbyne: [...qasbyneStack],
      },
    },
  },
};

export default config;
