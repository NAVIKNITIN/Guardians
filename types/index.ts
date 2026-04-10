import type { ReactNode } from "react";

export interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export interface SectionProps {
  id?: string;
  className?: string;
  children?: ReactNode;
}

export interface CardData {
  title: string;
  ctaLabel: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  icon: "buyer" | "developer";
  imagePosition: "left" | "right";
}
