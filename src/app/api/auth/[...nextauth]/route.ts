import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { v4 as uuidv4 } from "uuid";

export const authOptions = NextAuth({
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
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id?.toString() || "",
        session.user.image=token.picture || null;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to the callback URL or the base URL
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id || account?.providerAccountId || token.id;
        token.picture = user.image;
      }

      return token;
    },
  },
});

export { authOptions as GET, authOptions as POST }; 