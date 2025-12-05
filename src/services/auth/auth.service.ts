"use server";
import { dataFetch } from "@/src/lib/data-fetch";
import { revalidateTag } from "next/cache";
import { extractTokens, persistTokens } from "./tokenHandlers";

/* eslint-disable @typescript-eslint/no-explicit-any */

type RegisterActionResult = {
    success: boolean;
    message: string;
    data?: unknown;
    errors?: Record<string, unknown>;
}

type UpdateProfileResult = {
    success: boolean;
    message: string;
    data?: unknown;
}


// Basic registration - accepts plain object, not FormData
export const registerUser = async (data: {
    name: string;
    email: string;
    password: string;
}): Promise<RegisterActionResult> => {
    try {
        const res = await dataFetch.post("/auth/register", {
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json().catch(() => null);

 if (!res.ok) {
            return {
                success: false,
                // FIX: Access error.message instead of message
                message: result?.error?.message || result?.message || "Registration failed. Please try again.",
                errors: result?.errors || result?.error?.details,
            };
        }

        if (result && result.success === false) {
            return {
                success: false,
                // FIX: Access error.message instead of message
                message: result?.error?.message || result?.message || "Registration failed. Please try again.",
                errors: result?.errors || result?.error?.details,
            };
        }


        const { accessToken, refreshToken } = await extractTokens(result);
            await persistTokens(accessToken, refreshToken);
       

        return {
            success: true,
            message: result?.message || "Registration completed successfully.",
            data: result?.data,
        };

    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.error('Registration error:', error);
        return { 
            success: false, 
            message: process.env.NODE_ENV === 'development' 
                ? error.message 
                : "Registration Failed. Please try again." 
        };
    }
}

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

