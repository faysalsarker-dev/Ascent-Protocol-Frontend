import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";
import { motion } from "framer-motion";
import { 
  Dumbbell, 
  Target, 
  Calendar, 
  Clock,
} from "lucide-react";
import type { DashboardStats, WidgetState } from "./types";
import { ErrorCard } from "./ErrorCard";

interface StatCardsProps {
  data: DashboardStats | undefined;
  isLoading:boolean;
  onRetry: () => void;
}

interface StatConfig {
  key: keyof DashboardStats;
  label: string;
  icon: typeof Dumbbell;
  format: (v: number) => string;
  suffix?: string;
}

const stats: StatConfig[] = [
  { key: 'totalVolume', label: 'Total Volume', icon: Dumbbell, format: (v: number) => `${(v / 1000).toFixed(1)}k`, suffix: 'kg' },
  { key: 'totalWorkouts', label: 'Workouts', icon: Target, format: (v: number) => v.toString() },
  { key: 'thisWeekWorkouts', label: 'This Week', icon: Calendar, format: (v: number) => v.toString() },
  { key: 'avgWorkoutDuration', label: 'Avg Duration', icon: Clock, format: (v: number) => v.toString(), suffix: 'min' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function StatCards({ data, isLoading, onRetry }: StatCardsProps) {

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="card-glow">
            <CardContent className="p-4">
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-8 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }



  return (
    <motion.div 
      className="grid grid-cols-2 gap-3"
      variants={container}
      initial="hidden"
      animate="show"
    >

 
      {stats.map(({ key, label, icon: Icon, format, suffix }) => (
        <motion.div key={key} variants={item}>
          <Card className="card-glow overflow-hidden group hover:glow-primary transition-shadow duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
              </div>
              <div className="flex items-baseline gap-1">
          <span className="stat-value text-foreground">
  {data ? format(data[key]) : '0'}
</span>

                {suffix && (
                  <span className="text-sm text-muted-foreground">{suffix}</span>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}






    </motion.div>
  );
}
