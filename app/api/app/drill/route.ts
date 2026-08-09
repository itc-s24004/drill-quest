import { NextRequest, NextResponse } from "next/server";
import { app_api_map, app_api_response, app_api_response_get } from "../app.api.type";
import { App_DB_Drill_ } from "@/app/app.type";
import { db } from "@/app/_lib/server/db/db";
import { getServerSession } from "next-auth";
import { DB_Util } from "@/app/_lib/server/db/util";



export type app_api_drill = app_api_map<{
    getDrill: {
        req: {
            id: number;
        };
        res: app_api_response<App_DB_Drill_>;
    };
    getDrills: {
        req: {
            list: true;
            max?: number;
            start?: Date | undefined;
        };
        res: app_api_response<App_DB_Drill_[]>;
    };
    searchDrills: {
        req: {
            title?: string;
            categoryId?: number;
            start?: number;
            tags?: number[];
        };
        res: app_api_response<App_DB_Drill_[]>;
    };
}>





export async function GET(req: NextRequest) {
    const session = await getServerSession();

    
    const data = await db.drill.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            drillTag: {
                select: {
                    id: true,
                    tag: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            },
            bookmark: {
                where: {
                    user: {
                        email: session?.user?.email ?? undefined
                    }
                }
            },
            _count: {
                select: {
                    bookmark: true
                }
            }
        }
    });



    console.log(data)
    
    const res: app_api_response_get<app_api_drill, "getDrills"> = {
        success: true,
        data
    }
    
    return NextResponse.json(res)
}