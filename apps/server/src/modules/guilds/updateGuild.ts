import Elysia from 'elysia';

export const updateGuild = new Elysia().patch('/:id', () => 'Update guild');
