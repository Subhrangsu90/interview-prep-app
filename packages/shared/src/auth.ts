import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(80),
  email: z.email('Enter a valid email').toLowerCase(),
  password: z.string().min(8, 'Use at least 8 characters').max(128),
});

export const loginSchema = z.object({
  email: z.email('Enter a valid email').toLowerCase(),
  password: z.string().min(1, 'Password is required'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export interface PublicUser {
  id: string;
  name: string;
  email: string;
}
