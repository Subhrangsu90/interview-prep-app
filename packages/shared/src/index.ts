export * from './auth.js';
export * from './syllabus.js';

export interface ApiError {
  error: { code: string; message: string; details?: unknown };
}
