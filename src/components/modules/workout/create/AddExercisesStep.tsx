import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { toast } from "sonner";
import {
  Trophy,
  Plus,
  Dumbbell,
  Target,
  AlertTriangle,
  Loader2,
  ChevronLeft,
  Zap,
  Sparkles
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useWorkoutBuilder } from "@/src/context/WorkoutBuilderContext";
import { 
  GlitchText, 
  CornerBracket, 
  HexagonIcon,
  StatusBadge
} from "@/src/components/modules/today-task/GamifiedEffects";
import { useCreateExercise } from "@/src/hooks/useWorkoutPlan";
import { ExerciseFormData } from "@/src/types/workout.types";

type MuscleGroup = 
  | "CHEST"
  | "BACK"
  | "SHOULDERS"
  | "BICEPS"
  | "TRICEPS"
  | "LEGS"
  | "GLUTES"
  | "CORE"
  | "CARDIO"
  | "FULL_BODY";

const MUSCLE_GROUPS: MuscleGroup[] = [
  "CHEST",
  "BACK",
  "SHOULDERS",
  "BICEPS",
  "TRICEPS",
  "LEGS",
  "GLUTES",
  "CORE",
  "CARDIO",
  "FULL_BODY",
];

const DAYS_MAP: Record<number, string> = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};



const AddExercisesStep = () => {
  const { state, addExercise, goToPreviousStep } = useWorkoutBuilder();
  const { workoutDays, exercises } = state;
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);
    const {mutateAsync , isPending}=useCreateExercise(selectedDayId as string)


  const workoutDays_filtered = workoutDays.filter((d) => !d.isRestDay);
  const selectedDay = workoutDays_filtered.find((d) => d.id === selectedDayId);


  const {
    register,
    handleSubmit,
    control,
    reset: resetForm,
    formState: { errors },
  } = useForm<ExerciseFormData>({
    defaultValues: {
      exerciseName: "",
      targetSets: 3,
      targetReps: "",
      targetWeight: undefined,
      restSeconds: undefined,
      notes: "",
    },
  });

  const handleAddExercise = async (data: ExerciseFormData) => {
    if (!selectedDayId) {
      toast.error("Please select a day first");
      return;
    }


    const payload = {

           exerciseName: data.exerciseName,
      muscleGroup: data.muscleGroup,
      targetReps: data.targetReps,
      targetSets: data.targetSets,
      targetWeight: data.targetWeight,
      restSeconds: data.restSeconds,
      notes: data.notes,
    }

const result = await mutateAsync(payload)
  
    
    const exerciseData = {
      id: result?.data?.id,
      exerciseName: data.exerciseName,
      muscleGroup: data.muscleGroup,
      targetReps: data.targetReps,
      targetSets: data.targetSets,
      targetWeight: data.targetWeight,
      restSeconds: data.restSeconds,
      notes: data.notes,
    };
    addExercise(selectedDayId, exerciseData);
    resetForm({
      exerciseName: "",
      targetSets: 3,
      targetReps: "",
      targetWeight: undefined,
      restSeconds: undefined,
      notes: "",
    });
    toast.success("Exercise added!");
  };

  const handleFinish = () => {
    const totalExercises = Object.values(exercises).flat().length;
    
    if (totalExercises === 0) {
      toast.error("Add at least one exercise");
      return;
    }

    toast.success('Workout plan complete');

  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Day Selection */}
      <div className="relative bg-card/60 backdrop-blur-xl border border-primary/30 rounded-sm p-5">
        <CornerBracket position="tl" color="primary" />
        <CornerBracket position="br" color="primary" />

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-system text-primary flex items-center gap-2">
            <Target className="w-4 h-4" />
            <GlitchText>SELECT TRAINING DAY</GlitchText>
          </h3>
          <StatusBadge 
            label="EXERCISES" 
            value={`${Object.values(exercises).flat().length}`} 
            color="primary" 
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {workoutDays_filtered.map((day) => {
            const exerciseCount = exercises[day.id!]?.length || 0;
            const isSelected = selectedDayId === day.id;

            return (
              <motion.button
                key={day.id}
                onClick={() => setSelectedDayId(day.id!)}
                className={cn(
                  "p-3 rounded-sm text-left transition-all duration-300 border-2 relative overflow-hidden",
                  isSelected
                    ? "bg-primary/20 border-primary"
                    : "bg-muted/30 border-border/50 hover:border-primary/50"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                      boxShadow: [
                        "inset 0 0 10px rgba(0, 255, 197, 0.2)",
                        "inset 0 0 20px rgba(0, 255, 197, 0.2)",
                        "inset 0 0 10px rgba(0, 255, 197, 0.2)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                <span className="text-[10px] text-muted-foreground font-system block">
                  {DAYS_MAP[day.dayOfWeek]}
                </span>
                <span className="font-system text-sm font-bold truncate block">
                  {day.name}
                </span>
                {exerciseCount > 0 && (
                  <span className="text-[10px] text-primary mt-1 block font-mono">
                    {exerciseCount} exercise{exerciseCount > 1 ? "s" : ""}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Exercise Form */}
      <AnimatePresence mode="wait">
        {selectedDay && (
          <motion.div
            key={selectedDayId}
            className="relative bg-card/60 backdrop-blur-xl border border-primary/30 rounded-sm p-6"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
          >
            <CornerBracket position="tl" color="primary" />
            <CornerBracket position="tr" color="primary" />
            <CornerBracket position="bl" color="primary" />
            <CornerBracket position="br" color="primary" />

            <div className="flex items-center gap-4 mb-6">
              <HexagonIcon icon={Dumbbell} color="primary" size="md" />
              <div>
                <h2 className="font-system text-lg font-bold">
                  <GlitchText className="text-glow">{selectedDay.name.toUpperCase()}</GlitchText>
                </h2>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-primary" />
                  {DAYS_MAP[selectedDay.dayOfWeek]} • Add exercises
                </p>
              </div>
            </div>

            {/* Existing Exercises */}
            {exercises[selectedDayId!]?.length > 0 && (
              <div className="mb-5 space-y-2">
                {exercises[selectedDayId!].map((ex, idx) => (
                  <motion.div
                    key={ex.id}
                    className="flex items-center gap-3 p-3 rounded-sm bg-muted/30 border border-border/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <span className="w-6 h-6 rounded-sm bg-primary/20 flex items-center justify-center text-xs font-system text-primary">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-system text-sm truncate">
                        {ex.exerciseName}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {ex.targetSets} × {ex.targetReps} • {ex.muscleGroup}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit(handleAddExercise)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Exercise Name */}
                <div className="sm:col-span-2 space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Zap className="w-3 h-3 text-primary" />
                    Exercise Name
                  </Label>
                  <Input
                    placeholder="e.g., Incline Bench Press"
                    className={`bg-background/60 border-primary/30 focus:border-primary ${
                      errors.exerciseName ? "border-destructive" : ""
                    }`}
                    {...register("exerciseName")}
                  />
                  {errors.exerciseName && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {errors.exerciseName.message}
                    </p>
                  )}
                </div>

                {/* Muscle Group */}
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                    Muscle Group
                  </Label>
                  <Controller
                    name="muscleGroup"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full h-11 bg-background/60 border-primary/30 focus:border-primary">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-card/95 backdrop-blur-xl border-primary/30">
                          {MUSCLE_GROUPS.map((group) => (
                            <SelectItem
                              key={group}
                              value={group}
                              className="font-mono"
                            >
                              {group.replace("_", " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.muscleGroup && (
                    <p className="text-xs text-destructive">Select a muscle group</p>
                  )}
                </div>

                {/* Sets & Reps */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                      Sets
                    </Label>
                    <Input
                      type="number"
                      placeholder="3"
                      className={`bg-background/60 border-primary/30 focus:border-primary ${
                        errors.targetSets ? "border-destructive" : ""
                      }`}
                      {...register("targetSets")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                      Reps
                    </Label>
                    <Input
                      type="text"
                      placeholder="8-12"
                      className={`bg-background/60 border-primary/30 focus:border-primary ${
                        errors.targetReps ? "border-destructive" : ""
                      }`}
                      {...register("targetReps")}
                    />
                  </div>
                </div>

                {/* Weight */}
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                    Weight (kg)
                  </Label>
                  <Input
                    type="number"
                    placeholder="Optional"
                    className="bg-background/60 border-primary/30 focus:border-primary"
                    {...register("targetWeight")}
                  />
                </div>

                {/* Rest */}
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                    Rest (sec)
                  </Label>
                  <Input
                    type="number"
                    placeholder="Optional"
                    className="bg-background/60 border-primary/30 focus:border-primary"
                    {...register("restSeconds")}
                  />
                </div>

                {/* Notes */}
                <div className="sm:col-span-2 space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                    Notes (Optional)
                  </Label>
                  <Textarea
                    placeholder="e.g., Focus on controlled movement"
                    className="bg-background/60 border-primary/30 focus:border-primary min-h-[60px]"
                    {...register("notes")}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 font-system text-sm uppercase tracking-widest border border-primary/50 bg-primary/20 hover:bg-primary/30 text-primary"
              >
                {isPending? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    ADD EXERCISE
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3">
        <Button
          variant="ghost"
          size="lg"
          onClick={goToPreviousStep}
          className="flex-1 font-system uppercase tracking-widest border border-border/50 hover:border-primary/50 hover:bg-primary/10"
        >
          <ChevronLeft className="w-4 h-4" />
          BACK
        </Button>
        <Button
          size="lg"
          onClick={handleFinish}
          className="flex-1 font-system uppercase tracking-widest bg-primary hover:bg-primary/90 relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <Trophy className="w-4 h-4" />
          FINISH PLAN
        </Button>
      </div>
    </motion.div>
  );
};

export default AddExercisesStep;
