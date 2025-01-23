import Elysia from 'elysia';

export const getMembersByRole = new Elysia().get(
  '/members',
  () => 'Get members by role'
);
