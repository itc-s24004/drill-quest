"use client"


import { useState } from "react"
import { ClientSide } from "./_components/app/client/component"
import QuizCard from "./_components/QuizCard"
import SearchBar from "./_components/SearchBar"
import { App_DB_Drill, App_DB_Drill_ } from "./app.type"

type ClientScreenProps = {
    data: App_DB_Drill_[]
}

export function ClientScreen({data}: ClientScreenProps) {
    const [Drills, setDrills] = useState(data)
    
    return (
        <ClientSide>
            <div className="flex flex-col gap-4 px-4 py-4">
                <SearchBar onSearch={() => {}}/>

                <div className="flex flex-col gap-3">
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