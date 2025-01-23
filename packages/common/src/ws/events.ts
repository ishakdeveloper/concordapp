// Server -> Client events

export type BaseEvent<T extends string, D = any> = {
  type: T;
  data: D;
};

// Guild Events
export type GuildCreateEvent = BaseEvent<
  'GUILD_CREATE',
  {
    id: string;
    name: string;
    description?: string;
    icon?: string;
    banner?: string;
    ownerId: string;
    isPublic: boolean;
    verificationLevel: number;
    defaultChannelId?: string;
    createdAt: string;
    updatedAt: string;
  }
>;

export type GuildUpdateEvent = BaseEvent<
  'GUILD_UPDATE',
  {
    id: string;
    changes: Partial<{
      name: string;
      description: string;
      icon: string;
      banner: string;
      isPublic: boolean;
      verificationLevel: number;
      defaultChannelId: string;
    }>;
  }
>;

export type GuildDeleteEvent = BaseEvent<
  'GUILD_DELETE',
  {
    id: string;
  }
>;

// Guild Member Events
export type GuildMemberEvent = BaseEvent<
  'GUILD_MEMBER_ADD' | 'GUILD_MEMBER_UPDATE' | 'GUILD_MEMBER_REMOVE',
  {
    id: string;
    guildId: string;
    userId: string;
    nickname?: string;
    roles: string[];
    joinedAt: string;
    premiumSince?: string;
    deaf: boolean;
    mute: boolean;
    pending: boolean;
    permissions: string[];
  }
>;

// Role Events
export type GuildRoleEvent = BaseEvent<
  'GUILD_ROLE_CREATE' | 'GUILD_ROLE_UPDATE' | 'GUILD_ROLE_DELETE',
  {
    id: string;
    guildId: string;
    name: string;
    color: number;
    hoist: boolean;
    position: number;
    permissions: string[];
    managed: boolean;
    mentionable: boolean;
  }
>;

// Channel Events
export type ChannelCreateEvent = BaseEvent<
  'CHANNEL_CREATE',
  {
    id: string;
    name: string;
    type:
      | 'text'
      | 'announcement'
      | 'rules'
      | 'voice'
      | 'public_thread'
      | 'private_thread';
    topic?: string;
    guildId?: string;
    categoryId?: string;
    parentId?: string;
    position: number;
    categoryPosition?: number;
    isNsfw: boolean;
    rateLimitPerUser: number;
    createdAt: string;
    updatedAt: string;
  }
>;

export type ChannelUpdateEvent = BaseEvent<
  'CHANNEL_UPDATE',
  {
    id: string;
    guildId?: string;
    changes: Partial<{
      name: string;
      topic: string;
      categoryId: string;
      position: number;
      categoryPosition: number;
      isNsfw: boolean;
      rateLimitPerUser: number;
    }>;
  }
>;

export type ChannelDeleteEvent = BaseEvent<
  'CHANNEL_DELETE',
  {
    id: string;
    guildId: string;
  }
>;

// Message Events
export type MessageCreateEvent = BaseEvent<
  'MESSAGE_CREATE',
  {
    id: string;
    content?: string;
    channelId: string;
    authorId: string;
    type: string;
    isPinned: boolean;
    isEdited: boolean;
    attachments: Array<{
      id: string;
      url: string;
      name: string;
      size: number;
      type: string;
    }>;
    embeds: any[];
    mentions: string[];
    replyToId?: string;
    createdAt: string;
    updatedAt: string;
  }
>;

export type MessageUpdateEvent = BaseEvent<
  'MESSAGE_UPDATE',
  {
    id: string;
    channelId: string;
    changes: Partial<{
      content: string;
      // ... other updatable fields
    }>;
  }
>;

export type MessageDeleteEvent = BaseEvent<
  'MESSAGE_DELETE',
  {
    id: string;
    channelId: string;
  }
>;

// Presence Events
export type PresenceUpdateEvent = BaseEvent<
  'PRESENCE_UPDATE',
  {
    userId: string;
    status: 'online' | 'idle' | 'dnd' | 'offline';
    activities?: Array<{
      name: string;
      type: string;
    }>;
  }
>;

// Thread Events
export type ThreadCreateEvent = BaseEvent<
  'THREAD_CREATE',
  {
    id: string;
    channelId: string;
    ownerId: string;
    name: string;
    messageId?: string;
    isArchived: boolean;
    autoArchiveDuration: number;
    createdAt: string;
    updatedAt: string;
  }
>;

export type ThreadUpdateEvent = BaseEvent<
  'THREAD_UPDATE',
  {
    id: string;
    changes: Partial<{
      name: string;
      isArchived: boolean;
      autoArchiveDuration: number;
    }>;
  }
>;

// Voice Events
export type VoiceStateUpdateEvent = BaseEvent<
  'VOICE_STATE_UPDATE',
  {
    userId: string;
    guildId: string;
    channelId?: string;
    sessionId: string;
    deaf: boolean;
    mute: boolean;
    selfDeaf: boolean;
    selfMute: boolean;
    selfStream: boolean;
    selfVideo: boolean;
    suppress: boolean;
    requestToSpeakTimestamp?: string;
  }
>;

export type VoiceServerUpdateEvent = BaseEvent<
  'VOICE_SERVER_UPDATE',
  {
    token: string;
    guildId: string;
    endpoint: string;
  }
>;

// Typing Events
export type TypingStartEvent = BaseEvent<
  'TYPING_START',
  {
    channelId: string;
    userId: string;
    timestamp: number;
  }
>;

// User Events
export type UserUpdateEvent = BaseEvent<
  'USER_UPDATE',
  {
    id: string;
    changes: Partial<{
      username: string;
      displayName: string;
      discriminator: string;
      email: string;
      emailVerified: boolean;
      bio: string;
      image: string;
      banner: string;
      status: string;
      customStatus: string;
      locale: string;
      theme: string;
      enableDM: boolean;
    }>;
  }
>;

// DM/Group Events
export type ConversationCreateEvent = BaseEvent<
  'CONVERSATION_CREATE',
  {
    id: string;
    isGroup: boolean;
    name?: string;
    icon?: string;
    ownerId?: string;
    lastMessageId?: string;
    participants: string[];
    createdAt: string;
    updatedAt: string;
  }
>;

export type ConversationUpdateEvent = BaseEvent<
  'CONVERSATION_UPDATE',
  {
    id: string;
    changes: Partial<{
      name: string;
      icon: string;
      ownerId: string;
      lastMessageId: string;
    }>;
  }
>;

// Notification Events
export type NotificationEvent = BaseEvent<
  'NOTIFICATION_CREATE' | 'NOTIFICATION_UPDATE' | 'NOTIFICATION_DELETE',
  {
    id: string;
    userId: string;
    type: string;
    read: boolean;
    data: {
      title: string;
      body: string;
      icon?: string;
      link?: string;
      metadata?: Record<string, any>;
    };
    createdAt: string;
    updatedAt: string;
  }
>;

// Mention Events
export type MentionEvent = BaseEvent<
  'MENTION_CREATE',
  {
    id: string;
    userId: string;
    mentionedById: string;
    guildId?: string;
    channelId: string;
    messageId: string;
    threadId?: string;
    read: boolean;
    createdAt: string;
  }
>;

// Template Events
export type TemplateEvent = BaseEvent<
  'TEMPLATE_CREATE' | 'TEMPLATE_UPDATE' | 'TEMPLATE_DELETE',
  {
    id: string;
    code: string;
    name: string;
    description?: string;
    usageCount: number;
    creatorId: string;
    guildId: string;
    sourceGuildId: string;
    serializedSourceGuild: {
      name: string;
      description?: string;
      icon?: string;
      verificationLevel: number;
      defaultMessageNotifications: number;
      explicitContentFilter: number;
      preferredLocale: string;
      afkTimeout: number;
      roles: Array<{
        id: string;
        name: string;
        color: number;
        hoist: boolean;
        position: number;
        permissions: string;
        managed: boolean;
        mentionable: boolean;
      }>;
      channels: Array<{
        id: string;
        type: number;
        name: string;
        topic?: string;
        position: number;
        parentId?: string;
        permissionOverwrites: Array<{
          id: string;
          type: number;
          allow: string;
          deny: string;
        }>;
      }>;
    };
    createdAt: string;
    updatedAt: string;
  }
>;

// File Upload Events
export type FileEvent = BaseEvent<
  'FILE_UPLOAD' | 'FILE_DELETE',
  {
    id: string;
    userId: string;
    name: string;
    size: number;
    type: string;
    url: string;
    metadata?: {
      width?: number;
      height?: number;
      duration?: number;
    };
    createdAt: string;
  }
>;

// Union type of all possible events
export type WSEvent =
  | GuildCreateEvent
  | GuildUpdateEvent
  | GuildDeleteEvent
  | GuildMemberEvent
  | GuildRoleEvent
  | ChannelCreateEvent
  | ChannelUpdateEvent
  | ChannelDeleteEvent
  | MessageCreateEvent
  | MessageUpdateEvent
  | MessageDeleteEvent
  | PresenceUpdateEvent
  | ThreadCreateEvent
  | ThreadUpdateEvent
  | VoiceStateUpdateEvent
  | VoiceServerUpdateEvent
  | TypingStartEvent
  | UserUpdateEvent
  | ConversationCreateEvent
  | ConversationUpdateEvent
  | NotificationEvent
  | MentionEvent
  | TemplateEvent
  | FileEvent;
