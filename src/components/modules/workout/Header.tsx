"use client";

import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

const Header = () => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      {/* Left */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-1">
          Workout <span className="text-primary glow-text-primary">Plans</span>
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Choose your path. Build, grind, evolve — become your strongest version.
        </p>
      </div>

      {/* CTA Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Button
          onClick={() => router.push("/user/my-workout/plan")}
          className="flex items-center gap-2 font-medium group"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-all duration-300" />
          Create Plan
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Header;
