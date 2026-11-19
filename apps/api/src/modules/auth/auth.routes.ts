import { loginSchema, registerSchema } from '@prep/shared';
import { Router, type CookieOptions, type Response } from 'express';
import rateLimit from 'express-rate-limit';
import { isProd } from '../../config/env.js';
import { AUTH_COOKIE, requireAuth, signToken } from '../../middleware/auth.js';
import { validateBody } from '../../middleware/validate.js';
import * as auth from './auth.service.js';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: isProd,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
};

const setSession = (res: Response, userId: string) =>
  res.cookie(AUTH_COOKIE, signToken(userId), cookieOptions);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

export const authRouter = Router();

authRouter.post('/register', authLimiter, validateBody(registerSchema), async (req, res) => {
  const user = await auth.register(req.body);
  setSession(res, user.id).status(201).json({ user });
});

authRouter.post('/login', authLimiter, validateBody(loginSchema), async (req, res) => {
  const user = await auth.login(req.body);
  setSession(res, user.id).json({ user });
});

authRouter.post('/logout', (_req, res) => {
  res
    .clearCookie(AUTH_COOKIE, { ...cookieOptions, maxAge: undefined })
    .status(204)
    .end();
});

authRouter.get('/me', requireAuth, async (req, res) => {
  res.json({ user: await auth.getById(req.userId!) });
});
