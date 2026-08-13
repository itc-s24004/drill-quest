"use client"


import { AppLayout } from "@/app/_components/app/layout/conponent";
import { App_DB_Result_Detail } from "@/app/app.type"

type PageClientProps = {
    result: App_DB_Result_Detail;
}


export function PageClient({ result }: PageClientProps) {
    const { drill } = result;
    


    const correctCount = drill.questions.reduce((total, value) => {
        const isCorrect = value.resultQuestions[0]?.isCorrect ?? false;
        return isCorrect ? total + 1 : total;
    }, 0);
    const totalCount = drill.questions.length;
    
    return (
        <AppLayout>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">結果</h1>
            
            <div className="bg-white rounded-lg p-8 space-y-6">
                <div className="border-b pb-4">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">スコア</h2>
                    <p className="text-4xl font-bold text-blue-600">{correctCount} / {totalCount}</p>
                </div>


                <h2>{drill.title}</h2>
                <p>{drill.description}</p>


                {
                    drill.questions.map((question, i) => {
                        const isCorrect: boolean | undefined = question.resultQuestions[0]?.isCorrect;
                        
                        return <div key={i} className={"" + (isCorrect === undefined ? "" : isCorrect ? "" : "")}>
                            <p>{question.body}</p>

                            {
                                question.choices.map((choice, i) => {
                                    const isCorrect = choice.isCorrect;


                                    return <div key={i}></div>
                                })
                            }
                            
                        </div>
                    })
                }

            </div>
        </AppLayout>
    )
}