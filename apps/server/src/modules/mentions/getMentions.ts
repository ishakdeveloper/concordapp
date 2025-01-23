import { Elysia } from 'elysia';

export const getMentions = new Elysia().get('/', () => 'Get all mentions');
