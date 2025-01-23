export enum OpCode {
  // Lifecycle events
  DISPATCH = 0, // Server -> Client: Dispatches an event
  HEARTBEAT = 1, // Both: Ping check
  IDENTIFY = 2, // Client -> Server: Initial authentication
  PRESENCE_UPDATE = 3, // Client -> Server: Update user's presence
  RESUME = 6, // Client -> Server: Resume a broken connection
  RECONNECT = 7, // Server -> Client: Tell client to reconnect
  INVALID_SESSION = 9, // Server -> Client: Session is invalid

  // Status events
  HELLO = 10, // Server -> Client: Initial connection data
  HEARTBEAT_ACK = 11, // Server -> Client: Confirms heartbeat

  // Guild events
  GUILD_CREATE = 20, // Server -> Client: Guild created or joined
  GUILD_UPDATE = 21, // Server -> Client: Guild updated
  GUILD_DELETE = 22, // Server -> Client: Guild deleted or left
  GUILD_MEMBER_ADD = 23, // Server -> Client: Member joined
  GUILD_MEMBER_UPDATE = 24, // Server -> Client: Member updated
  GUILD_MEMBER_REMOVE = 25, // Server -> Client: Member left/removed
  GUILD_BAN_ADD = 26, // Server -> Client: Member banned
  GUILD_BAN_REMOVE = 27, // Server -> Client: Member unbanned
  GUILD_ROLE_CREATE = 28, // Server -> Client: Role created
  GUILD_ROLE_UPDATE = 29, // Server -> Client: Role updated
  GUILD_ROLE_DELETE = 30, // Server -> Client: Role deleted

  // Channel events
  CHANNEL_CREATE = 40, // Server -> Client: Channel created
  CHANNEL_UPDATE = 41, // Server -> Client: Channel updated
  CHANNEL_DELETE = 42, // Server -> Client: Channel deleted
  CHANNEL_PINS_UPDATE = 43, // Server -> Client: Pins updated
  TYPING_START = 44, // Both: User started typing

  // Message events
  MESSAGE_CREATE = 50, // Both: Message sent
  MESSAGE_UPDATE = 51, // Both: Message edited
  MESSAGE_DELETE = 52, // Both: Message deleted
  MESSAGE_REACTION_ADD = 53, // Both: Reaction added
  MESSAGE_REACTION_REMOVE = 54, // Both: Reaction removed
  MESSAGE_BULK_DELETE = 55, // Server -> Client: Multiple messages deleted

  // Thread events
  THREAD_CREATE = 60, // Server -> Client: Thread created
  THREAD_UPDATE = 61, // Server -> Client: Thread updated
  THREAD_DELETE = 62, // Server -> Client: Thread deleted
  THREAD_MEMBER_UPDATE = 63, // Server -> Client: Thread member updated

  // Voice events
  VOICE_STATE_UPDATE = 70, // Both: Voice state change
  VOICE_SERVER_UPDATE = 71, // Server -> Client: Voice server info

  // User events
  FRIEND_REQUEST_CREATE = 80, // Both: Friend request sent
  FRIEND_REQUEST_UPDATE = 81, // Both: Friend request accepted/declined
  FRIEND_REMOVE = 82, // Both: Friend removed
  USER_UPDATE = 83, // Server -> Client: User updated
  USER_SETTINGS_UPDATE = 84, // Client -> Server: User settings updated
  USER_BLOCK_ADD = 85, // Both: User blocked
  USER_BLOCK_REMOVE = 86, // Both: User unblocked

  // DM/Group events
  CONVERSATION_CREATE = 90, // Server -> Client: New conversation
  CONVERSATION_UPDATE = 91, // Server -> Client: Conversation updated
  CONVERSATION_DELETE = 92, // Server -> Client: Conversation deleted
  CONVERSATION_MEMBER_ADD = 93, // Server -> Client: Member added to group
  CONVERSATION_MEMBER_REMOVE = 94, // Server -> Client: Member removed from group
}

export type GatewayPayload<T = any> = {
  op: OpCode; // Opcode for the payload
  d?: T; // Event data
  s?: number; // Sequence number, used for resuming connections
  t?: string; // Event name for DISPATCH ops
};

export enum CloseCodes {
  NORMAL_CLOSURE = 1000,
  GOING_AWAY = 1001,
  PROTOCOL_ERROR = 1002,
  UNKNOWN_ERROR = 4000,
  UNKNOWN_OPCODE = 4001,
  DECODE_ERROR = 4002,
  NOT_AUTHENTICATED = 4003,
  AUTHENTICATION_FAILED = 4004,
  ALREADY_AUTHENTICATED = 4005,
  INVALID_SEQUENCE = 4007,
  RATE_LIMITED = 4008,
  SESSION_TIMEOUT = 4009,
  INVALID_SHARD = 4010,
  INVALID_INTENTS = 4013,
  DISALLOWED_INTENTS = 4014,
}
