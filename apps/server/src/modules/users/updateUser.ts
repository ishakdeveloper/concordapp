import Elysia, { t } from 'elysia';
import { db, user } from '@concord/database';
import { eq } from 'drizzle-orm';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { getUploadUrl } from '../../utils/uploads';

export const updateUser = new Elysia().put(
  '/:id',
  async ({ body, params: { id } }) => {
    let avatarUrl, bannerUrl;

    if (body.avatar) {
      const filename = `${id}-${Date.now()}.${body.avatar.type.split('/')[1]}`;
      const path = join('uploads', 'avatars', filename);
      await writeFile(path, Buffer.from(await body.avatar.arrayBuffer()));
      avatarUrl = getUploadUrl(`avatars/${filename}`);
    }

    if (body.banner) {
      const filename = `${id}-${Date.now()}.${body.banner.type.split('/')[1]}`;
      const path = join('uploads', 'banners', filename);
      await writeFile(path, Buffer.from(await body.banner.arrayBuffer()));
      bannerUrl = getUploadUrl(`banners/${filename}`);
    }

    const updatedUser = await db
      .update(user)
      .set({
        ...(body.username && { username: body.username }),
        ...(body.email && { email: body.email }),
        ...(body.status && { status: body.status }),
        ...(body.password && {
          password: await Bun.password.hash(body.password),
        }),
        ...(avatarUrl && { avatar: avatarUrl }),
        ...(bannerUrl && { banner: bannerUrl }),
        updatedAt: new Date(),
      })
      .where(eq(user.id, id))
      .returning();

    if (!updatedUser.length) {
      throw new Error('User not found');
    }

    return updatedUser[0];
  },
  {
    body: t.Object({
      username: t.Optional(t.String({ minLength: 1, maxLength: 32 })),
      email: t.Optional(t.String({ format: 'email' })),
      status: t.Optional(t.String({ minLength: 1, maxLength: 128 })),
      password: t.Optional(t.String({ minLength: 8 })),
      avatar: t.Optional(t.File()),
      banner: t.Optional(t.File()),
    }),
    params: t.Object({
      id: t.String(),
    }),
  }
);
