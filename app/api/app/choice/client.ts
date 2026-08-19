import { api_client_req2 } from "../client"
import { app_api_choice } from "./route"

function createChoice(choice: app_api_choice["add"]["req"]["body"]) {
    return api_client_req2<app_api_choice, "add">("/api/app/choice", "POST", undefined, choice)
}


export const App_API_QuestionChoice = {
    createChoice
}