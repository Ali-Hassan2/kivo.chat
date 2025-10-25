import bcrypt from 'bcrypt'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import TwitterProvider from 'next-auth/providers/twitter'
import { UserModel } from '@/entities'
import { connect_db } from '@/settings'

const MAX_AGE = 30 * 24 * 60 * 60

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email or Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null
        await connect_db()
        const user = await UserModel.findOne({
          $or: [
            { email: credentials.identifier },
            { username: credentials.identifier },
          ],
        })
        if (!user) return null
        if (!user.isVerifiedUser) return null
        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.password,
        )
        if (!isPasswordMatch) return null
        return {
          id: user.id.toString(),
          username: user.username,
          isVerifiedUser: user.isVerifiedUser,
        }
      },
    }),
    TwitterProvider({
      clientId: process.env.X_API_KEY!,
      clientSecret: process.env.X_API_SECRET_KEY!,
      version: '2.0',
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.isVerified = (user as any).isVerifiedUser ?? true
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        _id: token.id as string,
        username: token.username as string,
        isVerified: token.isVerified as boolean,
      }
      return session
    },
  },

  session: { strategy: 'jwt', maxAge: MAX_AGE },
  pages: { signIn: '/signin' },
  secret: process.env.NEXTAUTH_SECRET,
}

export { authOptions }
