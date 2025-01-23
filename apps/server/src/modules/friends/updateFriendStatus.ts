import Elysia from 'elysia';

export const updateFriendStatus = new Elysia().patch(
  '/requests/:requestId',
  () => 'Update friend request status (accept/decline)'
);
