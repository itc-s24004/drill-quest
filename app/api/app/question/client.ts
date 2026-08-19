import { api_client_req2 } from "../client";
import { app_api_question } from "./route";

function createQuestion(drillId: number, sortIndex: number) {
    return api_client_req2<app_api_question, "create">("/api/app/question", "POST", undefined, {
        drillId,
        sortIndex
    });
}



export const App_API_Question = {
    createQuestion
}