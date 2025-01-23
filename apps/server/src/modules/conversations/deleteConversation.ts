import Elysia from 'elysia';

export const deleteConversation = new Elysia().delete('/:id', () => {
  return 'Delete conversation';
});
