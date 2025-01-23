import { Elysia } from 'elysia';

export const markNotificationAsRead = new Elysia().post(
  '/:id/read',
  () => 'Mark notification as read'
);
