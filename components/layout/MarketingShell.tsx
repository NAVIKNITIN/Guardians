import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/layout/Navbar";
import type { ReactNode } from "react";

/** Standard chrome for public marketing routes (nav + main + footer). */
export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
