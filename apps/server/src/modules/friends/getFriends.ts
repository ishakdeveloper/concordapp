import Elysia from 'elysia';

export const getFriends = new Elysia().get('/', () => 'Get all friends');
