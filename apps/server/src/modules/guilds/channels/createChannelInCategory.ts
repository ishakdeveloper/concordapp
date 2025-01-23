import Elysia from 'elysia';

export const createChannelInCategory = new Elysia().post(
  '/:categoryId',
  () => 'Create a new channel in category'
);
