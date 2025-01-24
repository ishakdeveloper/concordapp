import Elysia from 'elysia';
import { db, user } from '@concord/database';
import { eq } from 'drizzle-orm';
import { t } from 'elysia';

export const deleteUser = new Elysia().delete(
  '/:id',
  async ({ params: { id } }) => {
    const deletedUser = await db
      .delete(user)
      .where(eq(user.id, id))
      .returning();
    return deletedUser;
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  }
);
