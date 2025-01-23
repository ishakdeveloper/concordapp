import Elysia from 'elysia';

export const getGuildMembers = new Elysia().get(
  '/',
  () => 'Get all members of guild'
);
