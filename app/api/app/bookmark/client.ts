import { Prisma } from "@/app/_lib/server/generated/prisma/client";
import { api_client_req, api_post } from "../client";
import { app_api_bookmark } from "./route";




function addBookmark(drillId: Prisma.DrillModel["id"]) {
    return api_client_req<app_api_bookmark, "add">("/api/app/bookmark", "POST", { drillId })
}


function removeBookmark(bookmarkId: Prisma.DrillModel["id"]) {
    return api_client_req<app_api_bookmark, "remove">("/api/app/bookmark", "DELETE", { bookmarkId })
}


export const App_API_Bookmark = {
    addBookmark,
    removeBookmark
}