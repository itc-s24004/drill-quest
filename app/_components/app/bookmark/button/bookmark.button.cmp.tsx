"use client"


import { App_API_Client } from "@/app/api/app/client";
import { LoaderCircle, Bookmark } from "lucide-react";
import { useState } from "react";

type BookMarkButtonProps = {
    useInputValue: boolean;
    
    drillId: number;
    bookmarkCount: number;
    bookmarkId?: number | undefined;
    onUpdate?(bookmarkId?: number | undefined): void;
}

export function BookMarkButton({ useInputValue, drillId: i_drillId, bookmarkCount: i_bookmarkCount, bookmarkId: i_bookmarkId, onUpdate}: BookMarkButtonProps) {
    const [_drillId, set_DrillId] = useState(i_drillId);
    const [_bookmarkCount, set_BookmarkCount] = useState(i_bookmarkCount);
    const [_bookmarkId, set_BookmarkId] = useState(i_bookmarkId);
    
    const drillId = useInputValue ? i_drillId : _drillId;
    const bookmarkCount = useInputValue ? i_bookmarkCount : _bookmarkCount;
    const bookmarkId = useInputValue ? i_bookmarkId : _bookmarkId;
    const bookmarked = bookmarkId !== undefined;



    const [ApiRequesting_Bookmark, setApiRequesting_Bookmark] = useState(false);
    const toggleBookmark = async () => {
        if (ApiRequesting_Bookmark) return;
        if (bookmarked) {
            setApiRequesting_Bookmark(true);
            const res = await App_API_Client.bookmark.removeBookmark(bookmarkId);
            setApiRequesting_Bookmark(false);
            
            if (res?.success) {
                set_BookmarkCount(c => c-1);
                set_BookmarkId(undefined);
                onUpdate?.()
            }

        } else {
            setApiRequesting_Bookmark(true);
            const res = await App_API_Client.bookmark.addBookmark(drillId);
            setApiRequesting_Bookmark(false);
            
            if (res?.success) {
                set_BookmarkCount(c => c+1);
                set_BookmarkId(res.data.id);
                onUpdate?.(res.data.id)
            }

        }
    };


    return (
        <button
            type="button"
            onClick={toggleBookmark}
            aria-pressed={bookmarked}
            disabled={ApiRequesting_Bookmark}
            aria-label="ブックマーク"
            className="flex items-center gap-1 text-sm font-bold transition-transform active:scale-90 cursor-pointer disabled:cursor-not-allowed text-[var(--text-color)]"
        >
            {
                ApiRequesting_Bookmark ? 
                <LoaderCircle
                    size={24}
                    className="animate-spin"
                /> :
                <Bookmark
                    size={24}
                    fill={bookmarked ? "#538ce8" : "none"}
                    stroke={bookmarked ? "#538ce8" : "var(--text-color-sub)"}
                    strokeWidth={1}
                    className="transition-all duration-150"
                />
            }
            {bookmarkCount}
        </button>
    )
}