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
  },
  {
    id: "2",
    title: "歴史年表クイズ",
    description: "問題集の説明欄。ここに問題集の詳しい説明が入ります。",
    likeCount: 8,
    starCount: 5,
    category: "歴史",
  },
  {
    id: "3",
    title: "数学基礎クイズ",
    description: "問題集の説明欄。ここに問題集の詳しい説明が入ります。",
    likeCount: 12,
    starCount: 7,
    category: "数学",
  },
  {
    id: "4",
    title: "英文法クイズ",
    description: "問題集の説明欄。ここに問題集の詳しい説明が入ります。",
    likeCount: 6,
    starCount: 3,
    category: "英語",
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
      const matchesKeyword = quiz.title
        .toLowerCase()
        .includes(keyword.toLowerCase());
      return matchesCategory && matchesKeyword;
    });
  }, [keyword, category]);

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      <SearchBar onSearch={(q) => setKeyword(q)} />

      <CategoryFilter
        categories={CATEGORIES}
        active={category}
        onChange={setCategory}
      />

      <p className="text-sm text-gray-500">
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
  );
}