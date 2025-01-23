import Elysia from 'elysia';

export const deleteInvite = new Elysia().delete('/:code', () => {
  return 'Delete invite';
});
