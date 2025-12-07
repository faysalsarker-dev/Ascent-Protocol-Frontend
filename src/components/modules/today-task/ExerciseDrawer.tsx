"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
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
import { Exercise, PreviousPerformance } from "@/src/types/workout";
import {
  GlitchText,
  CornerBracket,
  ScanlineOverlay,
} from "./GamifiedEffects";
import { useCreateExerciseSet } from "@/src/hooks/useExerciseSets";
import { ScrollArea } from "@/src/components/ui/scroll-area";

interface ExerciseDrawerProps {
  exercise: Exercise | null;
  currentSeasion?: any;
  sessoinId: string;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (exerciseId: string) => void;
}

interface FormValues {
  reps: string;
  weight: string;
}

export const ExerciseDrawer = ({
  exercise,
  sessoinId,
  currentSeasion,
  isOpen,
  onClose,
  onComplete,
}: ExerciseDrawerProps) => {
  const { register, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues: { reps: "", weight: "" },
  });

  const { mutate, isPending } = useCreateExerciseSet(sessoinId);

  // Dummy previous performance (replace with API later)
  const previousPerformance: PreviousPerformance = {
    date: "2024-01-10",
    sets: [
      { reps: 13, weight: 50 },
      { reps: 12, weight: 50 },
      { reps: 13, weight: 45 },
    ],
  };

  const onAdd = (data: FormValues) => {
    if (!exercise) return;

    const existingSetsForExercise =
      currentSeasion?.exerciseSets?.filter(
        (s: any) => s.exerciseName === exercise.exerciseName
      ) || [];

    const nextSetNumber = existingSetsForExercise.length + 1;

    const payload = {
      exerciseName: exercise.exerciseName,
      muscleGroup: exercise.muscleGroup,
      setNumber: nextSetNumber,
      reps: parseInt(data.reps),
      weight: parseFloat(data.weight),
    };

    mutate(payload, {
      onSuccess: () => {
        reset(); // Clear the form
        // Optionally refetch session to show new sets
      },
    });
  };

  const handleComplete = () => {
    if (!exercise) return;
    onComplete(exercise.id);
    onClose();
  };

  if (!exercise) return null;

  const watchReps = watch("reps");
  const watchWeight = watch("weight");

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
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

            {/* PREVIOUS PERFORMANCE */}
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
                  {previousPerformance.sets.map((set, i) => (
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
            <motion.div
              className="flex items-start gap-3 mb-5 p-3 rounded-sm bg-primary/5 border border-primary/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MessageSquare className="w-4 h-4 text-primary mt-0.5" />
              </motion.div>
              <p className="text-xs text-primary/90 font-mono leading-relaxed">
                ◆ SYSTEM: Exceed your limits. Shadow extraction awaits the
                worthy. ◆
              </p>
            </motion.div>

            {/* SINGLE INPUT SET USING REACT HOOK FORM */}
            <form onSubmit={handleSubmit(onAdd)} className="space-y-4 mb-6">
              <h4 className="text-xs text-muted-foreground flex items-center gap-2 font-mono uppercase tracking-wider">
                <Swords className="w-4 h-4 text-primary" />
                Log Your Set
              </h4>

              <div className="flex items-center gap-3 p-3 rounded-sm bg-card/20 border border-border/30">
                <input
                  type="number"
                  placeholder="Reps"
                  {...register("reps", { required: true })}
                  className="w-full px-3 py-2 rounded-sm bg-background/50 border border-border/40
                  text-center text-sm font-mono focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                />

                <input
                  type="number"
                  placeholder="Weight (kg)"
                  {...register("weight", { required: true })}
                  className="w-full px-3 py-2 rounded-sm bg-background/50 border border-border/40
                  text-center text-sm font-mono focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                />

                <Button
                  type="submit"
                  disabled={isPending || !watchReps || !watchWeight}
                  className="h-9 gap-1 font-mono text-xs disabled:opacity-60 disabled:pointer-events-none"
                >
                  {isPending ? "Adding..." : <Plus className="w-3 h-3" />}
                  Add
                </Button>
              </div>
            </form>

            {/* DISPLAY ALL SETS */}
            <AnimatePresence>
              {currentSeasion?.exerciseSets
                ?.filter((s: any) => s.exerciseName === exercise.exerciseName)
                .map((set: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-3 rounded-sm bg-background/30 border border-border/40 flex items-center justify-between"
                  >
                    <span className="font-mono text-sm text-primary">
                      Set {set.setNumber}: {set.reps} reps × {set.weight}kg
                    </span>
                  </motion.div>
                ))}
            </AnimatePresence>

            {/* COMPLETE BUTTON */}
            <motion.button
              className="relative w-full py-4 px-6 rounded-sm bg-linear-to-r from-primary to-primary/80 text-primary-foreground font-mono font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleComplete}
              style={{
                boxShadow: "0 0 20px hsl(var(--primary) / 0.4)",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />

              <Award className="w-5 h-5" />
              <span>Complete Exercise</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>

            {/* XP PREVIEW */}
            <motion.div
              className="flex items-center justify-center gap-2 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-xs font-mono text-yellow-500">
                +25 XP on completion
              </span>
            </motion.div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};
