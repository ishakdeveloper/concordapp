ALTER TABLE "accounts" RENAME TO "account";--> statement-breakpoint
ALTER TABLE "sessions" RENAME TO "session";--> statement-breakpoint
ALTER TABLE "verifications" RENAME TO "verification";--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "sessions_token_unique";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "accounts_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "sessions_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "display_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_token_unique" UNIQUE("token");