import { Card, CardContent } from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";
import { motion } from "framer-motion";
import { Flame, Trophy } from "lucide-react";
import type { DashboardStats, WidgetState } from "./types";
import { ErrorCard } from "./ErrorCard";

interface StreakCardProps {
  data: DashboardStats | undefined ;
  isLoading:boolean;
  onRetry: () => void;
}

export function StreakCard({ data,isLoading, onRetry }: StreakCardProps) {
  if (isLoading) {
    return (
      <Card className="card-glow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-12 w-24" />
          </div>
        </CardContent>
      </Card>
    );
  }

 




  const currentStreak = data?.currentStreak ?? 0;
const longestStreak = data?.longestStreak ?? 0;


  const isOnFire = currentStreak >= 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className={`card-glow overflow-hidden ${isOnFire ? 'streak-glow' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div 
                className={`relative p-3 rounded-full ${isOnFire ? 'bg-warning/20' : 'bg-muted'}`}
                animate={isOnFire ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Flame className={`h-8 w-8 ${isOnFire ? 'text-warning' : 'text-muted-foreground'}`} />
                {isOnFire && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-warning/30"
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Current Streak</p>
                <div className="flex items-baseline gap-1">
                  <motion.span 
                    className={`stat-value ${isOnFire ? 'text-warning text-glow-accent' : 'text-foreground'}`}
                    key={currentStreak}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                  >
                    {currentStreak}
                  </motion.span>
                  <span className="text-sm text-muted-foreground">days</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
              <Trophy className="h-4 w-4 text-accent" />
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Best</p>
                <p className="text-lg font-display font-bold text-accent">{longestStreak}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
