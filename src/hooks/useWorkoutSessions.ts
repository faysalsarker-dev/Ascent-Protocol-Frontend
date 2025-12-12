
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
  getLastWorkoutSession,
  UpdateWorkoutSessionPayload
} from "../services/workout/workout.service";

import type {
  WorkoutSession,
  GetSessionsParams,
  ApiResponse,
} from "@/src/types/workout-session";



// -----------------------
// QUERY HOOKS
// -----------------------

export function useWorkoutSessions(params?: GetSessionsParams) {
  return useQuery({
    queryKey: ["workout-sessions", params],
    queryFn: () => getAllWorkoutSessions(),
  });
}

export function useCurrentWorkoutSession() {
  return useQuery<ApiResponse<WorkoutSession | null>>({
    queryKey: ["workout-session-current"],
    queryFn:() => getCurrentWorkoutSession(),
  });
}

export function useLastWorkoutSession() {
  return useQuery({
    queryKey: ["workout-session-last"],
    queryFn:()=> getLastWorkoutSession(),
    staleTime: 1000 * 60 * 120,
gcTime: 1000 * 60 * 60,
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
  return useMutation({
    mutationFn: (payload:{workoutDayId:string,dayName:string}) => createWorkoutSession(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["workout-sessions"] });
    },
  });
}




export function useUpdateWorkoutSession(sessionId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload:UpdateWorkoutSessionPayload) => updateWorkoutSession(sessionId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["workout-sessions"] });
      qc.invalidateQueries({ queryKey: ["workout-session", sessionId] });
    },
  });
}

export function useCompleteWorkoutSession() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => completeWorkoutSession(sessionId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["workout-sessions"] });
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
