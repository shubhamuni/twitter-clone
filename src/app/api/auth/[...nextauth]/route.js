import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "./../../../../../lib/db"

export const handler =  NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/login'
  },
  session: {
    strategy:'jwt'
  },
  callbacks: {
    session: async ({ token, session}) => {
      if (session?.user && token) {        
        session.user.id = token.sub
      }
      return session;
    }
  }
});

export {handler as GET, handler as POST};
