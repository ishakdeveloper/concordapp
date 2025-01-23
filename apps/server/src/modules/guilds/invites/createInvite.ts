import Elysia from 'elysia';

export const createInvite = new Elysia().post('/', () => {
  return 'Create a new invite';
});
