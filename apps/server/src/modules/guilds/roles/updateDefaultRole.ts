import Elysia from 'elysia';

export const updateDefaultRole = new Elysia().put(
  '/',
  () => 'Update default role'
);
