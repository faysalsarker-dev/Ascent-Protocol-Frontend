// src/hooks/useChat.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  sendChatMessage,
  getChatHistory,
  generateWorkoutPlan,
  deleteChatMessage,
  deleteAllChatHistory,
  getChatHistoryToday,
} from "@/src/services/chat/chat.service";

// ------------------ QUERIES ------------------

export function useChatHistory() {
  return useQuery({
    queryKey: ["chat-history"],
    queryFn: () => getChatHistory(),
  });
}

export function useChatHistoryToday() {
  return useQuery({
    queryKey: ["today-history"],
    queryFn: () => getChatHistoryToday(),
  });
}

// ------------------ MUTATIONS ------------------

export function useSendChatMessage() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: { message: string }) => sendChatMessage(payload),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["today-history"] });
    },
  });
}

export function useGenerateWorkoutPlan() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: { goal: string; days: number }) =>
      generateWorkoutPlan(payload),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["chat-history"] });
    },
  });
}

export function useDeleteChatMessage(messageId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => deleteChatMessage(messageId),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["chat-history"] });
    },
  });
}

export function useDeleteAllChatHistory() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => deleteAllChatHistory(),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["chat-history"] });
    },
  });
}
