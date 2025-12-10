"use client";

import { motion } from "framer-motion";
import { Zap, Sparkles, Trophy, ChevronRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { ShineBorder } from "@/src/components/ui/ShineBorder";
import Link from "next/link";

export default function HeroAnimations() {
  return (
    <>
      {/* Animated Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8 "
      >
        <div className="relative inline-flex">
          {/* Shimmer border */}
         

          <span className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-background text-sm font-medium text-muted-foreground">
                     <ShineBorder className="rounded-full" shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />

            <Sparkles className="w-4 h-4 text-accent" />
            Now in Beta — Free Access
          </span>
        </div>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6 tracking-tight"
      >
        <span className="text-foreground">Become the</span>
        <br />
        <span className="text-secondary">Strongest Hunter</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
      >
        The AI-powered fitness system inspired by Solo Leveling. 
        Complete daily quests, level up your stats, and unlock your true potential.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        className="flex  sm:flex-row gap-4 justify-center mb-20 px-4"
      >
    <Link href="/register">
          <Button size="lg"  className="group text-base">
            <Zap className="w-5 h-5" />
            Start Your Journey
            <motion.span
              className="inline-flex"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.span>
          </Button>
    </Link>

 
       
      </motion.div>

      {/* Floating Card - Level Up */}
      <motion.div
        className="absolute top-[15%] right-[2%] xl:right-[5%] 2xl:right-[10%] hidden xl:block"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="bg-muted/30 rounded-2xl p-5 glow-box">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-linear-to-br from-primary to-primary/70">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-foreground">Level Up!</div>
                <div className="text-xs text-muted-foreground">+500 XP earned</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Card - Quest Complete */}
      <motion.div
        className="absolute bottom-[30%] left-[2%] xl:left-[5%] 2xl:left-[10%] hidden xl:block"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="bg-muted/30 rounded-2xl p-5 glow-box">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-linear-to-br from-accent to-accent/70">
                <Trophy className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-foreground">Quest Complete</div>
                <div className="text-xs text-muted-foreground">Daily mission done</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}