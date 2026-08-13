import { App_DB_Tag } from "@/app/app.type";
import { app_api_map2, app_api_response } from "../app.api.type";
import { NextRequest, NextResponse } from "next/server";
import { DB_Util } from "@/app/_lib/server/db/util";

export type app_api_tag = app_api_map2<{
    searchTags: {
        req: {
            params: {
                name: string
            };
            body: undefined;
        };
        res: app_api_response<App_DB_Tag[]>;
    };
}>



export async function GET(req: NextRequest) {
    const SP = req.nextUrl.searchParams;
    const name = SP.get("name");

    if (!name) return;

    const tags = await DB_Util.Tag.getTags({ name, max: 10 });

    if (!tags) return;
    const res: app_api_response<App_DB_Tag[]> = {
        success: true,
        data: tags
    }

    return NextResponse.json(res);
}