"use client"

import { motion } from "framer-motion"

export function LoadingSpinner({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  return (
    <motion.div
      className={`rounded-full border-2 border-gray-300 border-t-purple-600 ${sizeClasses[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  )
}

export function LoadingCard() {
  const shimmer = {
    animate: {
      backgroundPosition: ["200% 0", "-200% 0"],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }
  }

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4 mb-4"
        style={{ backgroundSize: "200% 100%" }}
        variants={shimmer}
        animate="animate"
      />
      <motion.div 
        className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full mb-2"
        style={{ backgroundSize: "200% 100%" }}
        variants={shimmer}
        animate="animate"
      />
      <motion.div 
        className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-2/3 mb-4"
        style={{ backgroundSize: "200% 100%" }}
        variants={shimmer}
        animate="animate"
      />
      <motion.div 
        className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-24"
        style={{ backgroundSize: "200% 100%" }}
        variants={shimmer}
        animate="animate"
      />
    </motion.div>
  )
}
