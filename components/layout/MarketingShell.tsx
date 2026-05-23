import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/layout/Navbar";
import type { ReactNode } from "react";
import { Suspense } from "react";

/** Standard chrome for public marketing routes (nav + main + footer). */
export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen min-w-0 flex-col overflow-x-clip">
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <main className="hero-shift-sm min-w-0 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
