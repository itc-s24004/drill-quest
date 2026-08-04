"use client";

type CategoryFilterProps = {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
};

export default function CategoryFilter({
  categories,
  active,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}