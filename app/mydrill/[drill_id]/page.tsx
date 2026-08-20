import { db } from "@/app/_lib/server/db/db";
import { App_DB_Category, App_DB_UserDrill } from "@/app/app.type";
import { getServerSession } from "next-auth";
import { PageClient } from "./page.client";
import { notFound } from "next/navigation";
import { DB_Util } from "@/app/_lib/server/db/util";


type PageProps = {
    params: Promise<{
        drill_id: string;
    }>
}



export default async function Page({ params }: PageProps) {
    const [{ drill_id }, session] = await Promise.all([
        params,
        getServerSession()
    ])

    
    const drillId = Number.parseInt(drill_id);
    const email = session?.user?.email;

    if (!email) return;


    const [ drill, cate ]: [App_DB_UserDrill | undefined, App_DB_Category[] | undefined] = await Promise.all([
        db.drill.findUnique({
            where: {
                id: drillId,
                user: {
                    email: {
                        equals: email
                    }
                }
            },
            select: {
                id: true,
                title: true,
                description: true,
                category: true,
                publishedAt: true,
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
                questions: {
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
                            },
                            orderBy: {
                                sortIndex: "asc"
                            }
                        }
                    },
                    orderBy: {
                        sortIndex: "asc"
                    }
                }
            }
        }).then(d => d ?? undefined).catch(() => undefined),

        db.category.findMany({
            select: {
                id: true,
                name: true
            }
        }).then(d => d ?? undefined).catch(() => undefined)
    ]);


    if (!drill) return notFound()
    
    return (
        <PageClient drill={drill} categories={cate ?? []}/>
    )

}