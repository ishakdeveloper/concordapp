import Elysia from 'elysia';

export const createConversation = new Elysia().post('/', () => {
  return 'Create a new conversation';
});
