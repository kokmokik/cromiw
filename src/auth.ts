import NextAuth, { type NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

const config: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials): Promise<any> {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          })
          if (!res.ok) return null
          const data = await res.json()
          return { ...data.user, accessToken: data.accessToken }
        } catch {
          return null
        }
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const { pathname } = nextUrl
      const isPublic = ["/login", "/register", "/onboarding"].some((p) => pathname.startsWith(p))
      return isPublic || isLoggedIn
    },
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken ?? ""
        token.role = user.role ?? ""
        token.labId = user.labId ?? ""
      }
      return token
    },
    session({ session, token }) {
      return {
        ...session,
        accessToken: (token.accessToken as string) ?? "",
        user: {
          ...session.user,
          role: (token.role as string) ?? "",
          labId: (token.labId as string) ?? "",
        },
      }
    },
  },
}

export const { handlers, signIn, signOut, auth } = NextAuth(config)
