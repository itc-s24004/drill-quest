"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/app/_components/app/layout/conponent";
import { App_DB_Result_Detail } from "@/app/app.type"

type PageClientProps = {
    result: App_DB_Result_Detail;
}

// アクセントカラー(モック準拠)
const ACCENT = "#2F6F5E";
const ACCENT_LIGHT = "#E7F2EE";

export function PageClient({ result }: PageClientProps) {
    const { drill } = result;
    const router = useRouter();
    const [showDetail, setShowDetail] = useState(false);

    const correctCount = drill.questions.reduce((total, value) => {
        const isCorrect = value.resultQuestions[0]?.isCorrect ?? false;
        return isCorrect ? total + 1 : total;
    }, 0);
    const totalCount = drill.questions.length;

    const handleRestart = () => {
        router.push(`/drill/${drill.id}`);
    };

    const handleGoHome = () => {
        router.push("/");
    };

    return (
        <AppLayout>
            {/* トップバー */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-6">
                <span className="text-base font-bold text-gray-900">採点結果</span>
                <span
                    className="text-xs font-bold rounded-full px-3 py-1"
                    style={{ color: ACCENT, background: ACCENT_LIGHT }}
                >
                    全{totalCount}問
                </span>
            </div>

            <div className="rounded-lg p-8">
                {/* スコアサマリー */}
                <div className="text-center py-6">
                    <div
                        className="w-24 h-24 rounded-full flex flex-col items-center justify-center mx-auto mb-5"
                        style={{ background: ACCENT_LIGHT, color: ACCENT }}
                    >
                        <span className="text-2xl font-bold leading-none">{correctCount}</span>
                        <span className="text-xs font-medium text-[var(--background)] mt-1">/ {totalCount}問</span>
                    </div>
                    <p className="text-lg font-bold text-[var(--text-color)] mb-1.5">お疲れさまでした！</p>
                    <p className="text-sm text-[var(--text-color-sub)] mb-6">
                        {drill.title}を{totalCount}問中{correctCount}問正解しました。
                    </p>

                    <button
                        onClick={handleRestart}
                        className="w-full py-3 rounded-full text-white text-sm font-bold cursor-pointer"
                        style={{ background: ACCENT }}
                    >
                        もう一度挑戦する
                    </button>

                    <button
                        onClick={() => setShowDetail((v) => !v)}
                        className="w-full py-3 rounded-full bg-white text-sm font-bold cursor-pointer mt-2.5 border-[1.5px]"
                        style={{ borderColor: ACCENT, color: ACCENT }}
                    >
                        {showDetail ? "採点内容を隠す" : "採点内容を表示"}
                        <span
                            className="inline-block ml-1.5 transition-transform duration-200"
                            style={{ transform: showDetail ? "rotate(180deg)" : "none" }}
                        >
                            ▾
                        </span>
                    </button>

                    <button
                        onClick={handleGoHome}
                        className="w-full py-3 rounded-full bg-transparent text-gray-500 text-sm font-bold cursor-pointer mt-1"
                    >
                        ホーム画面に戻る
                    </button>
                </div>

                {/* 問題ごとの詳細 */}
                {showDetail && (
                    <div className="mt-5 pt-5 border-t border-gray-200 space-y-3">
                        {drill.questions.map((question, i) => {
                            const isCorrect = question.resultQuestions[0]?.isCorrect ?? false;

                            return (
                                <div
                                    key={i}
                                    className="rounded-2xl p-4 border-[1.5px]"
                                    style={
                                        isCorrect
                                            ? { borderColor: "#8FDCB8", background: "#E3F7EE" }
                                            : { borderColor: "#F3AAA5", background: "#FDEBEA" }
                                    }
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-gray-500">
                                            問題 {i + 1}
                                        </span>
                                        <span
                                            className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white"
                                            style={{ color: isCorrect ? "#1F9D6B" : "#E4463C" }}
                                        >
                                            {isCorrect ? "正解" : "不正解"}
                                        </span>
                                    </div>

                                    <div className="text-sm text-gray-900 mb-2.5">{question.body}</div>

                                    <div className="space-y-1.5">
                                        {question.choices.map((choice, ci) => {
                                            const isChoiceCorrect = choice.isCorrect;

                                            return (
                                                <div
                                                    key={ci}
                                                    className={"text-xs " + (isChoiceCorrect ? "font-bold" : "text-gray-500")}
                                                    style={isChoiceCorrect ? { color: "#1F9D6B" } : undefined}
                                                >
                                                    {isChoiceCorrect && "正解： "}
                                                    {choice.body}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </AppLayout>
    )
}