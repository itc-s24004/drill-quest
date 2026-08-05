import SearchHeader from "./_components/SearchHeader";
import QuizCard from "./_components/QuizCard";
import { ClientSide } from "./_components/app/client/component";
import { db } from "./_lib/server/db/db";
import { ClientScreen } from "./page.client";
import { App_DB_Drill } from "./app.type";


export default async function HomePage() {
    const drills: App_DB_Drill[] = await db.drill.findMany({
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
    

    return (
        <ClientScreen data={drills}/>
    );
}