import { db } from "./_lib/server/db/db";
import { DB_Util } from "./_lib/server/db/util";
import { App_DB_Drill_ } from "./app.type";
import { ClientScreen } from "./page.client";
import { getSession } from "next-auth/react";


export default async function HomePage() {
    const session = await getSession();
    
    
    const drills: App_DB_Drill_[] = await DB_Util.Drill.getDrills_({
        requestUserEmail: session?.user?.email ?? undefined
    }) ?? []
    
    return (
        <ClientScreen data={drills}/>
    );
}