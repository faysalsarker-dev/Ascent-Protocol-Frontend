/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { dataFetch } from "@/src/lib/data-fetch";
import { loginSchema } from "@/src/schemas/auth.schema";
import { LoginFormValues } from "@/src/schemas/auth.schema";
import { deleteCookie, extractTokens, getCookie, persistTokens } from "@/src/services/auth/tokenHandlers";



export type AuthActionResult = {
  success: boolean;
  message: string;
  data?: unknown;
  errors?: Record<string, unknown>;
};











export const loginUser = async (
  payload: LoginFormValues
): Promise<AuthActionResult> => {
  try {
    // Validate input
    const validation = loginSchema.safeParse(payload);
    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validation.error.flatten().fieldErrors,
      };
    }

    // Make API request
    const response = await dataFetch.post("/auth/login", {
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        });

    const result = await response.json().catch(() => null);

    // Handle error responses
    if (!response.ok) {
      return {
        success: false,
        message: result?.error?.message || result?.message || "Login failed. Please try again.",
        errors: result?.errors || result?.error?.details,
      };
    }

    if (result && result.success === false) {
      return {
        success: false,
        message: result?.error?.message || result?.message || "Login failed. Please try again.",
        errors: result?.errors || result?.error?.details,
      };
    }

    // Extract and persist tokens
    const { accessToken, refreshToken } = await extractTokens(result);
    await persistTokens(accessToken, refreshToken);

    return {
      success: true,
      message: result?.message || "Login successful.",
      data: result?.data,
    };
  } catch (error: any) {
    // Handle Next.js redirects
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error?.message || "Login failed. Please try again."
          : "Login failed. Please try again.",
    };
  }
}


export const logoutUser = async (): Promise<void> => {
  await deleteCookie("accessToken");
  await deleteCookie("refreshToken");
};

export const refreshSession = async (): Promise<AuthActionResult> => {
  try {
    const refreshToken = await getCookie("refreshToken");

    if (!refreshToken) {
      await logoutUser();
      return {
        success: false,
        message: "Session expired. Please login again.",
      };
    }

    const response = await dataFetch.post("/auth/refresh-token", {
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.success) {
      await logoutUser();
      return {
        success: false,
        message: result?.message || "Session refresh failed. Please login again.",
      };
    }

    const { accessToken, refreshToken: newRefreshToken } =await extractTokens(result);
    await persistTokens(accessToken, newRefreshToken);

    return {
      success: true,
      message: result?.message || "Session refreshed successfully.",
      data: result?.data,
    };
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    await logoutUser();
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error?.message || "Session refresh failed."
          : "Session refresh failed.",
    };
  }
};





