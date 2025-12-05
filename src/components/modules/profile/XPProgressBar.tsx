import { motion } from "framer-motion";
import { Zap, ChevronUp, TrendingUp } from "lucide-react";

interface XPProgressBarProps {
  xp: number;
  level: number;
}

export const XPProgressBar = ({ xp, level }: XPProgressBarProps) => {
  const xpForCurrentLevel = level * 1000;
  const xpForNextLevel = (level + 1) * 1000;
  const xpInCurrentLevel = xp - (level > 1 ? (level - 1) * 1000 : 0);
  const xpNeeded = xpForNextLevel - xpForCurrentLevel;
  const progress = Math.min((xpInCurrentLevel / xpNeeded) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mx-4 system-window rounded-lg p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary/20 border border-primary/40 flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary animate-pulse" />
          </div>
          <div>
            <span className="font-display text-xs tracking-widest text-muted-foreground">
              EXPERIENCE POINTS
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-primary">
          <ChevronUp className="w-4 h-4" />
          <span className="font-mono text-sm">LV.{level + 1}</span>
        </div>
      </div>

      {/* XP Bar */}
      <div className="xp-bar-game rounded">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
          className="xp-bar-fill-game rounded"
        />
        
        {/* Percentage marker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute top-1/2 -translate-y-1/2 right-2 font-mono text-[10px] text-foreground font-bold"
          style={{ textShadow: "0 0 10px black" }}
        >
          {Math.round(progress)}%
        </motion.div>
      </div>

      {/* XP Numbers */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-primary" />
          <span className="font-mono text-xs glow-text-primary">
            {xpInCurrentLevel.toLocaleString()}
          </span>
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          / {xpNeeded.toLocaleString()} XP
        </span>
      </div>

      {/* Daily bonus indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-3 pt-3 border-t border-primary/20"
      >
        <div className="flex items-center justify-between">
          <span className="font-body text-xs text-muted-foreground">
            Daily Quest Bonus
          </span>
          <span className="font-mono text-xs text-warning">+250 XP</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
