import Elysia from 'elysia';

export const getPendingFriends = new Elysia().get(
  '/pending',
  () => 'Get pending friends'
);
