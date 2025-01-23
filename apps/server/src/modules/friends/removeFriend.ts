import Elysia from 'elysia';

export const removeFriend = new Elysia().delete(
  '/:userId',
  () => 'Remove friend'
);
