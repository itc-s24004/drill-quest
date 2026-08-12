import { NextRequest, NextResponse } from "next/server";
import { app_api_map2, app_api_response, app_api_response_error, app_api_response_get2 } from "../app.api.type";
import { db } from "@/app/_lib/server/db/db";
import { getServerSession } from "next-auth";
import { DB_Util } from "@/app/_lib/server/db/util";
import { API_ERROR } from "../server";
import { Prisma } from "@/app/_lib/server/generated/prisma/client";

export type app_api_answer = app_api_map2<{
    sendAnswer: {
        req: {
            params: undefined;
            body: DrillAnswer;
        };
        res: app_api_response<{
            resultId: number;
        }>;
    };
}>;



type DrillAnswer = {
    drillId: number;
    answers: App_Answer[]
}

export type App_Answer = {
    questionId: number;
    selected: number[];
}






export async function POST(req: NextRequest) {
    const email = (await getServerSession())?.user?.email;


    if (!email) return API_ERROR.Unauthorized;
    
    const reqJson: DrillAnswer = await req.json();

    const { drillId, answers } = reqJson;


    const [userId, drill] = await Promise.all([
        DB_Util.User.getUserId({ email }),
        db.drill.findUnique({
            where: {
                id: drillId
            },
            select: {
                questions: {
                    select: {
                        id: true,
                        choices: {
                            select: {
                                id: true,
                                isCorrect: true
                            }
                        }
                    }
                }
            }
        }).then(d => d ?? undefined).catch(() => undefined)
    ])
    
    
    if (!userId) return API_ERROR.Unauthorized;
    if (!drill) return NextResponse.json<app_api_response_error>({success: false, error: "drill not found"})
    
    const resultQs = drill.questions.map<Prisma.ResultQuestionCreateManyResultInput | undefined>(ques => {
        const resChoices = answers.find(answs => answs.questionId === ques.id);
        if (!resChoices) return undefined;
        
        const isCorrect = ques.choices.every((chic) => chic.isCorrect ? resChoices.selected.includes(chic.id) : !resChoices.selected.includes(chic.id));

        const data: Prisma.ResultQuestionCreateManyResultInput = {
            isCorrect,
            questionId: ques.id
        }

        return data;
    }).filter(d => d !== undefined);
        
        
    const res = await db.result.create({
        data: {
            userId,
            drillId: drillId,
            resultQuestions: {
                createMany: {
                    data: resultQs
                }
            }
        },
        select: {
            id: true
        }
    }).then(data => data ?? undefined).catch(() => undefined);

    if (!res) return NextResponse.json<app_api_response_error>({success: false, error: ""});

    return NextResponse.json<app_api_response_get2<app_api_answer, "sendAnswer">>({
        success: true,
        data: {
            resultId: res.id
        }
    });
}