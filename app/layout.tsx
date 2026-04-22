import type { Metadata } from "next";
import "./globals.css";
import { ErrorBoundary } from "@/src/components/ErrorBoundary";
import { nexaFont, playfairDisplay, qasbyneFont } from "@/styles/fonts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      className={`${nexaFont.variable} ${qasbyneFont.variable} ${playfairDisplay.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-brand-background text-brand-text-primary font-sans">
        <ErrorBoundary>{children}</ErrorBoundary>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          closeOnClick
          pauseOnFocusLoss
          draggable
          limit={3}
          theme="light"
          hideProgressBar={false}
        />
      </body>
    </html>
  );
}
