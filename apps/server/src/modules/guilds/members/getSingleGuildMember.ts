import Elysia from 'elysia';

export const getSingleGuildMember = new Elysia().get(
  '/:userId',
  () => 'Get specific member in guild'
);
