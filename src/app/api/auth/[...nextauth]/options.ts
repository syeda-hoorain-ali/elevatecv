import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/User";
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

if (
  !process.env.GITHUB_ID ||
  !process.env.GITHUB_SECRET ||
  !process.env.GOOGLE_CLIENT_ID ||
  !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Update your envoirment variables");
}

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),

    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials): Promise<any> => {
        await connectDB()
        try {
          const user = await UserModel.findOne({ email: credentials?.email });
          if (!user) throw new Error("Invalid email")

          const isPasswordCorrect = await bcrypt.compare((credentials?.password || ''), user.password);
          if (!isPasswordCorrect) throw new Error("Invalid password")

          return user
        } catch (error) {
          console.log(error)
          throw error
        }
      },
    })
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
        token.isAdmin = user.isAdmin;
        token.logo = user.logo;
        token.resumeList = user.resumeList;
      }
      return token;
    },

    session: async ({ session, token }) => {
      if (session) {
        session.user._id = token._id;
        session.user.username = token.username;
        session.user.isAdmin = token.isAdmin;
        session.user.logo = token.logo;
        session.user.resumeList = token.resumeList;
      }
      return session;
    }
  },

  pages: {
    signIn: '/login',
    signOut: '/sign-out',
    error: '/error'
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET
}