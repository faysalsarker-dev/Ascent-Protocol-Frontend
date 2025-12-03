'use client';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
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
import { Trophy, Zap, Plus, ChevronRight, Dumbbell, Timer, Target } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { WorkoutDay } from "./CreateDaysStep";

const MUSCLE_GROUPS = [
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
] as const;

const DAYS_MAP: Record<number, string> = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

const exerciseSchema = z.object({
  exerciseName: z.string().min(2, "Exercise name required").max(50),
  muscleGroup: z.enum(MUSCLE_GROUPS),
  targetSets: z.number().min(1, "Min 1 set").max(10, "Max 10 sets"),
  targetReps: z.string().min(1, "Required"),
  targetWeight: z.number().optional(),
  restSeconds: z.number().optional(),
  notes: z.string().max(200).optional(),
});

type ExerciseFormData = z.infer<typeof exerciseSchema>;

interface Exercise extends ExerciseFormData {
  id: string;
  dayId: string;
}

interface AddExercisesStepProps {
  days: WorkoutDay[];
  onComplete: (exercises: Record<string, Exercise[]>) => void;
  onBack: () => void;
}

 const AddExercisesStep = ({ days, onComplete, onBack }: AddExercisesStepProps) => {
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);
  const [exercisesByDay, setExercisesByDay] = useState<Record<string, Exercise[]>>({});

  const workoutDays = days.filter((d) => !d.isRestDay);
  const selectedDay = workoutDays.find((d) => d.id === selectedDayId);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ExerciseFormData>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      targetSets: 3,
    },
  });

  const handleAddExercise = (data: ExerciseFormData) => {
    if (!selectedDayId) return;

    const newExercise: Exercise = {
      ...data,
      id: crypto.randomUUID(),
      dayId: selectedDayId,
    };

    console.log("Exercise Created:", data);

    setExercisesByDay((prev) => ({
      ...prev,
      [selectedDayId]: [...(prev[selectedDayId] || []), newExercise],
    }));

    toast.success(
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-primary" />
        <span className="font-display">+1 Exercise Added!</span>
      </div>,
      { duration: 2000, className: "glass-card" }
    );

    reset({ targetSets: 3 });
  };

  const handleFinish = () => {
    const totalExercises = Object.values(exercisesByDay).flat().length;
    if (totalExercises === 0) {
      toast.error("Add at least one exercise");
      return;
    }

    console.log("Complete Workout Plan Exercises:", exercisesByDay);

    toast.success(
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary animate-pulse" />
          <span className="font-display font-bold text-primary text-lg">LEVEL UP!</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Workout plan complete with {totalExercises} exercises
        </p>
      </div>,
      { duration: 4000, className: "glass-card border-primary/50" }
    );

    onComplete(exercisesByDay);
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
          {workoutDays.map((day) => {
            const exerciseCount = exercisesByDay[day.id]?.length || 0;
            const isSelected = selectedDayId === day.id;

            return (
              <button
                key={day.id}
                onClick={() => setSelectedDayId(day.id)}
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
          {exercisesByDay[selectedDayId!]?.length > 0 && (
            <div className="mb-4 space-y-2">
              {exercisesByDay[selectedDayId!].map((ex, idx) => (
                <div
                  key={ex.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
                >
                  <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-display text-primary">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm truncate">{ex.exerciseName}</p>
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
                <Label>Exercise Name</Label>
                <Input placeholder="e.g., Incline Bench Press" {...register("exerciseName")} />
                {errors.exerciseName && (
                  <p className="text-sm text-destructive">{errors.exerciseName.message}</p>
                )}
              </div>

              <div className="form-field">
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
                          <SelectItem key={group} value={group} className="font-body">
                            {group.replace("_", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.muscleGroup && (
                  <p className="text-sm text-destructive">Select a muscle group</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="form-field">
                  <Label>Sets</Label>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    {...register("targetSets", { valueAsNumber: true })}
                  />
                </div>
                <div className="form-field">
                  <Label>Reps</Label>
                  <Input placeholder="8-12" {...register("targetReps")} />
                </div>
              </div>

              <div className="form-field">
                <Label>Weight (kg) - Optional</Label>
                <Input
                  type="number"
                  placeholder="60"
                  {...register("targetWeight", { valueAsNumber: true })}
                />
              </div>

              <div className="form-field">
                <Label className="flex items-center gap-1">
                  <Timer className="w-3 h-3" />
                  Rest (sec) - Optional
                </Label>
                <Input
                  type="number"
                  placeholder="90"
                  {...register("restSeconds", { valueAsNumber: true })}
                />
              </div>

              <div className="form-field sm:col-span-2">
                <Label>Notes (Optional)</Label>
                <Textarea
                  placeholder="e.g., Focus on controlled movement"
                  {...register("notes")}
                />
              </div>
            </div>

            <Button type="submit" variant="outline" size="lg" className="w-full">
              <Plus className="w-5 h-5" />
              ADD EXERCISE
            </Button>
          </form>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <Button variant="ghost" size="lg" onClick={onBack} className="flex-1">
          BACK
        </Button>
        <Button variant="level" size="lg" onClick={handleFinish} className="flex-1">
          <Trophy className="w-5 h-5" />
          FINISH PLAN
        </Button>
      </div>
    </div>
  );
};

export default AddExercisesStep;