import { CompletedExercise, getExercises } from "./exerciseStorage";

export interface Exercise {
  id?: string;
  exerciseName?: string;
  muscleGroup?: string;
  notes?: string;
  order?: number;
  restSeconds?: number;
  targetReps?: string;
  targetSets?: number;
  targetWeight?: number;
  videoUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
  workoutDayId?: string;
}


export const filterIncompleteExercises = (
  exercises?: Exercise[],
  isLoading?: boolean
): Exercise[] => {
  if (isLoading || !exercises?.length) return [];

  const completed: CompletedExercise[] = getExercises();
  const completedNames = completed.map((e) => e.exerciseName);

  return exercises.filter(
    (ex) => ex?.exerciseName && !completedNames.includes(ex.exerciseName)
  );
};
