"use client"


import { useState } from "react"
import { ClientSide } from "./_components/app/client/component"
import QuizCard from "./_components/QuizCard"
import SearchHeader from "./_components/SearchHeader"
import { App_DB_Drill_ } from "./app.type"

type ClientScreenProps = {
    data: App_DB_Drill_[]
}

export function ClientScreen({data}: ClientScreenProps) {
    const [Drills, setDrills] = useState(data)
    
    return (
        <ClientSide>
            <div className="flex h-full min-h-0 flex-col">
                 <SearchHeader onSearch={() => {}} onProfileClick={() => {}} />

                 <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
                {Drills.map((quiz) => (
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
                ))}
                </div>
            </div>
        </ClientSide>
    )
}