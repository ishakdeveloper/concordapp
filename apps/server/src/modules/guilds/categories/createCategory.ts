import Elysia from 'elysia';

export const createCategory = new Elysia().post(
  '/',
  () => 'Create a new category'
);
