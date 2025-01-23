import Elysia from 'elysia';

export const getMessagesInConversation = new Elysia().get(
  '/:id/messages',
  () => 'Get messages in conversation'
);
