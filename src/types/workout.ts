import { z } from 'zod';

// Muscle Group Enum
export const MuscleGroupEnum = z.enum([
  'CHEST',
  'BACK',
  'LEGS',
  'ARMS',
  'SHOULDER',
  'CARDIO',
  'CORE',
  'FULL_BODY'
]);

export type MuscleGroup = z.infer<typeof MuscleGroupEnum>;

// Exercise Schema
export const ExerciseSchema = z.object({
  id: z.string().uuid(),
  exerciseName: z.string().min(1, 'Exercise name is required'),
  muscleGroup: MuscleGroupEnum,
  targetSets: z.number().int().min(1).max(20),
  targetReps: z.string(),
  notes: z.string().optional(),
});

export type Exercise = z.infer<typeof ExerciseSchema>;

// Workout Day Schema
export const WorkoutDaySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Workout name is required'),
  dayOfWeek: z.number().int().min(0).max(6),
  isRestDay: z.boolean(),
  exercises: z.array(ExerciseSchema),
});

export type WorkoutDay = z.infer<typeof WorkoutDaySchema>;

// Exercise Progress Input Schema
export const ExerciseProgressSchema = z.object({
  exerciseId: z.string().uuid(),
  completedSets: z.array(
    z.object({
      setNumber: z.number().int().min(1),
      reps: z.number().int().min(0),
      weight: z.number().min(0).optional(),
    })
  ),
  completed: z.boolean(),
  notes: z.string().optional(),
});

export type ExerciseProgress = z.infer<typeof ExerciseProgressSchema>;

// Previous Performance Data
export interface PreviousPerformance {
  date: string;
  sets: Array<{
    reps: number;
    weight?: number;
  }>;
}

// Muscle Group to Image Path Mapping
export const muscleGroupImageMap: Record<MuscleGroup | 'DEFAULT', string> = {
  CHEST: '/fullBody.png',
  BACK: '/fullBodyBack.png',
  LEGS: '/fullBody.png',
  ARMS: '/fullBodyBack.png',
  SHOULDER: '/fullBody.png',
  CARDIO: '/fullBodyBack.png',
  CORE: '/fullBody.png',
  FULL_BODY: '/fullBodyBack.png',
  DEFAULT: '/fullBody.png',
};

// Helper to get image path
export const getMuscleGroupImage = (muscleGroup: MuscleGroup): string => {
  return muscleGroupImageMap[muscleGroup] || muscleGroupImageMap.DEFAULT;
};

// System Messages
export const systemMessages = [
  "SYSTEM: Your aura is stabilizing.",
  "SYSTEM: Continue today's grind.",
  "SYSTEM: Focus your energy.",
  "SYSTEM: Power level increasing.",
  "SYSTEM: Achievement unlocked soon.",
  "SYSTEM: Shadow extraction available.",
  "SYSTEM: Arise, Hunter.",
];

export const getRandomSystemMessage = (): string => {
  return systemMessages[Math.floor(Math.random() * systemMessages.length)];
};
