"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Plus } from "lucide-react";
import { AppLayout } from "../_components/app/layout/conponent";
import AuthGate from "../_components/app/authGate/component";
import BottomNav from "../_components/BottomNav";
import QuizCard from "../_components/QuizCard";
import { App_DB_Drill_ } from "../app.type";
import { App_API_Client } from "../api/app/client";
import { useSession } from "next-auth/react";

export default function QuizzesPage() {
  const router = useRouter();
  const [drills, setDrills] = useState<App_DB_Drill_[] | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoadError(false);
      // TODO: owner__only は getDrill_Query にまだ無いパラメータ。
      // バック側で追加してもらい次第 { owner__only: true } に戻す。
      // それまではこの画面は「自分の問題集」ではなく全員の公開問題集を表示している。
      const res = await App_API_Client.drill.searchDrills({});
      if (cancelled) return;

      if (res?.success) {
        setDrills(res.data);
      } else {
        setLoadError(true);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleUpdate = (updated: App_DB_Drill_) => {
    setDrills((prev) =>
      prev ? prev.map((d) => (d.id === updated.id ? updated : d)) : prev
    );
  };

  return (
    <AuthGate>
      <AppLayout
        header={
          <div className="flex items-center justify-between bg-white py-3">
            <h1 className="text-lg font-bold text-gray-900">マイ問題集</h1>
            <button
              type="button"
              onClick={() => router.push("/quizzes/create")}
              className="flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:scale-95"
            >
              <Plus size={16} strokeWidth={2.5} />
              作成
            </button>
          </div>
        }
        footer={<BottomNav />}
      >
        {loadError && (
          <p className="my-10 text-center text-sm text-gray-500">
            問題集を読み込めませんでした。時間をおいて再度お試しください。
          </p>
        )}

        {!loadError && drills === null && (
          <div className="my-10 flex items-center justify-center">
            <LoaderCircle size={28} className="animate-spin text-gray-400" />
          </div>
        )}

        {!loadError && drills !== null && drills.length === 0 && (
          <p className="my-10 text-center text-sm text-gray-500">
            まだ問題集がありません。
          </p>
        )}

        {!loadError &&
          drills !== null &&
          drills.map((drill) => (
            <QuizCard key={drill.id} data={drill} onUpdate={handleUpdate} />
          ))}
      </AppLayout>
    </AuthGate>
  );
}