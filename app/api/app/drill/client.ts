import { api_get } from "../client"
import { app_api_drill } from "./route"

function getDrill(id: number) {
    return api_get<app_api_drill, "getDrill">("/api/app/drill", {
        id
    })
}

function getDrillList() {
    return api_get<app_api_drill, "getDrills">("/api/app/drill", {
        list: true
    })
}



export const App_API_Drill = {
    getDrill,
    getDrillList
}