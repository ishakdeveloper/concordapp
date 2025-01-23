import Elysia from 'elysia';

export const getAllGuilds = new Elysia().get('/', () => 'Get all guilds');
