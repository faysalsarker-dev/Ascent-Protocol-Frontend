"use client"
import { Button } from "@/src/components/ui/button";
import { Crown, Zap, Star } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  },
};

const HeroContent = () => {
  return (
    <motion.div 
      className="text-center lg:text-left space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Level Badge */}
      <motion.div variants={itemVariants}>
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-accent/40 bg-accent/10 backdrop-blur-sm">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Crown className="h-4 w-4 text-accent" />
          </motion.div>
          <span className="text-sm font-semibold text-accent tracking-wider">COMPLETELY FREE — LIMITED TIME</span>
        </div>
      </motion.div>

      {/* Main Heading */}
      <motion.h1 
        variants={itemVariants}
        className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1]"
      >
        <span className="text-foreground">AWAKEN</span>
        <br />
        <span className="text-foreground">YOUR </span>
        <span className="text-primary text-glow-primary">INNER</span>
        <br />
        <motion.span 
          className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
          animate={{ 
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ backgroundSize: "200% 200%" }}
        >
          HUNTER
        </motion.span>
      </motion.h1>

      {/* Description */}
      <motion.p 
        variants={itemVariants}
        className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 font-body leading-relaxed"
      >
        Experience the ultimate AI fitness companion inspired by{" "}
        <span className="text-secondary font-semibold">Solo Leveling</span>. 
        Complete daily missions, level up your stats, and become the strongest version of yourself.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
      >
        <Link href="/register">
          <Button  className="group w-full sm:w-auto">
            <Zap className="h-5 w-5 group-hover:animate-pulse" />
            Start Free — No Limits
          </Button>
        </Link>
        <Button variant="outline"  className="group">
          <Star className="h-5 w-5" />
          Watch Demo
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-3 gap-6 pt-8 border-t border-border/20"
      >
        {[
          { value: "50K+", label: "Active Hunters", color: "text-primary" },
          { value: "1M+", label: "Quests Completed", color: "text-secondary" },
          { value: "98%", label: "Level Up Rate", color: "text-success" },
        ].map((stat) => (
          <motion.div 
            key={stat.label}
            className="text-center lg:text-left"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`font-display text-2xl md:text-3xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
