export interface WorkoutExercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
}

export interface WorkoutSession {
  id: string;
  status: "pending" | "active" | "completed" | "skipped";
  startTime?: string;
  endTime?: string;
  createdAt: string;
  updatedAt: string;
  exercises: WorkoutExercise[];
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface GetSessionsParams {
  status?: "pending" | "active" | "completed" | "skipped";
  limit?: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
}

export interface CreateWorkoutSessionPayload {
  sessionDate: string;
  exercises: {
    exerciseId: string;
    sets: number;
    reps: number;
    weight?: number;
  }[];
}

export interface UpdateWorkoutSessionPayload {
  sessionDate?: string;
  exercises?: {
    exerciseId: string;
    sets?: number;
    reps?: number;
    weight?: number;
  }[];
}

export interface CompleteSessionPayload {
  notes?: string;
  intensity?: "low" | "medium" | "high";
}
