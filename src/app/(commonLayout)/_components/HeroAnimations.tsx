"use client";

import { motion } from "framer-motion";
import { Zap, Sparkles, Trophy } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function HeroAnimations() {
  return (
    <>
      {/* Animated Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="relative inline-flex">
          <div className="absolute -inset-px rounded-full bg-linear-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite]" />
          <span className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-accent" />
            Now in Beta — Free Access
          </span>
        </div>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6"
      >
        <span className="text-foreground">Become the</span>
        <br />
        <span className="text-gradient glow-text">Strongest Hunter</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        The AI-powered fitness system inspired by Solo Leveling. 
        Complete daily quests, level up your stats, and unlock your true potential.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
      >
        <Button size="lg" className="group">
          <Zap className="w-5 h-5" />
          Start Your Journey
          <motion.span
            className="inline-block"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </Button>
      </motion.div>

      {/* Floating Card 1 */}
      <motion.div
        className="absolute top-1/4 right-[15%] hidden lg:block"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="bg-muted/30 rounded-xl p-4 glow-box">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary to-secondary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Level Up!</div>
              <div className="text-xs text-muted-foreground">+500 XP earned</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Card 2 */}
      <motion.div
        className="absolute bottom-1/3 left-[10%] hidden lg:block"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="bg-muted/30 rounded-xl p-4 glow-box">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-accent to-accent/70 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Quest Complete</div>
              <div className="text-xs text-muted-foreground">Daily mission done</div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
