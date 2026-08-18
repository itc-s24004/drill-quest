export type app_api_response<response> = {
    success: true;
    data: response

} | app_api_response_error;


export type app_api_response_error = {
    success: false;
    error: string;
}


type app_api_doc_get = {
    req?: Record<string,
            string | string[] |
            number | number[] |
            boolean | boolean[] |
            Date | Date[] |
            undefined | undefined[]
        > | undefined;
    res: app_api_response
}




export type app_api_map<map extends Record<string, app_api_doc_get> = Record<string, app_api_doc_get>> = map;



export type app_api_response_get<api_map extends app_api_map, type extends keyof api_map> = api_map[type]["res"]

export type app_api_request_get<api_map extends app_api_map, type extends keyof api_map> = api_map[type]["req"]





type app_api_req<body> = {
    params: Record<string,
        string | string[] |
        number | number[] |
        boolean | boolean[] |
        Date | Date[] |
        undefined | undefined[]
    > | undefined;
    body: body | undefined;
}


type app_api_doc = {
    req: {
        params: Record<string,
            string | string[] |
            number | number[] |
            boolean | boolean[] |
            Date | Date[] |
            undefined | undefined[]
        > | undefined;
        body: unknown | undefined
    };
    res: app_api_response;
}
export type app_api_map2<map extends Record<string, app_api_doc> = Record<string, app_api_doc>> = map;


export type app_api_response_get2<api_map extends app_api_map2, type extends keyof api_map> = api_map[type]["res"]

export type app_api_request_get2<api_map extends app_api_map2, type extends keyof api_map> = api_map[type]["req"]