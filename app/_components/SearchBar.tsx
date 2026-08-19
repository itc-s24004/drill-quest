"use client";

import { App_ChildrenProp, App_DB_Tag } from "../app.type";
import { AppTag } from "./app/tag/tag.cmp";


type SearchBarProps = {
  keywork: string;
  onChangeKeywork(keywork: string): void;
  onSubmit(): void;
  tags: App_DB_Tag[];
  onClickTag(tag: App_DB_Tag): void;
} & App_ChildrenProp;

export default function SearchBar({ keywork, onSubmit, tags, onClickTag, onChangeKeywork, children }: SearchBarProps) {

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        onSubmit()
      }}
      className="flex items-center gap-2 rounded-full bg-[var(--background-sub)] px-4 py-2"
    >
      <input
        type="text"
        value={keywork}
        onChange={(ev) => {
          ev.preventDefault()
          onChangeKeywork(ev.target.value)
        }}
        placeholder="検索ワードを入力"
        className="flex-1 bg-transparent text-sm text-[var(--text-color)] placeholder:text-[var(--text-color-sub)] outline-none"
      />
      {
        tags.map((tag, i) => (
            <AppTag key={i} onClick={() => onClickTag(tag)}>
              {
                tag.name
              }
            </AppTag>
        ))
      }
      <button
        type="submit"
        className="shrink-0 rounded-full bg-blue-400 px-4 py-1.5 text-sm font-bold text-white"
      >
        検索
      </button>
    </form>
  );
}