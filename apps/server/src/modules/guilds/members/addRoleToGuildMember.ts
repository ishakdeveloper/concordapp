import Elysia from 'elysia';

export const addRoleToGuildMember = new Elysia().put(
  '/:userId/roles/:roleId',
  () => 'Add role to member'
);
