import type { Context } from 'elysia';
import { auth } from '../lib/auth';

// user middleware (compute user and session and pass to routes)
export const userMiddleware = async (context: Context) => {
  const session = await auth.api.getSession({
    headers: context.request.headers,
  });

  if (!session) {
    return {
      user: null,
      session: null,
    };
  }

  return {
    user: session.user,
    session: session.session,
  };
};
