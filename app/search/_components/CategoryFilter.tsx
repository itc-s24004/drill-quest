"use client";

import { App_DB_Category } from "@/app/app.type";

type CategoryFilterProps = {
  categories: App_DB_Category[];
  active: number | undefined;
  onChange: (categoryId: number) => void;
};

export default function CategoryFilter({
  categories,
  active,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat, i) => {
        const isActive = cat.id === active;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onChange(cat.id)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              isActive ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}