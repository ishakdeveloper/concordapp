import Elysia from 'elysia';

export const createUncategorizedChannel = new Elysia().post(
  '/uncategorized',
  () => 'Create a new uncategorized channel'
);
