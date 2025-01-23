import Elysia from 'elysia';

export const getSingleGuildBan = new Elysia().get('/:userId', () => {
  return 'Get specific ban';
});
