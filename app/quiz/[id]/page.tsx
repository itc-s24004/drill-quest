"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../layout.module.css";
import QuizCard from "../../_components/QuizCard";

type Question = {
  id: number;
  text: string;
  choices: string[];
  answerIndex: number;
};

// TODO: バックエンド実装後、ここを id を使った fetch/DB クエリの結果に差し替える
const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "問題文がここに入ります。",
    choices: ["選択肢A", "選択肢B", "選択肢C", "選択肢D"],
    answerIndex: 0,
  },
  {
    id: 2,
    text: "問題文がここに入ります。",
    choices: ["選択肢A", "選択肢B", "選択肢C", "選択肢D"],
    answerIndex: 1,
  },
  {
    id: 3,
    text: "問題文がここに入ります。",
    choices: ["選択肢A", "選択肢B", "選択肢C", "選択肢D"],
    answerIndex: 2,
  },
];

// TODO: バックエンド実装後、ここを id を使った fetch/DB クエリの結果（一覧カードと同じデータ）に差し替える
const QUIZ_SET = {
  title: "問題集タイトル",
  description: "問題集の説明文がここに入ります。",
  likeCount: 12,
  starCount: 5,
  liked: false,
  starred: false,
};

const ACCENT = "#2F6F5E";
const ACCENT_LIGHT = "#E7F2EE";
const BORDER = "#DADCE0";
const TEXT_SECONDARY = "#5F6368";

type QuizPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function QuizPage({ params }: QuizPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [answers, setAnswers] = useState<Record<number, number>>({});

  const allAnswered = QUESTIONS.every((q) => answers[q.id] !== undefined);

  const handleSelect = (questionId: number, choiceIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }));
  };

  const handleGrade = () => {
    if (!allAnswered) return;
    // TODO: バックエンド実装後、ここで answers を採点APIに送信する
    router.push(`/quiz/${id}/result`);
  };

  return (
    <div
      className={styles.contentRoot}
      style={{
        fontFamily:
          "'Hiragino Sans', 'Noto Sans JP', Roboto, Arial, sans-serif",
      }}
    >
      <div style={{ height: 14 }} />

      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 20px",
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 700, color: "#202124" }}>
          学習画面
        </span>
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: ACCENT,
            background: ACCENT_LIGHT,
            borderRadius: 999,
            padding: "4px 12px",
          }}
        >
          全{QUESTIONS.length}問
        </span>
      </div>

      <div style={{ padding: "20px 20px 24px", maxHeight: 620, overflowY: "auto" }}>
        {QUESTIONS.map((q, qi) => (
          <div
            key={q.id}
            style={{
              paddingBottom: 24,
              marginBottom: qi === QUESTIONS.length - 1 ? 0 : 24,
              borderBottom:
                qi === QUESTIONS.length - 1 ? "none" : `1px solid ${BORDER}`,
            }}
          >
            <div
              style={{ fontSize: 11, fontWeight: 700, color: TEXT_SECONDARY, marginBottom: 4 }}
            >
              問題 {qi + 1}
            </div>

            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 0.5,
                color: ACCENT,
                marginBottom: 8,
              }}
            >
              問題文
            </div>
            <div
              style={{
                borderRadius: 12,
                border: "1px solid #F0F0F0",
                background: "#FAFAFA",
                padding: "16px 14px",
                marginBottom: 20,
                fontSize: 14,
                color: "#202124",
              }}
            >
              {q.text}
            </div>

            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 0.5,
                color: ACCENT,
                marginBottom: 8,
              }}
            >
              選択肢
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {q.choices.map((choice, ci) => {
                const isSelected = answers[q.id] === ci;
                return (
                  <button
                    key={ci}
                    onClick={() => handleSelect(q.id, ci)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 14px",
                      borderRadius: 12,
                      border: `1.5px solid ${isSelected ? ACCENT : BORDER}`,
                      background: isSelected ? ACCENT_LIGHT : "#fff",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: isSelected ? ACCENT : ACCENT_LIGHT,
                        color: isSelected ? "#fff" : ACCENT,
                        fontSize: 12,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {String.fromCharCode(65 + ci)}
                    </span>
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: "#202124" }}>
                      {choice}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <button
          onClick={handleGrade}
          disabled={!allAnswered}
          style={{
            width: "100%",
            padding: "13px 0",
            borderRadius: 999,
            border: "none",
            background: allAnswered ? ACCENT : "#E0E0E0",
            color: allAnswered ? "#fff" : TEXT_SECONDARY,
            fontSize: 14,
            fontWeight: 700,
            cursor: allAnswered ? "pointer" : "not-allowed",
          }}
        >
          採点
        </button>
      </div>
    </div>
  );
}