"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn } from "@/lib/animations";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scaleIn";
  delay?: number;
}

export default function AnimatedSection({ 
  children, 
  className = "", 
  animation = "fadeInUp",
  delay = 0 
}: AnimatedSectionProps) {
  const getAnimation = () => {
    switch (animation) {
      case "fadeInLeft":
        return fadeInLeft;
      case "fadeInRight":
        return fadeInRight;
      case "scaleIn":
        return scaleIn;
      default:
        return fadeInUp;
    }
  };

  return (
    <motion.div
      variants={getAnimation()}
      initial="initial"
      animate="animate"
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
