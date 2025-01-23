import { Elysia } from 'elysia';

export const blockUser = new Elysia().put(
  '/blocks/:userId',
  () => 'Block user'
);
