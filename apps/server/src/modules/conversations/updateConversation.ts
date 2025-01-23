import Elysia from 'elysia';

export const updateConversation = new Elysia().patch('/:id', () => {
  return 'Update conversation';
});
