import Elysia from 'elysia';

export const removeRoleFromMember = new Elysia().delete(
  '/:userId/roles/:roleId',
  () => 'Remove role from member'
);
