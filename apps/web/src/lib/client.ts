import { treaty } from '@elysiajs/eden';
import { AppRouter } from '@concord/server';

export const client = treaty<AppRouter>(process.env.API_URL!, {
  fetch: {
    credentials: 'include',
  },
});
