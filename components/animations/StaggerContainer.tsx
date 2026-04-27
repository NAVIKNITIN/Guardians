"use client";

import { cn } from "@/utils/cn";
import { motion, type Variants } from "framer-motion";
import { Children, memo, type ReactNode } from "react";

export interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
}

const itemVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

export const StaggerContainer = memo(function StaggerContainer({
  children,
  className,
  staggerChildren = 0.2,
  delayChildren = 0,
}: StaggerContainerProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
});
