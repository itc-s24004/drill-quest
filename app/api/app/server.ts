import { NextResponse } from "next/server";
import { app_api_response_error } from "./app.api.type";

export const API_ERROR = {
    BadRequest: NextResponse.json<app_api_response_error>({success: false, error: "リクエストに問題があります"}, {status: 400}),
    Unauthorized: NextResponse.json<app_api_response_error>({success: false, error: "認証されていません"}, {status: 401}),
    Forbidden: NextResponse.json<app_api_response_error>({success: false, error: "アクセス権限がありません"}, {status: 403})
}