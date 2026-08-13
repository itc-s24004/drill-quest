import { db } from "@/app/_lib/server/db/db";
import { API_ERROR } from "@/app/api/app/server";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { PageClient } from "../../page.client";


type PageProps = {
    params: Promise<{
        share_id: string;
    }>
}


export default async function Page({ params }: PageProps) {
    const [session, { share_id: _share_id }] = await Promise.all([
        getServerSession(),
        params
    ]);

    const email = session?.user?.email;

    if (!email) return notFound();


    const share_id = Number.parseInt(_share_id);
    
    const data = await db.share.findUnique({
        where: {
            id: share_id,
            group: {
                groupUser: {
                    some: {
                        user: {
                            email
                        }
                    }
                }
            }
        },
        select: {
            drill: {
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
            }
        }
    }).then(d => d ?? undefined).catch(() => undefined);



    if (!data) notFound();

    return (
        <PageClient data={data.drill}/>
    );
}