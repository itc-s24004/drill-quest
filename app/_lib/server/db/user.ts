import { App_DB_User_Details_Drill_List } from "@/app/app.type";
import { Prisma } from "../generated/prisma/client";
import { db } from "./db";

type getUser_Query = {
    id?: number | undefined;
    email?: string | undefined;
}

/**
 * id email からユーザーを取得
 * @param param0 
 * @returns 
 */
function getUser({id, email}: getUser_Query): Promise<Prisma.UserModel | undefined> {
    return db.user.findUnique({where: {id, email}}).then(d => d ?? undefined).catch(() => undefined);
}


function getUserId({ email }: getUser_Query): Promise<Prisma.UserModel["id"] | undefined> {
    return db.user.findUnique({ where: { email }, select: { id: true }}).then(u => u?.id ?? undefined).catch(() => undefined);
}



function hasUser({id, email}: getUser_Query): Promise<boolean> {
    return db.user.findUnique({
        where: {
            id,
            email
        },
        select:{
            id: true
        }
    }).then(d => d ? true : false).catch(() => false);
}





type addUser_Query = {
    email: string;
    name: string;
}

/**
 * email name からユーザーを作成
 * @param param0 
 * @returns 
 */
function addUser({email, name}: addUser_Query): Promise<boolean> {
    return db.user.create({
        data: {
            email,
            name
        },
        select: {
            id: true
        }
    }).then(d => d ? true : false).catch(() => false)
}



type deleteUser_Query = {
    id: number;
}

function deleteUser({id}: deleteUser_Query): Promise<boolean> {
    return db.user.delete({
        where: {
            id
        }
    }).then(() => true).catch(() => false)
}










type selectUser_Query = {
    id: number;
}

function getUserDetails_Drill_List({ id }: selectUser_Query): Promise<App_DB_User_Details_Drill_List | undefined> {
    return db.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,

            setting: true,

            drills: {
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
                    share: {
                        select: {
                            createdAt: true,
                            group: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            }
        }
    }).then(d => d ?? undefined).catch(() => undefined)
}

















export const DB_User = {
    getUser,
    getUserId,
    hasUser,
    addUser,
    deleteUser,
    getUserDetails_Drill_List
}