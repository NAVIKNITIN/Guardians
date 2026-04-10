import localFont from "next/font/local";

export const nexaFont = localFont({
  src: [
    {
      path: "../public/fonts/nexa/Nexa-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/nexa/Nexa-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/nexa/Nexa-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-nexa",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const qasbyneFont = localFont({
  src: [
    {
      path: "../public/fonts/qasbyne/Qasbyne-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/qasbyne/Qasbyne-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/qasbyne/Qasbyne-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-qasbyne",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
});
