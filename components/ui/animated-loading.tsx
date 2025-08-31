"use client";
import { motion } from "framer-motion";
import { loadingAnimation } from "@/lib/animations";

interface AnimatedLoadingProps {
  className?: string;
}

export function AnimatedLoading({ className = "" }: AnimatedLoadingProps) {
  return (
    <motion.div
      className={`flex items-center justify-center min-h-[400px] ${className}`}
      variants={loadingAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.p
          className="text-lg text-gray-600"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  );
}
