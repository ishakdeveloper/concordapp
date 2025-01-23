import { Elysia } from 'elysia';

export const getNotifications = new Elysia().get(
  '/',
  () => 'Get all notifications'
);
