"use client";

import { useState } from "react";
import { Bookmark, Loader, LoaderCircle, Star } from "lucide-react";
import { App_DB_Bookmark, App_DB_Drill_ } from "../app.type";
import { App_API_Client } from "../api/app/client";

export type QuizCardProps = {
  data: App_DB_Drill_;
  onUpdate: (data: App_DB_Drill_) => void;
};

export default function QuizCard({
  data,
  onUpdate
}: QuizCardProps) {
  const [expanded, setExpanded] = useState(false);
  // const [isLiked, setIsLiked] = useState(liked);
  // const [likes, setLikes] = useState(likeCount);
  const bookmark: App_DB_Bookmark | undefined = data.bookmark[0];
  const isBookmarked = bookmark !== undefined;

  // const toggleLike = () => {
  //   setIsLiked((prev) => !prev);
  //   setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  // };

  const [ApiRequesting_Star, setApiRequesting_Star] = useState(false);
  const toggleStar = async () => {
    if (ApiRequesting_Star) return;
    if (isBookmarked) {
      setApiRequesting_Star(true);
      const res = await App_API_Client.bookmark.removeBookmark(bookmark.id);
      setApiRequesting_Star(false);
      
      if (res?.success) onUpdate({
        ...data,
        bookmark: [],
        _count: {
          bookmark: data._count.bookmark - 1
        }
      })

    } else {
      setApiRequesting_Star(true);
      const res = await App_API_Client.bookmark.addBookmark(data.id);
      setApiRequesting_Star(false);
      
      if (res?.success) onUpdate({
        ...data,
        bookmark: [ res.data ],
        _count: {
          bookmark: data._count.bookmark + 1
        }
      })

    }
  };

  return (
    <div className="rounded-md bg-gray-200 px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-gray-900">{data.title}</p>
          <div className="mt-0.5 flex items-baseline gap-2">
            <p
              className={`text-xs text-gray-600 ${
                expanded ? "" : "truncate"
              }`}
            >
              {data.description}
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
          {/* <button
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
          </button> */}
          <button
            type="button"
            onClick={toggleStar}
            aria-pressed={isBookmarked}
            aria-label="ブックマーク"
            className="flex items-center gap-1 text-sm font-bold text-gray-800 transition-transform active:scale-90 cursor-pointer"
          >
            {
              ApiRequesting_Star ? 
              <LoaderCircle
                size={24}
                className="animate-spin"
              /> :
              <Bookmark
                size={24}
                fill={isBookmarked ? "#538ce8" : "none"}
                stroke={isBookmarked ? "#538ce8" : "#374151"}
                strokeWidth={1}
                className="transition-all duration-150"
              />
            }
            {data._count.bookmark}
          </button>
        </div>
      </div>
    </div>
  );
}