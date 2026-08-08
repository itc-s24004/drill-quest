"use client"

import { useState, useMemo, useEffect } from "react";
import QuizCard from "../_components/QuizCard";
import SearchBar from "../_components/SearchBar";
import CategoryFilter from "./_components/CategoryFilter";
import { App_DB_Category, App_DB_Drill_ } from "../app.type";

type PageClientProps = {
    data: App_DB_Drill_[];
    categories: App_DB_Category[];
    updateQuery?: undefined
}

export function PageClient({ data, categories }: PageClientProps) {
    const [drills, setDrills] = useState<App_DB_Drill_[]>(data);
    
    
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<number>();

//   const filteredQuizzes = useMemo(() => {
//     return data.filter((quiz) => {
//       const matchesCategory =
//         category === "すべて" || quiz.category === category;
//       const matchesKeyword =
//         quiz.title.toLowerCase().includes(keyword.toLowerCase()) ||
//         quiz.tags.some((tag) =>
//           tag.toLowerCase().includes(keyword.toLowerCase())
//         );
//       return matchesCategory && matchesKeyword;
//     });
//   }, [keyword, category]);


    useEffect(() => {

    }, []);




  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* ヘッダー: スクロール領域の外にあるので常に固定 */}
      <div className="flex flex-col gap-3 bg-white px-4 pb-3 pt-4">
        <SearchBar onSearch={(q) => setKeyword(q)} />
        <CategoryFilter
          categories={categories}
          active={category}
          onChange={setCategory}
        />
      </div>

      {/* 一覧: ここだけがスクロールする */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="flex flex-col gap-3">
          {drills.map((quiz) => (
            <QuizCard
              data={quiz}
              key={quiz.id}
              onUpdate={(data) => {
                setDrills(currentDrills => {
                  const newDrill = [...currentDrills];
                  newDrill.splice(newDrill.indexOf(quiz), 1, data)
                  return newDrill;
                })
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}