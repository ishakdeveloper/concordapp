import Elysia from 'elysia';

export const unbanGuildMember = new Elysia().delete('/:userId', () => {
  return 'Unban user';
});
