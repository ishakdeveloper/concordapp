import { Elysia } from 'elysia';

export const getConversationParticipants = new Elysia().get(
  '/',
  () => 'Get all participants'
);
