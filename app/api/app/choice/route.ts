import { Prisma } from "@/app/_lib/server/generated/prisma/client";
import { app_api_map2, app_api_response } from "../app.api.type";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/_lib/server/db/db";
import { getServerSession } from "next-auth";
import { API_ERROR } from "../server";

export type app_api_choice = app_api_map2<{
    "add": {
        req: {
            params: undefined;
            body: {
                drillId: number;
                questionId: number;
                sortIndex: number;
            }
        };
        res: app_api_response<Prisma.QuestionChoiceGetPayload<{select: {id: true; body: true; sortIndex: true; isCorrect: true}}>[]>
    }
}>




export async function POST(req: NextRequest) {
    const [session, body] = await Promise.all([
        getServerSession(),
        req.json() as Promise<app_api_choice["add"]["req"]["body"]>
    ]);


    const email = session?.user?.email;

    if (!email) return API_ERROR.Unauthorized;


    const drill = await db.drill.update({
        where: {
            id: body.drillId,
            user: {
                email: {
                    equals: email
                }
            }
        },
        data: {
            questions: {
                update: {
                    where: {
                        id: body.questionId
                    },
                    data: {
                        choices: {
                            create: {
                                body: "新しい選択肢",
                                sortIndex: body.sortIndex,
                            }
                        }
                    }
                }
            }
        },
        select: {
            questions: {
                where: {
                    id: body.questionId
                },
                select: {
                    choices: {
                        select: {
                            id: true,
                            sortIndex: true,
                            body: true,
                            isCorrect: true
                        },
                        orderBy: {
                            sortIndex: "asc"
                        }
                    }
                }
            }
        },
    }).then(d => d ?? undefined).catch(() => undefined);
    
    
    const choice = drill?.questions[0]?.choices;
    

    const res: app_api_choice["add"]["res"] = choice ? {
        success: true,
        data: choice
    } : {
        success: false,
        error: "選択肢の作成に失敗しました"
    }


    return NextResponse.json(res);
}