import { DrillView } from "./_components/app/drillView/component";
import { DB_Util } from "./_lib/server/db/util";
import { App_DB_Drill_ } from "./app.type";
import { getSession } from "next-auth/react";


export default async function HomePage() {
    const session = await getSession();
    
    
    const drills: App_DB_Drill_[] = await DB_Util.Drill.getDrills_({
        requestUserEmail: session?.user?.email ?? undefined,
        max: 30
    }) ?? []
    
    return (
        <DrillView data={drills} />
    );
}