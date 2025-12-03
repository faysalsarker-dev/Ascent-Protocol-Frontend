
"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
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
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { FormInput } from "@/src/components/ui/FormInput";
import { MuscleGroup } from "@/src/types/workout.types";
import { useWorkoutBuilder } from "@/src/context/WorkoutBuilderContext";
import { useCreateExercise } from "@/src/hooks/useWorkoutPlan";

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

// Fixed schema with proper number handling
const exerciseSchema = z.object({
  exerciseName: z.string().min(2, "Exercise name required").max(50),
  muscleGroup: z.enum(MUSCLE_GROUPS as [MuscleGroup, ...MuscleGroup[]]),
  targetReps: z.string().min(1, "Required"),
  targetSets: z.preprocess(
    (val) => {
      if (val === '' || val === null || val === undefined) return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    },
    z.number().positive("Must be positive")
  ),
  // Use preprocess to handle empty strings and convert to numbers
  targetWeight: z.preprocess(
    (val) => {
      if (val === '' || val === null || val === undefined) return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    },
    z.number().positive("Must be positive").optional()
  ),
  restSeconds: z.preprocess(
    (val) => {
      if (val === '' || val === null || val === undefined) return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    },
    z.number().int("Must be a whole number").positive("Must be positive").optional()
  ),
  notes: z.string().max(200).optional(),
});

type ExerciseFormData = z.infer<typeof exerciseSchema>;

const AddExercisesStep = () => {
  const { state, addExercise, goToPreviousStep, reset } = useWorkoutBuilder();
  const { workoutDays, exercises } = state;
  
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);

  const workoutDays_filtered = workoutDays.filter((d) => !d.isRestDay);
  const selectedDay = workoutDays_filtered.find((d) => d.id === selectedDayId);

  const createExerciseMutation = useCreateExercise(selectedDayId || "");

  const {
    register,
    handleSubmit,
    control,
    reset: resetForm,
    formState: { errors },
  } = useForm<ExerciseFormData>({
    resolver: zodResolver(exerciseSchema),
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

    try {
      const result = await createExerciseMutation.mutateAsync(data);

      if (result?.success && result.data) {
        addExercise(selectedDayId, { ...data, id: result.data.id });
        resetForm({
          exerciseName: "",
          targetSets: "",
          targetReps: "",
          targetWeight: undefined,
          restSeconds: undefined,
          notes: "",
        });
      }
    } catch (error) {
      console.error("Create exercise error:", error);
    }
  };

  const handleFinish = () => {
    const totalExercises = Object.values(exercises).flat().length;
    
    if (totalExercises === 0) {
      toast.error("Add at least one exercise");
      return;
    }

    toast.success(
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary animate-pulse" />
          <span className="font-display font-bold text-primary text-lg">
            LEVEL UP!
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Workout plan complete with {totalExercises} exercises
        </p>
      </div>,
      { duration: 4000, className: "glass-card border-primary/50" }
    );

    setTimeout(() => {
      reset();
    }, 2000);
  };

  return (
    <div className="animate-slide-up space-y-6">
      {/* Day Selection */}
      <div className="status-window">
        <h3 className="text-sm font-display text-primary mb-3 flex items-center gap-2">
          <Target className="w-4 h-4" />
          SELECT TRAINING DAY
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {workoutDays_filtered.map((day) => {
            const exerciseCount = exercises[day.id!]?.length || 0;
            const isSelected = selectedDayId === day.id;

            return (
              <button
                key={day.id}
                onClick={() => setSelectedDayId(day.id!)}
                className={cn(
                  "p-3 rounded-lg text-left transition-all duration-300 border-2",
                  isSelected
                    ? "bg-primary/20 border-primary neon-glow"
                    : "bg-muted/30 border-border/50 hover:border-primary/50"
                )}
              >
                <span className="text-xs text-muted-foreground font-display block">
                  {DAYS_MAP[day.dayOfWeek]}
                </span>
                <span className="font-display text-sm font-bold truncate block">
                  {day.name}
                </span>
                {exerciseCount > 0 && (
                  <span className="text-xs text-primary mt-1 block">
                    {exerciseCount} exercise{exerciseCount > 1 ? "s" : ""}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Exercise Form */}
      {selectedDay && (
        <div className="status-window animate-scale-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-primary/20">
              <Dumbbell className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-foreground">
                {selectedDay.name.toUpperCase()}
              </h2>
              <p className="text-sm text-muted-foreground">
                {DAYS_MAP[selectedDay.dayOfWeek]} • Add exercises
              </p>
            </div>
          </div>

          {/* Existing Exercises */}
          {exercises[selectedDayId!]?.length > 0 && (
            <div className="mb-4 space-y-2">
              {exercises[selectedDayId!].map((ex, idx) => (
                <div
                  key={ex.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
                >
                  <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-display text-primary">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm truncate">
                      {ex.exerciseName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {ex.targetSets} × {ex.targetReps} • {ex.muscleGroup}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit(handleAddExercise)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-field sm:col-span-2">
                <FormInput
                  name="exerciseName"
                  label="Exercise Name"
                  control={control}
                  placeholder="e.g., Incline Bench Press"
                  type="text"
                  required
                />
              </div>

              <div className="form-field space-y-3">
                <Label>Muscle Group</Label>
                <Controller
                  name="muscleGroup"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full h-11 border-2 border-border bg-input">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="glass-card border-primary/30">
                        {MUSCLE_GROUPS.map((group) => (
                          <SelectItem
                            key={group}
                            value={group}
                            className="font-body"
                          >
                            {group.replace("_", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.muscleGroup && (
                  <p className="text-sm text-destructive">
                    Select a muscle group
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="form-field">
                  <FormInput
                    name="targetSets"
                    label="Sets"
                    placeholder="3"
                    control={control}
                    type="number"
                    required
                  />
                </div>

                <div className="form-field">
                  <FormInput
                    name="targetReps"
                    label="Reps"
                    placeholder="8-12"
                    control={control}
                    type="text"
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <FormInput
                  name="targetWeight"
                  label="Weight (kg)"
                  control={control}
                  placeholder="Optional"
                  type="number"
                />
              </div>

              <div className="form-field">
                <FormInput
                  name="restSeconds"
                  label="Rest (sec)"
                  control={control}
                  placeholder="Optional"
                  type="number"
                />
              </div>

              <div className="form-field sm:col-span-2 space-y-3">
                <Label>Notes (Optional)</Label>
                <Textarea
                  placeholder="e.g., Focus on controlled movement"
                  {...register("notes")}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="outline"
              size="lg"
              className="w-full"
              disabled={createExerciseMutation.isPending}
            >
              <Plus className="w-5 h-5" />
              ADD EXERCISE
            </Button>
          </form>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <Button
          variant="ghost"
          size="lg"
          onClick={goToPreviousStep}
          className="flex-1"
        >
          BACK
        </Button>
        <Button size="lg" onClick={handleFinish} className="flex-1">
          <Trophy className="w-5 h-5" />
          FINISH PLAN
        </Button>
      </div>
    </div>
  );
};

export default AddExercisesStep;