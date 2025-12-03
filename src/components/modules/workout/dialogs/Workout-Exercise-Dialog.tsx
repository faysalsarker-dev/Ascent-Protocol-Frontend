"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPlannedExercise } from "@/src/services/workout/workout.service";

// Zod Schema
const ExerciseSchema = z.object({
  exerciseName: z.string().min(2, "Name is required"),
  muscleGroup: z.enum([
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
  ]),
  targetSets: z.number().min(1),
  targetReps: z.string().min(1),
  targetWeight: z.number().optional().nullable(),
  restSeconds: z.number().optional().nullable(),
  notes: z.string().optional().nullable(),
  videoUrl: z.string().url().optional().nullable(),
  order: z.number().optional().nullable(),
});

export default function WorkoutExerciseDialog({ defaultValues }: { defaultValues?: any }) {
  const [open, setOpen] = useState(false);
  const isEdit = !!defaultValues;

  const form = useForm({
    resolver: zodResolver(ExerciseSchema),
    defaultValues: defaultValues || {
      exerciseName: "",
      muscleGroup: "CHEST",
      targetSets: 1,
      targetReps: "8-12",
      targetWeight: undefined,
      restSeconds: 90,
      notes: "",
      videoUrl: "",
      order: 1,
    },
  });

  useEffect(() => {
    if (open && defaultValues) form.reset(defaultValues);
  }, [open, defaultValues, form]);

  const onSubmit = async(data: any) => {
    const result = await createPlannedExercise('238965a6-167d-48a7-90e9-128b41387611', data);
    console.log(isEdit ? "UPDATE EXERCISE" : "CREATE EXERCISE", result);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full">
          {isEdit ? "Edit Exercise" : "Add Exercise"}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Update Exercise" : "Create Exercise"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Exercise Name</Label>
            <Input {...form.register("exerciseName")} />
          </div>

          <div>
            <Label>Muscle Group</Label>
            <select
              {...form.register("muscleGroup")}
              className="border rounded-md p-2 w-full bg-background"
            >
              {[
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
              ].map((mg) => (
                <option key={mg} value={mg}>
                  {mg}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Target Sets</Label>
              <Input type="number" {...form.register("targetSets", { valueAsNumber: true })} />
            </div>

            <div>
              <Label>Target Reps</Label>
              <Input {...form.register("targetReps")} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Target Weight (kg)</Label>
              <Input type="number" {...form.register("targetWeight", { valueAsNumber: true })} />
            </div>

            <div>
              <Label>Rest Seconds</Label>
              <Input type="number" {...form.register("restSeconds", { valueAsNumber: true })} />
            </div>
          </div>

          <div>
            <Label>Video URL</Label>
            <Input {...form.register("videoUrl")} />
          </div>

          <div>
            <Label>Notes</Label>
            <Textarea {...form.register("notes")} />
          </div>

          <div>
            <Label>Order</Label>
            <Input type="number" {...form.register("order", { valueAsNumber: true })} />
          </div>

          <Button type="submit" className="w-full mt-2">
            {isEdit ? "Save Changes" : "Create Exercise"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
