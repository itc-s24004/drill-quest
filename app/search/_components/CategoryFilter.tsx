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
    <div className="flex flex-nowrap gap-2 overflow-x-auto">
      {categories.map((cat, i) => {
        const isActive = cat.id === active;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onChange(cat.id)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              isActive ? "bg-blue-400 text-white" : "bg-[var(--background-sub)] text-[var(--text-color)]"
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}