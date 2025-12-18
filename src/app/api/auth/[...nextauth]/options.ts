import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "domain-login",
      name: "Credentials",
      credentials: {
        username: { label: "Email ", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;

        await dbConnect();

        try {
          const user = await UserModel.findOne({
            $or: [
              { username: credentials.username },
              { email: credentials.username }
            ]
          });

          if (!user) return null;
          if(!user.isVerified){
            console.log("firstly verify the user");
            return null
            
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) return null;

          return user; 
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
        if (user) {
        token._id = user._id?.toString(); // Convert ObjectId to string
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token
    },
    async session({ session, token }) {
        if (token) {
        session.user._id = token._id?.toString(); 
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
        }
      return session
    }
  },
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: "jwt"
  },
  secret:process.env.NEXTAUTH_SECRET

};
