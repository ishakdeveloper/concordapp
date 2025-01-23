import Elysia from 'elysia';

export const addMemberToGuild = new Elysia().post(
  '/:userId',
  () => 'Add member to guild'
);
