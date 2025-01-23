import Elysia from 'elysia';

export const deleteRole = new Elysia().delete(
  '/:roleId',
  () => 'Delete a role'
);
