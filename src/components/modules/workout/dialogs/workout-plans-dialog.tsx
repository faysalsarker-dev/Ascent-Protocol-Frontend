"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Shadcn components
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
import { Popover, PopoverTrigger, PopoverContent } from "@/src/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from '@/src/components/ui/calendar';
import { createWorkoutPlan } from "@/src/services/workout/workout.service";

// ---- Zod schema ----
const PlanSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  endDate: z.string().nullable().optional(),
});

export type PlanForm = z.infer<typeof PlanSchema>;

interface PlanDialogProps {
  open: boolean;
  onOpenChange: (s: boolean) => void;
  mode: "create" | "update";
  initialData?: Partial<PlanForm>;
}

export function PlanDialog({ open, onOpenChange, mode, initialData }: PlanDialogProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PlanForm>({
    resolver: zodResolver(PlanSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
      endDate: initialData?.endDate ?? null,
    },
  });

  React.useEffect(() => {
    reset({
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
      endDate: initialData?.endDate ?? null,
    });
  }, [initialData, reset]);

  const onSubmit = async (values: PlanForm) => {
    const payload: PlanForm = {
      ...values,
      endDate: values.endDate ? new Date(values.endDate).toISOString() : null,
    };
const result = await createWorkoutPlan(payload)
    console.log("PLAN SUBMITTED:", result);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create Plan" : "Update Plan"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <Label>Name</Label>
            <Input placeholder="Plan name" {...register("name")} />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Label>Description</Label>
            <Textarea placeholder="Short description" {...register("description")} />
            {errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <Label>End Date (optional)</Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between text-left" type="button">
                  {(() => {
                    const v = (document.querySelector('input[name="endDate"]') as HTMLInputElement | null)?.value;
                    if (!v) return "Pick a date";
                    try {
                      return format(new Date(v), "PPP");
                    } catch {
                      return "Pick a date";
                    }
                  })()}

                  <CalendarIcon className="h-4 w-4 opacity-60" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={initialData?.endDate ? new Date(initialData.endDate) : undefined}
                  onSelect={(date) => {
                    const iso = date ? date.toISOString() : null;
                    setValue("endDate", iso as any);
                  }}
                />
              </PopoverContent>
            </Popover>

            <input type="hidden" {...register("endDate")} />
            {errors.endDate && <p className="text-sm text-destructive mt-1">{errors.endDate.message}</p>}
          </div>

          <DialogFooter className="flex items-center justify-end gap-3">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {mode === "create" ? "Create" : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

