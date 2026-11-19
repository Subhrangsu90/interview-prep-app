import type { Db } from './client.js';
import { modules, topicProgress, topics, tracks } from './schema/index.js';
import type { SyllabusTemplate } from './seed-data/default-syllabus.js';

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

type Tx = Parameters<Parameters<Db['transaction']>[0]>[0];

/** Creates tracks, modules, topics and empty progress rows for one user. */
export async function seedSyllabusForUser(
  tx: Db | Tx,
  userId: string,
  template: SyllabusTemplate[],
  source: 'catalog' | 'manual' = 'catalog',
) {
  for (const [ti, t] of template.entries()) {
    const [track] = await tx
      .insert(tracks)
      .values({
        userId,
        name: t.name,
        slug: slugify(t.name),
        description: t.description,
        sortOrder: ti,
        source,
      })
      .returning({ id: tracks.id });
    for (const [mi, m] of t.modules.entries()) {
      const [mod] = await tx
        .insert(modules)
        .values({ trackId: track!.id, name: m.name, sortOrder: mi })
        .returning({ id: modules.id });
      const inserted = await tx
        .insert(topics)
        .values(m.topics.map((name, i) => ({ moduleId: mod!.id, name, sortOrder: i })))
        .returning({ id: topics.id });
      await tx.insert(topicProgress).values(inserted.map((x) => ({ topicId: x.id })));
    }
  }
}
