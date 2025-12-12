"use server";
import { dataFetch } from "@/src/lib/data-fetch";
import { revalidateTag } from "next/cache";
import { extractTokens, persistTokens } from "./tokenHandlers";
import {  RegisterFormValues, registerSchema } from "@/src/schemas/register.schema";
import { AuthActionResult } from "./session.service";

/* eslint-disable @typescript-eslint/no-explicit-any */



type UpdateProfileResult = {
    success: boolean;
    message: string;
    data?: unknown;
}







export const registerUser = async (
  payload: RegisterFormValues
): Promise<AuthActionResult> => {
  try {
    // Validate input
    const validation = registerSchema.safeParse(payload);
    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validation.error.flatten().fieldErrors,
      };
    }

    // Make API request
    const response = await dataFetch.post("/auth/register", {
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
        message: result?.error?.message || result?.message || "Registration failed. Please try again.",
        errors: result?.errors || result?.error?.details,
      };
    }

    if (result && result.success === false) {
      return {
        success: false,
        message: result?.error?.message || result?.message || "Registration failed. Please try again.",
        errors: result?.errors || result?.error?.details,
      };
    }

    // Extract and persist tokens
    const { accessToken, refreshToken } = await extractTokens(result);
    await persistTokens(accessToken, refreshToken);

    return {
      success: true,
      message: result?.message || "Registration successful.",
      data: result?.data,
    };
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error?.message || "Registration failed. Please try again."
          : "Registration failed. Please try again.",
    };
  }
};










// Update extra profile fields - handles FormData with file upload
export async function updateProfileExtras(formData: FormData): Promise<UpdateProfileResult> {
    try {
console.log('update functions',formData);
        const response = await dataFetch.put(`/auth/update-my-profile`, {
            body: formData, 
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result?.error?.message || result?.message || "Profile update failed. Please try again.",
            };
        }

        if (result && result.success === false) {
            return {
                success: false,
                message: result?.error?.message || result?.message || "Profile update failed. Please try again.",
            };
        }

        revalidateTag("user-info", {});

        return {
            success: true,
            message: result?.message || "Profile updated successfully.",
            data: result?.data,
        };

    } catch (error: any) {
        console.error('Profile update error:', error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' 
                ? error.message 
                : 'Failed to update profile. Please try again.'
        };
    }
}


// General profile update function (existing one, improved)
export async function updateMyProfile(data: FormData): Promise<UpdateProfileResult> {
  try {
    const response = await dataFetch.patch(`/auth/update-my-profile`, {
      body: data,        
   
    });

    const result = await response.json();

    if (!result.success) {
      return {
        success: false,
        message: result?.message || "Update failed.",
      };
    }

    revalidateTag("user-info",{});

    return {
      success: true,
      message: result?.message || "Profile updated successfully.",
      data: result?.data,
    };

  } catch (error: any) {
    console.error("Update profile error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}

export async function updatePassword(data:{oldPassword:string,newPassword:string}): Promise<UpdateProfileResult> {
  try {
    const response = await dataFetch.patch(`/auth/change-password`, {
         body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },      
   
    });

    const result = await response.json();

     if (!result.ok) {
            return {
                success: false,
                message: result?.error?.message || result?.message || "Registration failed. Please try again.",
            };
        }

        if (result && result.success === false) {
            return {
                success: false,
                message: result?.error?.message || result?.message || "Registration failed. Please try again.",
            };
        }

    revalidateTag("user-info",{});

    return {
      success: true,
      message: result?.message || "Profile updated successfully.",
      data: result?.data,
    };

  } catch (error: any) {
    console.error("Update profile error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}



export async function getMe() {
  try {
    const response = await dataFetch.get("/auth/me", {
      next: { tags: ["user-info"] }, 
    //   next: { tags: ["user-info"], revalidate: 3600 }, 
    });
    return response.json();
  } catch (error) {
    console.error("Get today workout error:", error);
    throw error;
  }
}












