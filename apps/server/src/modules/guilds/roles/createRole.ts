import Elysia from 'elysia';

export const createRole = new Elysia().post('/', () => 'Create a new role');
