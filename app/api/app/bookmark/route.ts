import { App_DB_Bookmark } from "@/app/app.type";
import { app_api_map, app_api_request_get, app_api_response, app_api_response_error, app_api_response_get } from "../app.api.type";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/app/_lib/server/db/db";
import { DB_Util } from "@/app/_lib/server/db/util";

export type app_api_bookmark = app_api_map<{
    add: {
        req: {
            drillId: number;
        };
        res: app_api_response<App_DB_Bookmark>
    };
    remove: {
        req: {
            bookmarkId: number;
        };
        res: app_api_response<App_DB_Bookmark>
    }
}>





export async function POST(req: NextRequest) {
    const session = await getServerSession();

    const email = session?.user?.email;
    
    if (!email) return
    
    
    try {
        const reqBody = await req.json() as app_api_request_get<app_api_bookmark, "add" | "remove">;
        if ("drillId" in reqBody && Number.isInteger(reqBody.drillId)) {
            const userId = await DB_Util.User.getUserId({ email });

            if (!userId) return;
            
            
            
            const bookmark = await db.bookmark.create({
                data: {
                    drillId: reqBody.drillId,
                    userId

                },
                select: {
                    id: true
                }
            });


            const res: app_api_response<App_DB_Bookmark> = {
                success: true,
                data: bookmark
            }


            if (bookmark) return NextResponse.json(res)
        }

        
    } catch {
        return NextResponse.json<app_api_response_error>({
            success: false,
            error: ""
        })

    }
}




export async function DELETE(req: NextRequest) {
    const session = await getServerSession();

    const email = session?.user?.email;
    
    if (!email) return





    const SP = req.nextUrl.searchParams
    const _bookmarkId = SP.get("bookmarkId")
    const bookmarkId = Number(_bookmarkId);

    if (Number.isInteger(bookmarkId)) {
        const userId = await DB_Util.User.getUserId({ email });

        if (!userId) return;
        
        
        const bookmark = await db.bookmark.delete({
            where: {
                id: bookmarkId,
                userId
            },
            select: {
                id: true
            }
        });


        const res: app_api_response<App_DB_Bookmark> = {
            success: true,
            data: bookmark
        }
        
        return NextResponse.json<app_api_response<App_DB_Bookmark>>(res)
    }
    
}