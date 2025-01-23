import Elysia from 'elysia';

export const getAllGuildInvites = new Elysia().get('/', () => {
  return 'Get all invites for guild';
});
