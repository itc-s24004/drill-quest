import { db } from "@/app/_lib/server/db/db";
import { App_DB_Drill_Answer_Detail, App_DB_Drill_Detail } from "@/app/app.type";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import PageClient from "./page.client";
// import { PageClient } from "./_page.client";

type PageProps = {
    params: Promise<{
        drill_id: string;
    }>
}


export default async function Page({ params }: PageProps) {
    const [ session, { drill_id }] = await Promise.all([
        getServerSession(),
        params
    ])

    
    const email = session?.user?.email ?? undefined;

    const drill: App_DB_Drill_Answer_Detail | undefined = await db.drill.findUnique({
        where: {
            id: Number.parseInt(drill_id)
        },
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
            questions: {
                select: {
                    id: true,
                    body: true,
                    sortIndex: true,
                    choices: {
                        select: {
                            id: true,
                            body: true,
                        }
                    }
                }
            },
            bookmark: {
                where: {
                    user: {
                        email
                    }
                },
                select: {
                    id: true
                }
            },
            _count: {
                select: {
                    bookmark: true
                }
            }
        }
    }).then(d => d ?? undefined).catch(() => undefined);
    
    if (!drill) notFound();
    return <PageClient data={drill} />
    
    
}