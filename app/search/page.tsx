"use client";

import { useMemo, useState } from "react";
import SearchBar from "../_components/SearchBar";
import QuizCard from "../_components/QuizCard";
import CategoryFilter from "./_components/CategoryFilter";

// TODO: バックエンド実装後、ここを fetch/DB クエリの結果に差し替える
const MOCK_QUIZZES = [
  {
    id: "1",
    title: "英単語クイズ",
    description: "問題集の説明欄。ここに問題集の詳しい説明が入ります。",
    likeCount: 10,
    starCount: 10,
    category: "英語",
    tags: ["英語", "単語帳", "初級"], // ← 追加
  },
  {
    id: "2",
    title: "歴史年表クイズ",
    description: "問題集の説明欄。ここに問題集の詳しい説明が入ります。",
    likeCount: 8,
    starCount: 5,
    category: "歴史",
    tags: ["日本史", "年号", "定期テスト対策"], // ← 追加
  },
  {
    id: "3",
    title: "数学基礎クイズ",
    description: "問題集の説明欄。ここに問題集の詳しい説明が入ります。",
    likeCount: 12,
    starCount: 7,
    category: "数学",
    tags: ["計算", "基礎", "数学"], // ← 追加
  },
  {
    id: "4",
    title: "英文法クイズ",
    description: "問題集の説明欄。ここに問題集の詳しい説明が入ります。",
    likeCount: 6,
    starCount: 3,
    category: "英語",
    tags: ["文法", "TOEIC", "中級"], // ← 追加
  },
  {
    id: "5",
    title: "世界史用語クイズ",
    description: "問題集の説明欄。ここに問題集の詳しい説明が入ります。",
    likeCount: 15,
    starCount: 9,
    category: "歴史",
    tags: ["世界史", "用語", "定期テスト対策"],
  },
  {
    id: "6",
    title: "図形の性質クイズ",
    description: "問題集の説明欄。ここに問題集の詳しい説明が入ります。",
    likeCount: 4,
    starCount: 2,
    category: "数学",
    tags: ["図形", "中学数学", "応用"],
  },
  {
    id: "7",
    title: "化学基礎用語クイズ",
    description: "問題集の説明欄。ここに問題集の詳しい説明が入ります。",
    likeCount: 7,
    starCount: 4,
    category: "理科",
    tags: ["化学", "用語", "高校理科"],
  },
  {
    id: "8",
    title: "古文単語クイズ",
    description: "問題集の説明欄。ここに問題集の詳しい説明が入ります。",
    likeCount: 9,
    starCount: 6,
    category: "国語",
    tags: ["古文", "単語帳", "高校国語"],
  },
  {
    id: "9",
    title: "英会話フレーズクイズ",
    description: "問題集の説明欄。ここに問題集の詳しい説明が入ります。",
    likeCount: 20,
    starCount: 11,
    category: "英語",
    tags: ["英会話", "TOEIC", "初級"],
  },
  {
    id: "10",
    title: "生物用語クイズ",
    description: "問題集の説明欄。ここに問題集の詳しい説明が入ります。",
    likeCount: 5,
    starCount: 3,
    category: "理科",
    tags: ["生物", "用語", "高校理科"],
  },
];

const CATEGORIES = ["すべて", ...new Set(MOCK_QUIZZES.map((q) => q.category))];

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("すべて");

  const filteredQuizzes = useMemo(() => {
    return MOCK_QUIZZES.filter((quiz) => {
      const matchesCategory =
        category === "すべて" || quiz.category === category;
      const matchesKeyword =
        quiz.title.toLowerCase().includes(keyword.toLowerCase()) ||
        quiz.tags.some((tag) =>
          tag.toLowerCase().includes(keyword.toLowerCase())
        );
      return matchesCategory && matchesKeyword;
    });
  }, [keyword, category]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* ヘッダー: スクロール領域の外にあるので常に固定 */}
      <div className="flex flex-col gap-3 bg-white px-4 pb-3 pt-4">
        <SearchBar onSearch={(q) => setKeyword(q)} />
        <CategoryFilter
          categories={CATEGORIES}
          active={category}
          onChange={setCategory}
        />
      </div>

      {/* 一覧: ここだけがスクロールする */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <p className="mb-3 text-sm text-gray-500">
          {filteredQuizzes.length}件見つかりました
        </p>
        <div className="flex flex-col gap-3">
          {filteredQuizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              title={quiz.title}
              description={quiz.description}
              likeCount={quiz.likeCount}
              starCount={quiz.starCount}
            />
          ))}
        </div>
      </div>
    </div>
  );
}