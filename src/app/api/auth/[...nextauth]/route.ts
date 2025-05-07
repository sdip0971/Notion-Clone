import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { v4 as uuidv4 } from "uuid";
const genrateuserid =()=>{
const id = uuidv4();
return id;
}
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
    console.log("Token in session callback:", token); // Debugging
    if (token) {
        session.user.id = token.id?.toString() || "";
    }
    console.log("Session in session callback:", session); // Debugging
    return session;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.id =  genrateuserid();
                console.log(token.id)
            }

            return token;
        },
    },
});

export { authOptions as GET, authOptions as POST }; 