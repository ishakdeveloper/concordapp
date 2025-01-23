import Elysia from 'elysia';

export const getSingleCategory = new Elysia().get(
  '/:categoryId',
  () => 'Get category by ID'
);
