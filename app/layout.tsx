import type { Metadata } from "next";
import { nexaFont, qasbyneFont } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "The Guardians | Real Estate Advisory",
    template: "%s | The Guardians",
  },
  description:
    "Premium real estate advisory — consulting, projects, and partnerships across India.",
  openGraph: {
    title: "The Guardians | Real Estate Advisory",
    description:
      "Premium real estate advisory — consulting, projects, and partnerships across India.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nexaFont.variable} ${qasbyneFont.variable} h-full scroll-smooth antialiased`}
    >
      <body
        className={`${nexaFont.variable} min-h-full overflow-x-hidden bg-brand-background font-nexa text-brand-text-primary ${nexaFont.className}`}
      >
        {children}
      </body>
    </html>
  );
}
