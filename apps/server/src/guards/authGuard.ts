import type { Context } from 'elysia';
import { userMiddleware } from '../middlewares/userMiddleware';

export const authGuard = async (context: Context) => {
  const { user } = await userMiddleware(context);

  if (!user) {
    return context.error(401, {
      error: 'Unauthorized',
      message: 'You must be logged in to access this resource',
    });
  }

  return { user };
};
