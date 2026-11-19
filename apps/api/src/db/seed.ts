import argon2 from 'argon2';
import { eq } from 'drizzle-orm';
import { db, pool } from './client.js';
import { users } from './schema/index.js';
import { defaultSyllabus } from './seed-data/default-syllabus.js';
import { seedSyllabusForUser } from './syllabus-seeder.js';

const DEMO_EMAIL = 'demo@prep.local';

const existing = await db.query.users.findFirst({ where: eq(users.email, DEMO_EMAIL) });
if (existing) {
  console.log(`Demo user already exists (${DEMO_EMAIL}); nothing to do.`);
} else {
  await db.transaction(async (tx) => {
    const [user] = await tx
      .insert(users)
      .values({ name: 'Demo', email: DEMO_EMAIL, passwordHash: await argon2.hash('demo-password') })
      .returning({ id: users.id });
    await seedSyllabusForUser(tx, user!.id, defaultSyllabus);
  });
  console.log(`Seeded demo user ${DEMO_EMAIL} / demo-password with the default syllabus.`);
}
await pool.end();
