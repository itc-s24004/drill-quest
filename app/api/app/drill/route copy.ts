import { NextRequest, NextResponse } from "next/server";
import { app_api_map, app_api_map2, app_api_response, app_api_response_get } from "../app.api.type";
import { App_DB_Drill_, App_DB_Drill_Update, App_DB_Drill_Update_ClientCache } from "@/app/app.type";
import { getServerSession } from "next-auth";
import { DB_Util } from "@/app/_lib/server/db/util";
import { getDrill_Query } from "@/app/_lib/server/db/drill";
import { Prisma } from "@/app/_lib/server/generated/prisma/client";
import { API_ERROR } from "../server";
import { db } from "@/app/_lib/server/db/db";
import { getSession } from "next-auth/react";



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



export type app_api_drill2 = app_api_map2<{
    "create": {
        req: {
            params: undefined;
            body: {
                title: string;
                description: string;
                categoryId: number;
            }
        };
        res: app_api_response<Prisma.DrillGetPayload<{select: {id: true}}>>
    };
    "update": {
        req: {
            params: undefined;
            body: App_DB_Drill_Update_ClientCache;
        };
        res: app_api_response<boolean>
    }
}>







export async function PUT(req: NextRequest) {
    const [session, body] = await Promise.all([
        getServerSession(),
        req.json() as Promise<app_api_drill2["update"]["req"]["body"]>
    ]);
    
    if (!session) return API_ERROR.Unauthorized;

    const { id, title, description, questions } = body;
    
    
    
    

    
    
    
    const update = await db.$transaction([
        db.drill.update({
            where: {
                id
            },
            data: {
                title,
                description
            },
            select: {
                id: true
            }
        }),
        ...questions.map((question) => (
            db.question.update({
                where: {
                    id: question.id
                },
                data: {
                    body: question.body,
                    sortIndex: question.sortIndex,
                    choices: {
                        updateMany: question.choices.filter(c => c.id !== undefined).map((choice) => (
                            {
                                where: {
                                    id: choice.id
                                },
                                data: {
                                    body: choice.body,
                                    isCorrect: choice.isCorrect,
                                    sortIndex: choice.sortIndex
                                }
                            }
                        )),
                        createMany: {
                            data: question.choices.filter(c => c.id === undefined).map((choice) => (
                                {
                                    body: choice.body,
                                    sortIndex: choice.sortIndex,
                                    isCorrect: choice.isCorrect
                                }
                            ))
                        }
                    }
                },
                select: {
                    id: true
                }
            })
        ))
    ]).then(d => d ? true : false).catch(() => false);
    
    


    const res: app_api_response<boolean> = update ? {
        success: true,
        data: update
    } : {
        success: false,
        error: "更新処理に失敗しました"
    }


    return NextResponse.json(res);
}