import Elysia from 'elysia';

export const removeMemberFromGuild = new Elysia().delete(
  '/:userId',
  () => 'Remove member from guild'
);
