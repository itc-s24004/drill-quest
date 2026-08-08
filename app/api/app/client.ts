"use client"


import { app_api_map, app_api_response } from "./app.api.type";
import { App_API_Drill } from "./drill/client";
import { HTTP_METHOD } from "next/dist/server/web/http";
import { App_API_Bookmark } from "./bookmark/client";


export async function api_get<api_map extends app_api_map, type extends keyof api_map, raw_response extends api_map[type]["res"] = api_map[type]["res"], response = app_api_response<raw_response> | undefined >(path: string, searchparams: api_map[type]["req"]): Promise<response> {
    const url = new URL(path, window.location.origin);
    const SParams = url.searchParams;

    if (searchparams) Object.entries(searchparams).forEach(([key, value]) => {
        SParams.set(key, String(value))
    });


    const res: response = await fetch(url).then(async res => {
        try {
            return await res.json()

        } catch {
            return;

        }
    }).catch(e => undefined);

    return res;
}




export async function api_post<api_map extends app_api_map, type extends keyof api_map, raw_response extends api_map[type]["res"] = api_map[type]["res"], response = app_api_response<raw_response> | undefined >(path: string, body: api_map[type]["req"]): Promise<response> {
    const url = new URL(path, window.location.origin);

    const res: response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body)
    }).then(async res => {
        try {
            return await res.json();
            
        } catch {
            return;

        }
    }).catch(e => undefined);

    return res;
}



export async function api_client_req<api_map extends app_api_map, type extends keyof api_map, raw_response extends api_map[type]["res"] = api_map[type]["res"] >(path: string, method: HTTP_METHOD, request: api_map[type]["req"]): Promise<raw_response | undefined> {
    const url = new URL(path, window.location.origin);

    switch (method) {
        case "POST":
        case "PUT": {
            return await fetch(url, { method, body: JSON.stringify(request) }).then(async res => {
                try {
                    return await res.json();
                    
                } catch {
                    return;

                }
            }).catch(e => undefined);

        };


        case "GET":
        case "DELETE": {
            const params = url.searchParams;

            if (request) Object.entries(request).forEach(([key, value]) => {
                params.set(key, String(value))
            });
            
            return await fetch(url, { method }).then(async res => {
                try {
                    return await res.json();
                    
                } catch {
                    return;

                }
            }).catch(e => undefined);
        }

        default: {
            return undefined;

        }
    }
}







export const App_API_Client = {
    drill: App_API_Drill,
    bookmark: App_API_Bookmark
}