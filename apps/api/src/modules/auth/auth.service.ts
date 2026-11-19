import type { LoginInput, PublicUser, RegisterInput } from '@prep/shared';
import argon2 from 'argon2';
import { eq } from 'drizzle-orm';
import { db } from '../../db/client.js';
import { users } from '../../db/schema/index.js';
import { defaultSyllabus } from '../../db/seed-data/default-syllabus.js';
import { seedSyllabusForUser } from '../../db/syllabus-seeder.js';
import { HttpError } from '../../lib/http-error.js';

const toPublic = (u: { id: string; name: string; email: string }): PublicUser => ({
  id: u.id,
  name: u.name,
  email: u.email,
});

export async function register(input: RegisterInput): Promise<PublicUser> {
  const existing = await db.query.users.findFirst({ where: eq(users.email, input.email) });
  if (existing)
    throw new HttpError(409, 'email_taken', 'An account with this email already exists');

  const passwordHash = await argon2.hash(input.password);
  return db.transaction(async (tx) => {
    const [user] = await tx
      .insert(users)
      .values({ name: input.name, email: input.email, passwordHash })
      .returning();
    await seedSyllabusForUser(tx, user!.id, defaultSyllabus);
    return toPublic(user!);
  });
}

export async function login(input: LoginInput): Promise<PublicUser> {
  const user = await db.query.users.findFirst({ where: eq(users.email, input.email) });
  const ok = user ? await argon2.verify(user.passwordHash, input.password) : false;
  if (!user || !ok)
    throw new HttpError(401, 'invalid_credentials', 'Email or password is incorrect');
  return toPublic(user);
}

export async function getById(id: string): Promise<PublicUser> {
  const user = await db.query.users.findFirst({ where: eq(users.id, id) });
  if (!user) throw new HttpError(401, 'unauthenticated', 'Please sign in');
  return toPublic(user);
}
