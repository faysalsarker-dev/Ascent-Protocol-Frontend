export interface CompletedExercise {
  exerciseName: string;
  completedAt: number; // timestamp
}

const KEY = "completedExercises";

// Save one exercise
export const saveExercise = (exerciseName: string): void => {
  if (typeof window === "undefined") return;

  const existing: CompletedExercise[] = JSON.parse(
    localStorage.getItem(KEY) || "[]"
  );

  const item: CompletedExercise = {
    exerciseName,
    completedAt: Date.now(),
  };

  existing.push(item);

  localStorage.setItem(KEY, JSON.stringify(existing));
};

// Get all saved exercises
export const getExercises = (): CompletedExercise[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(KEY) || "[]");
};

// Delete all saved exercises
export const clearExercises = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
};
