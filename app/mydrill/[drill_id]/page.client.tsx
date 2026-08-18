"use client";

import { useState, type FormEvent } from "react";

import { AppLayout } from "@/app/_components/app/layout/conponent";
import BottomNav from "@/app/_components/BottomNav";
import { App_DB_Drill_Update, App_DB_UserDrill } from "@/app/app.type";
import { StateUpdateListener } from "@/app/_lib/client/update/state";
import { App_API_Client } from "@/app/api/app/client";



const buttonStyle = "rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-slate-300"



type PageClientProps = {
    drill: App_DB_UserDrill
}

export function PageClient({ drill }: PageClientProps) {
    
    const [id, setId] = useState(drill.id);
    const [title, setTitle] = useState(drill.title);
    const [description, setDescription] = useState(drill.description);
    const [questions, setQuestions] = useState(drill.questions)


    const [canUpdate, setCanUpdate] = useState(false);
    
    
    
    const [isSaving, setIsSaving] = useState(false);


    StateUpdateListener({value: drill, onUpdate() {
        setId(drill.id);
        setTitle(drill.title);
        setDescription(drill.description);
        setQuestions(drill.questions);
    }});
    
    
    
    
    async function updateDrill() {
        if (isSaving || !canUpdate) return;
        setIsSaving(true);
        const res = await App_API_Client.drill.updateDrill({
            id,
            title,
            description,
            questions
        });
        if (res?.success) {
            setCanUpdate(false);
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
                    disabled={isSaving}
                    value={title}
                    onChange={(event) => {
                        setCanUpdate(true);
                        setTitle(event.target.value);
                    }}
                    className="w-full rounded-xl border border-[var(--background-sub)] bg-[var(--background)] px-3 py-2 text-base text-[var(--text-color)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-sky-500"
                    placeholder="例: 基礎問題"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--text-color)]">
                    説明
                </label>
                <textarea
                    disabled={isSaving}
                    value={description}
                    onChange={(event) => {
                        setCanUpdate(true);
                        setDescription(event.target.value)
                    }}
                    rows={5}
                    className="w-full resize-none rounded-xl border border-[var(--background-sub)] bg-[var(--background)] px-3 py-2 text-base text-[var(--text-color)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-sky-500"
                    placeholder="問題集の説明を入力してください"
                />
            </div>



            <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--text-color)]">
                    問題一覧
                </label>
                {
                    questions.map((question, i) => (
                        <div key={i} className="space-y-2 rounded-xl border border-[var(--background-sub)] p-3 bg-[var(--background-sub)]">
                            <textarea
                                disabled={isSaving}
                                value={question.body}
                                onChange={(event) => {
                                    setCanUpdate(true);
                                    setQuestions((c) => {
                                        const newQuestions = [...c];
                                        const index = newQuestions.indexOf(question);
                                        if (index !== -1) {
                                            newQuestions.splice(index, 1, {...question, body: event.target.value})
                                        }
                                        return newQuestions;
                                    })
                                }}
                                rows={5}
                                className="w-full resize-none rounded-xl border border-[var(--background-sub)] bg-[var(--background)] px-3 py-2 text-base text-[var(--text-color)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-sky-500"
                                placeholder="問題集の説明を入力してください"
                            />
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-color)]">
                                    選択肢一覧
                                </label>
                                {
                                    question.choices.map((choice, i) => (
                                        <div key={i}>
                                            <textarea
                                                disabled={isSaving}
                                                value={choice.body}
                                                onChange={(event) => {
                                                    setCanUpdate(true);
                                                    setQuestions((c) => {
                                                        const newQuestions = [...c];
                                                        const index = newQuestions.indexOf(question);
                                                        const target = newQuestions[index];
                                                        if (target) {
                                                            const newChoices = [...target.choices]
                                                            const choiceIndex = newChoices.indexOf(choice);
                                                            const targetChoice = newChoices[choiceIndex];
                                                            targetChoice.body = event.target.value;
                                                            newQuestions.splice(index, 1, {...question, choices: newChoices});
                                                        }
                                                        return newQuestions;
                                                    })
                                                }}
                                                rows={1}
                                                className="w-full resize-none rounded-xl border border-[var(--background-sub)] bg-[var(--background)] px-3 py-2 text-base text-[var(--text-color)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-sky-500"
                                                placeholder="選択肢を入力してください"
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
                <button className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-slate-300 w-full cursor-pointer">
                    問題を追加
                </button>
            </div>
            
            

            <div className="flex items-center justify-between gap-3 pt-2">
                <button
                    type="button"
                    className="rounded-xl border border-[var(--background-sub)] bg-[var(--background)] px-4 py-2 text-sm font-medium text-[var(--text-color)] transition hover:bg-[var(--background-sub)]"
                >
                    キャンセル
                </button>

                <button
                    type="submit"
                    disabled={isSaving || !title.trim()}
                    className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                {isSaving ? "保存中..." : "変更を保存"}
                </button>
            </div>
        </AppLayout>
    );
}