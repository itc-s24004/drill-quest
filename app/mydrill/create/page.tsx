"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Plus, LoaderCircle } from "lucide-react";
import { AppLayout } from "../../_components/app/layout/conponent";
import QuestionEditor, {
  QuestionDraft,
} from "./_components/QuestionEditor";
// TODO: 実際のカテゴリ取得方法に差し替える。
// - サーバーコンポーネントで db.category.findMany() する / もしくは
// - App_API_Client にカテゴリ用の関数が生えたらそれを使う
const MOCK_CATEGORIES: { id: number; name: string }[] = [
  { id: 1, name: "プログラミング基礎" },
  { id: 2, name: "アルゴリズム" },
  { id: 3, name: "データ構造" },
];

function makeKey() {
  return Math.random().toString(36).slice(2, 10);
}

function emptyQuestion(): QuestionDraft {
  return {
    key: makeKey(),
    body: "",
    choices: [
      { key: makeKey(), body: "" },
      { key: makeKey(), body: "" },
    ],
    correctChoiceKey: null,
  };
}

export default function CreateQuizPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [questions, setQuestions] = useState<QuestionDraft[]>([
    emptyQuestion(),
  ]);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateQuestion = (key: string, updated: QuestionDraft) => {
    setQuestions((prev) => prev.map((q) => (q.key === key ? updated : q)));
  };

  const addQuestion = () => {
    setQuestions((prev) => [...prev, emptyQuestion()]);
  };

  const removeQuestion = (key: string) => {
    setQuestions((prev) =>
      prev.length > 1 ? prev.filter((q) => q.key !== key) : prev
    );
  };

  const validate = (): string | null => {
    if (!title.trim()) return "タイトルを入力してください。";
    for (const [i, q] of questions.entries()) {
      if (!q.body.trim()) return `問題 ${i + 1} の問題文を入力してください。`;
      if (q.choices.some((c) => !c.body.trim()))
        return `問題 ${i + 1} の選択肢がすべて入力されているか確認してください。`;
      if (!q.correctChoiceKey)
        return `問題 ${i + 1} の正解を選んでください。`;
    }
    return null;
  };

  const handleSave = async () => {
    const validationError = validate();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
    setErrorMessage(null);
    setSaving(true);

    // TODO: App_API_Client.drill にまだ作成用の関数が無いので仮呼び出し。
    // バック側が用意でき次第、実際のエンドポイント/型に合わせる。
    // const res = await App_API_Client.drill.createDrill({
    //   title,
    //   description,
    //   categoryId: categoryId === "" ? undefined : categoryId,
    //   questions: questions.map((q) => ({
    //     body: q.body,
    //     choices: q.choices.map((c) => ({
    //       body: c.body,
    //       isCorrect: c.key === q.correctChoiceKey,
    //     })),
    //   })),
    // });
    const res: { success: boolean } | undefined = await new Promise((r) =>
      setTimeout(() => r({ success: true }), 400)
    );

    setSaving(false);

    if (res?.success) {
      router.push("/quizzes");
    } else {
      setErrorMessage("保存に失敗しました。時間をおいて再度お試しください。");
    }
  };

  return (
    <AppLayout
      header={
        <div className="flex items-center gap-2 bg-white py-3">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="戻る"
            className="text-gray-500 hover:text-gray-700"
          >
            <ChevronLeft size={22} />
          </button>
          <h1 className="text-lg font-bold text-gray-900">問題集を作成</h1>
        </div>
      }
    >
      <div className="space-y-4 pb-8">
        <div>
          <label className="mb-1 block text-xs font-bold text-gray-500">
            タイトル
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="例: アルゴリズム基礎"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold text-gray-500">
            説明
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="この問題集の説明を入力（任意）"
            rows={2}
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold text-gray-500">
            カテゴリ
          </label>
          <select
            value={categoryId}
            onChange={(e) =>
              setCategoryId(e.target.value ? Number(e.target.value) : "")
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
          >
            <option value="">選択しない</option>
            {MOCK_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3 pt-2">
          <h2 className="text-sm font-bold text-gray-700">問題</h2>
          {questions.map((q, i) => (
            <QuestionEditor
              key={q.key}
              question={q}
              index={i}
              onChange={(updated) => updateQuestion(q.key, updated)}
              onRemove={() => removeQuestion(q.key)}
              canRemove={questions.length > 1}
            />
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="flex w-full items-center justify-center gap-1 rounded-lg border border-dashed border-gray-300 py-2 text-sm font-semibold text-gray-500 hover:border-blue-400 hover:text-blue-600"
          >
            <Plus size={16} />
            問題を追加
          </button>
        </div>

        {errorMessage && (
          <p className="text-sm font-medium text-red-500">{errorMessage}</p>
        )}

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? (
            <>
              <LoaderCircle size={16} className="animate-spin" />
              保存中...
            </>
          ) : (
            "下書き保存"
          )}
        </button>
      </div>
    </AppLayout>
  );
}