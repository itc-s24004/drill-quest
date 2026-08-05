import { NextRequest, NextResponse } from "next/server";
import { DB_Util } from "./app/_lib/server/db/util";
import { getServerSession } from "next-auth";
import { app_api_response_error } from "./app/api/app/app.api.type";

export default async function Proxy(req: NextRequest) {
    const pathname = req.nextUrl.pathname;



    if (pathname.startsWith("/api/app")) {
        const session = await getServerSession();
        const email = session?.user?.email ?? undefined;

        
        return email && await DB_Util.User.hasUser({email}) ? NextResponse.next() : NextResponse.json<app_api_response_error>({success: false, error: "認証されていません"}, {status: 401});
    }
    
    
    
    return NextResponse.next();
}