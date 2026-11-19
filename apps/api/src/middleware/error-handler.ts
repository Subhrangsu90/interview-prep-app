import type { ErrorRequestHandler, RequestHandler } from 'express';
import { ZodError, z } from 'zod';
import { HttpError } from '../lib/http-error.js';
import { logger } from '../lib/logger.js';

export const notFound: RequestHandler = (req, _res, next) =>
  next(new HttpError(404, 'not_found', `Route ${req.method} ${req.path} not found`));

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: {
        code: 'validation_error',
        message: 'Invalid request',
        details: z.flattenError(err).fieldErrors,
      },
    });
    return;
  }
  if (err instanceof HttpError) {
    res
      .status(err.status)
      .json({ error: { code: err.code, message: err.message, details: err.details } });
    return;
  }
  logger.error(err);
  res.status(500).json({ error: { code: 'internal_error', message: 'Something went wrong' } });
};
