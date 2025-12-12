import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Skeleton } from "@/src/components/ui/skeleton";
import { motion } from "framer-motion";
import { Clock, Dumbbell, Zap, Smile, Meh, Frown, Battery, BatteryLow } from "lucide-react";
import { format, parseISO } from "date-fns";
import type { RecentWorkout, WidgetState } from "./types";
import { ErrorCard } from "./ErrorCard";

interface RecentWorkoutsProps {
  data: WidgetState<RecentWorkout[]>;
  onRetry: () => void;
}

const moodConfig = {
  EXCELLENT: { icon: Smile, color: 'text-success', bg: 'bg-success/20', label: 'Excellent' },
  GOOD: { icon: Smile, color: 'text-primary', bg: 'bg-primary/20', label: 'Good' },
  AVERAGE: { icon: Meh, color: 'text-muted-foreground', bg: 'bg-muted', label: 'Average' },
  TIRED: { icon: Battery, color: 'text-warning', bg: 'bg-warning/20', label: 'Tired' },
  EXHAUSTED: { icon: BatteryLow, color: 'text-destructive', bg: 'bg-destructive/20', label: 'Exhausted' },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

export function RecentWorkouts({ data, onRetry }: RecentWorkoutsProps) {
  if (data.status === 'loading') {
    return (
      <Card className="card-glow">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (data.status === 'error') {
    return <ErrorCard message={data.message} onRetry={onRetry} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <Card className="card-glow">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display flex items-center gap-2">
            <Dumbbell className="h-4 w-4 text-primary" />
            Recent Workouts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="space-y-2"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {data.data.slice(0, 5).map((workout) => {
              const mood = moodConfig[workout.mood];
              const MoodIcon = mood.icon;
              
              return (
                <motion.div
                  key={workout.id}
                  variants={item}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                >
                  <div className={`p-2 rounded-lg ${mood.bg}`}>
                    <MoodIcon className={`h-5 w-5 ${mood.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{workout.dayName}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{format(parseISO(workout.sessionDate), 'MMM d')}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {workout.durationMin}m
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30 text-xs">
                      <Zap className="h-3 w-3 mr-1" />
                      +{workout.xpEarned}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
