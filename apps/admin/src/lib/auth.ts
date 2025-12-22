/**
 * Auth.js Configuration
 * NextAuth setup with Prisma adapter
 */

import type { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "@prosfin/db"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { decode } from "next-auth/jwt"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as any,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
          include: {
            roles: {
              include: {
                role: true,
              },
            },
          },
        })

        if (!user || !user.passwordHash) {
          return null
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash)

        if (!isValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          roles: user.roles.map((ur) => ur.role.name),
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.roles = (user as any).roles || []
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.roles = (token.roles as string[]) || []
      }
      return session
    },
  },
}

/**
 * Get server session (compatible with next-auth v5)
 * Use this in API routes and server components
 * 
 * Note: In next-auth v5, we need to manually decode the session token
 */
export async function getServerSession() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("next-auth.session-token")?.value || 
                       cookieStore.get("__Secure-next-auth.session-token")?.value

  if (!sessionToken) {
    return null
  }

  try {
    const decoded = await decode({
      token: sessionToken,
      secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
    })

    if (!decoded) {
      return null
    }

    // Reconstruct session from token
    return {
      user: {
        id: decoded.id as string,
        email: decoded.email as string,
        name: decoded.name as string,
        roles: (decoded.roles as string[]) || [],
      },
      expires: decoded.exp ? new Date(decoded.exp * 1000).toISOString() : undefined,
    }
  } catch (error) {
    console.error("Failed to decode session token:", error)
    return null
  }
}

