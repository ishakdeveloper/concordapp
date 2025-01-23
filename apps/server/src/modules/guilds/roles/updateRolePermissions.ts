import Elysia from 'elysia';

export const updateRolePermissions = new Elysia().put(
  '/permissions',
  () => 'Update role permissions'
);
