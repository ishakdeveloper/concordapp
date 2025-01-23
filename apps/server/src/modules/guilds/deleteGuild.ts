import Elysia from 'elysia';

export const deleteGuild = new Elysia().delete('/:id', () => 'Delete guild');
