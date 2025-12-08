"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/src/components/ui/drawer";
import {
  Target,
  TrendingUp,
  MessageSquare,
  ChevronRight,
  Plus,
  Zap,
  Swords,
  Award,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Exercise, PreviousPerformance } from "@/src/types/workout";
import {
  GlitchText,
  CornerBracket,
  ScanlineOverlay,
} from "./GamifiedEffects";
import { useCreateExerciseSetBulk } from "@/src/hooks/useExerciseSets";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { useEffect } from "react";

interface ExerciseDrawerProps {
  exercise: Exercise | null;
  lastSession?: any;
  sessoinId: string;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (exerciseId: string) => void;
}

interface SetForm {
  reps: string;
  weight: string;
}

interface FormValues {
  sets: SetForm[];
}

export const ExerciseDrawer = ({
  exercise,
  sessoinId,
  lastSession,
  isOpen,
  onClose,
  onComplete,
}: ExerciseDrawerProps) => {
  const { mutate, isPending } = useCreateExerciseSetBulk(sessoinId);

  const { control, register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      sets: [],
    },
  });

console.log(exercise,'lastsession from diualog');

  const { fields, append, replace } = useFieldArray({
    control,
    name: "sets",
  });

  /** AUTO GENERATE TARGET SETS WHEN EXERCISE OPENS */
  useEffect(() => {
    if (exercise?.targetSets) {
      const autoSets = Array.from({ length: exercise.targetSets }, () => ({
        reps: "",
        weight: "",
      }));
      replace(autoSets);
    }
  }, [exercise]);

;

  const onSubmit = (data: FormValues) => {
    if (!exercise) return;

    const cleaned = data.sets.map((set, i) => ({
      setNumber: i + 1,
      reps: Number(set.reps),
      weight: Number(set.weight),
    }));

    const payload = {
      exerciseName: exercise.exerciseName,
      muscleGroup: exercise.muscleGroup,
      sets: cleaned,
    };

    mutate(payload, {
      onSuccess: () => {
   const key = "completedExercises";
const stored = JSON.parse(localStorage.getItem(key) || "[]");

stored.push({
  exerciseName: exercise.exerciseName,
  date: Date.now(),
  sessionId: sessoinId,
});

localStorage.setItem(key, JSON.stringify(stored));


        reset();
        onComplete(exercise.id);
        onClose();
      },
    });
  };

  if (!exercise) return null;






// extract dynamic previous performance
const previousPerformance: PreviousPerformance | null = (() => {
  if (!lastSession?.exerciseSets || !exercise?.exerciseName) return null;

  const filtered = lastSession?.exerciseSets
    .filter((s: any) => s?.exerciseName === exercise.exerciseName)
    .sort((a: any, b: any) => a?.setNumber - b?.setNumber);

  if (filtered.length === 0) return null;

  return {
    date: lastSession.createdAt || filtered[0].createdAt,
    sets: filtered.map((s: any) => ({
      reps: s?.reps,
      weight: s?.weight,
    })),
  };
})();











  return (
    <Drawer open={isOpen} onOpenChange={() => onClose()}>
      <DrawerContent className="bg-background/95 backdrop-blur-xl border-t border-primary/40 overflow-hidden">
        <ScrollArea className="h-full">
          <ScanlineOverlay />

          <div className="relative z-10 mx-auto w-full max-w-lg px-4 pb-8">
            {/* HEADER */}
            <DrawerHeader className="px-0 relative">
              <CornerBracket position="tl" />
              <CornerBracket position="tr" />

              <DrawerTitle className="font-display text-lg text-foreground flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  <Target className="w-5 h-5 text-primary" />
                </motion.div>
                <GlitchText>{exercise.exerciseName}</GlitchText>
              </DrawerTitle>

              <div className="flex items-center gap-2 mt-3">
                <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] rounded-sm bg-primary/10 text-primary border border-primary/30 font-mono uppercase">
                  <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                  {exercise.muscleGroup}
                </span>
                <span className="text-sm text-muted-foreground font-mono">
                  {exercise.targetSets} sets × {exercise.targetReps} reps
                </span>
              </div>
            </DrawerHeader>

            {/* PREVIOUS DAY */}
                  <motion.div
              className="relative mb-5 p-4 rounded-sm bg-card/30 border border-accent/30 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CornerBracket position="tl" color="accent" />
              <CornerBracket position="br" color="accent" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span className="text-xs text-accent font-mono uppercase tracking-wider">
                    Previous Session
                  </span>
                </div>

                <div className="flex gap-2">
                  {previousPerformance?.sets.map((set, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 p-3 rounded-sm bg-background/50 border border-border/30 text-center"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <span className="text-xl font-bold text-foreground font-mono">
                        {set.reps}
                      </span>
                      <span className="text-[10px] text-muted-foreground block font-mono uppercase">
                        reps
                      </span>
                      <span className="text-xs text-primary font-mono font-bold">
                        {set.weight}kg
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>


            {/* SYSTEM MESSAGE */}
            <motion.div className="flex items-start gap-3 mb-5 p-3 rounded-sm bg-primary/5 border border-primary/20">
              <MessageSquare className="w-4 h-4 text-primary mt-0.5" />
              <p className="text-xs text-primary/90 font-mono">
                ◆ SYSTEM: Log all required sets before completing. ◆
              </p>
            </motion.div>

            {/* SET INPUT FIELDS */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <h4 className="text-xs text-muted-foreground flex items-center gap-2 font-mono uppercase tracking-wider">
                <Swords className="w-4 h-4 text-primary" />
                Log Sets
              </h4>

              <div className="space-y-3">
                {fields.map((f, index) => (
                  <div
                    key={f.id}
                    className="flex items-center gap-3 p-3 rounded-sm bg-card/20 border border-border/30"
                  >
                    <Input
                      type="number"
                      placeholder="Reps"
                      {...register(`sets.${index}.reps`, { required: true })}
                      className="font-mono text-center"
                    />

                    <Input
                      type="number"
                      placeholder="Weight (kg)"
                      {...register(`sets.${index}.weight`, { required: true })}
                      className="font-mono text-center"
                    />
                  </div>
                ))}
              </div>

              {/* ADD EXTRA SET */}
              <Button
                type="button"
                variant="secondary"
                className="w-full font-mono text-xs"
                onClick={() => append({ reps: "", weight: "" })}
              >
                <Plus className="w-3 h-3 mr-1" /> Add Extra Set
              </Button>

              {/* COMPLETE BUTTON */}
              <Button
                type="submit"
                className="w-full font-mono text-xs"
                disabled={isPending}
              >
                {isPending ? "Saving..." : "Complete Exercise"}
              </Button>
            </form>

            {/* XP */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-xs font-mono text-yellow-500">+25 XP</span>
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};
