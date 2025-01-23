import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

// Ensure uploads directory exists
const UPLOADS_DIR = join(process.cwd(), 'uploads');

// Create directories if they don't exist
export async function ensureUploadsDirectories() {
  const dirs = ['banners', 'avatars', 'attachments', 'icons'];

  if (!existsSync(UPLOADS_DIR)) {
    await mkdir(UPLOADS_DIR);
  }

  for (const dir of dirs) {
    const path = join(UPLOADS_DIR, dir);
    if (!existsSync(path)) {
      await mkdir(path);
    }
  }
}

export function getUploadUrl(path: string) {
  return `${process.env.API_URL}/uploads/${path}`;
}
