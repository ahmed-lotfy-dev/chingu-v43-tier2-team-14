import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index.js";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./secrets.js";
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            redirectURI: process.env.REDIRECT_CALLBACK_URL,
        },
    },
    trustedOrigins: [
        "http://localhost:3000",
        "https://books-app-f.ahmedlotfy.dev",
    ],
});
