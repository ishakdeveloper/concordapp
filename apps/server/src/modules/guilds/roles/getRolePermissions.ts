import Elysia from 'elysia';

export const getRolePermissions = new Elysia().get(
  '/permissions',
  () => 'Get role permissions'
);
