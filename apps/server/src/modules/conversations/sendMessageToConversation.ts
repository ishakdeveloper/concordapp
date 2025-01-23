import Elysia from 'elysia';

export const sendMessageToConversation = new Elysia().post(
  '/:id/messages',
  () => 'Send message to conversation'
);
