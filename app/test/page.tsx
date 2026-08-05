// import { signIn } from "next-auth/react"
// import { DB_Util } from "../_lib/server/db/db"

// import { useSession } from "next-auth/react";
// import { GoogleLogin } from "../_components/app/login/component";
import { ClientSide } from "../_components/app/client/component";
import { GoogleLogin } from "../_components/app/login/component";
import { DB_Util } from "../_lib/server/db/util";
// import { Screen } from "./screen";

export default async function Page() {
    // const user = await DB_Util.User.getUser({id: 1});
    
    return (
        <ClientSide>
            <GoogleLogin />
        </ClientSide>
    )
}