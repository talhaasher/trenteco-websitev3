"use client";
import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";
import { scrollReveal } from "@/lib/animations";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.1
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once: true });

  return (
    <motion.div
      ref={ref}
      variants={scrollReveal}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
