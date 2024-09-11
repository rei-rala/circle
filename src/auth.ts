import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  trustHost: true, //fixes a bug (wtf)
  theme: {
    logo: "/icon.png"
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [GoogleProvider],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.alias = user.alias;
      session.user.location = user.location;
      session.user.socialMedia = user.socialMedia;
      session.user.role = user.role;
      session.user.phone = user.phone;

      session.user.hideEmail = user.hideEmail;
      session.user.hideImage = user.hideImage;
      session.user.hidePhone = user.hidePhone;

      session.user.admitted = user.admitted;
      session.user.banned = user.banned;

      return session;
    },
  },
} as const satisfies NextAuthConfig;


export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)