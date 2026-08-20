import { api_client_req2 } from "../client";
import { app_api_drilltag } from "./route";

function addDrillTag(drillId: number, tagName: string) {
    return api_client_req2<app_api_drilltag, "add">("/api/app/drilltag", "POST", undefined, {drillId, tagName});
}


function removeDrillTag(drillId: number, drillTagId: number) {
    return api_client_req2<app_api_drilltag, "remove">("/api/app/drilltag", "DELETE", {drillId, drillTagId}, undefined)
}



export const App_API_DrillTag = {
    addDrillTag,
    removeDrillTag
}