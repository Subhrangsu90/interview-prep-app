import { createApp } from './app.js';
import { env } from './config/env.js';
import { pool } from './db/client.js';
import { logger } from './lib/logger.js';

const server = createApp().listen(env.PORT, () => {
  logger.info(`API listening on http://localhost:${env.PORT}/api/v1`);
});

const shutdown = () => {
  logger.info('Shutting down');
  server.close(() => void pool.end().then(() => process.exit(0)));
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
