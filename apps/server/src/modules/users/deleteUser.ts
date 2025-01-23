import Elysia from 'elysia';
import { db, users } from '@concord/database';
import { eq } from 'drizzle-orm';
import { t } from 'elysia';

export const deleteUser = new Elysia().delete(
  '/:id',
  async ({ params: { id } }) => {
    const user = await db.delete(users).where(eq(users.id, id)).returning();
    return user;
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  }
);
