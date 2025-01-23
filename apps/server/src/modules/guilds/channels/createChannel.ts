import Elysia from 'elysia';

export const createChannel = new Elysia().post(
  '/',
  () => 'Create a new channel'
);
