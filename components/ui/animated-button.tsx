"use client";
import { motion } from "framer-motion";
import { ReactNode, ButtonHTMLAttributes } from "react";
import { Button } from "./button";
import { buttonAnimation } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  delay?: number;
}

export function AnimatedButton({ 
  children, 
  variant = "default", 
  size = "default", 
  className = "", 
  delay = 0,
  ...props 
}: AnimatedButtonProps) {
  return (
    <motion.div
      variants={buttonAnimation}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      transition={{ delay }}
    >
      <Button
        variant={variant}
        size={size}
        className={cn("transition-all duration-200", className)}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}
