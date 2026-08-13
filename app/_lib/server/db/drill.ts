import { App_DB_Drill, App_DB_Drill_ } from "@/app/app.type";
import { db } from "./db";
import { Prisma } from "../generated/prisma/client";

type getDrillList_Query = {
    userId?: number;
    max?: number | undefined;
    start?: Date | undefined;
}

function getDrills({userId}: getDrillList_Query): Promise<App_DB_Drill[] | undefined> {
    return db.drill.findMany({
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
                            name: true,
                        }
                    }
                }
            },
            ...(
                userId ? {
                    bookmark: {
                        where: {
                            userId
                        }
                    }
                } : {

                }
            ),
            _count: {
                select: {
                    bookmark: true
                }
            }
        }
    }).catch(() => undefined)
}




export type getDrill_Query = {
    requestUserEmail?: string | undefined
    
    ownerId?: number | undefined;
    title?: string | undefined;
    categoryId?: number | undefined;
    tagIds?: number[] | undefined;

    bookmarked__only?: boolean | undefined;
    published__only?: boolean | undefined;

    after__drillId?: number | undefined;
    before__drillId?: number | undefined;

    max?: number | undefined;
}

export function getDrills_(query: getDrill_Query): Promise<App_DB_Drill_[] | undefined> {
    return db.drill.findMany({            
        where: {
            AND: [
                {
                    userId: query.ownerId
                },
                {
                    categoryId: query.categoryId
                },
                {
                    title: {
                        contains: query.title
                    }
                },
                ...(query.tagIds?.map((tagId) => (
                    {
                        drillTag: {
                            some: {
                                tagId
                            }
                        }
                    }
                )) ?? []),


                query.bookmarked__only ? (
                    {
                        bookmark: {
                            some: {
                                user: {
                                    email: query.requestUserEmail
                                }
                            }
                        }
                    }
                ) : ({}),


                query.published__only ? (
                    {
                        publishedAt: {
                            not: null
                        }
                    }
                ) : ({}),


                {
                    id: {
                        lt: query.before__drillId
                    }
                },


                {
                    id: {
                        gt: query.after__drillId
                    }
                }
            ]
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
                            name: true,
                        }
                    }
                }
            },
            _count: {
                select: {
                    bookmark: true,
                }
            },
            bookmark: {
                where: {
                    user: {
                        email: query.requestUserEmail
                    }
                }
            }
        },



        orderBy: {
            publishedAt: Prisma.SortOrder.desc
        },

        take: query.max,
    }).catch(() => undefined);
}







export const DB_Drill = {
    getDrills,
    getDrills_
}