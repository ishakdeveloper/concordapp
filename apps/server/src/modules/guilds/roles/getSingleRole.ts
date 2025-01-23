import Elysia from 'elysia';

export const getSingleRole = new Elysia().get(
  '/:roleId',
  () => 'Get a single role'
);
