"use client";

import { useState } from "react";
import { Heart, Star } from "lucide-react";

export type QuizCardProps = {
  title: string;
  description: string;
  likeCount: number;
  starCount: number;
  liked?: boolean;
  starred?: boolean;
};

export default function QuizCard({
  title,
  description,
  likeCount,
  starCount,
  liked = false,
  starred = false,
}: QuizCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(liked);
  const [likes, setLikes] = useState(likeCount);
  const [isStarred, setIsStarred] = useState(starred);
  const [stars, setStars] = useState(starCount);

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const toggleStar = () => {
    setIsStarred((prev) => !prev);
    setStars((prev) => (isStarred ? prev - 1 : prev + 1));
  };

  return (
    <div className="rounded-md bg-gray-200 px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-gray-900">{title}</p>
          <div className="mt-0.5 flex items-baseline gap-2">
            <p
              className={`text-xs text-gray-600 ${
                expanded ? "" : "truncate"
              }`}
            >
              {description}
            </p>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="shrink-0 text-xs text-gray-600"
            >
              もっと見る{expanded ? "▲" : "▼"}
            </button>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={toggleLike}
            aria-pressed={isLiked}
            aria-label="いいね"
            className="flex items-center gap-1 text-sm font-bold text-red-500 transition-transform active:scale-90"
          >
            <Heart
              size={16}
              fill={isLiked ? "#ef4444" : "none"}
              stroke="#ef4444"
              strokeWidth={isLiked ? 0 : 2}
              className="transition-all duration-150"
            />
            {likes}
          </button>
          <button
            type="button"
            onClick={toggleStar}
            aria-pressed={isStarred}
            aria-label="ブックマーク"
            className="flex items-center gap-1 text-sm font-bold text-gray-800 transition-transform active:scale-90"
          >
            <Star
              size={16}
              fill={isStarred ? "#374151" : "none"}
              stroke="#374151"
              strokeWidth={isStarred ? 0 : 2}
              className="transition-all duration-150"
            />
            {stars}
          </button>
        </div>
      </div>
    </div>
  );
}