export type NotificationType =
  | 'FRIEND_REQUEST'
  | 'FRIEND_ACCEPT'
  | 'MESSAGE'
  | 'MENTION'
  | 'THREAD_CREATED'
  | 'THREAD_REPLY'
  | 'ROLE_ASSIGNED'
  | 'GUILD_INVITE';

export interface BaseNotification {
  id: string;
  type: NotificationType;
  userId: string;
  read: boolean;
  createdAt: Date;
}

export interface FriendRequestNotification extends BaseNotification {
  type: 'FRIEND_REQUEST';
  fromUserId: string;
}

export interface FriendAcceptNotification extends BaseNotification {
  type: 'FRIEND_ACCEPT';
  friendId: string;
}

export interface MessageNotification extends BaseNotification {
  type: 'MESSAGE';
  messageId: string;
  channelId: string;
  guildId?: string;
}

export interface MentionNotification extends BaseNotification {
  type: 'MENTION';
  messageId: string;
  channelId: string;
  guildId?: string;
}

export interface ThreadCreatedNotification extends BaseNotification {
  type: 'THREAD_CREATED';
  threadId: string;
  channelId: string;
  guildId: string;
}

export interface ThreadReplyNotification extends BaseNotification {
  type: 'THREAD_REPLY';
  threadId: string;
  messageId: string;
  channelId: string;
  guildId: string;
}

export interface RoleAssignedNotification extends BaseNotification {
  type: 'ROLE_ASSIGNED';
  roleId: string;
  guildId: string;
}

export interface GuildInviteNotification extends BaseNotification {
  type: 'GUILD_INVITE';
  inviteId: string;
  guildId: string;
  inviterId: string;
}

export type Notification =
  | FriendRequestNotification
  | FriendAcceptNotification
  | MessageNotification
  | MentionNotification
  | ThreadCreatedNotification
  | ThreadReplyNotification
  | RoleAssignedNotification
  | GuildInviteNotification;
