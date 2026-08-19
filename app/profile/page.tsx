"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

// TODO: バックエンド実装後、ログイン中のユーザー情報の取得結果に差し替える
const INITIAL_PROFILE = {
  displayName: "山田 太郎",
  notificationsEnabled: true,
};

export default function Profile() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState(INITIAL_PROFILE.displayName);
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    INITIAL_PROFILE.notificationsEnabled
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // TODO: バックエンド実装後、ここでプロフィール更新APIに送信する
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    // TODO: バックエンド実装後、ここでログアウト処理（セッション破棄・トークン削除など）を行う
    signOut({callbackUrl: "/"})
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 pb-8 pt-6">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="戻る"
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-700 transition-colors active:bg-gray-100"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">プロフィール設定</h1>
      </div>

      {/* 表示名 */}
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-bold text-gray-500">表示名</span>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="rounded-xl border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-400"
        />
      </label>

      {/* 通知ON/OFF */}
      <div className="flex flex-col rounded-2xl border border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm text-gray-800">通知を受け取る</span>
          <button
            type="button"
            role="switch"
            aria-checked={notificationsEnabled}
            onClick={() => setNotificationsEnabled((prev) => !prev)}
            className="relative h-6 w-11 shrink-0 rounded-full transition-colors"
            style={{ backgroundColor: notificationsEnabled ? "#3b82f6" : "#d1d5db" }}
          >
            <span
              className="absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform"
              style={{
                transform: notificationsEnabled ? "translateX(22px)" : "translateX(2px)",
              }}
            />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSave}
        className="w-full rounded-full bg-blue-500 py-3 text-sm font-bold text-white transition-colors active:bg-blue-600"
      >
        {saved ? "保存しました" : "保存する"}
      </button>

      <button
        type="button"
        onClick={handleLogout}
        className="flex w-full items-center justify-center gap-1.5 py-3 text-sm font-bold text-red-500"
      >
        <LogOut size={16} />
        ログアウト
      </button>
    </div>
  );
}