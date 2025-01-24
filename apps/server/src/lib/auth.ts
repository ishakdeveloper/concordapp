import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { createId } from '@paralleldrive/cuid2';
import { expo } from '@better-auth/expo';
import { db, eq, user } from '@concord/database';
import type { Context } from 'elysia';
import { createAuthMiddleware } from 'better-auth/api';
import { generateDiscriminator } from '../utils/discriminator';
import { generateNormalizedUsername } from '../utils/generateUserName';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  trustedOrigins: [process.env.WEB_URL!, process.env.API_URL!, 'app://'],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      enabled: true,
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      enabled: true,
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    discord: {
      enabled: true,
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    },
  },
  user: {
    additionalFields: {
      discriminator: {
        type: 'string',
        required: false,
        input: false,
      },
      displayName: {
        type: 'string',
        required: false,
        input: false,
      },
      bio: {
        type: 'string',
        required: false,
        defaultValue: '',
      },
      avatar: {
        type: 'string',
        required: false,
        defaultValue: '',
      },
      banner: {
        type: 'string',
        required: false,
        defaultValue: '',
      },
      isAdmin: {
        type: 'boolean',
        required: false,
        defaultValue: false,
        input: false,
      },
      isBanned: {
        type: 'boolean',
        required: false,
        defaultValue: false,
        input: false,
      },
    },
  },
  advanced: {
    cookiePrefix: 'uid',
    generateId: () => {
      return createId();
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (ctx) => {
          console.log('before database hook', ctx);

          // Generate normalized username and display name
          const { normalizedName, displayName } = generateNormalizedUsername(
            ctx.name
          );

          // Generate discriminator based on normalized name
          const discriminator = await generateDiscriminator(normalizedName);

          return {
            data: {
              ...ctx,
              name: normalizedName, // Use normalized name as the username
              discriminator,
              displayName,
            },
          };
        },
      },
    },
  },
  plugins: [expo()],
});

export type User = typeof auth.$Infer.Session.user;
export type Session = typeof auth.$Infer.Session.session;

export const betterAuthView = (context: Context) => {
  const BETTER_AUTH_ACCEPT_METHODS = ['POST', 'GET'];
  // validate request method
  if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
    return auth.handler(context.request);
  } else {
    context.error(405);
  }
};
