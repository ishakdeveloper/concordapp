import { Elysia } from 'elysia';

export const removeParticipantFromConversation = new Elysia().delete(
  '/:userId',
  () => 'Remove participant from conversation'
);
