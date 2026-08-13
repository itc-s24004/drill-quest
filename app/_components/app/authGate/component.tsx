'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoginModal from '../loginModal/component';

interface AuthGateProps {
  children: React.ReactNode;
}

/**
 * ログインが必要なページをこれで囲むと、未ログイン時に
 * /login へ飛ばす代わりに、元の画面(ぼかし表示)の上に
 * ログインモーダルを重ねて表示する。
 *
 * server component のページ(例: app/quizzes/page.tsx)からも
 * children として渡せる。
 *
 * 使い方:
 *   // app/quizzes/page.tsx
 *   export default async function QuizzesPage() {
 *     const quizzes = await getQuizzes();
 *     return (
 *       <AuthGate>
 *         <QuizzesContent quizzes={quizzes} />
 *       </AuthGate>
 *     );
 *   }
 */
export default function AuthGate({ children }: AuthGateProps) {
  const { status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center text-sm text-slate-400">
        読み込み中...
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="relative min-h-screen">
        {/* 背後のページはぼかして触れないようにする */}
        <div aria-hidden className="pointer-events-none select-none blur-sm">
          {children}
        </div>
        <LoginModal onCancel={() => router.push('/')} />
      </div>
    );
  }

  return <>{children}</>;
}