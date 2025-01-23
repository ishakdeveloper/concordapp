import { Elysia } from 'elysia';

export const getUnreadMentions = new Elysia().get(
  '/unread',
  () => 'Get unread mentions'
);
