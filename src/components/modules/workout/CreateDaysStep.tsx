"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { Switch } from "@/src/components/ui/switch";
import { FormInput } from "@/src/components/ui/FormInput";
import { FormButton } from "@/src/components/ui/FormButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { toast } from "sonner";
import { Calendar, Plus, Bed, Flame } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useCreateWorkoutDay } from "@/src/hooks/useWorkoutPlan";
import { useWorkoutBuilder } from "@/src/context/WorkoutBuilderContext";

const DAYS_OF_WEEK = [
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
  { value: 7, label: "Sunday" },
];

const daySchema = z.object({
  dayOfWeek: z.number().min(1).max(7),
  name: z.string().min(2, "Day name required").max(50),
  isRestDay: z.boolean(),
  notes: z.string().max(200).optional(),
});

type DayFormData = z.infer<typeof daySchema>;

const CreateDaysStep = () => {
  const { state, addDay, goToNextStep, goToPreviousStep } = useWorkoutBuilder();
  const { workoutPlan, workoutDays } = state;

  if (!workoutPlan?.id) {
    toast.error("No workout plan found. Please create a plan first.");
    goToPreviousStep();
    return null;
  }

  const createDayMutation = useCreateWorkoutDay(workoutPlan.id);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<DayFormData>({
    resolver: zodResolver(daySchema),
    defaultValues: {
      isRestDay: false,
    },
  });

  const isRestDay = watch("isRestDay");
  const usedDays = workoutDays.map((d) => d.dayOfWeek);
  const availableDays = DAYS_OF_WEEK.filter((d) => !usedDays.includes(d.value));

  const handleAddDay = async (data: DayFormData) => {
    try {
      const result = await createDayMutation.mutateAsync(data);

      if (result?.success && result.data) {
        addDay({ ...data, id: result.data.id, workoutPlanId: workoutPlan.id });
        reset({ isRestDay: false, dayOfWeek: undefined, name: "", notes: "" });
      }
    } catch (error) {
      // Error is already handled in the mutation
      console.error("Create day error:", error);
    }
  };

  const handleComplete = () => {
    if (workoutDays.length === 0) {
      toast.error("Add at least one day to continue");
      return;
    }
    goToNextStep();
  };

  return (
    <div className="animate-slide-up space-y-6">
      {/* Created Days Display */}
      {workoutDays.length > 0 && (
        <div className="status-window">
          <h3 className="text-sm font-display text-primary mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            CREATED DAYS ({workoutDays.length}/7)
          </h3>
          <div className="grid grid-cols-7 gap-1">
            {DAYS_OF_WEEK.map((day) => {
              const createdDay = workoutDays.find((d) => d.dayOfWeek === day.value);
              return (
                <div
                  key={day.value}
                  className={cn(
                    "p-2 rounded-lg text-center transition-all duration-300",
                    createdDay
                      ? createdDay.isRestDay
                        ? "bg-secondary/30 border border-secondary/50"
                        : "bg-primary/20 border border-primary/50 neon-glow"
                      : "bg-muted/30 border border-border/30"
                  )}
                >
                  <span className="text-xs font-display block truncate">
                    {day.label.slice(0, 3)}
                  </span>
                  {createdDay && (
                    <div className="mt-1">
                      {createdDay.isRestDay ? (
                        <Bed className="w-3 h-3 mx-auto text-secondary" />
                      ) : (
                        <Flame className="w-3 h-3 mx-auto text-primary" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Day Form */}
      {availableDays.length > 0 && (
        <div className="status-window">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-primary/20">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-foreground">
                ADD TRAINING DAY
              </h2>
              <p className="text-sm text-muted-foreground">
                Configure your weekly schedule
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(handleAddDay)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-field space-y-3">
                <Label>Day of Week</Label>
                <Controller
                  name="dayOfWeek"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(val) => field.onChange(parseInt(val))}
                      value={field.value?.toString()}
                    >
                      <SelectTrigger className="w-full h-11 border-2 border-border bg-input">
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent className="glass-card border-primary/30">
                        {availableDays.map((day) => (
                          <SelectItem
                            key={day.value}
                            value={day.value.toString()}
                            className="font-body"
                          >
                            {day.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.dayOfWeek && (
                  <p className="text-sm text-destructive">Select a day</p>
                )}
              </div>

              <div className="form-field">
                <FormInput
                  name="name"
                  label="Session Name"
                  control={control}
                  placeholder="e.g., Chest & Shoulders"
                  type="text"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-center gap-3">
                <Bed
                  className={cn(
                    "w-5 h-5",
                    isRestDay ? "text-secondary" : "text-muted-foreground"
                  )}
                />
                <div>
                  <Label htmlFor="isRestDay" className="cursor-pointer">
                    Rest Day
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Recovery is important!
                  </p>
                </div>
              </div>
              <Controller
                name="isRestDay"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="isRestDay"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="form-field space-y-3">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="e.g., Focus on form"
                {...register("notes")}
              />
            </div>

            <FormButton
              type="submit"
              loading={createDayMutation.isPending}
              variant="default"
              className="w-full flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              ADD DAY
            </FormButton>
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
        <Button
          size="lg"
          onClick={handleComplete}
          className="flex-1"
          disabled={workoutDays.length === 0}
        >
          {workoutDays.length === 7
            ? "COMPLETE WEEK"
            : `CONTINUE (${workoutDays.length} days)`}
        </Button>
      </div>
    </div>
  );
};

export default CreateDaysStep;