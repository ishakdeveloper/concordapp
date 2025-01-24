import { Elysia } from 'elysia';
import { betterAuthView } from './lib/auth';
import cors from '@elysiajs/cors';
import { validateOrigin } from './utils/validateOrigin';
import staticPlugin from '@elysiajs/static';
import swagger from '@elysiajs/swagger';
import { ensureUploadsDirectories } from './utils/uploads';
import { routes } from './modules/manifest';

// Ensure upload directories exist on startup
await ensureUploadsDirectories();

const app = new Elysia()
  .use(
    cors({
      origin: validateOrigin,
      credentials: true,
    })
  )
  .use(
    staticPlugin({
      prefix: '/uploads',
      assets: 'uploads',
      alwaysStatic: true,
    })
  )
  .use(swagger())
  .get('/', () => 'Hello Elysia')
  .group('/api/v1', (api) => api.use(routes))
  .all('/api/auth/*', betterAuthView)
  .listen(4000);

console.log(
  `🦊Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type AppRouter = typeof app;

export * from './lib/auth';
