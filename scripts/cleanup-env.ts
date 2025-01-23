import { join } from 'path';
import { unlink } from 'fs/promises';
import { existsSync, lstatSync } from 'fs';

const packages = [
  'packages/database',
  'packages/env',
  'apps/server',
  'apps/web',
];
const envFiles = ['.env.development', '.env.production'];

for (const pkg of packages) {
  for (const envFile of envFiles) {
    const linkPath = join(process.cwd(), pkg, envFile);

    try {
      // Only remove if it exists and is a symlink
      if (existsSync(linkPath) && lstatSync(linkPath).isSymbolicLink()) {
        await unlink(linkPath);
        console.log(`✅ Removed symlink: ${pkg}/${envFile}`);
      }
    } catch (error) {
      console.error(
        `Failed to remove symlink for ${envFile} in ${pkg}:`,
        error
      );
    }
  }
}

console.log('✅ Environment symlinks cleaned successfully');
