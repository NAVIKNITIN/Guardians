"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { isAuthenticated } from "@/src/utils/auth";
import { ROUTES } from "./constants";

type PrivateRouteProps = {
  children: ReactNode;
};

/**
 * Renders `children` only when the localStorage login flag is set; otherwise
 * navigates to the admin login page.
 */
export function PrivateRoute({ children }: PrivateRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      const next = encodeURIComponent(pathname || ROUTES.adminDashboard);
      router.replace(`${ROUTES.adminLogin}?next=${next}`);
      setAllowed(false);
    } else {
      setAllowed(true);
    }
    setReady(true);
  }, [router, pathname]);

  if (!ready) {
    return null;
  }
  if (!allowed) {
    return null;
  }
  return <>{children}</>;
}
