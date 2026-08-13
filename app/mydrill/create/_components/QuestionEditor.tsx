"use client";

import { Trash2, Plus } from "lucide-react";

export type ChoiceDraft = {
  key: string;
  body: string;
};

export type QuestionDraft = {
  key: string;
  body: string;
  choices: ChoiceDraft[];
  correctChoiceKey: string | null;
};

type QuestionEditorProps = {
  question: QuestionDraft;
  index: number;
  onChange: (question: QuestionDraft) => void;
  onRemove: () => void;
  canRemove: boolean;
};

const MAX_CHOICES = 6;
const MIN_CHOICES = 2;

function makeKey() {
  return Math.random().toString(36).slice(2, 10);
}

export default function QuestionEditor({
  question,
  index,
  onChange,
  onRemove,
  canRemove,
}: QuestionEditorProps) {
  const updateChoiceBody = (choiceKey: string, body: string) => {
    onChange({
      ...question,
      choices: question.choices.map((c) =>
        c.key === choiceKey ? { ...c, body } : c
      ),
    });
  };

  const addChoice = () => {
    if (question.choices.length >= MAX_CHOICES) return;
    onChange({
      ...question,
      choices: [...question.choices, { key: makeKey(), body: "" }],
    });
  };

  const removeChoice = (choiceKey: string) => {
    if (question.choices.length <= MIN_CHOICES) return;
    onChange({
      ...question,
      choices: question.choices.filter((c) => c.key !== choiceKey),
      correctChoiceKey:
        question.correctChoiceKey === choiceKey
          ? null
          : question.correctChoiceKey,
    });
  };

  return (
    <div className="rounded-2xl bg-gray-100 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-bold text-gray-500">
          問題 {index + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label="この問題を削除"
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <textarea
        value={question.body}
        onChange={(e) => onChange({ ...question, body: e.target.value })}
        placeholder="問題文を入力"
        rows={2}
        className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
      />

      <div className="mt-3 space-y-2">
        {question.choices.map((choice, choiceIndex) => (
          <div key={choice.key} className="flex items-center gap-2">
            <input
              type="radio"
              name={`correct-${question.key}`}
              checked={question.correctChoiceKey === choice.key}
              onChange={() =>
                onChange({ ...question, correctChoiceKey: choice.key })
              }
              aria-label={`選択肢${choiceIndex + 1}を正解にする`}
              className="h-4 w-4 shrink-0 accent-blue-600"
            />
            <input
              type="text"
              value={choice.body}
              onChange={(e) => updateChoiceBody(choice.key, e.target.value)}
              placeholder={`選択肢 ${choiceIndex + 1}`}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
            />
            {question.choices.length > MIN_CHOICES && (
              <button
                type="button"
                onClick={() => removeChoice(choice.key)}
                aria-label="この選択肢を削除"
                className="shrink-0 text-gray-400 hover:text-red-500"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}
      </div>

      {question.choices.length < MAX_CHOICES && (
        <button
          type="button"
          onClick={addChoice}
          className="mt-2 flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
        >
          <Plus size={14} />
          選択肢を追加
        </button>
      )}
    </div>
  );
}