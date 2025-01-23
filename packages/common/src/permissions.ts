// Permission flags as bitfields
export const PermissionFlags = {
  // General permissions
  VIEW_CHANNELS: 1n << 0n,
  MANAGE_CHANNELS: 1n << 1n,
  MANAGE_ROLES: 1n << 2n,
  MANAGE_EMOJIS: 1n << 3n,
  VIEW_AUDIT_LOG: 1n << 4n,
  MANAGE_WEBHOOKS: 1n << 5n,
  MANAGE_GUILD: 1n << 6n,

  // Member permissions
  KICK_MEMBERS: 1n << 7n,
  BAN_MEMBERS: 1n << 8n,
  CREATE_INVITE: 1n << 9n,
  CHANGE_NICKNAME: 1n << 10n,
  MANAGE_NICKNAMES: 1n << 11n,
  MANAGE_MEMBERS: 1n << 12n,

  // Text channel permissions
  SEND_MESSAGES: 1n << 13n,
  EMBED_LINKS: 1n << 14n,
  ATTACH_FILES: 1n << 15n,
  ADD_REACTIONS: 1n << 16n,
  USE_EXTERNAL_EMOJIS: 1n << 17n,
  MENTION_EVERYONE: 1n << 18n,
  MANAGE_MESSAGES: 1n << 19n,
  READ_MESSAGE_HISTORY: 1n << 20n,
  SEND_TTS_MESSAGES: 1n << 21n,

  // Voice channel permissions
  CONNECT: 1n << 22n,
  SPEAK: 1n << 23n,
  STREAM: 1n << 24n,
  USE_VAD: 1n << 25n,
  PRIORITY_SPEAKER: 1n << 26n,
  MUTE_MEMBERS: 1n << 27n,
  DEAFEN_MEMBERS: 1n << 28n,
  MOVE_MEMBERS: 1n << 29n,

  // Thread permissions
  CREATE_PUBLIC_THREADS: 1n << 30n,
  CREATE_PRIVATE_THREADS: 1n << 31n,
  SEND_MESSAGES_IN_THREADS: 1n << 32n,
  MANAGE_THREADS: 1n << 33n,

  // Special permissions
  ADMINISTRATOR: 1n << 34n,
} as const;

export type PermissionString = keyof typeof PermissionFlags;
export type PermissionResolvable =
  | bigint
  | PermissionString
  | PermissionString[];

export class PermissionsBitField {
  bitfield: bigint;

  constructor(bits: PermissionResolvable = 0n) {
    this.bitfield = this.resolve(bits);
  }

  has(permission: PermissionResolvable): boolean {
    if (
      (this.bitfield & PermissionFlags.ADMINISTRATOR) ===
      PermissionFlags.ADMINISTRATOR
    ) {
      return true;
    }
    const bit = this.resolve(permission);
    return (this.bitfield & bit) === bit;
  }

  add(...permissions: PermissionResolvable[]): this {
    let total = this.bitfield;
    for (const permission of permissions) {
      total |= this.resolve(permission);
    }
    this.bitfield = total;
    return this;
  }

  remove(...permissions: PermissionResolvable[]): this {
    let total = this.bitfield;
    for (const permission of permissions) {
      total &= ~this.resolve(permission);
    }
    this.bitfield = total;
    return this;
  }

  serialize(): Record<PermissionString, boolean> {
    const result: Record<string, boolean> = {};
    for (const [perm, bit] of Object.entries(PermissionFlags)) {
      result[perm] = this.has(bit);
    }
    return result as Record<PermissionString, boolean>;
  }

  private resolve(permission: PermissionResolvable): bigint {
    if (typeof permission === 'bigint') return permission;
    if (typeof permission === 'string') return PermissionFlags[permission];
    if (Array.isArray(permission)) {
      return permission
        .map((p) => this.resolve(p))
        .reduce((acc, p) => acc | p, 0n);
    }
    throw new Error('Invalid permission');
  }

  static DEFAULT = new PermissionsBitField([
    'VIEW_CHANNELS',
    'SEND_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'ADD_REACTIONS',
    'USE_EXTERNAL_EMOJIS',
    'READ_MESSAGE_HISTORY',
    'CONNECT',
    'SPEAK',
    'STREAM',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'CREATE_PUBLIC_THREADS',
    'SEND_MESSAGES_IN_THREADS',
  ]);
}
