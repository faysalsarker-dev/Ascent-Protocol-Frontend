"use client";
import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute inset-0 particles-bg" />
      
      {/* Animated Floating Orbs */}
      <motion.div 
        animate={{ 
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/6 w-72 h-72 bg-primary/15 rounded-full blur-3xl" 
      />
      <motion.div 
        animate={{ 
          y: [0, 25, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-secondary/15 rounded-full blur-3xl" 
      />
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          x: [0, 15, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" 
      />

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-background to-transparent" />
    </>
  );
};

export default AnimatedBackground;
