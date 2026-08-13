"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { App_DB_Drill_Answer_Detail } from "@/app/app.type";
import { AppLayout } from "@/app/_components/app/layout/conponent";
import { StateUpdateListener } from "@/app/_lib/client/update/state";
import { App_Question } from "@/app/_components/app/drill/question/question.cmp";
import { App_Choice } from "@/app/_components/app/drill/question/choice/choice.cmp";
import { App_Answer } from "@/app/api/app/answer/route";
import { App_API_Client } from "@/app/api/app/client";
import { LoaderCircle } from "lucide-react";
import { DrillView } from "@/app/_components/app/drill/drill.view";
import { BookMarkButton } from "@/app/_components/app/bookmark/button/bookmark.button.cmp";



type PageClientProps = {
  data: App_DB_Drill_Answer_Detail;
}

export function PageClient({ data }: PageClientProps) {
    const router = useRouter()
    
    const [update, setUpdate] = useState(0);
    
    const [drill, setDrill] = useState(data);
    const [answers, setAnswers] = useState<App_Answer[]>(data.questions.map(q => ({questionId: q.id, selected: []})));



    StateUpdateListener({ value: data, onUpdate() {
        setDrill(data);
        setAnswers(data.questions.map(q => ({questionId: q.id, selected: []})));
        setUpdate(c => c+1);
    }});



    const [api_waiting, setApiWaiting] = useState(false);
    
    async function sendAnswer() {
        if (api_waiting) return;
        setApiWaiting(true);
        const result = await App_API_Client.answer.sendAnswer(drill.id, answers)
        setApiWaiting(false);
        if (result?.success) {
            router.push(`/result/${result.data.resultId}`);
            router.refresh();

        } else {
            setUpdate((c) => {
                if (c !== update) return c;
                return c+1;
            });

        }
    }


    const bookmark = data.bookmark[0];
    
    
    return (
        <DrillView title={data.title} description={data.description} header={
            <BookMarkButton useInputValue={false} drillId={data.id} bookmarkCount={data._count.bookmark} bookmarkId={bookmark?.id} />
        }>
            {
                data.questions.map((question, i) => (
                    <App_Question key={i} body={question.body} >
                        {
                            question.choices.map((choice, i) => {
                                const target = answers.find(a => a.questionId === question.id);
                                if (!target) return undefined;

                                const index = target.selected.indexOf(choice.id);
                                const selected = index >= 0;
                                return (
                                    <App_Choice key={i} body={choice.body} selected={selected}
                                        onClick={() => {
                                            setAnswers((current) => {
                                                const newAnswer = [...current];
                                                if (index >= 0) {
                                                    target.selected.splice(index, 1);
                                                } else {
                                                    target.selected.push(choice.id);
                                                }
                                                return newAnswer;
                                            })
                                        }}
                                    />
                                )
                            })
                        }
                    </App_Question>
                ))
            }

            <button
                onClick={sendAnswer}
                className="flex items-center justify-center rounded-full bg-[#2F6F5E] px-0 py-[13px] text-[14px] font-bold text-white cursor-pointer"
            >
                
                {
                    api_waiting ?
                    <LoaderCircle 
                        size={24}
                        className="animate-spin"
                    /> : "採点"
                }
            </button>
        </DrillView>
    );
}