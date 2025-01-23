import { Elysia } from 'elysia';

export const markMentionsAsRead = new Elysia().post(
  '/',
  () => 'Mark mentions as read'
);
