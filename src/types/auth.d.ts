export interface User {
  id: string;
  email: string;
  name?: string;
  password: string;
  role: 'USER' | 'ADMIN';
  avatar?: string | null;
  bio?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  weight?: number | null;
  height?: number | null;
  level: number;
  xp: number;
  currentGoal?: string | null;
  isEmailVerified: boolean;
  isActive: boolean;
  lastLoginAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  avatar?: File | null;
  bio?: string;
  dateOfBirth?: string;
  gender?: string;
  weight?: number;
  height?: number;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: Omit<User, 'password'>;
  accessToken: string;
  refreshToken?: string;
};
