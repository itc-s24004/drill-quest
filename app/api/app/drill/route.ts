import { NextRequest, NextResponse } from "next/server";
import { app_api_map, app_api_map2, app_api_response, app_api_response_error, app_api_response_get } from "../app.api.type";
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
            body: App_DB_Drill_Update_ClientCache | {
                publish: true
            } & Prisma.DrillGetPayload<{select: {id: true}}>;
        };
        res: app_api_response<boolean>
    };
    "delete": {
        req: {
            params: {
                id: number;
            };
            body: undefined;
        };
        res: app_api_response<boolean>
    }
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
        max: 30
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





export async function POST(req: NextRequest) {
    const [ session, body] = await Promise.all([
        getServerSession(),
        req.json() as Promise<app_api_drill2["create"]["req"]["body"]>
    ]);


    const email = session?.user?.email;
    if (!email) return API_ERROR.Unauthorized;


    const userId = await DB_Util.User.getUserId({ email });
    if (!userId) return API_ERROR.Unauthorized;


    const drill = await db.drill.create({
        data: {
            userId,
            categoryId: body.categoryId,

            title: body.title,
            description: body.description
        },
        select: {
            id: true
        }
    }).then(d => d ?? undefined).catch(() => undefined);




    const res: app_api_response<Prisma.DrillGetPayload<{
        select: {
            id: true
        }
    }>> = drill ? {
        success: true,
        data: drill
    } : {
        success: false,
        error: "問題集の作成に失敗しました"
    }

    return NextResponse.json(res);
    
}








export async function PUT(req: NextRequest) {
    const [session, body] = await Promise.all([
        getServerSession(),
        req.json() as Promise<app_api_drill2["update"]["req"]["body"]>
    ]);
    
    const email = session?.user?.email;
    if (!email) return API_ERROR.Unauthorized;

    const publishRequest = "publish" in body;

    if (publishRequest) {
        if (body.publish) {
            const res = await db.drill.update({
                where: {
                    id: body.id,
                    user: {
                        email: {
                            equals: email
                        }
                    },
                    publishedAt: {
                        equals: null
                    }
                },
                data: {
                    publishedAt: new Date()
                },
                select: {
                    id: true
                }
            }).then(d => d ? true : false).catch(() => false);
            return res ?
                NextResponse.json<app_api_drill2["update"]["res"]>({success: true, data: true}) :
                NextResponse.json<app_api_response_error>({success: false, error: "公開処理に失敗しました"})
        }
        return NextResponse.json<app_api_drill2["update"]["res"]>({success: false, error: "非公開にすることはできません"})
    }
    
    
    const { id, title, description, questions, categoryId } = body;
    
    
    
    

    
    
    
    const hasDrill = await db.drill.findUnique({
        where: {
            id,
            user: {
                email: {
                    equals: email
                }
            }
        },
        select: {
            id: true
        }
    }).then(d => d ? true : false).catch(() => false);

    if (!hasDrill) return API_ERROR.Forbidden;
    

    
    
    const update = await db.$transaction(async (tx) => {
        await Promise.all([
            tx.drill.update({
                where: {
                    id
                },
                data: {
                    title,
                    description,
                    categoryId
                },
                select: {
                    id: true
                }
            }),
            ...questions.filter(q => q.body.length > 0).map((question) => (
                tx.question.update({
                    where: {
                        id: question.id,
                        drill: {
                            user: {
                                email: {
                                    equals: email
                                }
                            }
                        }
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
                            },
                            deleteMany: {
                                id: {
                                    in: question.choices.filter(c => c.body.length === 0).map(c => c.id).filter(i => i !== undefined)
                                }
                            }
                        }
                    },
                    select: {
                        id: true
                    }
                })
            )),
            tx.question.deleteMany({
                where: {
                    id: {
                        in: questions.filter(q => q.body.length === 0).map(q => q.id)
                    }
                }
            })
        ]);

        
    }, {timeout: 60000}).then(d => true).catch((e) => {
        console.log(e);
        return false
    });
    
    


    const res: app_api_response<boolean> = update ? {
        success: true,
        data: update
    } : {
        success: false,
        error: "更新処理に失敗しました"
    }


    return NextResponse.json(res);
}







export async function DELETE(req: NextRequest) {
    const session = await getServerSession();
    const email = session?.user?.email;
    
    if (!email) return API_ERROR.Unauthorized;


    const SP = req.nextUrl.searchParams;
    const _drillId = SP.get("id") ?? undefined;
    if (!_drillId) return;



    const drillId = Number.parseInt(_drillId);



    const res = await db.drill.delete({
        where: {
            id: drillId,
            user: {
                email: {
                    equals: email
                }
            }
        },
        select: {
            id: true
        }
    }).then(d => d ?? undefined).catch(() => undefined)



    return NextResponse.json<app_api_drill2["delete"]["res"]>(res ? {success: true, data: true} : {success: false, error: "問題集の削除に失敗しました"})
}