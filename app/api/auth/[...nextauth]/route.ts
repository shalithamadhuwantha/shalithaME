import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import type { NextAuthOptions } from 'next-auth'
import { prisma } from '@/api/settings/prisma'
import { headers } from 'next/headers' // for reading User-Agent

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ user }) {
      const email = user.email ?? '';

      // Use findFirst because email is NOT unique
      const userRecord = await prisma.admin.findFirst({
        where: { email },
      });

      if (!userRecord || !userRecord.access) {
        console.warn('Unauthorized login attempt:', email);
        return false;
      }

      const headersList = await headers();
      const userAgent = headersList.get('user-agent') ?? 'Unknown Device';

      await prisma.admin.update({
        where: { id: userRecord.id }, // update by unique id!
        data: {
          lastlogin: new Date(),
          lastlogindevicemeta: userAgent,
        },
      });

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = session.user ?? {};
      session.user.email = token.email;
      session.user.name = token.name as string;
      return session;
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/Admin/Dashboard`;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
