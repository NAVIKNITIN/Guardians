import { Playfair_Display } from "next/font/google";
import localFont from "next/font/local";

/** Figma hero headline — high-contrast serif (Playfair / Bodoni family). */
export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const nexaFont = localFont({
  src: [
    { path: "../public/fonts/nexa/Nexa-Light.woff2", weight: "300" },
    { path: "../public/fonts/nexa/Nexa-Book.woff", weight: "350" },
    { path: "../public/fonts/nexa/Nexa-Bold.woff2", weight: "700" },
    // { path: "../public/fonts/nexa/Nexa-Bold.woff2", weight: "400" },
  ],
  variable: "--font-nexa",
  display: "swap",
});

export const qasbyneFont = localFont({
  src: [
    { path: "../public/fonts/qasbyne/Qasbyne.otf", weight: "100 350" },
    { path: "../public/fonts/qasbyne/Qasbyne-Regular.woff2", weight: "300" },
    { path: "../public/fonts/qasbyne/Qasbyne-Medium.woff2", weight: "500" },
    { path: "../public/fonts/qasbyne/Qasbyne-Bold.woff2", weight: "700" },
    // { path: "../public/fonts/qasbyne/Qasbyne-Bold.woff2", weight: "400" },
  ],
  variable: "--font-qasbyne",
  display: "swap",
});