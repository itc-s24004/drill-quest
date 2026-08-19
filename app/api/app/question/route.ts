import { app_api_map2, app_api_response } from "../app.api.type";
import { App_DB_Drill_Update } from "@/app/app.type";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { API_ERROR } from "../server";
import { db } from "@/app/_lib/server/db/db";

export type app_api_question = app_api_map2<{
    create: {
        req: {
            params: undefined;
            body: {
                drillId: number;
                sortIndex: number;
            };
        };
        res: app_api_response<App_DB_Drill_Update["questions"][number]>
    }
}>




export async function POST(req: NextRequest) {
    const [session, body] = await Promise.all([
        getServerSession(),
        req.json() as Promise<app_api_question["create"]["req"]["body"]>
    ]);


    const email = session?.user?.email;
    if (!email) return API_ERROR.Unauthorized;

    const question = await db.question.create({
        data: {
            drillId: body.drillId,
            body: "新しい問題",
            sortIndex: body.sortIndex
        },
        select: {
            id: true,
            sortIndex: true,
            body: true,
            choices: {
                select: {
                    id: true,
                    sortIndex: true,
                    body: true,
                    isCorrect: true
                }
            }
        }
    }).then(d => d ?? undefined).catch(() => undefined);


    const res: app_api_question["create"]["res"] = question ? {
        success: true,
        data: question
    } : {
        success: false,
        error: "問題の作成に失敗しました"
    }


    return NextResponse.json(res);
}
