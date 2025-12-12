import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Switch } from "@/src/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { toast } from "sonner";
import { 
  Calendar, 
  Plus, 
  Bed, 
  Flame, 
  AlertTriangle, 
  Loader2,
  ChevronLeft,
  ChevronRight,
  Zap
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useWorkoutBuilder } from "@/src/context/WorkoutBuilderContext";
import { 
  GlitchText, 
  CornerBracket, 
  HexagonIcon,
  StatusBadge
} from "@/src/components/modules/today-task/GamifiedEffects";
import { useCreateWorkoutDay } from "@/src/hooks/useWorkoutPlan";

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
const {mutateAsync , isPending}=useCreateWorkoutDay(workoutPlan?.id as string)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DayFormData>({
    resolver: zodResolver(daySchema),
    defaultValues: {
      isRestDay: false,
    },
  });

    const isRestDay = useWatch({
      control, 
      name: "isRestDay",
    });
  // const isRestDay = watch("isRestDay");
  const usedDays = workoutDays.map((d) => d.dayOfWeek);
  const availableDays = DAYS_OF_WEEK.filter((d) => !usedDays.includes(d.value));

  const handleAddDay = async (data: DayFormData) => {

const payload = {
   dayOfWeek: data.dayOfWeek, 
      name: data.name, 
      isRestDay: data.isRestDay, 
      notes: data.notes,
workoutPlanId:workoutPlan?.id
}

      const result = await mutateAsync(payload)

      console.log(result);
    const dayData = { 
      dayOfWeek: data.dayOfWeek, 
      name: data.name, 
      isRestDay: data.isRestDay, 
      notes: data.notes,
      id: result?.data?.id, 
      workoutPlanId: workoutPlan?.id 
    };
    addDay(dayData);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reset({ isRestDay: false, dayOfWeek: undefined as any, name: "", notes: "" });
    toast.success("Training day added!");
  };

  const handleComplete = () => {
    if (workoutDays.length === 0) {
      toast.error("Add at least one day to continue");
      return;
    }
    goToNextStep();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Created Days Display */}
      {workoutDays.length > 0 && (
        <motion.div
          className="relative bg-card/60 backdrop-blur-xl border border-primary/30 rounded-sm p-5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <CornerBracket position="tl" color="primary" />
          <CornerBracket position="br" color="primary" />

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-system text-primary flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <GlitchText>TRAINING SCHEDULE</GlitchText>
            </h3>
            <StatusBadge label="DAYS" value={`${workoutDays.length}/7`} color="primary" />
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {DAYS_OF_WEEK.map((day) => {
              const createdDay = workoutDays.find((d) => d.dayOfWeek === day.value);
              return (
                <motion.div
                  key={day.value}
                  className={cn(
                    "p-2 rounded-sm text-center transition-all duration-300 border",
                    createdDay
                      ? createdDay.isRestDay
                        ? "bg-accent/20 border-accent/50"
                        : "bg-primary/20 border-primary/50"
                      : "bg-muted/30 border-border/30"
                  )}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-[10px] font-system block truncate text-muted-foreground">
                    {day.label.slice(0, 3)}
                  </span>
                  {createdDay && (
                    <motion.div 
                      className="mt-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      {createdDay.isRestDay ? (
                        <Bed className="w-3 h-3 mx-auto text-accent" />
                      ) : (
                        <Flame className="w-3 h-3 mx-auto text-primary" />
                      )}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Add Day Form */}
      {availableDays.length > 0 && (
        <div className="relative bg-card/60 backdrop-blur-xl border border-primary/30 rounded-sm p-6">
          <CornerBracket position="tl" color="primary" />
          <CornerBracket position="tr" color="primary" />
          <CornerBracket position="bl" color="primary" />
          <CornerBracket position="br" color="primary" />

          <div className="flex items-center gap-4 mb-6">
            <HexagonIcon icon={Plus} color="primary" size="md" />
            <div>
              <h2 className="font-system text-xl font-bold">
                <GlitchText className="text-glow">ADD TRAINING DAY</GlitchText>
              </h2>
              <p className="text-sm text-muted-foreground">
                Configure your weekly schedule
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(handleAddDay)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Day of Week Select */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Label className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-primary" />
                  Day of Week
                </Label>
                <Controller
                  name="dayOfWeek"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(val) => field.onChange(parseInt(val))}
                      value={field.value?.toString()}
                    >
                      <SelectTrigger className="w-full h-11 bg-background/60 border-primary/30 focus:border-primary">
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent className="bg-card/95 backdrop-blur-xl border-primary/30">
                        {availableDays.map((day) => (
                          <SelectItem
                            key={day.value}
                            value={day.value.toString()}
                            className="font-mono"
                          >
                            {day.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.dayOfWeek && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Select a day
                  </p>
                )}
              </motion.div>

              {/* Session Name */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Label className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Zap className="w-3 h-3 text-primary" />
                  Session Name
                </Label>
                <Input
                  placeholder="e.g., Chest & Shoulders"
                  className={`bg-background/60 border-primary/30 focus:border-primary ${
                    errors.name ? "border-destructive" : ""
                  }`}
                  {...register("name")}
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      className="text-xs text-destructive flex items-center gap-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <AlertTriangle className="w-3 h-3" />
                      {errors.name.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Rest Day Toggle */}
            <motion.div
              className={cn(
                "flex items-center justify-between p-4 rounded-sm border transition-all",
                isRestDay 
                  ? "bg-accent/10 border-accent/30" 
                  : "bg-muted/30 border-border/50"
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ 
                    rotate: isRestDay ? [0, 10, -10, 0] : 0,
                    scale: isRestDay ? [1, 1.1, 1] : 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Bed
                    className={cn(
                      "w-5 h-5",
                      isRestDay ? "text-accent" : "text-muted-foreground"
                    )}
                  />
                </motion.div>
                <div>
                  <Label htmlFor="isRestDay" className="cursor-pointer font-system text-sm">
                    REST DAY
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Recovery is important for growth!
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
                    className="data-[state=checked]:bg-accent"
                  />
                )}
              />
            </motion.div>

            {/* Notes */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                Notes (Optional)
              </Label>
              <Textarea
                placeholder="e.g., Focus on form"
                className="bg-background/60 border-primary/30 focus:border-primary min-h-20"
                {...register("notes")}
              />
            </motion.div>

            {/* Add Button */}
            <Button
              type="submit"
              disabled={isSubmitting || isPending}
              className="w-full h-11 font-system text-sm uppercase tracking-widest border border-primary/50 bg-primary/20 hover:bg-primary/30 text-primary"
            >
              {isSubmitting || isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  ADD DAY
                </>
              )}
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
          className="flex-1 font-system uppercase tracking-widest border border-border/50 hover:border-primary/50 hover:bg-primary/10"
        >
          <ChevronLeft className="w-4 h-4" />
          BACK
        </Button>
        <Button
          size="lg"
          onClick={handleComplete}
          disabled={workoutDays.length === 0}
          className="flex-1 font-system uppercase tracking-widest bg-primary hover:bg-primary/90"
        >
          {workoutDays.length === 7
            ? "COMPLETE WEEK"
            : `CONTINUE (${workoutDays.length} days)`}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default CreateDaysStep;