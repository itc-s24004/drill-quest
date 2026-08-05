"use client"


import { app_api_map, app_api_response } from "./app.api.type";
import { App_API_Drill } from "./drill/client";


export async function api_get<api_map extends app_api_map, type extends keyof api_map, raw_response extends api_map[type]["res"] = api_map[type]["res"], response = app_api_response<raw_response> | undefined >(path: string, searchparams: api_map[type]["req"]): Promise<response> {
    const url = new URL(path, window.location.origin);
    const SParams = url.searchParams;

    if (searchparams) Object.entries(searchparams).forEach(([key, value]) => {
        SParams.set(key, String(value))
    });


    const res: raw_response = await fetch(url).then(async res => {
        try {
            return await res.json()

        } catch {
            return;

        }
    }).catch(e => undefined);

    return res;
}







export const App_API_Client = {
    drill: App_API_Drill
}