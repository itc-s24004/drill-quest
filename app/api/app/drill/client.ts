import { app_api_request_get } from "../app.api.type"
import { api_client_req } from "../client"
import { app_api_drill } from "./route"


function searchDrills(query: app_api_request_get<app_api_drill, "searchDrills">) {
    return api_client_req<app_api_drill, "searchDrills">("/api/app/drill", "GET", query)
}



export const App_API_Drill = {
    searchDrills
}