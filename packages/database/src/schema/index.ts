import { pgCuid2 } from 'drizzle-cuid2';
import {
  boolean,
  integer,
  jsonb,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import type { AnyPgColumn } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),
  displayName: text('display_name').notNull(),
  discriminator: text('discriminator').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  bio: text('bio'),
  image: text('image'),
  banner: text('banner'),
  status: text('status').default('offline'),
  customStatus: text('custom_status'),
  locale: text('locale').default('en-US'),
  theme: text('theme').default('dark'),
  enableDM: boolean('enable_dm').default(true),
  lastOnlineAt: timestamp('last_online'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  isDisabled: boolean('is_disabled').notNull().default(false),
  disabledAt: timestamp('disabled_at'),
  disabledReason: text('disabled_reason'),
  deletedAt: timestamp('deleted_at'),
});

export const session = pgTable('session', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: pgCuid2('user_id')
    .notNull()
    .references(() => user.id),
});

export const account = pgTable('account', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  accountId: pgCuid2('account_id').notNull(),
  providerId: pgCuid2('provider_id').notNull(),
  userId: pgCuid2('user_id')
    .notNull()
    .references(() => user.id),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const verification = pgTable('verification', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export const friendships = pgTable('friendships', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  userId: pgCuid2('user_id')
    .notNull()
    .references(() => user.id),
  friendId: pgCuid2('friend_id')
    .notNull()
    .references(() => user.id),
  status: text('status').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const guilds = pgTable('guilds', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  icon: text('icon'),
  banner: text('banner'),
  ownerId: pgCuid2('owner_id')
    .notNull()
    .references(() => user.id),
  isPublic: boolean('is_public').default(false),
  verificationLevel: integer('verification_level').default(0),
  defaultChannelId: pgCuid2('default_channel_id'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const categories = pgTable('categories', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  guildId: pgCuid2('guild_id')
    .notNull()
    .references(() => guilds.id),
  position: integer('position').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const channels = pgTable('channels', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  type: text('type')
    .notNull()
    .$type<
      | 'text'
      | 'announcement'
      | 'rules'
      | 'voice'
      | 'public_thread'
      | 'private_thread'
    >(),
  topic: text('topic'),
  guildId: pgCuid2('guild_id').references(() => guilds.id),
  categoryId: pgCuid2('category_id').references(() => categories.id),
  parentId: pgCuid2('parent_id').references((): AnyPgColumn => channels.id),
  position: integer('position').notNull(),
  categoryPosition: integer('category_position'),
  isNsfw: boolean('is_nsfw').default(false),
  rateLimitPerUser: integer('rate_limit_per_user').default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const guildMembers = pgTable('guild_members', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  guildId: pgCuid2('guild_id')
    .notNull()
    .references(() => guilds.id),
  userId: pgCuid2('user_id')
    .notNull()
    .references(() => user.id),
  nickname: text('nickname'),
  avatar: text('avatar'),
  joinedAt: timestamp('joined_at').notNull().defaultNow(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const roles = pgTable('roles', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  guildId: pgCuid2('guild_id')
    .notNull()
    .references(() => guilds.id),
  color: integer('color').default(0),
  position: integer('position').notNull(),
  permissions: text('permissions').notNull().$type<string>(),
  isHoist: boolean('is_hoist').default(false),
  isMentionable: boolean('is_mentionable').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const memberRoles = pgTable('member_roles', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  memberId: pgCuid2('member_id')
    .notNull()
    .references(() => guildMembers.id),
  roleId: pgCuid2('role_id')
    .notNull()
    .references(() => roles.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const messages = pgTable('messages', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  content: text('content'),
  channelId: pgCuid2('channel_id')
    .notNull()
    .references(() => channels.id),
  authorId: pgCuid2('author_id')
    .notNull()
    .references(() => user.id),
  type: text('type').notNull(),
  isSystem: boolean('is_system').notNull().default(false),
  isPinned: boolean('is_pinned').default(false),
  isEdited: boolean('is_edited').default(false),
  attachments: jsonb('attachments').default([]),
  embeds: jsonb('embeds').default([]),
  mentions: jsonb('mentions').default([]),
  replyToId: pgCuid2('reply_to_id').references((): AnyPgColumn => messages.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const reactions = pgTable('reactions', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  messageId: pgCuid2('message_id')
    .notNull()
    .references(() => messages.id),
  userId: pgCuid2('user_id')
    .notNull()
    .references(() => user.id),
  emoji: text('emoji').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const threads = pgTable('threads', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  channelId: pgCuid2('channel_id')
    .notNull()
    .references(() => channels.id),
  ownerId: pgCuid2('owner_id')
    .notNull()
    .references(() => user.id),
  name: text('name').notNull(),
  messageId: pgCuid2('message_id').references(() => messages.id),
  isArchived: boolean('is_archived').default(false),
  autoArchiveDuration: integer('auto_archive_duration').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const threadMembers = pgTable('thread_members', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  threadId: pgCuid2('thread_id')
    .notNull()
    .references(() => threads.id),
  userId: pgCuid2('user_id')
    .notNull()
    .references(() => user.id),
  joinedAt: timestamp('joined_at').notNull().defaultNow(),
});

export const invites = pgTable('invites', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  code: text('code').notNull().unique(),
  guildId: pgCuid2('guild_id')
    .notNull()
    .references(() => guilds.id),
  channelId: pgCuid2('channel_id')
    .notNull()
    .references(() => channels.id),
  inviterId: pgCuid2('inviter_id')
    .notNull()
    .references(() => user.id),
  maxUses: integer('max_uses'),
  uses: integer('uses').default(0),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const bans = pgTable('bans', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  guildId: pgCuid2('guild_id')
    .notNull()
    .references(() => guilds.id),
  userId: pgCuid2('user_id')
    .notNull()
    .references(() => user.id),
  reason: text('reason'),
  moderatorId: pgCuid2('moderator_id')
    .notNull()
    .references(() => user.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const auditLogs = pgTable('audit_logs', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  guildId: pgCuid2('guild_id')
    .notNull()
    .references(() => guilds.id),
  executorId: pgCuid2('executor_id')
    .notNull()
    .references(() => user.id),
  targetId: pgCuid2('target_id'),
  actionType: text('action_type').notNull(),
  changes: jsonb('changes'),
  reason: text('reason'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const emojis = pgTable('emojis', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  guildId: pgCuid2('guild_id')
    .notNull()
    .references(() => guilds.id),
  creatorId: pgCuid2('creator_id')
    .notNull()
    .references(() => user.id),
  animated: boolean('animated').default(false),
  url: text('url').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const webhooks = pgTable('webhooks', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  avatar: text('avatar'),
  token: text('token').notNull(),
  channelId: pgCuid2('channel_id')
    .notNull()
    .references(() => channels.id),
  creatorId: pgCuid2('creator_id')
    .notNull()
    .references(() => user.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const conversations = pgTable('conversations', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  isGroup: boolean('is_group').notNull().default(false),
  name: text('name'),
  icon: text('icon'),
  ownerId: pgCuid2('owner_id').references(() => user.id),
  lastMessageId: pgCuid2('last_message_id').references(() => messages.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const conversationMembers = pgTable('conversation_members', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  conversationId: pgCuid2('conversation_id')
    .notNull()
    .references(() => conversations.id),
  userId: pgCuid2('user_id')
    .notNull()
    .references(() => user.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const notifications = pgTable('notifications', {
  id: pgCuid2('id').defaultRandom().primaryKey(),
  userId: pgCuid2('user_id')
    .notNull()
    .references(() => user.id),
  type: text('type').notNull(),
  read: boolean('read').default(false),
  data: jsonb('data').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const userBlocks = pgTable(
  'user_blocks',
  {
    id: pgCuid2('id').defaultRandom().primaryKey(),
    userId: pgCuid2('user_id')
      .notNull()
      .references(() => user.id),
    blockedUserId: pgCuid2('blocked_user_id')
      .notNull()
      .references(() => user.id),
    reason: text('reason'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    uniqueIdx: uniqueIndex('user_blocks_unique_idx').on(
      table.userId,
      table.blockedUserId
    ),
  })
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  friendships: many(friendships),
  guilds: many(guilds),
  messages: many(messages),
  reactions: many(reactions),
  threads: many(threads),
  threadMembers: many(threadMembers),
  blocks: many(userBlocks),
  blockedBy: many(userBlocks, { relationName: 'blockedByUsers' }),
}));

export const userBlocksRelations = relations(userBlocks, ({ one }) => ({
  user: one(user, {
    fields: [userBlocks.userId],
    references: [user.id],
  }),
  blockedUser: one(user, {
    fields: [userBlocks.blockedUserId],
    references: [user.id],
  }),
}));

export const guildRelations = relations(guilds, ({ many, one }) => ({
  members: many(guildMembers),
  channels: many(channels),
  roles: many(roles),
  owner: one(user, {
    fields: [guilds.ownerId],
    references: [user.id],
  }),
}));

export const channelRelations = relations(channels, ({ many, one }) => ({
  messages: many(messages),
  guild: one(guilds, {
    fields: [channels.guildId],
    references: [guilds.id],
  }),
  category: one(categories, {
    fields: [channels.categoryId],
    references: [categories.id],
  }),
  parent: one(channels, {
    fields: [channels.parentId],
    references: [channels.id],
  }),
  threads: many(channels, {
    relationName: 'parentChildren',
  }),
}));

export const conversationRelations = relations(
  conversations,
  ({ many, one }) => ({
    members: many(conversationMembers),
    owner: one(user, {
      fields: [conversations.ownerId],
      references: [user.id],
    }),
    lastMessage: one(messages, {
      fields: [conversations.lastMessageId],
      references: [messages.id],
    }),
  })
);

export const messagesRelations = relations(messages, ({ one }) => ({
  author: one(user, {
    fields: [messages.authorId],
    references: [user.id],
  }),
  channel: one(channels, {
    fields: [messages.channelId],
    references: [channels.id],
  }),
  replyTo: one(messages, {
    fields: [messages.replyToId],
    references: [messages.id],
  }),
}));

export const guildMemberRelations = relations(
  guildMembers,
  ({ one, many }) => ({
    user: one(user, {
      fields: [guildMembers.userId],
      references: [user.id],
    }),
    guild: one(guilds, {
      fields: [guildMembers.guildId],
      references: [guilds.id],
    }),
    roles: many(memberRoles),
  })
);

export const threadRelations = relations(threads, ({ one, many }) => ({
  channel: one(channels, {
    fields: [threads.channelId],
    references: [channels.id],
  }),
  owner: one(user, {
    fields: [threads.ownerId],
    references: [user.id],
  }),
  members: many(threadMembers),
  message: one(messages, {
    fields: [threads.messageId],
    references: [messages.id],
  }),
}));

export const threadMemberRelations = relations(threadMembers, ({ one }) => ({
  thread: one(threads, {
    fields: [threadMembers.threadId],
    references: [threads.id],
  }),
  user: one(user, {
    fields: [threadMembers.userId],
    references: [user.id],
  }),
}));
