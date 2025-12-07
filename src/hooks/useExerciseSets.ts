// src/hooks/useExerciseSets.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getExerciseSetById,
  createExerciseSet,
  createBulkExerciseSets,
  updateExerciseSet,
  deleteExerciseSet,
} from "../services/workout/workout.service";
import type { ExerciseSet, CreateExerciseSetPayload, BulkSetPayload, UpdateExerciseSetPayload } from "./../types/workout.d";

// ------------------ QUERY ------------------
export function useGetExerciseSetById(setId?: string) {
  return useQuery({
    queryKey: ["exercise-set", setId],
    queryFn: () => getExerciseSetById(setId!),
    enabled: !!setId,
  });
}

// ------------------ MUTATIONS ------------------
export function useCreateExerciseSet(sessionId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateExerciseSetPayload) => createExerciseSet(sessionId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["exercise-sets"] });
      qc.invalidateQueries({ queryKey: ["exercise-sets", sessionId] });
    },
  });
}

export function useCreateBulkExerciseSets(sessionId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: BulkSetPayload) => createBulkExerciseSets(sessionId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["exercise-sets"] });
      qc.invalidateQueries({ queryKey: ["exercise-sets", sessionId] });
    },
  });
}

export function useUpdateExerciseSet(setId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateExerciseSetPayload) => updateExerciseSet(setId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["exercise-set", setId] });
      qc.invalidateQueries({ queryKey: ["exercise-sets"] });
    },
  });
}

export function useDeleteExerciseSet(setId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => deleteExerciseSet(setId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["exercise-sets"] });
      qc.invalidateQueries({ queryKey: ["exercise-set", setId] });
    },
  });
}
