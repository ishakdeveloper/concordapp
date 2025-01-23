import Elysia from 'elysia';

export const deleteCategory = new Elysia().delete(
  '/:categoryId',
  () => 'Delete category'
);
