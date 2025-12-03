"use client";

import { useGetAllPlans } from "@/src/hooks/useWorkoutPlan";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Dumbbell, Calendar, ArrowRight, Crown, Target } from "lucide-react";
import { Skeleton } from "@/src/components/ui/skeleton";
import WorkoutPlanCard from "./WorkoutPlanCard";



const AllWorkoutPlan = () => {
  const { data, isLoading, isError } = useGetAllPlans();
const plans = data?.data ?? [];


console.log(plans)

  if (isLoading) {
    return (
      <div className="grid gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Skeleton key={idx} className="h-64 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Failed to load workout plans. Please try again.
      </div>
    );
  }

  return (
    <>



        <div className="grid gap-6 md:grid-cols-2">
          {plans?.map((plan, index) => (
               <WorkoutPlanCard key={plan.id} plan={plan} index={index} />

          ))}
        </div>



    </>
  );
};

export default AllWorkoutPlan;
