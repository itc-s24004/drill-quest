"use client"

import { App_API_Client } from "@/app/api/app/client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export function GoogleLogin() {
    const { data } = useSession();

    useEffect(() => {
        App_API_Client.drill.getDrillList().then(res => {
            if (res?.success === true) {
                res.data
            } else {
                res?.error
            }
            console.log(res)
        })
    }, [])
    
    return (
        <div>
            <button onClick={() => signIn("google")}>google ログイン</button>
            <code>
                {
                    JSON.stringify(data, null, 4)
                }
            </code>
        </div>
    )
}