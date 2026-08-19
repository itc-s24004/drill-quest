"use client";

import { useState, type FormEvent } from "react";

import { AppLayout } from "@/app/_components/app/layout/conponent";
import BottomNav from "@/app/_components/BottomNav";
import { App_DB_Drill_Update, App_DB_Drill_Update_ClientCache, App_DB_UserDrill } from "@/app/app.type";
import { StateUpdateListener } from "@/app/_lib/client/update/state";
import { App_API_Client } from "@/app/api/app/client";
import { App_Choice } from "@/app/_components/app/drill/question/choice/choice.cmp";
import { Delete, Trash, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";



const buttonStyle = "rounded-xl px-4 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-slate-300 w-full cursor-pointer"

const inputStyle = "w-full rounded-xl border border-[var(--background-sub)] bg-[var(--background)] px-3 py-2 text-base text-[var(--text-color)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--text-color)]"

const textareaStyle = "w-full resize-none rounded-xl border border-[var(--background-sub)] bg-[var(--background)] px-3 py-2 text-base text-[var(--text-color)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--text-color)] field-sizing-content"



type PageClientProps = {
    drill: App_DB_UserDrill
}

export function PageClient({ drill }: PageClientProps) {
    const router = useRouter();
    
    
    
    const [id, setId] = useState(drill.id);
    const [title, setTitle] = useState(drill.title);
    const [description, setDescription] = useState(drill.description);
    const [questions, setQuestions] = useState<App_DB_Drill_Update_ClientCache["questions"]>(drill.questions);

    const [publishedAt, setPublishedAt] = useState(drill.publishedAt);




    
    
    


    const [canUpdate, setCanUpdate] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    
    const canEdit = !publishedAt && !isSaving;
    console.log(publishedAt)


    StateUpdateListener({value: drill, onUpdate() {
        setId(drill.id);
        setTitle(drill.title);
        setDescription(drill.description);
        setQuestions(drill.questions);
        setPublishedAt(drill.publishedAt);
    }});
    
    
    
    
    async function updateDrill() {
        if (isSaving || !canUpdate) return;
        setIsSaving(true);
        const res = await App_API_Client.drill.updateDrill({
            id,
            title,
            description,
            questions: questions
        });
        if (res?.success) {
            setCanUpdate(false);
            router.refresh()
        }
        setIsSaving(false);
    }



    function saveQuestion(question: App_DB_Drill_Update_ClientCache["questions"][number], update: (question: App_DB_Drill_Update_ClientCache["questions"][number]) => void) {
        setQuestions((c) => {
            const newQuestions = [...c];
            const index = newQuestions.indexOf(question);
            const target = newQuestions[index];
            if (target) update(target);
            return newQuestions;
        })
    }


    async function publishDrill() {
        if (!!publishedAt || canUpdate || isSaving) return;
        setIsSaving(true);
        const res = await App_API_Client.drill.updateDrill({
            id,
            publish: true
        });
        if (res?.success) {
            router.push("/mydrill")
        }
        setIsSaving(false);
    }
    

    return (
        <AppLayout footer={<BottomNav />}>
            <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--text-color)]">
                    問題集名
                </label>
                <input
                    disabled={!canEdit}
                    value={title}
                    onChange={(event) => {
                        setCanUpdate(true);
                        setTitle(event.target.value);
                    }}
                    className={inputStyle}
                    placeholder="例: 基礎問題"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--text-color)]">
                    説明
                </label>
                <textarea
                    disabled={!canEdit}
                    value={description}
                    onChange={(event) => {
                        setCanUpdate(true);
                        setDescription(event.target.value)
                    }}
                    rows={3}
                    className={textareaStyle + " min-h-15"}
                    placeholder="問題集の説明を入力してください"
                />
            </div>



            <div className="space-y-2 py-2">
                <label className="block text-sm font-medium text-[var(--text-color)]">
                    問題一覧
                </label>
                {
                    questions.map((question, i) => (
                        <div key={i} className="space-y-2 rounded-xl border border-[var(--background-sub)] p-3 bg-[var(--background-sub)]">
                            <textarea
                                disabled={!canEdit}
                                value={question.body}
                                onChange={(event) => {
                                    setCanUpdate(true);
                                    saveQuestion(question, (q) => {
                                        q.body = event.target.value
                                    })
                                }}
                                rows={3}
                                className={textareaStyle + " whitespace-nowrap"}
                                placeholder="問題集の説明を入力してください (空にすると保存時に削除されます)"
                            />
                            <div className="flex flex-col gap-1">
                                <label className="block text-sm font-medium text-[var(--text-color)]">
                                    選択肢一覧
                                </label>
                                {
                                    question.choices.map((choice, i) => (
                                        <App_Choice key={i} body={""}
                                            selected={choice.isCorrect}
                                            onClick={() => {
                                                if (!canEdit) return;
                                                setCanUpdate(true);
                                                saveQuestion(question, () => {
                                                    choice.isCorrect = !choice.isCorrect
                                                })
                                            }}
                                        >
                                            <textarea
                                                disabled={!canEdit}
                                                value={choice.body}
                                                onChange={(event) => {
                                                    setCanUpdate(true);
                                                    saveQuestion(question, () => {
                                                        choice.body = event.target.value
                                                    })
                                                }}
                                                onClick={(ev) => ev.stopPropagation()}
                                                rows={1}
                                                className="w-full resize-none rounded-xl bg-[var(--background-sub)] px-3 py-2 text-base text-[var(--text-color)] outline-none transition focus:border-[var(--text-color)]"
                                                placeholder="選択肢を入力してください (空にすると保存時に削除されます)"
                                            />
                                        </App_Choice>
                                    ))
                                }
                                <App_Choice body={"選択肢を追加"} selected={undefined} onClick={async () => {
                                    if (!canEdit) return;
                                    
                                    const nextIndex = question.choices.reduce((max, choice) => {
                                        return choice.sortIndex > max ? choice.sortIndex : max
                                    }, 0) + 1;

                                    setCanUpdate(true);
                                    saveQuestion(question, (q) => {
                                        q.choices.push({
                                            body: "新しい選択肢",
                                            sortIndex: nextIndex,
                                            isCorrect: false,
                                        })
                                    })
                                }} />
                            </div>
                        </div>
                    ))
                }
                <button
                    className={buttonStyle + " bg-sky-600 hover:bg-sky-500"}
                    disabled={isSaving}
                    onClick={async () => {
                        if (!canEdit) return;
                        
                        const nextIndex = questions.reduce((max, q) => (q.sortIndex > max ? q.sortIndex : max), 0) + 1;

                        const res = await App_API_Client.question.createQuestion(id, nextIndex);
                        
                        if (res?.success) {
                            setQuestions((c) => [...c, res.data]);
                            setCanUpdate(true);
                        }
                    }}
                >
                    問題を追加
                </button>
            </div>
            
            

            <div className="flex gap-2">

                <button
                    onClick={updateDrill}
                    type="submit"
                    disabled={!canUpdate || isSaving}
                    className={buttonStyle + " bg-green-600 hover:bg-green-500"}
                >
                    変更を保存
                </button>

                <button
                    onClick={publishDrill}
                    disabled={!!publishedAt || canUpdate || isSaving}
                    className={buttonStyle + " bg-green-600 hover:bg-green-500"}
                >
                    問題集を公開
                </button>
            </div>
        </AppLayout>
    );
}