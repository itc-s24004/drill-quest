import { db } from "./db";

export type getTags_Query = {
    name: string;
    max?: number | undefined;
}

function getTags({ name, max }: getTags_Query) {
    return db.tag.findMany({
        where: {
            name: {
                contains: name
            }
        },
        take: max
    }).then(d => d ?? undefined).catch(() => undefined);
}




export const DB_Tag = {
    getTags
}