import Elysia from 'elysia';

export const updateCategory = new Elysia().patch(
  '/:categoryId',
  () => 'Update category'
);
