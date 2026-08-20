"use client";

import { useState, type FormEvent } from "react";

import { AppLayout } from "@/app/_components/app/layout/conponent";
import BottomNav from "@/app/_components/BottomNav";
import { App_DB_Category, App_DB_Drill_Update_ClientCache, App_DB_UserDrill } from "@/app/app.type";
import { StateUpdateListener } from "@/app/_lib/client/update/state";
import { App_API_Client } from "@/app/api/app/client";
import { App_Choice } from "@/app/_components/app/drill/question/choice/choice.cmp";
import { useRouter } from "next/navigation";
import CategoryFilter from "@/app/search/_components/CategoryFilter";
import { AppTag } from "@/app/_components/app/tag/tag.cmp";



const buttonStyle = "rounded-xl px-4 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-slate-300 w-full cursor-pointer"

const inputStyle = "w-full rounded-xl border border-[var(--background-sub)] bg-[var(--background)] px-3 py-2 text-base text-[var(--text-color)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--text-color)] disabled:cursor-not-allowed"

const textareaStyle = "w-full resize-none rounded-xl border border-[var(--background-sub)] bg-[var(--background)] px-3 py-2 text-base text-[var(--text-color)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--text-color)] field-sizing-content disabled:cursor-not-allowed"



type PageClientProps = {
    drill: App_DB_UserDrill;
    categories: App_DB_Category[];
}

export function PageClient({ drill, categories }: PageClientProps) {
    const router = useRouter();
    
    
    // const [currentDrill, setCurrentDrill] = useState<App_DB_Drill_Update_ClientCache>({...drill, categoryId: drill.category.id});
    const [id, setId] = useState(drill.id);
    const [categoryId, setCategoryId] = useState(drill.category.id);
    const [title, setTitle] = useState(drill.title);
    const [description, setDescription] = useState(drill.description);
    const [questions, setQuestions] = useState<App_DB_Drill_Update_ClientCache["questions"]>(drill.questions);

    const [drillTags, setDrillTags] = useState(drill.drillTag);

    const [updateQuestionIds, setUpdateQuestionIds] = useState<number[]>([]);
    function addQuestionId(id: number) {
        setUpdateQuestionIds((c) => [...c.filter(i => i !== id), id])
    }

    const [publishedAt, setPublishedAt] = useState(drill.publishedAt);




    // const [lastJsonString, setLastJsonString] = useState(JSON.stringify(drill))
    
    // const canUpdate = JSON.stringify(currentDrill) !== lastJsonString;


    const [canUpdate, setCanUpdate] = useState(false);
    const [apiRequesting, setApiRequesting] = useState(false);

    
    const canEdit = !publishedAt && !apiRequesting;


    StateUpdateListener({value: drill, onUpdate() {
        // setCurrentDrill(drill)
        setId(drill.id);
        setCategoryId(drill.category.id);
        setTitle(drill.title);
        setDescription(drill.description);
        setQuestions(drill.questions);
        setPublishedAt(drill.publishedAt);
        setDrillTags(drill.drillTag);
        // setLastJsonString(JSON.stringify(drill));
    }});


    function updateDrillState(updateCall: () => void) {

    }
    
    
    
    
    async function updateDrill() {
        if (apiRequesting || !canUpdate) return;
        setApiRequesting(true);
        const res = await App_API_Client.drill.updateDrill({
            id,
            title,
            description,
            questions: questions.filter(q => updateQuestionIds.includes(q.id)),
            categoryId
        });
        console.log(res)
        if (res?.success) {
            setCanUpdate(false);
            setUpdateQuestionIds([]);
            router.refresh()
        }
        setApiRequesting(false);
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
        if (!!publishedAt || canUpdate || apiRequesting) return;
        setApiRequesting(true);
        const res = await App_API_Client.drill.updateDrill({
            id,
            publish: true
        });
        if (res?.success) {
            router.push("/mydrill")
        }
        setApiRequesting(false);
    }


    async function deleteDrill() {
        if (apiRequesting) return;
        setApiRequesting(true);
        const res = await App_API_Client.drill.deleteDrill({id})
        if (res?.success) {
            router.push("/mydrill")
        } else {
            setApiRequesting(false);
        }
    }


    const [inputTagName, setInputTagName] = useState("");
    

    return (
        <AppLayout
            header={
                !!publishedAt &&
                <div className="text-center">
                    <h1 className="text-lg">公開済みの問題集</h1>
                    <p className="text-sm">問題の編集、追加はできません</p>
                </div>
            }
            footer={<BottomNav />}
        >
            <div className="my-2">
                <CategoryFilter
                    categories={categories}
                    active={categoryId}
                    onChange={(categoryId) => {
                        if (!canEdit) return;
                        setCategoryId(categoryId);
                    }}
                />
            </div>

            <div className="my-2">
                <label className="block text-sm font-medium text-[var(--text-color)]">
                    タグ
                </label>
                <form
                    onSubmit={async (ev) => {
                        ev.preventDefault();
                        setInputTagName("");
                        const res = await App_API_Client.drillTag.addDrillTag(id, inputTagName);
                        if (res?.success) {
                            setDrillTags(c => [...c, res.data]);
                            setCanUpdate(true);
                        }
                    }}
                    className="flex-1"
                >
                    <input type="text" className={inputStyle + " flex-1"} value={inputTagName} onChange={(ev) => {
                        setInputTagName(ev.target.value);
                    }}/>
                </form>
                <div>
                    {
                        drillTags.map((tag, i) => (
                            <AppTag key={i} onClick={() => {
                                setDrillTags((tags) => tags.filter(t => t.id !== tag.id))
                            }}>
                                {
                                    tag.tag.name
                                }
                            </AppTag>
                        ))
                    }
                </div>
            </div>

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
                                    addQuestionId(question.id)
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
                                                });
                                                addQuestionId(question.id);
                                            }}
                                        >
                                            <textarea
                                                disabled={!canEdit}
                                                value={choice.body}
                                                onChange={(event) => {
                                                    setCanUpdate(true);
                                                    saveQuestion(question, () => {
                                                        choice.body = event.target.value
                                                    });
                                                    addQuestionId(question.id);
                                                }}
                                                onClick={(ev) => ev.stopPropagation()}
                                                rows={1}
                                                className={textareaStyle +""}
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
                                    addQuestionId(question.id)
                                }} />
                            </div>
                        </div>
                    ))
                }
                <button
                    className={buttonStyle + " bg-sky-600 hover:bg-sky-500"}
                    disabled={!canEdit}
                    onClick={async () => {
                        if (!canEdit) return;
                        
                        const nextIndex = questions.reduce((max, q) => (q.sortIndex > max ? q.sortIndex : max), 0) + 1;

                        const res = await App_API_Client.question.createQuestion(id, nextIndex);
                        
                        if (res?.success) {
                            setQuestions((c) => [...c, res.data]);
                        }
                    }}
                >
                    問題を追加
                </button>
            </div>



            <div>
                <div className="flex gap-2">

                    <button
                        onClick={updateDrill}
                        type="submit"
                        disabled={!canUpdate || apiRequesting}
                        className={buttonStyle + " bg-green-600 hover:bg-green-500"}
                    >
                        変更を保存
                    </button>

                    <button
                        onClick={publishDrill}
                        disabled={!!publishedAt || canUpdate || apiRequesting}
                        className={buttonStyle + " bg-green-600 hover:bg-green-500"}
                    >
                        問題集を公開
                    </button>

                    <button
                        onClick={deleteDrill}
                        disabled={apiRequesting}
                        className={buttonStyle + " bg-red-500"}
                    >
                        問題集を削除
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}