import { and, eq } from 'drizzle-orm';
import { guildMembers, inArray, memberRoles, roles } from '@concord/database';
import { db } from '@concord/database';
import { PermissionFlags, PermissionsBitField } from '@concord/common';

// Helper to convert permission strings to BigInt
export function parsePermissions(permissionString: string): bigint {
  return BigInt(permissionString);
}

// Calculate final permissions for a member considering roles and overwrites
export async function calculateMemberPermissions(
  userId: string,
  guildId: string,
  channelId?: string
): Promise<PermissionsBitField> {
  // Get member's roles
  const memberRoleIds = await db
    .select({ roleId: memberRoles.roleId })
    .from(memberRoles)
    .innerJoin(guildMembers, eq(guildMembers.id, memberRoles.memberId))
    .where(
      and(eq(guildMembers.userId, userId), eq(guildMembers.guildId, guildId))
    );

  // Get role permissions
  const rolePermissions = await db
    .select({ permissions: roles.permissions })
    .from(roles)
    .where(
      inArray(
        roles.id,
        memberRoleIds.map((r) => r.roleId)
      )
    );

  // Calculate base permissions from roles
  const permissions = new PermissionsBitField();
  for (const role of rolePermissions) {
    permissions.add(parsePermissions(role.permissions));
  }

  // If channel specified, apply channel overwrites
  if (channelId) {
    // TODO: Implement channel permission overwrites
    // This would involve:
    // 1. Getting @everyone role overwrites
    // 2. Getting role-specific overwrites
    // 3. Getting member-specific overwrites
    // 4. Applying them in order
  }

  return permissions;
}

// Default role permissions (like @everyone role)
export const DEFAULT_ROLE_PERMISSIONS = PermissionsBitField.DEFAULT;
