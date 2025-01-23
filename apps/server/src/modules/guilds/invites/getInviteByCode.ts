import Elysia from 'elysia';

export const getInviteByCode = new Elysia().get('/:code', () => {
  return 'Get invite by code';
});
