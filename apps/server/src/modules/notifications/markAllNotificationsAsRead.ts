import { Elysia } from 'elysia';

export const markAllNotificationsAsRead = new Elysia().post(
  '/read-all',
  () => 'Mark all notifications as read'
);
