import { Elysia } from 'elysia';

export const addParticipantToConversation = new Elysia().post(
  '/:userId',
  () => 'Add participant to conversation'
);
