import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

/** Validates and replaces req.body; ZodErrors are turned into 400s by the error handler. */
export const validateBody =
  (schema: ZodType): RequestHandler =>
  (req, _res, next) => {
    req.body = schema.parse(req.body);
    next();
  };
