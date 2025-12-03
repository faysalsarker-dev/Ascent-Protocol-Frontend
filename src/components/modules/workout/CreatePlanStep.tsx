import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { toast } from "sonner";
import { Dumbbell, Sparkles } from "lucide-react";

const planSchema = z.object({
  name: z.string().min(3, "Plan name must be at least 3 characters").max(50, "Plan name too long"),
  description: z.string().min(10, "Description must be at least 10 characters").max(200, "Description too long"),
});

type PlanFormData = z.infer<typeof planSchema>;

interface CreatePlanStepProps {
  onSubmit: (data: PlanFormData) => void;
}

 const CreatePlanStep = ({ onSubmit }: CreatePlanStepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PlanFormData>({
    resolver: zodResolver(planSchema),
  });

  const handleFormSubmit = async (data: PlanFormData) => {
    console.log("Workout Plan Created:", data);
    
    // Placeholder for future data fetch
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    toast.success(
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-primary/20">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="font-display font-bold text-primary">QUEST ACCEPTED!</p>
          <p className="text-sm text-muted-foreground">New workout plan created</p>
        </div>
      </div>,
      {
        duration: 3000,
        className: "glass-card border-primary/50",
      }
    );
    
    onSubmit(data);
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
            <Label htmlFor="name">Plan Name</Label>
            <Input
              id="name"
              placeholder="e.g., Muscle Building Plan"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive animate-scale-in">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="form-field">
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

          <Button
            type="submit"
            variant="level"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="animate-pulse">INITIATING...</span>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                CREATE PLAN
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePlanStep;