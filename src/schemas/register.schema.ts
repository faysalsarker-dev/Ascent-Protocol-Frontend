import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const extrasSchema = z.object({
  avatar: z.instanceof(File).optional().nullable(),
  bio: z.string()
    .max(300, 'Bio must be less than 300 characters')
    .optional(),
  dateOfBirth: z.string().optional(),
  gender: z.enum(['male', 'female', 'other', 'prefer-not-to-say']).optional(),
  weight: z.number()
    .positive('Weight must be positive')
    .max(500, 'Please enter a valid weight')
    .optional(),
  height: z.number()
    .positive('Height must be positive')
    .max(300, 'Please enter a valid height')
    .optional(),
});

export type ExtrasForm = z.infer<typeof extrasSchema>;


export const profileUpdateSchema = z.object({
  userId: z.string(),
  avatar: z.instanceof(File).optional(),
  bio: z.string().max(300).optional().or(z.literal("")),
  dateOfBirth: z.string().optional().or(z.literal("")),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"]).optional(),
  weight: z.coerce.number().min(20).max(500).optional(),
  height: z.coerce.number().min(50).max(300).optional(),
});

export type ProfileUpdateValues = z.infer<typeof profileUpdateSchema>;