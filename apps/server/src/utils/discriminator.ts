import { db, user } from '@concord/database';
import { and, eq } from 'drizzle-orm';

export async function generateDiscriminator(name: string): Promise<string> {
  // Get all existing discriminators for this name
  const existingDiscriminators = await db
    .select({ discriminator: user.discriminator })
    .from(user)
    .where(eq(user.name, name));

  // Convert discriminators to numbers for easier comparison
  const usedNumbers = new Set(
    existingDiscriminators
      .map((d) => parseInt(d.discriminator))
      .filter((n) => !isNaN(n))
  );

  // Try sequential generation first (0001-9999)
  for (let i = 1; i <= 9999; i++) {
    if (!usedNumbers.has(i)) {
      return i.toString().padStart(4, '0');
    }
  }

  throw new Error(
    'This username has no available discriminators. Please try a different name.'
  );
}

export function validateDiscriminator(discriminator: string): boolean {
  return /^\d{4}$/.test(discriminator);
}

export async function isNameDiscriminatorAvailable(
  name: string,
  discriminator: string
): Promise<boolean> {
  const existingUser = await db.query.user.findFirst({
    where: and(eq(user.name, name), eq(user.discriminator, discriminator)),
  });

  return !existingUser;
}
