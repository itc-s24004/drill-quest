import { App_DB_Drill } from "@/app/app.type";
import { db } from "./db";

type getDrillList_Query = {
    max?: number | undefined;
    start?: Date | undefined;
}

function getDrills({}: getDrillList_Query): Promise<App_DB_Drill[] | undefined> {
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
            }
        }
    })
}








export const DB_Drill = {
    getDrills
}