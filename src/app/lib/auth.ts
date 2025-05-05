import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials, req) {
        const user = {
          objectId: credentials?.objectId as string,
          name: credentials?.name as string,
          email: credentials?.email as string,
          userToken: credentials?.userToken as string,
        };
    
        // Validasi minimal (opsional)
        if (!user.objectId || !user.email || !user.userToken) return null;
    
        return user;
      }
    }),
    
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour in second
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.objectId = user.objectId;
        token.name = user.name;
        token.email = user.email;
        token.userToken = user.userToken;
      }
      return token;
    },
    async session({ token, session }) {
      session.user = {
        ...session.user,
        objectId: token.objectId as string,
        name: token.name as string,
        email: token.email as string,
      };
      session.userToken = token.userToken as string;
      return session;
    },
  },
});