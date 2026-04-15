import localFont from "next/font/local";

export const nexaFont = localFont({
  src: [
    { path: "../public/fonts/nexa/Nexa-ExtraLight.ttf", weight: "200" },
    { path: "../public/fonts/nexa/nexa-bold/NexaLight.otf", weight: "300" },
    { path: "../public/fonts/nexa/nexa-bold/NexaBold.otf", weight: "500" },
    { path: "../public/fonts/nexa/Nexa-Heavy.ttf", weight: "700" },
  ],
  variable: "--font-nexa",
  display: "swap",
});

export const qasbyneFont = localFont({
  src: [
    { path: "../public/fonts/qasbyne/Qasbyne-Regular.woff2", weight: "100" },
    { path: "../public/fonts/qasbyne/Qasbyne-Regular.woff2", weight: "200" },
    { path: "../public/fonts/qasbyne/Qasbyne-Regular.woff2", weight: "300" },
    { path: "../public/fonts/qasbyne/Qasbyne-Regular.woff2", weight: "400" },
    { path: "../public/fonts/qasbyne/Qasbyne-Medium.woff2", weight: "500" },
    { path: "../public/fonts/qasbyne/Qasbyne-Bold.woff2", weight: "700" },
  ],
  variable: "--font-qasbyne",
  display: "swap",
});