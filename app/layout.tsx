import type { Metadata } from "next";
import "./globals.css";
import { nexaFont, qasbyneFont } from "@/styles/fonts";

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
      className={`${nexaFont.variable} ${qasbyneFont.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-brand-background text-brand-text-primary">
        {children}
      </body>
    </html>
  );
}
