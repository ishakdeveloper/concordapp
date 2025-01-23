import { Elysia } from 'elysia';

export const getBlockedUsers = new Elysia().get(
  '/blocks',
  () => 'Get blocked users'
);
