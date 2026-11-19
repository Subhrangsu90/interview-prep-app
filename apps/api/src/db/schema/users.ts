import { jsonb, pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { id, timestamps } from './common.js';

export const users = pgTable('users', {
  id: id(),
  name: varchar('name', { length: 80 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  settings: jsonb('settings').$type<Record<string, unknown>>().notNull().default({}),
  ...timestamps,
});
