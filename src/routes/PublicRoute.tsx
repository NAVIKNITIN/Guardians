"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { isAuthenticated } from "@/src/utils/auth";
import { ROUTES } from "./constants";

type PublicRouteProps = {
  children: ReactNode;
};

/**
 * Renders the public page (e.g. login) unless the user is already past the
 * lightweight login step; in that case redirects to the main admin view.
 */
export function PublicRoute({ children }: PublicRouteProps) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace(ROUTES.adminDashboard);
      setShow(false);
    } else {
      setShow(true);
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return null;
  }
  if (!show) {
    return null;
  }
  return <>{children}</>;
}
