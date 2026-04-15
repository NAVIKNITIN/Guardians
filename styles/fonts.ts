import localFont from "next/font/local";
import { nexaWebFont } from "@/app/fonts/nexa/Web";

export const nexaFont = localFont({
  src: [
    { path: "../public/fonts/nexa/Nexa-Light.woff2", weight: "300" },
    { path: "../public/fonts/nexa/Nexa-Book.woff", weight: "350" },
    // { path: "../public/fonts/nexa/Nexa-Regular.woff2", weight: "400" },
    { path: "../public/fonts/nexa/Nexa-Bold.woff2", weight: "700" },
  ],
  variable: "--font-nexa",
  display: "swap",
});

export const qasbyneFont = localFont({
  src: [
    { path: "../public/fonts/qasbyne/Qasbyne.otf", weight: "100" },
    { path: "../public/fonts/qasbyne/Qasbyne-Regular.woff2", weight: "200" },
    { path: "../public/fonts/qasbyne/Qasbyne-Medium.woff2", weight: "500" },
    { path: "../public/fonts/qasbyne/Qasbyne-Bold.woff2", weight: "700" },
  ],
  variable: "--font-qasbyne",
  display: "swap",
});