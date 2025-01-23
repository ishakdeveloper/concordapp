import Elysia from 'elysia';

export const reorderRoles = new Elysia().post(
  '/positions',
  () => 'Reorder roles'
);
