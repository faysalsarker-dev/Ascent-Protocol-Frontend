import { motion } from "framer-motion";
import {
  Target,
  ChevronRight,
  Check,
  FileText,
  Zap,
  Swords,
} from "lucide-react";
import { Card } from "@/src/components/ui/card";
import { CornerBracket } from "./GamifiedEffects";

type Exercise = {
  id?: string;
  exerciseName?: string;
  muscleGroup:
    | "CHEST"
    | "BACK"
    | "LEGS"
    | "ARMS"
    | "SHOULDER"
    | "CARDIO"
    | "CORE"
    | "FULL_BODY";
  targetSets: number;
  targetReps: string;
  notes?: string | undefined;
};

interface TaskCardProps {
  exercise: Exercise;
  index: number;
  isCompleted?: boolean;
  onClick: () => void;
}

export const TaskCard = ({
  exercise,
  index,
  isCompleted = false,
  onClick,
}: TaskCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
    >
      <Card
        className={`relative overflow-hidden cursor-pointer transition-all duration-300 rounded-sm border ${
          isCompleted
            ? "bg-primary/10 border-primary/40"
            : "bg-card/30 hover:bg-card/60 border-border/40 hover:border-primary/40"
        }`}
        onClick={onClick}
      >
        {/* Corner Brackets */}
        <CornerBracket
          position="tl"
          color={isCompleted ? "primary" : "primary"}
        />
        <CornerBracket
          position="br"
          color={isCompleted ? "primary" : "primary"}
        />

        {/* Completed glow effect */}
        {isCompleted && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background:
                "linear-gradient(90deg, hsl(var(--primary) / 0.1), transparent, hsl(var(--primary) / 0.1))",
            }}
          />
        )}

        {/* Hover scan effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
          whileHover={{
            background: [
              "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.1), transparent)",
            ],
            backgroundPosition: ["0% 0%", "200% 0%"],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />

        <div className="p-4 relative z-10">
          <div className="flex items-center gap-4">
            {/* Index/Check Badge */}
            <motion.div
              className={`relative w-12 h-12 rounded-sm flex items-center justify-center font-mono text-sm font-bold border ${
                isCompleted
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/30 text-muted-foreground border-border/50"
              }`}
              animate={
                isCompleted
                  ? {
                      boxShadow: [
                        "0 0 0 0 hsl(var(--primary) / 0)",
                        "0 0 15px 3px hsl(var(--primary) / 0.4)",
                        "0 0 0 0 hsl(var(--primary) / 0)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity }}
            >
              {isCompleted ? (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Check className="w-6 h-6" />
                </motion.div>
              ) : (
                <span className="text-lg">
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}

              {/* Corner accent */}
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary/50" />
            </motion.div>

            {/* Exercise Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3
                  className={`font-semibold truncate ${
                    isCompleted
                      ? "text-primary line-through"
                      : "text-foreground"
                  }`}
                >
                  {exercise.exerciseName}
                </h3>
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 px-1.5 py-0.5 bg-yellow-500/20 border border-yellow-500/30 rounded-sm"
                  >
                    <Zap className="w-3 h-3 text-yellow-500" />
                    <span className="text-[10px] font-mono text-yellow-500">
                      +25 XP
                    </span>
                  </motion.div>
                )}
              </div>

              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex items-center gap-1 text-sm text-primary">
                  <Target className="w-3 h-3" />
                  <span className="font-mono">{exercise.targetSets} sets</span>
                </div>

                {exercise.targetReps !== "0" && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Swords className="w-3 h-3" />
                    <span className="font-mono">
                      {exercise.targetReps} reps
                    </span>
                  </div>
                )}
              </div>

              {/* Muscle Group Tag */}
              <div className="mt-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded-sm bg-accent/10 text-accent border border-accent/20 font-mono uppercase tracking-wider">
                  <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                  {exercise.muscleGroup}
                </span>
              </div>
            </div>

            {/* Arrow */}
            <motion.div
              className="text-primary/50"
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.div>
          </div>

          {/* Notes */}
          {exercise.notes && (
            <motion.div
              className="mt-3 pt-3 border-t border-border/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <FileText className="w-3 h-3 mt-0.5 shrink-0 text-primary/50" />
                <span className="line-clamp-2 font-mono">{exercise.notes}</span>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
