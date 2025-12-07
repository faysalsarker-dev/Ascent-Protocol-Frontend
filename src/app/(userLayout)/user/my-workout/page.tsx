"use client"

import { motion } from "framer-motion";
import AllPlansHeader from "@/src/components/modules/workout/Header";
import AllWorkoutPlans from "@/src/components/modules/workout/AllworkoutPlan";

export default function AllPlansPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/2 rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]" />
      </div>

      {/* Animated scan line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent pointer-events-none z-50"
        animate={{ y: ["0vh", "100vh"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* System Status Bar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6 flex items-center gap-2 text-xs text-muted-foreground font-mono"
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-primary">[SYSTEM]</span>
          <span>WORKOUT DATABASE CONNECTED</span>
          <span className="text-primary">|</span>
          <span>STATUS: OPERATIONAL</span>
        </motion.div>

        <AllPlansHeader />

        <AllWorkoutPlans />

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-muted-foreground/50 font-bold tracking-widest">
            ARISE AND CONQUER
          </p>
        </motion.footer>
      </main>
    </div>
  );
}
