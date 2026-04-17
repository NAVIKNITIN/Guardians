import { MarketingShell } from "@/components/layout/MarketingShell";
import type { ReactNode } from "react";

import "./marketing-mobile.css";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="marketing-mobile-root">
      <MarketingShell>{children}</MarketingShell>
    </div>
  );
}
