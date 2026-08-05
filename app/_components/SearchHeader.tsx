"use client";

import { User } from "lucide-react";
import SearchBar from "./SearchBar";

type SearchHeaderProps = {
  onSearch?: (query: string) => void;
  onProfileClick?: () => void;
};

export default function SearchHeader({ onSearch, onProfileClick }: SearchHeaderProps) {
  return (
    <div className="flex items-center gap-3 bg-white px-4 py-4">
      <button
        type="button"
        onClick={onProfileClick}
        aria-label="プロフィール"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-gray-50"
      >
        <User size={18} color="#6b7280" strokeWidth={1.8} />
      </button>

      <div className="flex-1">
        <SearchBar onSearch={onSearch} />
      </div>
    </div>
  );
}