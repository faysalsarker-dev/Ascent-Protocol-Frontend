"use client";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Plus, Swords, Zap } from "lucide-react";
import Link from "next/link";

const AllPlansHeader = () => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 relative"
    >
      {/* Corner Brackets */}
      <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
      <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
      <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-primary/60" />
      <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-primary/60" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
        {/* Left */}
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ 
              boxShadow: ["0 0 20px hsl(var(--primary)/0.3)", "0 0 40px hsl(var(--primary)/0.5)", "0 0 20px hsl(var(--primary)/0.3)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-3 rounded-xl bg-primary/20 border border-primary/30"
          >
            <Swords className="w-8 h-8 text-primary" />
          </motion.div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-1 tracking-tight">
              <span className="text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]">WORKOUT</span>{" "}
              <span className="text-foreground">PLANS</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Choose your path. Build, grind, evolve — become your strongest version.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
        <Link href={'/user/my-workout/plan'}>
            <Button
              className="flex items-center gap-2 font-medium group relative overflow-hidden"
              size="lg"
            >
              <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-all duration-300" />
              <span className="relative z-10">CREATE PLAN</span>
            </Button>
        </Link>
        </motion.div>
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg opacity-20">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,hsl(var(--primary)/0.03)_2px,hsl(var(--primary)/0.03)_4px)]" />
      </div>
    </motion.div>
  );
};

export default AllPlansHeader;
