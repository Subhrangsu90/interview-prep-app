import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { HttpError } from '../lib/http-error.js';

export const AUTH_COOKIE = 'prep_token';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
  }
}

export const signToken = (userId: string) =>
  jwt.sign({ sub: userId }, env.JWT_SECRET, { expiresIn: '7d' });

export const requireAuth: RequestHandler = (req, _res, next) => {
  const token: unknown = req.cookies?.[AUTH_COOKIE];
  if (typeof token !== 'string') throw new HttpError(401, 'unauthenticated', 'Please sign in');
  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    if (typeof payload === 'string' || !payload.sub) throw new Error('bad payload');
    req.userId = payload.sub;
    next();
  } catch {
    throw new HttpError(401, 'unauthenticated', 'Session expired, please sign in again');
  }
};
