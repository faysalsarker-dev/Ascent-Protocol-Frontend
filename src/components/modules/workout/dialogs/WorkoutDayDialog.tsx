"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { Switch } from "@/src/components/ui/switch";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/src/components/ui/select";
import { createWorkoutDay } from "@/src/services/workout/workout.service";

// ------------------ ZOD SCHEMA ------------------
const WorkoutDaySchema = z.object({
  dayOfWeek: z.number().min(1).max(7),
  name: z.string().min(1, "Workout name is required"),
  isRestDay: z.boolean().default(false),
  notes: z.string().optional(),
  order: z.number().optional(),
});

type WorkoutDayForm = z.infer<typeof WorkoutDaySchema>;

// ------------------ REUSABLE WORKOUT DIALOG ------------------
export default function WorkoutDayDialog() {
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState<"create" | "update">("create");
  const [editingData, setEditingData] = React.useState<Partial<WorkoutDayForm> | undefined>(undefined);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<WorkoutDayForm>({
    resolver: zodResolver(WorkoutDaySchema),
    defaultValues: {
      dayOfWeek: 1,
      name: "",
      isRestDay: false,
      notes: "",
      order: undefined,
    },
  });

  React.useEffect(() => {
    if (editingData) {
      reset({
        dayOfWeek: editingData.dayOfWeek ?? 1,
        name: editingData.name ?? "",
        isRestDay: editingData.isRestDay ?? false,
        notes: editingData.notes ?? "",
        order: editingData.order,
      });
    } else {
      reset({ dayOfWeek: 1, name: "", isRestDay: false, notes: "", order: undefined });
    }
  }, [editingData, reset]);

  const onSubmit = async (values: WorkoutDayForm) => {

const result = await createWorkoutDay('ac46f484-6412-44e0-bae4-4fd23348fe73',values)

    console.log(mode === "create" ? "CREATED WORKOUT:" : "UPDATED WORKOUT:", result);
    setOpen(false);
  };

  const openCreate = () => {
    setMode("create");
    setEditingData(undefined);
    setOpen(true);
  };

  const openUpdate = () => {
    setMode("update");
    setEditingData({
      dayOfWeek: 1,
      name: "Chest & Shoulder",
      isRestDay: false,
      notes: "Focus on form",
      order: 1,
    });
    setOpen(true);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Workout Day Dialog</h1>

      <div className="flex gap-3">
        <Button onClick={openCreate}>Create Workout Day</Button>
        <Button variant="outline" onClick={openUpdate}>Update Example</Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {mode === "create" ? "Create Workout Day" : "Update Workout Day"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* Day of Week */}
            <div>
              <Label>Day of Week</Label>
              <Select
                defaultValue={(editingData?.dayOfWeek ?? 1).toString()}
                onValueChange={(v) => setValue("dayOfWeek", Number(v))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Monday</SelectItem>
                  <SelectItem value="2">Tuesday</SelectItem>
                  <SelectItem value="3">Wednesday</SelectItem>
                  <SelectItem value="4">Thursday</SelectItem>
                  <SelectItem value="5">Friday</SelectItem>
                  <SelectItem value="6">Saturday</SelectItem>
                  <SelectItem value="7">Sunday</SelectItem>
                </SelectContent>
              </Select>
              {errors.dayOfWeek && (
                <p className="text-sm text-destructive mt-1">{errors.dayOfWeek.message}</p>
              )}
            </div>

            {/* Workout Name */}
            <div>
              <Label>Name</Label>
              <Input placeholder="Workout name" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Is Rest Day */}
            <div className="flex items-center gap-3">
              <Label>Rest Day?</Label>
              <Switch
                checked={editingData?.isRestDay ?? false}
                onCheckedChange={(v) => setValue("isRestDay", v)}
              />
            </div>

            {/* Notes */}
            <div>
              <Label>Notes</Label>
              <Textarea placeholder="Add notes" {...register("notes")} />
            </div>

            {/* Order (optional) */}
            <div>
              <Label>Order (optional)</Label>
              <Input
                type="number"
                placeholder="1"
                {...register("order", { valueAsNumber: true })}
              />
            </div>

            <DialogFooter className="flex justify-end gap-3">
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {mode === "create" ? "Create" : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
