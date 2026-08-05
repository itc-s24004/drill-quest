"use client";

import SearchHeader from "./_components/SearchHeader";
import QuizCard from "./_components/QuizCard";

// TODO: バックエンド実装後、ここを fetch/DB クエリの結果に差し替える
const MOCK_QUIZZES = Array.from({ length: 100 }, (_, i) => ({
  id: String(i + 1),
  title: `問題集タイトル ${i + 1}`,
  description: "問題集の説明欄。ここに問題集の詳しい説明が入ります。",
  likeCount: 10,
  starCount: 10,
}));

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <SearchHeader
        onSearch={(q) => console.log("search:", q)}
        onProfileClick={() => console.log("profile clicked")}
      />

      <div className="flex-1 overflow-y-auto px-4 pb-4">
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
    </div>
  );
}