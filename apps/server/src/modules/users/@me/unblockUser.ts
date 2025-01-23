import { Elysia } from 'elysia';

export const unblockUser = new Elysia().delete(
  '/blocks/:userId',
  () => 'Unblock user'
);
