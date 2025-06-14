import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { v4 as uuidv4 } from "uuid";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account, profile }: { token: any; user?: any; account?: any; profile?: any }) {
      if (account && profile) {
        if (account.provider === "google") {
          token.id = profile.sub;
        } else if (account.provider === "github") {
          token.id = (profile as any).id?.toString();
        }
        token.picture =
          (profile as any)?.picture ||
          (profile as any)?.avatar_url ||
          user?.image ||
          null;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      session.user = session.user || {};
      session.user.id = token.id as string;
      session.user.image = token.picture as string;
      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  session: {
    strategy: "jwt" as const,
  },
};

// This is the correct export for Next.js App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
