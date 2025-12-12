export interface WorkoutPlan {
  id?: string;
  name: string;
  description: string;
}

export interface WorkoutDay {
  id?: string;
  dayOfWeek: number;
  name: string;
  isRestDay: boolean;
  notes?: string;
  workoutPlanId?: string;
}

export interface PlannedExercise {
  id?: string;
  exerciseName: string;
  muscleGroup: MuscleGroup;
  targetSets: number;
  targetReps: string;
  targetWeight?: number;
  restSeconds?: number;
  notes?: string;
  workoutDayId?: string;
}





export interface ExerciseFormData  {
  exerciseName: string;
  muscleGroup:
    | "CHEST"
    | "BACK"
    | "SHOULDERS"
    | "BICEPS"
    | "TRICEPS"
    | "LEGS"
    | "GLUTES"
    | "CORE"
    | "CARDIO"
    | "FULL_BODY";
  targetReps: string;
  targetSets: number;
  targetWeight?: number;
  restSeconds?: number;
  notes?: string;
};






export type MuscleGroup =
  | "CHEST"
  | "BACK"
  | "SHOULDERS"
  | "BICEPS"
  | "TRICEPS"
  | "LEGS"
  | "GLUTES"
  | "CORE"
  | "CARDIO"
  | "FULL_BODY";

export interface WorkoutBuilderState {
  currentStep: number;
  workoutPlan: WorkoutPlan | null;
  workoutDays: WorkoutDay[];
  exercises: Record<string, PlannedExercise[]>;
}


