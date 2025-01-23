import Elysia from 'elysia';

export const createGuild = new Elysia().post('/', () => 'Create a new guild');
