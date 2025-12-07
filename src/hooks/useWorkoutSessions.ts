
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getAllWorkoutSessions,
  getCurrentWorkoutSession,
  getWorkoutSessionById,
  createWorkoutSession,
  updateWorkoutSession,
  completeWorkoutSession,
  skipWorkoutSession,
  deleteWorkoutSession,
  getLastWorkoutSession
} from "../services/workout/workout.service";

import type {
  WorkoutSession,
  GetSessionsParams,
  CreateWorkoutSessionPayload,
  UpdateWorkoutSessionPayload,
  CompleteSessionPayload,
  ApiResponse,
} from "@/src/types/workout-session";



// -----------------------
// QUERY HOOKS
// -----------------------

export function useWorkoutSessions(params?: GetSessionsParams) {
  return useQuery<ApiResponse<WorkoutSession[]>>({
    queryKey: ["workout-sessions", params],
    queryFn: () => getAllWorkoutSessions(params),
  });
}

export function useCurrentWorkoutSession() {
  return useQuery<ApiResponse<WorkoutSession | null>>({
    queryKey: ["workout-session-current"],
    queryFn:() => getCurrentWorkoutSession(),
    refetchInterval: 5000,
  });
}

export function useLastWorkoutSession() {
  return useQuery<ApiResponse<WorkoutSession | null>>({
    queryKey: ["workout-session-last"],
    queryFn:()=> getLastWorkoutSession(),
    staleTime: 1000 * 60 * 120,
    cacheTime: 1000 * 60 * 120, 
    refetchOnWindowFocus: false,
  });
}

export function useWorkoutSessionById(sessionId: string) {
  return useQuery<ApiResponse<WorkoutSession>>({
    queryKey: ["workout-session", sessionId],
    queryFn: () => getWorkoutSessionById(sessionId),
    enabled: !!sessionId,
  });
}


// -----------------------
// MUTATION HOOKS
// -----------------------

export function useCreateWorkoutSession() {
  const qc = useQueryClient();

  return useMutation<ApiResponse<WorkoutSession>, Error, CreateWorkoutSessionPayload>({
    mutationFn: (payload) => createWorkoutSession(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["workout-sessions"] });
    },
  });
}

export function useUpdateWorkoutSession(sessionId: string) {
  const qc = useQueryClient();

  return useMutation<ApiResponse<WorkoutSession>, Error, UpdateWorkoutSessionPayload>({
    mutationFn: (payload) => updateWorkoutSession(sessionId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["workout-sessions"] });
      qc.invalidateQueries({ queryKey: ["workout-session", sessionId] });
    },
  });
}

export function useCompleteWorkoutSession(sessionId: string) {
  const qc = useQueryClient();

  return useMutation<ApiResponse<WorkoutSession>, Error, CompleteSessionPayload | undefined>({
    mutationFn: (payload) => completeWorkoutSession(sessionId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["workout-sessions"] });
      qc.invalidateQueries({ queryKey: ["workout-session", sessionId] });
    },
  });
}

export function useSkipWorkoutSession(sessionId: string) {
  const qc = useQueryClient();

  return useMutation<ApiResponse<WorkoutSession>, Error>({
    mutationFn: () => skipWorkoutSession(sessionId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["workout-sessions"] });
      qc.invalidateQueries({ queryKey: ["workout-session", sessionId] });
    },
  });
}

export function useDeleteWorkoutSession(sessionId: string) {
  const qc = useQueryClient();

  return useMutation<ApiResponse<void>, Error>({
    mutationFn: () => deleteWorkoutSession(sessionId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["workout-sessions"] });
    },
  });
}
