'use client';

import { signIn } from 'next-auth/react';

interface LoginModalProps {
  /** キャンセル時の挙動(例: トップページへ戻す)。省略時はキャンセルボタンを表示しない */
  onCancel?: () => void;
  /** ログイン成功後に戻ってきたいURL。省略時は現在のURL */
  callbackUrl?: string;
}

export default function LoginModal({ onCancel, callbackUrl }: LoginModalProps) {
  const handleGoogleLogin = () => {
    signIn('google', {
      callbackUrl: callbackUrl ?? window.location.href,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      {/* 背景の暗幕 */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

      {/* カード本体 */}
      <div className="relative w-full max-w-sm rounded-2xl bg-white pt-14 pb-8 px-8 text-center shadow-2xl">
        {/* 丸いアイコン */}
        <div className="absolute -top-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-blue-600 shadow-lg">
          <LockIcon className="h-7 w-7 text-white" />
        </div>

        <h2 id="login-modal-title" className="text-xl font-bold text-slate-900">
          ログインが必要です
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          問題集一覧を見るには、Googleアカウントでログインしてください。
        </p>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-[0.99]"
        >
          <GoogleIcon className="h-5 w-5" />
          Googleでログイン
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="mt-4 text-sm text-slate-400 underline underline-offset-2 transition hover:text-slate-600"
          >
            トップページに戻る
          </button>
        )}
      </div>
    </div>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.11A11.99 11.99 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28V6.61H1.26A11.99 11.99 0 0 0 0 12c0 1.94.46 3.77 1.26 5.39l4.01-3.11z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.26 6.61l4.01 3.11C6.22 6.88 8.87 4.77 12 4.77z"
      />
    </svg>
  );
}