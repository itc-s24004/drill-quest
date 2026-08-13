import { db } from "@/app/_lib/server/db/db";
import { PageClient } from "./page.client";
import { notFound } from "next/navigation";

type PageProps = {
    params: Promise<{
        result_id: string;
    }>
}


export default async function Page({params}: PageProps) {
    const { result_id: _result_id } = await params;
    const result_id = Number(_result_id);


    
    const result = await db.result.findUnique({
        where: {
            id: result_id
        },
        select: {
            createdAt: true,
            drill: {
                select: {
                    title: true,
                    description: true,
                    questions: {
                        select: {
                            body: true,
                            choices: {
                                select: {
                                    body: true,
                                    isCorrect: true
                                },
                                orderBy: {
                                    sortIndex: "asc"
                                }
                            },
                            resultQuestions: {
                                where: {
                                    resultId: result_id
                                },
                                select: {
                                    isCorrect: true
                                }
                            }
                        },
                        orderBy: {
                            sortIndex: "asc"
                        }
                    }
                }
            }
        }
    }).catch(() => undefined)



    if (!result) notFound();
    
    return (
        <PageClient result={result} />
    )


    
}