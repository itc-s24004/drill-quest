import { NextRequest, NextResponse } from "next/server";
import { app_api_map, app_api_response, app_api_response_get } from "../app.api.type";
import { App_DB_Drill } from "@/app/app.type";
import { db } from "@/app/_lib/server/db/db";

export type app_api_params_get_drill = {
    id: number;
}

export type app_api_response_get_drill = app_api_response<App_DB_Drill[]>



export type app_api_drill = app_api_map<{
    getDrill: {
        req: {
            id: number;
        };
        res: app_api_response<App_DB_Drill>
    };
    getDrills: {
        req: {
            list: true;
            max?: number;
            start?: Date | undefined;
        };
        res: app_api_response<App_DB_Drill[]>
    };
}>



export async function GET(req: NextRequest) {
    
    
    
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