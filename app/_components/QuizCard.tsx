"use client";

import { useState } from "react";
import { App_DB_Bookmark, App_DB_Drill_ } from "../app.type";
import Link from "next/link";
import { AppTag } from "./app/tag/tag.cmp";
import { BookMarkButton } from "./app/bookmark/button/bookmark.button.cmp";

export type QuizCardProps = {
  data: App_DB_Drill_;
  onUpdate: (data: App_DB_Drill_) => void;
  genLink?(data: App_DB_Drill_): string | undefined;
};

export default function QuizCard({
  data,
  onUpdate,
  genLink
}: QuizCardProps) {
  const [expanded, setExpanded] = useState(false);
  // const [isLiked, setIsLiked] = useState(liked);
  // const [likes, setLikes] = useState(likeCount);
  const bookmark: App_DB_Bookmark | undefined = data.bookmark[0];

  // const toggleLike = () => {
  //   setIsLiked((prev) => !prev);
  //   setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  // };


  return (
    <div className="rounded-md px-4 py-3 m-1 bg-[var(--background-sub)]">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <Link href={genLink?.(data) ?? `/drill/${data.id}`}>
            <h3 className="text-sm font-bold p-1 border-b border-b-gray-300 text-[var(--text-color)]">
              {data.title}
            </h3>
          </Link>
          <div className="mt-0.5 flex flex-col items-baseline overflow-hidden">
            <p
              className={`text-[var(--text-color)] ${
                expanded ? "" : "truncate"
              }`}
            >
              {data.description}
            </p>
            <div className="flex gap-2">
              {
                expanded &&
                data.drillTag.map((drillTag, i) => (
                  <AppTag key={i}>
                    {drillTag.tag.name}
                  </AppTag>
                ))
              }
            </div>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="text-xs cursor-pointer text-[var(--text-color-sub)]"
            >
              {expanded ? "閉じる▲" : "もっと見る▼"}
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
          <BookMarkButton useInputValue={true} drillId={data.id} bookmarkCount={data._count.bookmark} bookmarkId={bookmark?.id} onUpdate={(bid) => {
            if (bid !== undefined) {
              onUpdate({
                ...data,
                bookmark: [
                  {
                    id: bid
                  }
                ],
                _count: {
                  bookmark: data._count.bookmark + 1,
                  questions: data._count.questions
                }
              })
            } else {
              onUpdate({
                ...data,
                bookmark: [],
                _count: {
                  bookmark: data._count.bookmark - 1,
                  questions: data._count.questions
                }
              })
            }
          }}/>
        </div>
      </div>
    </div>
  );
}