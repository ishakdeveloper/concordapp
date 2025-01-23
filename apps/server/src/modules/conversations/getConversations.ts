import Elysia from 'elysia';

export const getConversations = new Elysia().get('/', () => {
  return 'Get all conversations';
});
