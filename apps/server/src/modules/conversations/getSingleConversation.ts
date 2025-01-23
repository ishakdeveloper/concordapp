import Elysia from 'elysia';

export const getSingleConversation = new Elysia().get('/:id', () => {
  return 'Get single conversation';
});
