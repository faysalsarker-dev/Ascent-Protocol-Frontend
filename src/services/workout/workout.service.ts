"use server";

import { dataFetch } from "@/src/lib/data-fetch";
import { revalidateTag } from "next/cache";








import { WorkoutPlan } from '@/src/types/workout.types';
// import { BulkSetPayload } from "@/src/types/workout";
// import { UpdateExerciseSetPayload } from "@/src/types/workout";
// import { CreateExerciseSetPayload } from "@/src/types/workout";
// import { CompleteSessionPayload } from "@/src/types/workout";
// import { UpdateWorkoutSessionPayload } from "@/src/types/workout";
// import { CreateWorkoutSessionPayload } from "@/src/types/workout";
// import { GetSessionsParams } from "@/src/types/workout";
// import { ReorderExercisePayload } from "@/src/types/workout";
// import { UpdatePlannedExercisePayload } from "@/src/types/workout";
// import { CreatePlannedExercisePayload } from "@/src/types/workout";
// import { UpdateWorkoutDayPayload } from "@/src/types/workout";
// import { CreateWorkoutDayPayload } from "@/src/types/workout";
// import { UpdateWorkoutPlanPayload } from "@/src/types/workout";






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



export interface WorkoutDay {
  id: string;
  weeklyPlanId: string;
  dayOfWeek: number; // 1=Monday, 7=Sunday
  name: string;
  isRestDay?: boolean;
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
  muscleGroup: MuscleGroup | string;
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












// ==================== Workout Plans ====================
export async function getAllWorkoutPlans(){
  try {
    const response = await dataFetch.get("/workout-plans", {
      next: { tags: ["workout-plans"] },
    });
    return response.json();
  } catch (error) {
    console.error("Get workout plans error:", error);
    throw error;
  }
}

export async function getActiveWorkoutPlan(){
  try {
    const response = await dataFetch.get("/workout-plans/active", {
      next: { tags: ["workout-plans", "active-plan"] },
    });
    return response.json();
  } catch (error) {
    console.error("Get active plan error:", error);
    throw error;
  }
}

export async function getWorkoutPlanById(planId: string){
  try {
    const response = await dataFetch.get(`/workout-plans/${planId}`, {
      next: { tags: ["workout-plans", `workout-plan-${planId}`] },
    });
    return response.json();
  } catch (error) {
    console.error("Get workout plan error:", error);
    throw error;
  }
}



export async function createWorkoutPlan(
  payload:WorkoutPlan
){
  try {
    const response = await dataFetch.post("/workout-plans", {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    
    if (result.success) {
      revalidateTag("workout-plans",{});
    }

    return result;
  } catch (error) {
    console.error("Create workout plan error:", error);
    throw error;
  }
}

export async function updateWorkoutPlan(
  planId: string,
  payload: UpdateWorkoutPlanPayload
){
  try {
    const response = await dataFetch.put(`/workout-plans/${planId}`, {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("workout-plans",{});
      revalidateTag(`workout-plan-${planId}`,{});
    }

    return result;
  } catch (error) {
    console.error("Update workout plan error:", error);
    throw error;
  }
}

export async function activateWorkoutPlan(planId: string){
  try {
    const response = await dataFetch.patch(`/workout-plans/${planId}/activate`);
    const result = await response.json();

    if (result.success) {
      revalidateTag("workout-plans",{});
      revalidateTag("active-plan",{});
    }

    return result;
  } catch (error) {
    console.error("Activate workout plan error:", error);
    throw error;
  }
}

export async function deleteWorkoutPlan(planId: string){
  try {
    const response = await dataFetch.delete(`/workout-plans/${planId}`);
    const result = await response.json();

    if (result.success) {
      revalidateTag("workout-plans",{});
      revalidateTag(`workout-plan-${planId}`,{});
    }

    return result;
  } catch (error) {
    console.error("Delete workout plan error:", error);
    throw error;
  }
}

// ==================== Workout Days ====================
export async function getWorkoutDaysByPlan(planId: string){
  try {
    const response = await dataFetch.get(`/workout-days/plan/${planId}`, {
      next: { tags: ["workout-days", `workout-days-${planId}`] },
    });
    return response.json();
  } catch (error) {
    console.error("Get workout days error:", error);
    throw error;
  }
}

export async function getTodayWorkoutDay(){
  try {
    const response = await dataFetch.get("/workout-days/today", {
      next: { tags: ["today-workout"], revalidate: 3600 },
    });
    return response.json();
  } catch (error) {
    console.error("Get today workout error:", error);
    throw error;
  }
}

export async function getWorkoutDayById(dayId: string){
  try {
    const response = await dataFetch.get(`/workout-days/${dayId}`, {
      next: { tags: ["workout-days", `workout-day-${dayId}`] },
    });
    return response.json();
  } catch (error) {
    console.error("Get workout day error:", error);
    throw error;
  }
}

export async function createWorkoutDay(
  planId: string,
  payload: CreateWorkoutDayPayload
){
  try {
    const response = await dataFetch.post(`/workout-days/plan/${planId}`, {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("workout-days",{});
      revalidateTag(`workout-days-${planId}`,{});
    }

    return result;
  } catch (error) {
    console.error("Create workout day error:", error);
    throw error;
  }
}

export async function updateWorkoutDay(
  dayId: string,
  payload: UpdateWorkoutDayPayload
){
  try {
    const response = await dataFetch.put(`/workout-days/${dayId}`, {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("workout-days",{});
      revalidateTag(`workout-day-${dayId}`,{});
      revalidateTag("today-workout",{});
    }

    return result;
  } catch (error) {
    console.error("Update workout day error:", error);
    throw error;
  }
}

export async function deleteWorkoutDay(dayId: string){
  try {
    const response = await dataFetch.delete(`/workout-days/${dayId}`);
    const result = await response.json();

    if (result.success) {
      revalidateTag("workout-days",{});
      revalidateTag(`workout-day-${dayId}`,{});
    }

    return result;
  } catch (error) {
    console.error("Delete workout day error:", error);
    throw error;
  }
}

// ==================== Planned Exercises ====================
export async function getPlannedExercisesByDay(
  dayId: string
) {
  try {
    const response = await dataFetch.get(`/planned-exercises/day/${dayId}`, {
      next: { tags: ["planned-exercises", `planned-exercises-${dayId}`] },
    });
    return response.json();
  } catch (error) {
    console.error("Get planned exercises error:", error);
    throw error;
  }
}

export async function getPlannedExerciseById(
  exerciseId: string
){
  try {
    const response = await dataFetch.get(`/planned-exercises/${exerciseId}`, {
      next: { tags: ["planned-exercises", `planned-exercise-${exerciseId}`] },
    });
    return response.json();
  } catch (error) {
    console.error("Get planned exercise error:", error);
    throw error;
  }
}

export async function createPlannedExercise(
  dayId: string,
  payload: CreatePlannedExercisePayload
){
  try {
    const response = await dataFetch.post(`/planned-exercises/day/${dayId}`, {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("planned-exercises",{});
      revalidateTag(`planned-exercises-${dayId}`,{});
    }

    return result;
  } catch (error) {
    console.error("Create planned exercise error:", error);
    throw error;
  }
}

export async function updatePlannedExercise(
  exerciseId: string,
  payload: UpdatePlannedExercisePayload
){
  try {
    const response = await dataFetch.put(`/planned-exercises/${exerciseId}`, {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("planned-exercises",{});
      revalidateTag(`planned-exercise-${exerciseId}`,{});
    }

    return result;
  } catch (error) {
    console.error("Update planned exercise error:", error);
    throw error;
  }
}

export async function deletePlannedExercise(exerciseId: string){
  try {
    const response = await dataFetch.delete(`/planned-exercises/${exerciseId}`);
    const result = await response.json();

    if (result.success) {
      revalidateTag("planned-exercises",{});
      revalidateTag(`planned-exercise-${exerciseId}`,{});
    }

    return result;
  } catch (error) {
    console.error("Delete planned exercise error:", error);
    throw error;
  }
}

export async function reorderPlannedExercises(
  dayId: string,
  payload: ReorderExercisePayload[]
) {
  try {
    const response = await dataFetch.post(`/planned-exercises/day/${dayId}/reorder`, {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag(`planned-exercises-${dayId}`,{});
    }

    return result;
  } catch (error) {
    console.error("Reorder exercises error:", error);
    throw error;
  }
}

export async function duplicatePlannedExercise(
  exerciseId: string
){
  try {
    const response = await dataFetch.post(`/planned-exercises/${exerciseId}/duplicate`);
    const result = await response.json();

    if (result.success) {
      revalidateTag("planned-exercises",{});
    }

    return result;
  } catch (error) {
    console.error("Duplicate exercise error:", error);
    throw error;
  }
}

// ==================== Workout Sessions ====================
export async function getAllWorkoutSessions(
  params?: GetSessionsParams
){
  try {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append("status", params.status);
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.offset) queryParams.append("offset", params.offset.toString());
    if (params?.startDate) queryParams.append("startDate", params.startDate);
    if (params?.endDate) queryParams.append("endDate", params.endDate);

    const query = queryParams.toString();
    const response = await dataFetch.get(`/workout-sessions${query ? `?${query}` : ""}`, {
      next: { tags: ["workout-sessions"] },
    });

    return response.json();
  } catch (error) {
    console.error("Get workout sessions error:", error);
    throw error;
  }
}

export async function getCurrentWorkoutSession(){
  try {
    const response = await dataFetch.get("/workout-sessions/current");
    return response.json();
  } catch (error) {
    console.error("Get current session error:", error);
    throw error;
  }
}

export async function getLastWorkoutSession(){
  try {
    const response = await dataFetch.get("/workout-sessions/last", {
      next: { tags: ["last-workout"], revalidate: 3600 }
    });
    return response.json();
  } catch (error) {
    console.error("Get current session error:", error);
    throw error;
  }
}

export async function getWorkoutSessionById(
  sessionId: string
){
  try {
    const response = await dataFetch.get(`/workout-sessions/${sessionId}`, {
      next: { tags: ["workout-sessions", `workout-session-${sessionId}`] },
    });
    return response.json();
  } catch (error) {
    console.error("Get workout session error:", error);
    throw error;
  }
}

export async function createWorkoutSession(
  payload: CreateWorkoutSessionPayload
){
  try {
    const response = await dataFetch.post("/workout-sessions", {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("workout-sessions",{});
    }

    return result;
  } catch (error) {
    console.error("Create workout session error:", error);
    throw error;
  }
}

export async function updateWorkoutSession(
  sessionId: string,
  payload: UpdateWorkoutSessionPayload
){
  try {
    const response = await dataFetch.put(`/workout-sessions/${sessionId}`, {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("workout-sessions",{});
      revalidateTag(`workout-session-${sessionId}`,{});
    }

    return result;
  } catch (error) {
    console.error("Update workout session error:", error);
    throw error;
  }
}

export async function completeWorkoutSession(
  sessionId: string,
  payload?: CompleteSessionPayload
){
  try {
    const response = await dataFetch.patch(`/workout-sessions/${sessionId}/complete`, {
      body: payload ? JSON.stringify(payload) : undefined,
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("workout-sessions",{});
      revalidateTag(`workout-session-${sessionId}`,{});
    }

    return result;
  } catch (error) {
    console.error("Complete session error:", error);
    throw error;
  }
}

export async function skipWorkoutSession(sessionId: string){
  try {
    const response = await dataFetch.patch(`/workout-sessions/${sessionId}/skip`);
    const result = await response.json();

    if (result.success) {
      revalidateTag("workout-sessions",{});
      revalidateTag(`workout-session-${sessionId}`,{});
    }

    return result;
  } catch (error) {
    console.error("Skip session error:", error);
    throw error;
  }
}

export async function deleteWorkoutSession(sessionId: string){
  try {
    const response = await dataFetch.delete(`/workout-sessions/${sessionId}`);
    const result = await response.json();

    if (result.success) {
      revalidateTag("workout-sessions",{});
      revalidateTag(`workout-session-${sessionId}`,{});
    }

    return result;
  } catch (error) {
    console.error("Delete session error:", error);
    throw error;
  }
}

// ==================== Exercise Sets ====================
export async function getExerciseSetsBySession(
  sessionId: string
){
  try {
    const response = await dataFetch.get(`/exercise-sets/session/${sessionId}`, {
      next: { tags: ["exercise-sets", `exercise-sets-${sessionId}`] },
    });
    return response.json();
  } catch (error) {
    console.error("Get exercise sets error:", error);
    throw error;
  }
}

export async function getGroupedExerciseSetsBySession(
  sessionId: string
){
  try {
    const response = await dataFetch.get(`/exercise-sets/session/${sessionId}/grouped`, {
      next: { tags: ["exercise-sets", `exercise-sets-${sessionId}`] },
    });
    return response.json();
  } catch (error) {
    console.error("Get grouped exercise sets error:", error);
    throw error;
  }
}

export async function getExerciseSetById(setId: string){
  try {
    const response = await dataFetch.get(`/exercise-sets/${setId}`, {
      next: { tags: ["exercise-sets", `exercise-set-${setId}`] },
    });
    return response.json();
  } catch (error) {
    console.error("Get exercise set error:", error);
    throw error;
  }
}

export async function createExerciseSet(
  sessionId: string,
  payload: CreateExerciseSetPayload
){
  try {
    const response = await dataFetch.post(`/exercise-sets/session/${sessionId}`, {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("exercise-sets",{});
      revalidateTag(`exercise-sets-${sessionId}`,{});
    }

    return result;
  } catch (error) {
    console.error("Create exercise set error:", error);
    throw error;
  }
}






export async function createBulkExerciseSets(
  sessionId: string,
  payload: BulkSetPayload
){
  try {
    const response = await dataFetch.post(`/exercise-sets/session/${sessionId}/bulk`, {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("exercise-sets",{});
      revalidateTag(`exercise-sets-${sessionId}`,{});
    }

    return result;
  } catch (error) {
    console.error("Create bulk exercise sets error:", error);
    throw error;
  }
}

export async function updateExerciseSet(
  setId: string,
  payload:UpdateExerciseSetPayload
){
  try {
    const response = await dataFetch.put(`/exercise-sets/${setId}`, {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("exercise-sets",{});
      revalidateTag(`exercise-set-${setId}`,{});
    }

    return result;
  } catch (error) {
    console.error("Update exercise set error:", error);
    throw error;
  }
}

export async function deleteExerciseSet(setId: string){
  try {
    const response = await dataFetch.delete(`/exercise-sets/${setId}`);
    const result = await response.json();

    if (result.success) {
      revalidateTag("exercise-sets",{});
      revalidateTag(`exercise-set-${setId}`,{});
    }

    return result;
  } catch (error) {
    console.error("Delete exercise set error:", error);
    throw error;
  }
}

export async function getExerciseHistory(
  exerciseName: string,
  limit?: number
){
  try {
    const query = limit ? `?limit=${limit}` : "";
    const response = await dataFetch.get(
      `/exercise-sets/history/${encodeURIComponent(exerciseName)}${query}`,
      {
        next: { tags: ["exercise-history", `exercise-history-${exerciseName}`] },
      }
    );
    return response.json();
  } catch (error) {
    console.error("Get exercise history error:", error);
    throw error;
  }
}

export async function getPersonalRecords(){
  try {
    const response = await dataFetch.get("/exercise-sets/personal-records", {
      next: { tags: ["personal-records"], revalidate: 3600 },
    });
    return response.json();
  } catch (error) {
    console.error("Get personal records error:", error);
    throw error;
  }
}

