import Elysia from 'elysia';

export const getAllCategories = new Elysia().get(
  '/',
  () => 'Get all categories in guild'
);
