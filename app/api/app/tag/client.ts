import { api_client_req2 } from "../client"
import { app_api_tag } from "./route"

function searchTags(name: string) {
    return api_client_req2<app_api_tag, "searchTags">("/api/app/tag", "GET", {
        name
    }, undefined);
}

export const App_API_Tag = {
    searchTags
}