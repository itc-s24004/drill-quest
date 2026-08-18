import { getServerSession } from "next-auth";
import { DB_Util } from "../_lib/server/db/util";
import { PageClient } from "./page.client";

export default async function Page() {
    const email = (await getServerSession())?.user?.email;

    if (!email) return;



    const [ drill, ownerId ] = await Promise.all([
        DB_Util.Drill.getDrills_({
            ownerEmail: email
        }),


        DB_Util.User.getUserId({ email })
    ])


    if (!ownerId) return <div></div>

    return (
        <PageClient data={drill ?? []} />
    )
}