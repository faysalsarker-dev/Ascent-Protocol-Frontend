"use server";

import { dataFetch } from "@/src/lib/data-fetch";
import { revalidateTag } from "next/cache";
import type {
  ApiResponse,
  WorkoutPlan,
  CreateWorkoutPlanPayload,
  UpdateWorkoutPlanPayload,
  WorkoutDay,
  CreateWorkoutDayPayload,
  UpdateWorkoutDayPayload,
  PlannedExercise,
  CreatePlannedExercisePayload,
  UpdatePlannedExercisePayload,
  WorkoutSession,
  CreateWorkoutSessionPayload,
  UpdateWorkoutSessionPayload,
  CompleteSessionPayload,
  ExerciseSet,
  CreateExerciseSetPayload,
  BulkSetPayload,
  UpdateExerciseSetPayload,
  ReorderExercisePayload,
  GetSessionsParams,
} from "@/src/types/workout";

// ==================== Workout Plans ====================
export async function getAllWorkoutPlans(): Promise<ApiResponse<WorkoutPlan[]>> {
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

export async function getActiveWorkoutPlan(): Promise<ApiResponse<WorkoutPlan>> {
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

export async function getWorkoutPlanById(planId: string): Promise<ApiResponse<WorkoutPlan>> {
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
  payload: CreateWorkoutPlanPayload
): Promise<ApiResponse<WorkoutPlan>> {
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
): Promise<ApiResponse<WorkoutPlan>> {
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

export async function activateWorkoutPlan(planId: string): Promise<ApiResponse<WorkoutPlan>> {
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

export async function deleteWorkoutPlan(planId: string): Promise<ApiResponse<void>> {
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
export async function getWorkoutDaysByPlan(planId: string): Promise<ApiResponse<WorkoutDay[]>> {
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

export async function getTodayWorkoutDay(): Promise<ApiResponse<WorkoutDay>> {
  try {
    const response = await dataFetch.get("/workout-days/today", {
      // next: { tags: ["today-workout"] }, // Cache for 1 hour
      next: { tags: ["today-workout"], revalidate: 3600 }, // Cache for 1 hour
    });
    return response.json();
  } catch (error) {
    console.error("Get today workout error:", error);
    throw error;
  }
}

export async function getWorkoutDayById(dayId: string): Promise<ApiResponse<WorkoutDay>> {
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
): Promise<ApiResponse<WorkoutDay>> {
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
): Promise<ApiResponse<WorkoutDay>> {
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

export async function deleteWorkoutDay(dayId: string): Promise<ApiResponse<void>> {
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
): Promise<ApiResponse<PlannedExercise[]>> {
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
): Promise<ApiResponse<PlannedExercise>> {
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
): Promise<ApiResponse<PlannedExercise>> {
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
): Promise<ApiResponse<PlannedExercise>> {
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

export async function deletePlannedExercise(exerciseId: string): Promise<ApiResponse<void>> {
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
): Promise<ApiResponse<void>> {
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
): Promise<ApiResponse<PlannedExercise>> {
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
): Promise<ApiResponse<WorkoutSession[]>> {
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

export async function getCurrentWorkoutSession(): Promise<ApiResponse<WorkoutSession | null>> {
  try {
    const response = await dataFetch.get("/workout-sessions/current", {
      cache: "no-store", 
    });
    return response.json();
  } catch (error) {
    console.error("Get current session error:", error);
    throw error;
  }
}

export async function getLastWorkoutSession(): Promise<ApiResponse<WorkoutSession | null>> {
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
): Promise<ApiResponse<WorkoutSession>> {
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
): Promise<ApiResponse<WorkoutSession>> {
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
): Promise<ApiResponse<WorkoutSession>> {
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
): Promise<ApiResponse<WorkoutSession>> {
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

export async function skipWorkoutSession(sessionId: string): Promise<ApiResponse<WorkoutSession>> {
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

export async function deleteWorkoutSession(sessionId: string): Promise<ApiResponse<void>> {
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
): Promise<ApiResponse<ExerciseSet[]>> {
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
): Promise<ApiResponse<Record<string, ExerciseSet[]>>> {
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

export async function getExerciseSetById(setId: string): Promise<ApiResponse<ExerciseSet>> {
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
): Promise<ApiResponse<ExerciseSet>> {
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
): Promise<ApiResponse<ExerciseSet[]>> {
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
  payload: UpdateExerciseSetPayload
): Promise<ApiResponse<ExerciseSet>> {
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

export async function deleteExerciseSet(setId: string): Promise<ApiResponse<void>> {
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
): Promise<ApiResponse<ExerciseSet[]>> {
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

export async function getPersonalRecords(): Promise<ApiResponse<ExerciseSet[]>> {
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
