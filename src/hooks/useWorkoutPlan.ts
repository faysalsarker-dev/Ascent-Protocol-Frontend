import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { 
  createPlannedExercise, 
  createWorkoutPlan, 
  createWorkoutDay, 
  getTodayWorkoutDay,
  getAllWorkoutPlans,
  getWorkoutPlanById
} from "@/src/services/workout/workout.service";

import { PlannedExercise, WorkoutDay, WorkoutPlan } from "@/src/types/workout.types";


// --------------------------------------------------
// Create Workout Plan
// --------------------------------------------------

export function useCreateWorkoutPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: WorkoutPlan) => createWorkoutPlan(data),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["workout-plans"] });
      toast.success("Workout plan created!");
      return response;
    },

    onError: (error) => {
      console.error("Failed to create workout plan:", error);
      toast.error("Couldn't create workout plan. Try again.");
    },
  });
}


// --------------------------------------------------
// Create Workout Day
// --------------------------------------------------

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function useCreateWorkoutDay(workoutPlanId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<WorkoutDay, "id" | "workoutPlanId">) =>
      createWorkoutDay(workoutPlanId, data),

    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["workout-days", workoutPlanId] });

      const dayName = DAYS_OF_WEEK[variables.dayOfWeek - 1] || "Day";
      toast.success(`${dayName} added!`);

      return response;
    },

    onError: (error) => {
      console.error("Failed to create workout day:", error);
      toast.error("Couldn't add workout day. Try again.");
    },
  });
}


// --------------------------------------------------
// Create Exercise
// --------------------------------------------------

export function useCreateExercise(workoutDayId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<PlannedExercise, "id" | "workoutDayId">) =>
      createPlannedExercise(workoutDayId, data),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["exercises", workoutDayId] });

      toast.success("Exercise added!");

      return response;
    },

    onError: (error) => {
      console.error("Failed to create exercise:", error);
      toast.error("Couldn't add exercise. Try again.");
    },
  });
}


export function useTodayWorkoutDay() {
  return useQuery({
    queryKey: ["today-workout-day"],
    queryFn: () => getAllWorkoutPlans(),
  });
}


export function useGetAllPlans() {
  return useQuery({
    queryKey: ["all-workout-plans"],
    queryFn: () => getAllWorkoutPlans(),
  });
}
export function useGetAllPlansById(id:string) {
  return useQuery({
    queryKey: ["all-workout-plans", id],
    queryFn: () => getWorkoutPlanById(id),
  });
}