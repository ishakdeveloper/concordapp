import Elysia from 'elysia';

export const getGuildBans = new Elysia().get('/', () => {
  return 'Get all bans for guild';
});
