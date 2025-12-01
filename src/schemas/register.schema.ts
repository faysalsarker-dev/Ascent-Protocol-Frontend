import { z } from 'zod';

export const registerSchemaBasic = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

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

export type RegisterBasicForm = z.infer<typeof registerSchemaBasic>;
export type ExtrasForm = z.infer<typeof extrasSchema>;
