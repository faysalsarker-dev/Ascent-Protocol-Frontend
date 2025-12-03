"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { Dumbbell, Sparkles } from "lucide-react";
import { FormButton } from "@/src/components/ui/FormButton";
import { FormInput } from "@/src/components/ui/FormInput";
import { useCreateWorkoutPlan } from "@/src/hooks/useWorkoutPlan";
import { useWorkoutBuilder } from "@/src/context/WorkoutBuilderContext";

const planSchema = z.object({
  name: z
    .string()
    .min(3, "Plan name must be at least 3 characters")
    .max(50, "Plan name too long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description too long"),
});

type PlanFormData = z.infer<typeof planSchema>;

const CreatePlanStep = () => {
  const { setPlan, goToNextStep } = useWorkoutBuilder();
  const createPlanMutation = useCreateWorkoutPlan();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PlanFormData>({
    resolver: zodResolver(planSchema),
  });

  const handleFormSubmit = async (data: PlanFormData) => {
    try {
      const result = await createPlanMutation.mutateAsync(data);
      
      if (result?.success && result.data) {
        setPlan({ ...data, id: result.data.id });
        goToNextStep();
      }
    } catch (error) {
      // Error is already handled in the mutation
      console.error("Create plan error:", error);
    }
  };

  return (
    <div className="animate-slide-up">
      <div className="status-window">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-primary/20 neon-glow">
            <Dumbbell className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-foreground neon-text">
              CREATE WORKOUT PLAN
            </h2>
            <p className="text-sm text-muted-foreground">
              Design your path to power
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="form-field">
            <FormInput
              name="name"
              label="Plan Name"
              control={control}
              placeholder="e.g., Muscle Building Plan"
              type="text"
              required
            />
          </div>

          <div className="form-field space-y-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="e.g., A 7-day plan focused on muscle growth"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-destructive animate-scale-in">
                {errors.description.message}
              </p>
            )}
          </div>

          <FormButton
            type="submit"
            loading={isSubmitting || createPlanMutation.isPending}
            variant="default"
            className="w-full flex items-center justify-center gap-2"
          >
            {isSubmitting || createPlanMutation.isPending ? (
              <span className="animate-pulse">INITIATING...</span>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                CREATE PLAN
              </>
            )}
          </FormButton>
        </form>
      </div>
    </div>
  );
};

export default CreatePlanStep;