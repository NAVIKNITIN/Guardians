"use client";

import { cn } from "@/utils/cn";
import { motion, type Variants } from "framer-motion";
import { memo, type ReactNode } from "react";

type Direction = "left" | "right" | "up" | "down";

export interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  className?: string;
}

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function getDirectionalOffset(direction: Direction, distance: number) {
  switch (direction) {
    case "left":
      return { x: -distance, y: 0 };
    case "right":
      return { x: distance, y: 0 };
    case "down":
      return { x: 0, y: -distance };
    case "up":
    default:
      return { x: 0, y: distance };
  }
}

export const ScrollReveal = memo(function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 60,
  once = true,
  className,
}: ScrollRevealProps) {
  const offset = getDirectionalOffset(direction, distance);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      scale: 0.95,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration,
        delay,
        ease: EASE,
      },
    },
  };

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
});
