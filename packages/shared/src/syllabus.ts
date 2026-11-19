export const TOPIC_STATUSES = ['not_started', 'learning', 'revised', 'interview_ready'] as const;
export type TopicStatus = (typeof TOPIC_STATUSES)[number];

export const TRACK_PRIORITIES = ['high', 'medium', 'low'] as const;
export type TrackPriority = (typeof TRACK_PRIORITIES)[number];

export const TRACK_SOURCES = ['catalog', 'ai', 'manual'] as const;
export type TrackSource = (typeof TRACK_SOURCES)[number];
