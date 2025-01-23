import Elysia from 'elysia';

export const banGuildMember = new Elysia().post('/:userId', () => {
  return 'Ban user';
});
