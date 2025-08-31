"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { cardAnimation } from "@/lib/animations";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedCard({ children, className = "", delay = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      variants={cardAnimation}
      initial="initial"
      animate="animate"
      whileHover="hover"
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
