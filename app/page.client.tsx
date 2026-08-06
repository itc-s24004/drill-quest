"use client"


import { ClientSide } from "./_components/app/client/component"
import QuizCard from "./_components/QuizCard"
import SearchHeader from "./_components/SearchHeader"
import { App_DB_Drill } from "./app.type"

type ClientScreenProps = {
    data: App_DB_Drill[]
}

export function ClientScreen({data}: ClientScreenProps) {
    return (
        <ClientSide>
            <div className="flex h-full min-h-0 flex-col">
                 <SearchHeader onSearch={() => {}} onProfileClick={() => {}} />

                 <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
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