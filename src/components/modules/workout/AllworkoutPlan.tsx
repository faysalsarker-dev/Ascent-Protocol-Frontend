"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/src/components/ui/skeleton";
import { AlertTriangle, FileX, Dumbbell } from "lucide-react";
import WorkoutPlanCard from "./WorkoutPlanCard";
import { useGetAllPlans } from "@/src/hooks/useWorkoutPlan";

interface WorkoutDay {
  id: string;
  name: string;
  isRestDay: boolean;
  exercises?: unknown[];
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string | null | undefined;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string | null;
  userId: string;
  workoutDays: WorkoutDay[];
  _count: { workoutDays: number };
}

const AllWorkoutPlans = () => {
  const { data, isLoading, isError } = useGetAllPlans();
  const plans = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="relative">
            {/* Corner Brackets for skeleton */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-primary/20" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-primary/20" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-primary/20" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-primary/20" />
            <Skeleton className="h-64 w-full rounded-xl bg-muted/50" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        {/* Corner Brackets */}
        <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-destructive/60" />
        <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-destructive/60" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-destructive/60" />
        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-destructive/60" />
        
        <div className="flex flex-col justify-center items-center h-64 p-8 bg-destructive/5 border border-destructive/30 rounded-lg">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
          </motion.div>
          <p className="text-destructive font-bold text-lg mb-2">SYSTEM ERROR</p>
          <p className="text-muted-foreground text-sm text-center">
            Failed to load workout plans. Please try again.
          </p>
        </div>
      </motion.div>
    );
  }

  if (plans.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        {/* Corner Brackets */}
        <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/40" />
        <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/40" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-primary/40" />
        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-primary/40" />
        
        <div className="flex flex-col justify-center items-center h-64 p-8 bg-muted/20 border border-border/50 rounded-lg">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FileX className="w-12 h-12 text-muted-foreground mb-4" />
          </motion.div>
          <p className="text-foreground font-bold text-lg mb-2">NO PLANS FOUND</p>
          <p className="text-muted-foreground text-sm text-center flex items-center gap-2">
            <Dumbbell className="w-4 h-4" />
            Create your first workout plan to begin your journey
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {plans.map((plan:WorkoutPlan, index:number) => (
        <WorkoutPlanCard key={plan.id} plan={plan} index={index} />
      ))}
    </div>
  );
};

export default AllWorkoutPlans;
