import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Skeleton } from "@/src/components/ui/skeleton";
import { motion } from "framer-motion";
import { Trophy, Dumbbell, Calendar } from "lucide-react";
import { format, parseISO } from "date-fns";
import type { PersonalRecord, WidgetState } from "./types";
import { ErrorCard } from "./ErrorCard";

interface PersonalRecordsProps {
  data: WidgetState<PersonalRecord[]>;
  onRetry: () => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 }
};

export function PersonalRecords({ data, onRetry }: PersonalRecordsProps) {
  if (data.status === 'loading') {
    return (
      <Card className="card-glow">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="h-4 w-28 mb-1" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-8 w-20" />
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
      transition={{ duration: 0.4, delay: 0.7 }}
    >
      <Card className="card-glow">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display flex items-center gap-2">
            <Trophy className="h-4 w-4 text-accent" />
            Personal Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="space-y-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {data.data.map((record, index) => (
              <motion.div
                key={`${record.exerciseName}-${index}`}
                variants={item}
                className="flex items-center gap-3 p-3 rounded-lg bg-accent/5 border border-accent/20 hover:bg-accent/10 transition-colors"
              >
                <div className="p-2 rounded-lg bg-accent/20">
                  <Dumbbell className="h-5 w-5 text-accent" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{record.exerciseName}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-xs capitalize bg-muted/50">
                      {record.muscleGroup.toLowerCase()}
                    </Badge>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(parseISO(record.achievedAt), 'MMM d')}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-display font-bold text-accent">
                    {record.maxWeight}kg
                  </p>
                  <p className="text-xs text-muted-foreground">
                    × {record.maxReps} reps
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
