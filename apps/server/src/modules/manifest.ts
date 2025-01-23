import Elysia from 'elysia';
import { authGuard } from '../guards/authGuard';
import { getUser } from './users/getUser';
import { updateUser } from './users/updateUser';
import { deleteUser } from './users/deleteUser';
import { getFriends } from './friends/getFriends';
import { getPendingFriends } from './friends/getPendingFriends';
import { removeFriend } from './friends/removeFriend';
import { updateFriendStatus } from './friends/updateFriendStatus';
import { getAllGuilds } from './guilds/getAllGuilds';
import { getSingleGuild } from './guilds/getSingleGuild';
import { createGuild } from './guilds/createGuild';
import { updateGuild } from './guilds/updateGuild';
import { deleteGuild } from './guilds/deleteGuild';
import { getAllCategories } from './guilds/categories/getAllCategories';
import { createCategory } from './guilds/categories/createCategory';
import { getSingleCategory } from './guilds/categories/getSingleCategory';
import { updateCategory } from './guilds/categories/updateCategory';
import { deleteCategory } from './guilds/categories/deleteCategory';
import { getChannels } from './guilds/channels/getChannels';
import { createChannel } from './guilds/channels/createChannel';
import { createUncategorizedChannel } from './guilds/channels/createUncategorizedChannel';
import { createChannelInCategory } from './guilds/channels/createChannelInCategory';
import { getGuildRoles } from './guilds/roles/getGuildRoles';
import { createRole } from './guilds/roles/createRole';
import { getSingleRole } from './guilds/roles/getSingleRole';
import { updateRole } from './guilds/roles/updateRole';
import { deleteRole } from './guilds/roles/deleteRole';
import { reorderRoles } from './guilds/roles/reorderRoles';
import { getRolePermissions } from './guilds/roles/getRolePermissions';
import { updateRolePermissions } from './guilds/roles/updateRolePermissions';
import { getMembersByRole } from './guilds/roles/getMembersByRole';
import { getDefaultRole } from './guilds/roles/getDefaultRole';
import { updateDefaultRole } from './guilds/roles/updateDefaultRole';
import { getGuildMembers } from './guilds/members/getGuildMembers';
import { getSingleGuildMember } from './guilds/members/getSingleGuildMember';
import { addMemberToGuild } from './guilds/members/addMemberToGuild';
import { addRoleToGuildMember } from './guilds/members/addRoleToGuildMember';
import { removeRoleFromMember } from './guilds/members/removeRoleFromMember';
import { removeMemberFromGuild } from './guilds/members/removeMemberFromGuild';
import { getAllGuildInvites } from './guilds/invites/getAllGuildInvites';
import { createInvite } from './guilds/invites/createInvite';
import { getInviteByCode } from './guilds/invites/getInviteByCode';
import { deleteInvite } from './guilds/invites/deleteInvite';
import { banGuildMember } from './guilds/bans/banGuildMember';
import { getGuildBans } from './guilds/bans/getGuildBans';
import { getSingleGuildBan } from './guilds/bans/getSingleGuildBan';
import { unbanGuildMember } from './guilds/bans/unbanGuildMember';
import { getConversations } from './conversations/getConversations';
import { getSingleConversation } from './conversations/getSingleConversation';
import { createConversation } from './conversations/createConversation';
import { sendMessageToConversation } from './conversations/sendMessageToConversation';
import { getMessagesInConversation } from './conversations/getMessagesInConversation';
import { updateConversation } from './conversations/updateConversation';
import { deleteConversation } from './conversations/deleteConversation';
import { getConversationParticipants } from './conversations/getConversationParticipants';
import { addParticipantToConversation } from './conversations/addParticipantToConversation';
import { removeParticipantFromConversation } from './conversations/removeParticipantFromConversation';
import { getNotifications } from './notifications/getNotifications';
import { getSingleNotification } from './notifications/getSingleNotification';
import { markNotificationAsRead } from './notifications/markNotificationAsRead';
import { deleteNotification } from './notifications/deleteNotification';
import { markAllNotificationsAsRead } from './notifications/markAllNotificationsAsRead';
import { getMentions } from './mentions/getMentions';
import { getUnreadMentions } from './mentions/getUnreadMentions';
import { markMentionsAsRead } from './mentions/markMentionsAsRead';
import { getBlockedUsers } from './users/@me/getBlockedUsers';
import { blockUser } from './users/@me/blockUser';
import { unblockUser } from './users/@me/unblockUser';

export const createProtectedGroup = () => {
  return new Elysia().derive(authGuard);
};

export const routes = createProtectedGroup()
  .group('/users', (users) =>
    users
      .use(getUser) // /users/:id
      .use(updateUser) // /users/:id
      .use(deleteUser) // /users/:id
      .group(
        '/@me',
        (me) =>
          me
            .get('/', () => 'Get current user with all preferences') // /users/@me Get current user with all preferences
            .patch('/', () => 'Update current user preferences') // /users/@me Update current user preferences
            .use(getBlockedUsers) // /users/@me/blocks Get blocked users
            .use(blockUser) // /users/@me/blocks/:userId Block user
            .use(unblockUser) // /users/@me/blocks/:userId Unblock user
      )
  )
  .group(
    '/friends',
    (friends) =>
      friends
        .use(getFriends) // /friends
        .use(getPendingFriends) // /friends/pending
        .use(updateFriendStatus) // /friends/requests/:requestId
        .use(removeFriend) // /friends/:userId
  )
  .group('/guilds', (guilds) =>
    guilds
      .use(getAllGuilds) // /guilds Get all guilds
      .use(getSingleGuild) // /guilds/:id Get guild by ID
      .use(createGuild) // /guilds Create a new guild
      .use(updateGuild) // /guilds/:id Update guild
      .use(deleteGuild) // /guilds/:id Delete guild
      .group(
        '/:id/categories',
        (categories) =>
          categories
            .use(getAllCategories) // /guilds/:id/categories Get all categories in guild
            .use(createCategory) // /guilds/:id/categories Create a new category
            .use(getSingleCategory) // /guilds/:id/categories/:categoryId Get category by ID
            .use(updateCategory) // /guilds/:id/categories/:categoryId Update category
            .use(deleteCategory) // /guilds/:id/categories/:categoryId Delete category
      )
      .group(
        '/:id/channels',
        (channels) =>
          channels
            .use(getChannels) // Get all channels in guild
            .use(createChannel) // /guilds/:id/channels Create a new channel
            .use(createUncategorizedChannel) // /guilds/:id/channels/uncategorized Create a new uncategorized channel
            .use(createChannelInCategory) // /guilds/:id/channels/:categoryId Create a new channel in category
      )
      .group(
        '/:id/roles',
        (roles) =>
          roles
            .use(getGuildRoles) // /guilds/:id/roles Get guild roles
            .use(createRole) // /guilds/:id/roles Create a new role
            .use(getSingleRole) // /guilds/:id/roles/:roleId Get role by ID
            .use(updateRole) // /guilds/:id/roles/:roleId Update role
            .use(deleteRole) // /guilds/:id/roles/:roleId Delete role
            .use(reorderRoles) // /guilds/:id/roles/positions Reorder role positions
            .use(getRolePermissions) // /guilds/:id/roles/:roleId/permissions Get role permissions
            .use(updateRolePermissions) // /guilds/:id/roles/:roleId/permissions Update role permissions
            .use(getMembersByRole) // /guilds/:id/roles/:roleId/members Get members with role
            .use(getDefaultRole) // /guilds/:id/roles/default Get default role
            .use(updateDefaultRole) // /guilds/:id/roles/default Update default role
      )
      .group(
        '/:id/members',
        (members) =>
          members
            .use(getGuildMembers) // /guilds/:id/members Get all members of guild
            .use(getSingleGuildMember) // /guilds/:id/members/:userId Get specific member in guild
            .use(addMemberToGuild) // /guilds/:id/members/:userId Add member to guild
            .use(addRoleToGuildMember) // /guilds/:id/members/:userId/roles/:roleId Add role to member
            .use(removeRoleFromMember) // /guilds/:id/members/:userId/roles/:roleId Remove role from member
            .use(removeMemberFromGuild) // /guilds/:id/members/:userId Remove member from guild
      )
      .group(
        '/:id/invites',
        (invites) =>
          invites
            .use(getAllGuildInvites) // /guilds/:id/invites Get all invites for guild
            .use(createInvite) // /guilds/:id/invites Create a new invite
            .use(getInviteByCode) // /guilds/:id/invites/:code Get invite by code
            .use(deleteInvite) // /guilds/:id/invites/:code Delete invite
      )
      .group(
        '/:id/bans',
        (bans) =>
          bans
            .use(getGuildBans) // /guilds/:id/bans Get all bans for guild
            .use(getSingleGuildBan) // /guilds/:id/bans/:userId Get specific ban
            .use(banGuildMember) // /guilds/:id/bans/:userId Ban user
            .use(unbanGuildMember) // /guilds/:id/bans/:userId Unban user
      )
      .group(
        '/:id/logs',
        (logs) =>
          logs
            .get('/', () => 'Get all audit logs') // Get all audit logs
            .get('/member', () => 'Get member-related audit logs') // Get member-related audit logs
            .get('/channel', () => 'Get channel-related audit logs') // Get channel-related audit logs
            .get('/role', () => 'Get role-related audit logs') // Get role-related audit logs
            .get('/message', () => 'Get message-related audit logs') // Get message-related audit logs
            .get('/invite', () => 'Get invite-related audit logs') // Get invite-related audit logs
            .get('/webhook', () => 'Get webhook-related audit logs') // Get webhook-related audit logs
            .get('/emoji', () => 'Get emoji-related audit logs') // Get emoji-related audit logs
            .get('/integration', () => 'Get integration-related audit logs') // Get integration-related audit logs
            .get('/:entryId', () => 'Get specific audit log entry') // Get specific audit log entry
      )
      .group(
        '/:id/emojis',
        (emojis) =>
          emojis
            .get('/', () => 'Get all guild emojis') // Get all guild emojis
            .post('/', () => 'Create a new emoji') // Create a new emoji
            .get('/:emojiId', () => 'Get emoji by ID') // Get emoji by ID
            .patch('/:emojiId', () => 'Update emoji') // Update emoji
            .delete('/:emojiId', () => 'Delete emoji') // Delete emoji
      )
      .group(
        '/:id/stickers',
        (stickers) =>
          stickers
            .get('/', () => 'Get all guild stickers') // Get all guild stickers
            .post('/', () => 'Create a new sticker') // Create a new sticker
            .get('/:stickerId', () => 'Get sticker by ID') // Get sticker by ID
            .patch('/:stickerId', () => 'Update sticker') // Update sticker
            .delete('/:stickerId', () => 'Delete sticker') // Delete sticker
      )
      .group(
        '/:id/webhooks',
        (webhooks) =>
          webhooks
            .get('/', () => 'Get guild webhooks') // Get guild webhooks
            .post('/', () => 'Create webhook') // Create webhook
            .get('/:webhookId', () => 'Get webhook') // Get webhook
            .patch('/:webhookId', () => 'Update webhook') // Update webhook
            .delete('/:webhookId', () => 'Delete webhook') // Delete webhook
      )
  )
  .group(
    '/channels',
    (channels) =>
      channels
        .get('/:channelId', () => 'Get channel by ID') // Get channel by ID
        .patch('/:channelId', () => 'Update channel') // Update channel
        .patch('/:channelId/category', () => 'Move channel to category') // Move channel to category
        .patch('/:channelId/uncategorize', () => 'Remove channel from category') // Remove channel from category
        .delete('/:channelId', () => 'Delete channel') // Delete channel
        .group(
          '/:channelId/messages',
          (messages) =>
            messages
              .get('/', () => 'Get all messages in channel') // Get all messages in channel
              .post('/', () => 'Send a message to channel') // Send a message to channel
              .get('/:messageId', () => 'Get message by ID') // Get message by ID
              .patch('/:messageId', () => 'Edit message') // Edit message
              .delete('/:messageId', () => 'Delete message') // Delete message
              .put(
                '/:messageId/reactions/:emoji',
                () => 'Add reaction to message'
              ) // Add reaction to message
              .delete(
                '/:messageId/reactions/:emoji',
                () => 'Remove reaction from message' // Remove reaction from message
              )
              .get(
                '/:messageId/reactions',
                () => 'Get all reactions for message'
              ) // Get all reactions for message
              .get('/:messageId/mentions', () => 'Get all mentions in message') // Get all mentions in message
        )
        .group('/:channelId/threads', (threads) =>
          threads
            .get('/', () => 'Get all threads in channel') // Get all threads in channel
            .post('/new', () => 'Create thread without message') // Create thread without message
            .post(
              '/from-message/:messageId',
              () => 'Create thread from message'
            ) // Create thread from message
            .get('/:threadId', () => 'Get thread by ID') // Get thread by ID
            .patch('/:threadId', () => 'Update thread') // Update thread
            .delete('/:threadId', () => 'Delete thread') // Delete thread
            .get('/:threadId/messages', () => 'Get all messages in thread') // Get all messages in thread
            .post('/:threadId/messages', () => 'Send message to thread') // Send message to thread
            .get(
              '/:threadId/messages/:messageId',
              () => 'Get thread message by ID' // Get thread message by ID
            )
            .patch(
              '/:threadId/messages/:messageId',
              () => 'Edit thread message'
            ) // Edit thread message
            .delete(
              '/:threadId/messages/:messageId',
              () => 'Delete thread message' // Delete thread message
            )
            .put(
              '/:threadId/messages/:messageId/reactions/:emoji',
              () => 'Add reaction to thread message' // Add reaction to thread message
            )
            .delete(
              '/:threadId/messages/:messageId/reactions/:emoji',
              () => 'Remove reaction from thread message' // Remove reaction from thread message
            )
            .get(
              '/:threadId/messages/:messageId/reactions',
              () => 'Get all reactions for thread message' // Get all reactions for thread message
            )
            .get(
              '/:threadId/messages/:messageId/mentions',
              () => 'Get all mentions in thread message' // Get all mentions in thread message
            )
            .get('/:threadId/members', () => 'Get all thread members') // Get all thread members
            .put('/:threadId/members/:userId', () => 'Add member to thread') // Add member to thread
            .delete(
              '/:threadId/members/:userId',
              () => 'Remove member from thread' // Remove member from thread
            )
        )
        .group(
          '/:channelId/pins',
          (pins) =>
            pins
              .get('/', () => 'Get pinned messages') // Get pinned messages
              .put('/:messageId', () => 'Pin message') // Pin message
              .delete('/:messageId', () => 'Unpin message') // Unpin message
        )
        .patch('/:channelId/position', () => 'Update channel position') // Update single channel position
        .patch('/positions', () => 'Bulk update channel positions') // Bulk update multiple channel positions
        .patch(
          '/:channelId/category-position',
          () => 'Update channel position within category'
        ) // Update position within category
        .patch('/category-positions', () => 'Bulk update category positions') // Bulk update positions within category
  )
  .group('/conversations', (conversations) =>
    conversations
      .use(getConversations) // /conversations Get all conversations
      .use(getSingleConversation) // /conversations/:id Get conversation by ID
      .use(createConversation) // /conversations Create a new conversation
      .use(sendMessageToConversation) // /conversations/:id/messages Send message to conversation
      .use(getMessagesInConversation) // /conversations/:id/messages Get messages in conversation
      .use(updateConversation) // /conversations/:id Update conversation
      .use(deleteConversation) // /conversations/:id Delete conversation
      .group(
        '/:id/participants',
        (participants) =>
          participants
            .use(getConversationParticipants) // /conversations/:id/participants Get all participants
            .use(addParticipantToConversation) // /conversations/:id/participants/:userId Add participant to conversation
            .use(removeParticipantFromConversation) // /conversations/:id/participants/:userId Remove participant from conversation
      )
  )
  .group(
    '/notifications',
    (notifications) =>
      notifications
        .use(getNotifications) // /notifications Get all notifications
        .use(getSingleNotification) // /notifications/:id Get notification by ID
        .use(markNotificationAsRead) // /notifications/:id/read Mark notification as read
        .use(deleteNotification) // /notifications/:id Delete notification
        .use(markAllNotificationsAsRead) // /notifications/read-all Mark all notifications as read
  )
  .group(
    '/mentions',
    (mentions) =>
      mentions
        .use(getMentions) // /mentions Get all mentions for current user
        .use(getUnreadMentions) // /mentions/unread Get unread mentions
        .use(markMentionsAsRead) // /mentions/read Mark mentions as read
  )
  .group(
    '/voice',
    (voice) =>
      voice
        .get('/regions', () => 'Get available voice regions') // Get available voice regions
        .post('/connections', () => 'Create voice connection') // Create voice connection
        .delete('/connections/:connectionId', () => 'Close voice connection') // Close voice connection
  )
  .group(
    '/search',
    (search) =>
      search
        .get('/messages', () => 'Search messages') // Search messages
        .get('/users', () => 'Search users') // Search users
        .get('/guilds', () => 'Search guilds') // Search guilds
  )
  .group(
    '/uploads',
    (uploads) =>
      uploads
        .post('/files', () => 'Upload file') // Upload file
        .get('/files/:fileId', () => 'Get file info') // Get file info
        .delete('/files/:fileId', () => 'Delete file') // Delete file
  )
  .group(
    '/guilds/:id/templates',
    (templates) =>
      templates
        .get('/', () => 'Get guild templates') // Get guild templates
        .post('/', () => 'Create guild template') // Create guild template
        .get('/:templateId', () => 'Get template') // Get template
        .patch('/:templateId', () => 'Update template') // Update template
        .delete('/:templateId', () => 'Delete template') // Delete template
        .post('/:templateId/sync', () => 'Sync template with current guild') // Sync template with current guild
  );
