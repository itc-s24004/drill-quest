"use client"


import { Loader2, Plus } from "lucide-react"
import { App_DB_Drill_ } from "../app.type"
import { useState } from "react"
import { StateUpdateListener } from "../_lib/client/update/state"
import { DrillListView } from "../_components/app/drillListView/component"
import { useRouter } from "next/navigation"
import { App_API_Client } from "../api/app/client"

type PageClientProps = {
    data: App_DB_Drill_[];
}

export function PageClient({ data }: PageClientProps) {

    
    const router = useRouter()
    
    

    const [api_requesting, setApi_Requesting] = useState(false);
    
    // () => router.push("/mydrill/create")
    
    
    
    return (
        <DrillListView data={data} header={
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-bold text-[var(--text-color)]">マイ問題集</h1>
                    <button
                        type="button"
                        disabled={api_requesting}
                        onClick={async () => {
                            setApi_Requesting(true);
                            const res = await App_API_Client.drill.createDrill({
                                title: "新しい問題集",
                                description: "問題集概要",
                                categoryId: 1
                            });
                            if (res?.success) {
                                router.push(`/mydrill/${res.data.id}`)
                            } else {
                                setApi_Requesting(false);
                            }
                        }}
                        className="flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:scale-95 cursor-pointer"
                    >
                        {
                            api_requesting ?
                            <Loader2 size={16} strokeWidth={2.5} className="animate-spin"/> :
                            <Plus size={16} strokeWidth={2.5} />
                        }
                        作成
                    </button>
                </div>
            }
            genLink={(drill) => `/mydrill/${drill.id}`}
        />
    )
}