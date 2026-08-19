import { app_api_request_get } from "../app.api.type"
import { api_client_req, api_client_req2 } from "../client"
import { app_api_drill, app_api_drill2 } from "./route"


function searchDrills(query: app_api_request_get<app_api_drill, "searchDrills">) {
    return api_client_req<app_api_drill, "searchDrills">("/api/app/drill", "GET", query)
}


function createDrill(drill: app_api_drill2["create"]["req"]["body"]) {
    return api_client_req2<app_api_drill2, "create">("/api/app/drill", "POST", undefined, drill)
}



function updateDrill(drill: app_api_drill2["update"]["req"]["body"]) {
    return api_client_req2<app_api_drill2, "update">("/api/app/drill", "PUT", undefined, drill)
}




export const App_API_Drill = {
    searchDrills,
    createDrill,
    updateDrill
}