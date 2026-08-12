import { NextRequest, NextResponse } from "next/server";
import { app_api_map, app_api_response, app_api_response_get } from "../app.api.type";
import { App_DB_Drill_ } from "@/app/app.type";
import { getServerSession } from "next-auth";
import { DB_Util } from "@/app/_lib/server/db/util";
import { getDrill_Query } from "@/app/_lib/server/db/drill";



export type app_api_drill = app_api_map<{
    // getDrill: {
    //     req: {
    //         id: number;
    //     };
    //     res: app_api_response<App_DB_Drill_>;
    // };
    // getDrills: {
    //     req: {
    //         list: true;
    //         max?: number;
    //         start?: Date | undefined;
    //     };
    //     res: app_api_response<App_DB_Drill_[]>;
    // };
    searchDrills: {
        req: getDrill_Query;
        res: app_api_response<App_DB_Drill_[]>;
    };
}>





export async function GET(req: NextRequest) {
    const session = await getServerSession();


    const SP = req.nextUrl.searchParams;
    const title = SP.get("title") ?? undefined;
    const _categoryId = SP.get("categoryId");
    const tagIds = SP.getAll("tagIds").map(Number.parseInt);
    const _before__drillId = SP.get("before__drillId");
    const _after__drillId = SP.get("after__drillId");
    const _max = SP.get("max");

    const bookmarked__only = SP.has("bookmarked__only", "true");


    const categoryId = _categoryId ? Number(_categoryId) : undefined;
    const after__drillId = _after__drillId ? Number(_after__drillId) : undefined;
    const before__drillId = _before__drillId ? Number(_before__drillId) : undefined;
    const max = _max ? Number(_max) : undefined; 



    const data = await DB_Util.Drill.getDrills_({
        requestUserEmail: session?.user?.email ?? undefined,
        title,
        categoryId,
        tagIds,
        bookmarked__only,
        before__drillId,
        published__only: true,
        max: 5
    })
    
    
    const res: app_api_response_get<app_api_drill, "searchDrills"> =  data ? {
        success: true,
        data
    } : {
        success: false,
        error: ""
    }
    
    return NextResponse.json(res)
}