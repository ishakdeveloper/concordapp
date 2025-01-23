import Elysia from 'elysia';

export const getDefaultRole = new Elysia().get('/', () => 'Get default role');
