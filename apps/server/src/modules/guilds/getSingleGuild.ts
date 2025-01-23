import Elysia from 'elysia';

export const getSingleGuild = new Elysia().get('/:id', () => 'Get guild by ID');
