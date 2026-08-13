"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../layout.module.css";

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

// TODO: バックエンド実装後、実際に回答した内容（採点APIのレスポンスなど）に差し替える
const DUMMY_RESULT_ANSWERS: Record<number, number> = {
  1: 0,
  2: 0,
  3: 2,
};

const ACCENT = "#2F6F5E";
const ACCENT_LIGHT = "#E7F2EE";
const CORRECT = "#1F9D6B";
const CORRECT_TINT = "#E3F7EE";
const CORRECT_BORDER = "#8FDCB8";
const INCORRECT = "#E4463C";
const INCORRECT_TINT = "#FDEBEA";
const INCORRECT_BORDER = "#F3AAA5";
const BORDER = "#DADCE0";
const TEXT_SECONDARY = "#5F6368";

type ResultPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function ResultPage({ params }: ResultPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [showDetail, setShowDetail] = useState(false);

  // TODO: バックエンド実装後、id をもとに取得した採点結果に差し替える
  const answers = DUMMY_RESULT_ANSWERS;
  const score = QUESTIONS.filter((q) => answers[q.id] === q.answerIndex).length;

  const handleRestart = () => {
    router.push(`/quiz/${id}`);
  };

  const handleGoHome = () => {
    router.push("/");
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
          採点結果
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

      {/* TODO: id をもとに取得した問題集タイトルをここに表示する */}
      {/* 例: <p style={{ fontSize: 12, color: TEXT_SECONDARY, padding: "8px 20px 0" }}>問題集タイトル</p> */}

      <div style={{ padding: "20px 20px 24px", maxHeight: 620, overflowY: "auto" }}>
        {/* Result summary */}
        <div style={{ textAlign: "center", padding: "24px 8px 8px" }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              background: ACCENT_LIGHT,
              color: ACCENT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              margin: "0 auto 18px",
            }}
          >
            <span style={{ fontSize: 26, fontWeight: 700, lineHeight: 1 }}>{score}</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: TEXT_SECONDARY, marginTop: 2 }}>
              / {QUESTIONS.length}問
            </span>
          </div>
          <p style={{ fontSize: 17, fontWeight: 700, color: "#202124", margin: "0 0 6px" }}>
            お疲れさまでした！
          </p>
          <p style={{ fontSize: 13, color: TEXT_SECONDARY, margin: "0 0 24px" }}>
            {QUESTIONS.length}問中{score}問正解しました。
          </p>

          <button
            onClick={handleRestart}
            style={{
              width: "100%",
              padding: "13px 0",
              borderRadius: 999,
              border: "none",
              background: ACCENT,
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            もう一度挑戦する
          </button>

          <button
            onClick={() => setShowDetail((v) => !v)}
            style={{
              width: "100%",
              padding: "13px 0",
              borderRadius: 999,
              border: `1.5px solid ${ACCENT}`,
              background: "#fff",
              color: ACCENT,
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              marginTop: 10,
            }}
          >
            {showDetail ? "採点内容を隠す" : "採点内容を表示"}
            <span
              style={{
                display: "inline-block",
                marginLeft: 6,
                transform: showDetail ? "rotate(180deg)" : "none",
                transition: "transform 0.2s ease",
              }}
            >
              ▾
            </span>
          </button>

          <button
            onClick={handleGoHome}
            style={{
              width: "100%",
              padding: "13px 0",
              borderRadius: 999,
              border: "none",
              background: "transparent",
              color: TEXT_SECONDARY,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              marginTop: 4,
            }}
          >
            ホーム画面に戻る
          </button>
        </div>

        {/* Detail list */}
        {showDetail && (
          <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${BORDER}` }}>
            {QUESTIONS.map((q, qi) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.answerIndex;
              return (
                <div
                  key={q.id}
                  style={{
                    borderRadius: 14,
                    border: `1.5px solid ${isCorrect ? CORRECT_BORDER : INCORRECT_BORDER}`,
                    background: isCorrect ? CORRECT_TINT : INCORRECT_TINT,
                    padding: "14px 14px",
                    marginBottom: qi === QUESTIONS.length - 1 ? 0 : 12,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ fontSize: 12, fontWeight: 700, color: TEXT_SECONDARY }}>
                      問題 {qi + 1}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        padding: "2px 10px",
                        borderRadius: 999,
                        background: "#fff",
                        color: isCorrect ? CORRECT : INCORRECT,
                      }}
                    >
                      {isCorrect ? "正解" : "不正解"}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: "#202124", marginBottom: 10 }}>
                    {q.text}
                  </div>
                  <div style={{ fontSize: 12, color: TEXT_SECONDARY, marginBottom: 4 }}>
                    あなたの回答：{q.choices[userAnswer]}
                  </div>
                  {!isCorrect && (
                    <div style={{ fontSize: 12, color: TEXT_SECONDARY }}>
                      正しい答え：{q.choices[q.answerIndex]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}