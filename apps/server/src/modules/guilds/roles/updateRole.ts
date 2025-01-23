import Elysia from 'elysia';

export const updateRole = new Elysia().put('/:roleId', () => 'Update a role');
