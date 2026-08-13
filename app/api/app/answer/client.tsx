import { api_client_req2 } from "../client";
import { App_Answer, app_api_answer } from "./route";

function sendAnswer(drillId: number, answers: App_Answer[]) {
    return api_client_req2<app_api_answer, "sendAnswer">("/api/app/answer", "POST", undefined, {
        drillId,
        answers
    });
}



export const App_API_Answer = {
    sendAnswer
}