import { App_DB_Category, App_DB_Drill_ } from "../app.type";
import { db } from "../_lib/server/db/db";
import { getServerSession } from "next-auth";
import { PageClient } from "./page.client";
import { DB_Util } from "../_lib/server/db/util";




export type App_Drill_Search_Query_Raw = {
    title?: string | string[] | undefined;
    categoryId?: string | string[] | undefined;
    tagIds?: string | string[] | undefined;
    bookmarked_only?: string | undefined;
}


export default async function SearchPage({ searchParams }: {searchParams: Promise<App_Drill_Search_Query_Raw>}) {
    const session = await getServerSession();


    const { title: _title, categoryId: _categoryId, tagIds: _tagIds, bookmarked_only: _bookmarked_only } = await searchParams;

    const title = _title && !Array.isArray(_title) ? _title : undefined;
    const categoryId = _categoryId && !Array.isArray(_categoryId) ? Number(_categoryId) : undefined;
    const tagIds = _tagIds ? Array.isArray(_tagIds) ? _tagIds.map(Number) : [Number(_tagIds)] : undefined;
    const bookMarked__only = _bookmarked_only !== undefined;



    const [data, categories] = await Promise.all<[Promise<App_DB_Drill_[] | undefined>, Promise<App_DB_Category[]>]>([
        DB_Util.Drill.getDrills_({
            requestUserEmail: session?.user?.email ?? undefined,
            title,
            categoryId,
            tagIds,
            bookMarked__only
        }),

        db.category.findMany({
            select: {
                id: true,
                name: true
            }
        })
    ]);

  

    return (
        <PageClient data={data ?? []} categories={categories} />
    )
}