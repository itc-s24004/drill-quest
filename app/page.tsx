"use client";

import SearchBar from "./_components/SearchBar";
import QuizCard from "./_components/QuizCard";

// TODO: バックエンド実装後、ここを fetch/DB クエリの結果に差し替える
const MOCK_QUIZZES = [
  {
    id: "1",
    title: "問題集タイトル",
    description: "問題集の説明欄。ここに問題集の詳しい説明が入ります。",
    likeCount: 10,
    starCount: 10,
  },
  {
    id: "2",
    title: "問題集タイトル",
    description: "問題集の説明欄。ここに問題集の詳しい説明が入ります。",
    likeCount: 10,
    starCount: 10,
  },
  {
    id: "3",
    title: "問題集タイトル",
    description: "問題集の説明欄。ここに問題集の詳しい説明が入ります。",
    likeCount: 10,
    starCount: 10,
  },
  {
    id: "4",
    title: "問題集タイトル",
    description: "問題集の説明欄。ここに問題集の詳しい説明が入ります。",
    likeCount: 10,
    starCount: 10,
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      <SearchBar onSearch={(q) => console.log("search:", q)} />

      <div className="flex flex-col gap-3">
        {MOCK_QUIZZES.map((quiz) => (
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