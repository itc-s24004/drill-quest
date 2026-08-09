"use client"


import { app_api_request_get } from "@/app/api/app/app.api.type";
import { app_api_drill } from "@/app/api/app/drill/route";
import { App_DB_Category, App_DB_Drill_ } from "@/app/app.type";
import { useState } from "react";
import BottomNav from "../../BottomNav";
import QuizCard from "../../QuizCard";
import { ClientSide } from "../client/component";
import { Header } from "../header/component";
import { AppLayout } from "../layout/conponent";
import { Loader2 } from "lucide-react";
import { App_API_Client } from "@/app/api/app/client";

type DrillViewProps = {
    data: App_DB_Drill_[];
    categories?: App_DB_Category[] | undefined;
    query?: app_api_request_get<app_api_drill, "searchDrills"> | undefined;
}



export function DrillView({data, categories, query}: DrillViewProps) {
    const [oldData, setOldData] = useState(data);
    const [drills, setDrills] = useState<App_DB_Drill_[]>(data);
    
    
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState<number>();

    const [contentEnd, setContentEnd] = useState(false);
    const [apiLoading, setApiLoading] = useState(false);



    if (oldData !== data) {
        setDrills(data);
        setOldData(data);
        setContentEnd(false)
    }


    async function getMore() {
        if (apiLoading || contentEnd) return;
        const lastDrill: App_DB_Drill_ | undefined = drills[drills.length - 1];
        setApiLoading(true);
        const res = await App_API_Client.drill.searchDrills({...query, before__drillId: lastDrill?.id})
        setApiLoading(false);
        if (res?.success) {
            setContentEnd(res.data.length === 0);
            setDrills((currentDrills) => {
                return [...currentDrills, ...res.data]
            })
        }
    }
    
    
    
    return (
        <ClientSide>
            <AppLayout
                header={
                    <Header categories={categories} query={query}/>
                }
                footer={
                    <BottomNav />
                }
                onScrollEnd={getMore}
            >
                {
                    drills.map((quiz) => (
                        <QuizCard
                            data={quiz}
                            key={quiz.id}
                            onUpdate={(newData) => {
                                setDrills((currentDrills) => {
                                    const newDrills = [...currentDrills];
                                    newDrills.splice(newDrills.indexOf(quiz), 1, newData);
                                    return newDrills;
                                })
                            }}
                        />
                    ))
                }
                {
                    contentEnd ?
                    <p className="my-6 text-center text-sm font-medium text-gray-500">ここが最後です</p> :
                    <button className="my-4 w-3/4 mx-auto rounded-full py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={apiLoading}
                        onClick={getMore}
                    >
                        {
                            apiLoading ?
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="animate-spin"/>
                                読み込み中...
                            </span> :
                            "もっと表示"
                        }
                    </button>
                }
            </AppLayout>
        </ClientSide>
    )
}