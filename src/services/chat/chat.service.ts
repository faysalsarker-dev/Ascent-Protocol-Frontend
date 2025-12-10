"use server";

import { dataFetch } from "@/src/lib/data-fetch";
import { revalidateTag } from "next/cache";

const BASE = "/systeam-ai";
const TAG = "chat-history";


export async function sendChatMessage(payload: { message: string }) {
  const res = await dataFetch.post(`${BASE}/chat`, {
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return { success: false, error: "Failed to send message." };
  }


  revalidateTag("TODAY",{});


  return res.json();
}


export async function getChatHistoryToday() {
  const res = await dataFetch.get(`${BASE}/today`, {
    next: { tags: [TAG,"TODAY"] },
  });

  if (!res.ok) {
    return { success: false, error: "Failed to load history." };
  }

  return res.json();
}

export async function getChatHistory() {
  const res = await dataFetch.get(`${BASE}/history`, {
    next: { tags: [TAG] },
  });

  if (!res.ok) {
    return { success: false, error: "Failed to load history." };
  }

  return res.json();
}


export async function generateWorkoutPlan() {
  const res = await dataFetch.post(`${BASE}/workout-plan`);

  if (!res.ok) {
    return { success: false, error: "Failed to generate workout plan." };
  }

  // could also tag this with "workout-plan"
  revalidateTag(TAG,{});

  return res.json();
}


export async function deleteChatMessage(messageId: string) {
  const res = await dataFetch.delete(`${BASE}/message/${messageId}`);

  if (!res.ok) {
    return { success: false, error: "Failed to delete message." };
  }

  revalidateTag(TAG,{});
  return res.json();
}


export async function deleteAllChatHistory() {
  const res = await dataFetch.delete(`${BASE}/history`);

  if (!res.ok) {
    return { success: false, error: "Failed to clear history." };
  }

  revalidateTag(TAG,{});
  return res.json();
}
