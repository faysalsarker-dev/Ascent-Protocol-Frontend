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

export type WorkoutStatus = "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "SKIPPED";

export type Mood = "EXCELLENT" | "GOOD" | "AVERAGE" | "TIRED" | "POOR";

export interface WorkoutPlan {
  id: string;
  userId: string;
  name: string;
  description?: string | null;
  isActive: boolean;
  startDate: string;
  endDate?: string | null;
  workoutDays?: WorkoutDay[];
  createdAt: string;
  updatedAt: string;
  _count?: {
    workoutDays: number;
    sessions: number;
  };
}

export interface WorkoutDay {
  id: string;
  weeklyPlanId: string;
  dayOfWeek: number; // 1=Monday, 7=Sunday
  name: string;
  isRestDay: boolean;
  notes?: string | null;
  order: number;
  exercises?: PlannedExercise[];
  createdAt: string;
  updatedAt: string;
  _count?: {
    exercises: number;
    sessions: number;
  };
}

export interface PlannedExercise {
  id: string;
  workoutDayId: string;
  exerciseName: string;
  muscleGroup: MuscleGroup;
  targetSets: number;
  targetReps: string;
  targetWeight?: number | null;
  restSeconds?: number | null;
  notes?: string | null;
  videoUrl?: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface WorkoutSession {
  id: string;
  userId: string;
  workoutDayId?: string | null;
  sessionDate: string;
  dayName: string;
  status: WorkoutStatus;
  startedAt: string;
  completedAt?: string | null;
  durationMin?: number | null;
  totalSets: number;
  totalVolume?: number | null;
  mood?: Mood | null;
  energyLevel?: number | null;
  notes?: string | null;
  xpEarned: number;
  workoutDay?: WorkoutDay;
  exerciseSets?: ExerciseSet[];
}

export interface ExerciseSet {
  id: string;
  sessionId: string;
  exerciseName: string;
  muscleGroup: MuscleGroup;
  setNumber: number;
  reps: number;
  weight?: number | null;
  restSeconds?: number | null;
  formRating?: number | null; // 1-5
  difficulty?: number | null; // 1-5
  notes?: string | null;
  isPersonalRecord: boolean;
  previousReps?: number | null;
  previousWeight?: number | null;
  improvement?: string | null;
  createdAt: string;
  session?: {
    id: string;
    sessionDate: string;
    dayName: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, unknown>;
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    pagination?: {
      total: number;
      limit: number;
      offset: number;
    };
  };
}

export interface CreateWorkoutPlanPayload {
  name: string;
  description?: string;
  startDate?: string;
}

export interface UpdateWorkoutPlanPayload {
  name?: string;
  description?: string;
  endDate?: string;
}

export interface CreateWorkoutDayPayload {
  dayOfWeek: number;
  name: string;
  isRestDay?: boolean;
  notes?: string;
  order?: number;
}

export interface UpdateWorkoutDayPayload {
  name?: string;
  isRestDay?: boolean;
  notes?: string;
  order?: number;
}

export interface CreatePlannedExercisePayload {
  exerciseName: string;
  muscleGroup: MuscleGroup;
  targetSets: number;
  targetReps: string;
  targetWeight?: number;
  restSeconds?: number;
  notes?: string;
  videoUrl?: string;
  order?: number;
}

export interface UpdatePlannedExercisePayload {
  exerciseName?: string;
  muscleGroup?: MuscleGroup;
  targetSets?: number;
  targetReps?: string;
  targetWeight?: number;
  restSeconds?: number;
  notes?: string;
  videoUrl?: string;
  order?: number;
}

export interface CreateWorkoutSessionPayload {
  workoutDayId?: string;
  sessionDate?: string;
  dayName: string;
  notes?: string;
}

export interface UpdateWorkoutSessionPayload {
  status?: WorkoutStatus;
  completedAt?: string;
  durationMin?: number;
  mood?: Mood;
  energyLevel?: number;
  notes?: string;
}

export interface CompleteSessionPayload {
  mood?: Mood;
  energyLevel?: number;
  notes?: string;
}

export interface CreateExerciseSetPayload {
  exerciseName: string;
  muscleGroup: MuscleGroup;
  setNumber: number;
  reps: number;
  weight?: number;
  restSeconds?: number;
  formRating?: number;
  difficulty?: number;
  notes?: string;
}

export interface BulkSetPayload {
  exerciseName: string;
  muscleGroup: MuscleGroup;
  sets: Array<{
    setNumber: number;
    reps: number;
    weight?: number;
    restSeconds?: number;
    formRating?: number;
    difficulty?: number;
    notes?: string;
  }>;
}

export interface UpdateExerciseSetPayload {
  reps?: number;
  weight?: number;
  restSeconds?: number;
  formRating?: number;
  difficulty?: number;
  isPersonalRecord?: boolean;
  notes?: string;
}

export interface ReorderExercisePayload {
  exerciseId: string;
  newOrder: number;
}

export interface GetSessionsParams {
  status?: WorkoutStatus;
  limit?: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
}


