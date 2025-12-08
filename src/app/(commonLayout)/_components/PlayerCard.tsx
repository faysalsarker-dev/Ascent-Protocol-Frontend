
"use client";
import { Swords, Trophy, Target, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";

const PlayerCard = () => {
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, scale: 0.9, x: 50 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="relative max-w-md mx-auto">
        {/* Glow Effect */}
        <motion.div 
          className="absolute inset-0 bg-linear-to-br from-primary/30 via-secondary/20 to-accent/30 blur-3xl rounded-3xl"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        {/* Player Card */}
        <motion.div 
          className="relative golden-border p-1 rounded-2xl"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="bg-card-gradient rounded-2xl p-6 space-y-6 backdrop-blur-xl border border-border/20">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-16 h-16 rounded-xl bg-linear-to-br from-accent/30 to-secondary/30 border border-accent/50 flex items-center justify-center relative overflow-hidden"
                  whileHover={{ rotate: 5 }}
                >
                  <span className="font-display text-2xl font-bold text-accent">S</span>
                  <div className="absolute inset-0 bg-linear-to-t from-accent/20 to-transparent" />
                </motion.div>
                <div>
                  <div className="font-display text-lg font-bold text-foreground tracking-wide">SHADOW MONARCH</div>
                  <div className="text-sm text-accent font-semibold">S-Rank Hunter</div>
                </div>
              </div>
              <motion.div 
                className="text-right"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="font-display text-3xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">LV.99</div>
              </motion.div>
            </div>

            {/* XP Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Experience</span>
                <span className="text-primary font-semibold">MAX LEVEL</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden relative">
                <motion.div 
                  className="h-full bg-xp-gradient rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, delay: 1 }}
                />
                <div className="absolute inset-0 shimmer" />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: TrendingUp, label: "Strength", value: "999", color: "text-success" },
                { icon: Target, label: "Agility", value: "999", color: "text-warning" },
                { icon: Trophy, label: "Endurance", value: "999", color: "text-primary" },
                { icon: Swords, label: "Power", value: "∞", color: "text-secondary" },
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="bg-muted/30 rounded-xl p-4 border border-border/30 hover:border-primary/30 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                  <div className="font-display text-xl font-bold text-foreground">{stat.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Daily Quest */}
            <motion.div 
              className="bg-accent/10 border border-accent/30 rounded-xl p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-accent uppercase tracking-wide flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Daily Quest
                </span>
                <span className="text-xs bg-success/20 text-success px-3 py-1 rounded-full font-semibold">+1000 XP</span>
              </div>
              <div className="text-foreground font-medium mb-2">Complete 100 Push-ups Challenge</div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-success rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 1.8 }}
                />
              </div>
              <div className="text-xs text-success mt-2 font-semibold">✓ COMPLETED</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PlayerCard;
