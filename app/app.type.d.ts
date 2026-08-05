import { Prisma } from "./_lib/server/generated/prisma/client";

export type App_DB_User = Prisma.UserGetPayload<{
    select: {
        id;
        name;
        email;
        createdAt;
        updatedAt;
    }
}>





export type App_DB_User_Details = Prisma.UserGetPayload<{
    select: {
        id;
        name;
        email;
        createdAt;
        updatedAt;

        setting;
    }
}>




/**
 * ドリル一覧ページ用
 */
export type App_DB_User_Details_Drill_List = Prisma.UserGetPayload<{
    select: {
        id;
        name;
        email;
        createdAt;

        setting;

        drills: {
            select: {
                id;
                title;
                description;
                drillTag: {
                    select: {
                        id;
                        tag: {
                            select: {
                                id;
                                name;
                            }
                        }
                    }
                };
                share: {
                    select: {
                        createdAt;
                        group: {
                            select: {
                                id;
                                name;
                            }
                        }
                    }
                }
            }
        }
    }
}>




export type App_DB_Drill = Prisma.DrillGetPayload<{
    select: {
        id;
        title;
        description;
        drillTag: {
            select: {
                id;
                tag: {
                    select: {
                        id;
                        name;
                    }
                }
            }
        };
    }
}>

// type a = Prisma.GroupModel[""]




// export type App_DB_User_