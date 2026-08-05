"use client"


import { ClientSide } from "./_components/app/client/component"
import QuizCard from "./_components/QuizCard"
import SearchBar from "./_components/SearchBar"
import { App_DB_Drill } from "./app.type"

type ClientScreenProps = {
    data: App_DB_Drill[]
}

export function ClientScreen({data}: ClientScreenProps) {
    return (
        <ClientSide>
            <div className="flex flex-col gap-4 px-4 py-4">
                <SearchBar onSearch={() => {}}/>

                <div className="flex flex-col gap-3">
                {data.map((quiz) => (
                    <QuizCard
                        key={quiz.id}
                        title={quiz.title}
                        description={quiz.description}
                        likeCount={0}
                        starCount={0}
                    />
                ))}
                </div>
            </div>
        </ClientSide>
    )
}