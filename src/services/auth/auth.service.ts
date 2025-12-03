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
                message: result?.message || "Registration failed. Please try again.",
                errors: result?.errors,
            };
        }

        if (result && result.success === false) {
            return {
                success: false,
                message: result?.message || "Registration failed. Please try again.",
                errors: result?.errors,
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
        const uploadFormData = new FormData();

        // Extract and prepare data object
        const data: Record<string, any> = {};
        
        const bio = formData.get('bio');
        const dateOfBirth = formData.get('dateOfBirth');
        const gender = formData.get('gender');
        const weight = formData.get('weight');
        const height = formData.get('height');

        if (bio) data.bio = bio;
        if (dateOfBirth) data.dateOfBirth = dateOfBirth;
        if (gender) data.gender = gender;
        if (weight) data.weight = parseFloat(weight as string);
        if (height) data.height = parseFloat(height as string);

        // Add the data as JSON string
        uploadFormData.append('data', JSON.stringify(data));

        // Add the avatar file if it exists
        const avatar = formData.get('avatar');
        if (avatar && avatar instanceof File && avatar.size > 0) {
            uploadFormData.append('file', avatar);
        }

        const response = await dataFetch.put(`/users/update-my-profile`, {
            body: uploadFormData,
        });

        const result = await response.json();

        if (!result.success) {
            return {
                success: false,
                message: result?.message || "Profile update failed.",
            };
        }

        // Revalidate user info cache
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
export async function updateMyProfile(formData: FormData): Promise<UpdateProfileResult> {
    try {
        const uploadFormData = new FormData();

        // Get all form fields except the file
        const data: any = {};
        formData.forEach((value, key) => {
            if (key !== 'file' && value) {
                data[key] = value;
            }
        });

        // Add the data as JSON string
        uploadFormData.append('data', JSON.stringify(data));

        // Add the file if it exists
        const file = formData.get('file');
        if (file && file instanceof File && file.size > 0) {
            uploadFormData.append('file', file);
        }

        const response = await dataFetch.patch(`/user/update-my-profile`, {
            body: uploadFormData,
        });

        const result = await response.json();

        if (!result.success) {
            return {
                success: false,
                message: result?.message || "Update failed.",
            };
        }

        revalidateTag("user-info", {});
        
        return {
            success: true,
            message: result?.message || "Profile updated successfully.",
            data: result?.data,
        };

    } catch (error: any) {
        console.error('Update profile error:', error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' 
                ? error.message 
                : 'Something went wrong'
        };
    }
}


