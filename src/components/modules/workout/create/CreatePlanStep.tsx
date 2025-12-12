import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Dumbbell, Sparkles, AlertTriangle, Loader2, Zap } from "lucide-react";
import { useWorkoutBuilder } from "@/src/context/WorkoutBuilderContext";
import { 
  GlitchText, 
  CornerBracket, 
  HexagonIcon 
} from "@/src/components/modules/today-task/GamifiedEffects";
import { useCreateWorkoutPlan } from "@/src/hooks/useWorkoutPlan";

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
const {mutateAsync , isPending}=useCreateWorkoutPlan()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlanFormData>({
    resolver: zodResolver(planSchema),
  });

  const handleFormSubmit = async (data: PlanFormData) => {
    // Simulate API call - replace with actual mutation
const payload = {
  name: data.name, description: data.description
}
    const result = await mutateAsync(payload)
    const planData = { name: data.name, description: data.description, id: result?.data?.id };
    setPlan(planData);
    goToNextStep();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header Card */}
      <div className="relative bg-card/60 backdrop-blur-xl border border-primary/30 rounded-sm p-6">
        <CornerBracket position="tl" color="primary" />
        <CornerBracket position="tr" color="primary" />
        <CornerBracket position="bl" color="primary" />
        <CornerBracket position="br" color="primary" />

        <div className="flex items-center gap-4 mb-6">
          <HexagonIcon icon={Dumbbell} color="primary" size="md" />
          <div>
            <h2 className="font-system text-xl font-bold">
              <GlitchText className="text-glow">CREATE WORKOUT PLAN</GlitchText>
            </h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-primary" />
              Design your path to power
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          {/* Plan Name */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Label className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Zap className="w-3 h-3 text-primary" />
              Plan Name
            </Label>
            <div className="relative">
              <Input
                placeholder="e.g., Muscle Building Plan"
                className={`bg-background/60 border-primary/30 focus:border-primary focus:ring-primary/30 placeholder:text-muted-foreground/50 ${
                  errors.name ? "border-destructive" : ""
                }`}
                {...register("name")}
              />
              {errors.name && (
                <motion.div
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                </motion.div>
              )}
            </div>
            <AnimatePresence>
              {errors.name && (
                <motion.p
                  className="text-xs text-destructive flex items-center gap-1"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                >
                  <AlertTriangle className="w-3 h-3" />
                  {errors.name.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Description */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Label className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-primary" />
              Description
            </Label>
            <Textarea
              placeholder="e.g., A 7-day plan focused on muscle growth"
              className={`bg-background/60 border-primary/30 focus:border-primary focus:ring-primary/30 min-h-[100px] placeholder:text-muted-foreground/50 ${
                errors.description ? "border-destructive" : ""
              }`}
              {...register("description")}
            />
            <AnimatePresence>
              {errors.description && (
                <motion.p
                  className="text-xs text-destructive flex items-center gap-1"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                >
                  <AlertTriangle className="w-3 h-3" />
                  {errors.description.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 font-system text-sm uppercase tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                animate={{ x: isPending ? "100%" : "-100%" }}
                transition={{ 
                  duration: 1, 
                  repeat: isPending ? Infinity : 0,
                  ease: "linear"
                }}
              />
              
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  INITIATING...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  CREATE PLAN
                </span>
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default CreatePlanStep;