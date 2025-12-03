"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Timer, Weight, Target, FileText, Play, Repeat } from "lucide-react";
import { ExerciseSet } from "@/src/types/workout";

interface ExerciseCardProps {
  exercise: ExerciseSet;
  index: number;
}

export function ExerciseCard({ exercise, index }: ExerciseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Card className="glass-elevated overflow-hidden group hover:border-primary/50 transition-all duration-300">
        <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
          <div className="flex items-start justify-between gap-2 sm:gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/20 text-primary text-xs sm:text-sm font-bold font-display shrink-0">
                  {index + 1}
                </span>
                <h3 className="text-base sm:text-lg font-semibold text-foreground truncate font-display tracking-wide">
                  {exercise.exerciseName}
                </h3>
              </div>
              <Badge variant="secondary" className="text-[10px] sm:text-xs bg-accent/20 text-accent border-accent/30">
                {exercise.muscleGroup}
              </Badge>
            </div>
            
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6 pb-3 sm:pb-6">
          {/* Main Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-lg bg-card/80 border border-border/50">
              <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground">Sets</p>
                <p className="text-xs sm:text-sm font-bold text-foreground">{exercise.targetSets}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-lg bg-card/80 border border-border/50">
              <Repeat className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground">Reps</p>
                <p className="text-xs sm:text-sm font-bold text-foreground">{exercise.targetReps}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-lg bg-card/80 border border-border/50">
              <Weight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground">Weight</p>
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  {exercise.targetWeight ? `${exercise.targetWeight} lbs` : "BW"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-lg bg-card/80 border border-border/50">
              <Timer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground">Rest</p>
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  {exercise.restSeconds ? `${exercise.restSeconds}s` : "—"}
                </p>
              </div>
            </div>
          </div>
          
          {/* Notes */}
          {exercise.notes && (
            <div className="flex items-start gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg bg-muted/30 border border-border/30">
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{exercise.notes}</p>
            </div>
          )}
        </CardContent>
        
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-primary/5 to-transparent" />
      </Card>
    </motion.div>
  );
}
