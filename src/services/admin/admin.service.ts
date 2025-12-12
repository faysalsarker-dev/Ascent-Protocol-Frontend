"use server";

import { dataFetch } from "@/src/lib/data-fetch";
import { revalidateTag } from "next/cache";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, unknown>;
  error?: {
    code: string;
    message: string;
  };
}

export async function getAllUsers(
  page: number = 1,
  limit: number = 10,
  search: string = "",
  sort: "newest" | "oldest" = "newest"
) {
  try {
    const response = await dataFetch.get(
      `/admin/users?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&sort=${sort}`,
      { next: { tags: ["users"], revalidate: 300 } }
    );
    return response.json();
  } catch (error) {
    console.error("Get all users error:", error);
    throw error;
  }
}

export async function deleteUser(userId: string){
  if (!userId) throw new Error("User ID is required");
  try {
    const response = await dataFetch.delete(`/admin/users/${userId}`);
    revalidateTag("users", {});
    return response.json();
  } catch (error) {
    console.error("Delete user error:", error);
    throw error;
  }
}

export async function updateUser(
  userId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload:any
) {
  if (!userId) throw new Error("User ID is required");
  try {
    const response = await dataFetch.patch(`/admin/users/${userId}`, payload);
    revalidateTag("users", {});
    return response.json();
  } catch (error) {
    console.error("Update user error:", error);
    throw error;
  }
}