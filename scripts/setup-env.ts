import { join } from 'path';
import { symlink, unlink } from 'fs/promises';
import { existsSync } from 'fs';

const packages = [
  'packages/database',
  'packages/env',
  'apps/server',
  'apps/web',
];
const envFiles = ['.env.development', '.env.production'];

for (const pkg of packages) {
  for (const envFile of envFiles) {
    const target = join(process.cwd(), envFile);
    const linkPath = join(process.cwd(), pkg, envFile);

    try {
      // Remove existing symlink if it exists
      if (existsSync(linkPath)) {
        await unlink(linkPath);
      }

      // Create new symlink
      await symlink(join('../../', envFile), linkPath);
    } catch (error) {
      console.error(
        `Failed to create symlink for ${envFile} in ${pkg}:`,
        error
      );
    }
  }
}

console.log('✅ Environment symlinks created successfully');
