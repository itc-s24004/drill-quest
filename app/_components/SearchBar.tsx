"use client";


type SearchBarProps = {
  keywork: string;
  onChangeKeywork(keywork: string): void;
  onSubmit(): void;
};

export default function SearchBar({ keywork, onSubmit, onChangeKeywork }: SearchBarProps) {

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-2 rounded-full bg-gray-200 px-4 py-2"
    >
      <input
        type="text"
        value={keywork}
        onChange={(ev) => {
          ev.preventDefault()
          onChangeKeywork(ev.target.value)
        }}
        placeholder="検索ワードを入力"
        className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-500 outline-none"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-blue-400 px-4 py-1.5 text-sm font-bold text-white"
      >
        検索
      </button>
    </form>
  );
}