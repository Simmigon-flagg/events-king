
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
async function login(credentials) {
    try {
        await connectMongoDB()
        const user = await User.findOne({ email: credentials.email })
        if (!user) {
            throw new Error("Invalid Credentials email")
        }

        const isCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isCorrect) {
            throw new Error("Invalid Credentials password")
        }
        
        return user;
    } catch (error) {
        console.log(error, " Logging in user")
        throw new Error("Server error")
    }
}
const authOptions = {
    pages: {
        signIn: "/login"
    },
    providers: [CredentialsProvider({
        name: "credentials",
        credentials: {},
        async authorize(credentials) {

            try {
                const user = await login(credentials)
                return user;
            } catch (error) {
                throw new Error("Failed Login Attempt")
            }
            return user;
        }
    })],
    callbacks: {
        async jwt({ token, user }) {                    
            if (user) {
                token.name = user.name
                token.email = user.email
                token.id = user._id
                token.picture = user.picture
            }

            return token;
        },
        async session({ session, token }) {
           
            if (token) {
                session.user.name = token.name
                session.user.email = token.email
                session.user.id = token.id
            }            
            return session
        }
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }