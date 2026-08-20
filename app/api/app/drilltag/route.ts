import { NextRequest, NextResponse } from "next/server";
import { app_api_map2, app_api_response } from "../app.api.type";
import { App_DB_DrillTag } from "@/app/app.type";
import { getServerSession } from "next-auth";
import { API_ERROR } from "../server";
import { db } from "@/app/_lib/server/db/db";

export type app_api_drilltag = app_api_map2<{
    add: {
        req: {
            params: undefined;
            body: {
                drillId: number;
                tagName: string;
            }
        };
        res: app_api_response<App_DB_DrillTag>
    };
    remove: {
        req: {
            params: {
                drillId: number;
                drillTagId: number;
            };
            body: undefined;
        };
        res: app_api_response<boolean>
    };
}>




export async function POST(req: NextRequest) {
    const [session, body] = await Promise.all([
        getServerSession(),
        req.json() as Promise<app_api_drilltag["add"]["req"]["body"]>
    ]);

    const email = session?.user?.email;

    if (!email) return API_ERROR.Unauthorized;

    


    const tag = await db.tag.findUnique({
        where: {
            name: body.tagName
        }
    }).then(d => d ?? undefined).catch(() => undefined);


    const tagData = tag ?? await db.tag.create({
        data: {
            name: body.tagName
        }
    }).then(d => d ?? undefined).catch(() => undefined);

    if (!tagData) return;


    const res = await db.drill.update({
        where: {
            id: body.drillId,
            user: {
                email: {
                    equals: email
                }
            }
        },
        data: {
            drillTag: {
                create: {
                    tagId: tagData.id
                }
            }
        },
        select: {
            drillTag: {
                where: {
                    tagId: tagData.id
                },
                select: {
                    id: true,
                    drillId: true,
                    tagId: true,
                    tag: true
                }
            }
        }
    }).then(d => d ? d.drillTag[0] : undefined).catch(() => undefined);
    
    return NextResponse.json<app_api_drilltag["add"]["res"]>(res ? {
        success: true,
        data: res
    } : {
        success: false,
        error: "タグの追加に失敗しました"
    })
}







export async function DELETE(req: NextRequest) {
    const session = await getServerSession();

    const email = session?.user?.email;
    if (!email) return API_ERROR.Unauthorized;



    const SP = req.nextUrl.searchParams;
    const _drillId = SP.get("drillId");
    if (!_drillId) return API_ERROR.BadRequest;
    const drillId = Number.parseInt(_drillId);

    const _drillTagId = SP.get("drillTagId");
    if (!_drillTagId) return API_ERROR.BadRequest;
    const drillTagId = Number.parseInt(_drillTagId);


    const res = await db.drill.update({
        where: {
            id: drillId,
            user: {
                email: {
                    equals: email
                }
            }
        },
        data: {
            drillTag: {
                delete: {
                    id: drillTagId
                }
            }
        },
        select: {
            id: true
        }
    }).then(d => d ? true : false).catch(() => false);


    

    return NextResponse.json<app_api_drilltag["remove"]["res"]>(res ? {
        success: true,
        data: true
    } : {
        success: false,
        error: "タグの削除に失敗しました"
    })
    
    
}