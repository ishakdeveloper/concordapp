import { Elysia } from 'elysia';

export const getSingleNotification = new Elysia().get(
  '/:id',
  () => 'Get single notification'
);
