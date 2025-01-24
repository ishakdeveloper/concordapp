import Elysia from 'elysia';
import { eq } from 'drizzle-orm';
import { db, user } from '@concord/database';

export const getUser = new Elysia().get('/:id', async ({ params: { id } }) => {
  const data = await db.query.user.findFirst({
    where: eq(user.id, id),
  });

  if (!data) {
    throw new Error('User not found');
  }

  return data;
});
