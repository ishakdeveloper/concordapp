import Elysia from 'elysia';

export const getGuildRoles = new Elysia().get('/', () => 'Get guild roles');
