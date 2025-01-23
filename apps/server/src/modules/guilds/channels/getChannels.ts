import Elysia from 'elysia';

export const getChannels = new Elysia().get('/', () => 'Get all channels');
