import { Elysia } from 'elysia';

export const deleteNotification = new Elysia().delete(
  '/:id',
  () => 'Delete notification'
);
