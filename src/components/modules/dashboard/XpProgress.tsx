import { Card, CardContent } from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
import { Skeleton } from "@/src/components/ui/skeleton";
import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import type { DashboardStats, WidgetState } from "./types";
import { ErrorCard } from "./ErrorCard";

interface XpProgressProps {
  data: DashboardStats | undefined;
  onRetry: () => void;
}

const XP_PER_LEVEL = 1000;

export function XpProgress({ data, onRetry }: XpProgressProps) {

if (!data) {
  return <ErrorCard message="No XP_PER_LEVEL data available" onRetry={onRetry} />;
}

  const { totalXpEarned } = data ;
  const currentLevel = Math.floor(totalXpEarned / XP_PER_LEVEL) + 1;
  const xpInCurrentLevel = totalXpEarned % XP_PER_LEVEL;
  const progressPercent = (xpInCurrentLevel / XP_PER_LEVEL) * 100;
  const xpToNextLevel = XP_PER_LEVEL - xpInCurrentLevel;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Card className="card-glow overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-accent/20">
                <Sparkles className="h-4 w-4 text-accent" />
              </div>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Experience</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-accent/20">
              <Star className="h-3.5 w-3.5 text-accent fill-accent" />
              <span className="text-sm font-display font-bold text-accent">LVL {currentLevel}</span>
            </div>
          </div>

          <div className="relative">
            <Progress 
              value={progressPercent} 
              className="h-3 bg-muted"
            />
            <motion.div
              className="absolute inset-0 h-3 rounded-full overflow-hidden pointer-events-none"
              initial={false}
            >
              <motion.div
                className="h-full xp-shine"
                style={{ width: `${progressPercent}%` }}
              />
            </motion.div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              {xpInCurrentLevel.toLocaleString()} / {XP_PER_LEVEL.toLocaleString()} XP
            </span>
            <span className="text-xs text-accent">
              {xpToNextLevel.toLocaleString()} XP to next level
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
