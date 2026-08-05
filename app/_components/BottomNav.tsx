"use client";

import { usePathname, useRouter } from "next/navigation";
import { Bookmark, Search, BookOpen, Bell, Home, LucideIcon } from "lucide-react";

type NavKey = "bookmark" | "search" | "home" | "quizzes" | "notify";

type NavItem = {
  key: NavKey;
  label: string;
  icon: LucideIcon;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { key: "bookmark", label: "ブックマーク", icon: Bookmark, href: "/bookmarks" },
  { key: "search", label: "検索", icon: Search, href: "/search" },
  { key: "home", label: "ホーム", icon: Home, href: "/" },
  { key: "quizzes", label: "問題集", icon: BookOpen, href: "/quizzes" },
  { key: "notify", label: "通知", icon: Bell, href: "/notifications" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const activeKey: NavKey =
    NAV_ITEMS.find((item) =>
      item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href)
    )?.key ?? "quizzes";

  return (
    <nav className="mt-auto w-full px-3 pb-3" aria-label="メインナビゲーション">
      <div className="rounded-2xl border border-gray-300 bg-gray-50 px-2 py-2">
        <ul className="flex items-stretch justify-between">
          {NAV_ITEMS.map(({ key, label, icon: Icon, href }) => {
            const isActive = activeKey === key;
            return (
              <li key={key} className="flex-1">
                <button
                  type="button"
                  onClick={() => router.push(href)}
                  aria-current={isActive ? "page" : undefined}
                  className="group flex w-full flex-col items-center gap-0.5 py-1"
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200"
                    style={{
                      backgroundColor: isActive ? "#60a5fa" : "transparent",
                      boxShadow: isActive
                        ? "0 0 0 1.5px rgba(96,165,250,0.35)"
                        : "none",
                    }}
                  >
                    <Icon
                      size={16}
                      strokeWidth={isActive ? 2.2 : 1.6}
                      color={isActive ? "#ffffff" : "#6b7280"}
                    />
                  </span>
                  <span
                    className="text-[10px] leading-tight"
                    style={{
                      color: isActive ? "#3b82f6" : "#6b7280",
                      fontWeight: isActive ? 700 : 400,
                    }}
                  >
                    {label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}