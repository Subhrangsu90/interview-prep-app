import { TOPIC_STATUSES, TRACK_PRIORITIES, TRACK_SOURCES } from '@prep/shared';
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  smallint,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { id, timestamps } from './common.js';
import { users } from './users.js';

export const topicStatus = pgEnum('topic_status', TOPIC_STATUSES);
export const trackPriority = pgEnum('track_priority', TRACK_PRIORITIES);
export const trackSource = pgEnum('track_source', TRACK_SOURCES);

export const tracks = pgTable(
  'tracks',
  {
    id: id(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 120 }).notNull(),
    slug: varchar('slug', { length: 140 }).notNull(),
    description: text('description'),
    sortOrder: integer('sort_order').notNull().default(0),
    isActive: boolean('is_active').notNull().default(true),
    priority: trackPriority('priority').notNull().default('medium'),
    source: trackSource('source').notNull().default('manual'),
    catalogKey: varchar('catalog_key', { length: 80 }),
    archivedAt: timestamp('archived_at', { withTimezone: true }),
    ...timestamps,
  },
  (t) => [uniqueIndex('tracks_user_slug_idx').on(t.userId, t.slug)],
);

export const modules = pgTable(
  'modules',
  {
    id: id(),
    trackId: uuid('track_id')
      .notNull()
      .references(() => tracks.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 120 }).notNull(),
    description: text('description'),
    sortOrder: integer('sort_order').notNull().default(0),
    ...timestamps,
  },
  (t) => [index('modules_track_idx').on(t.trackId)],
);

export const topics = pgTable(
  'topics',
  {
    id: id(),
    moduleId: uuid('module_id')
      .notNull()
      .references(() => modules.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 160 }).notNull(),
    description: text('description'),
    sortOrder: integer('sort_order').notNull().default(0),
    ...timestamps,
  },
  (t) => [index('topics_module_idx').on(t.moduleId)],
);

export const topicProgress = pgTable('topic_progress', {
  topicId: uuid('topic_id')
    .primaryKey()
    .references(() => topics.id, { onDelete: 'cascade' }),
  status: topicStatus('status').notNull().default('not_started'),
  confidence: smallint('confidence').notNull().default(0),
  minutesSpent: integer('minutes_spent').notNull().default(0),
  lastReviewedAt: timestamp('last_reviewed_at', { withTimezone: true }),
  ...timestamps,
});
