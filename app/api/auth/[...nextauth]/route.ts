import { DB_Util } from "@/app/_lib/server/db/util";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";



const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) throw new Error();


const handler = NextAuth({
    providers: [
        Google({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        signIn: async (data) => {
            const email = data.profile?.email;
            return email ?
            (
                await DB_Util.User.hasUser({email}) || 
                await DB_Util.User.addUser({
                    email,
                    name: data.profile?.name ?? "unknown name"
                })
            ) : (
                false
            )
        },
        session: async (data) => {
            return data.session;
        }
    }
})

export { handler as GET, handler as POST };