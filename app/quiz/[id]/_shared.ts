export type Question = {
  id: number;
  text: string;
  choices: string[];
  answerIndex: number;
};

// TODO: バックエンド実装後、ここを id を使った fetch/DB クエリの結果に差し替える
export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "問題文がここに入ります。",
    choices: ["選択肢A", "選択肢B", "選択肢C", "選択肢D"],
    answerIndex: 0,
  },
  {
    id: 2,
    text: "問題文がここに入ります。",
    choices: ["選択肢A", "選択肢B", "選択肢C", "選択肢D"],
    answerIndex: 1,
  },
  {
    id: 3,
    text: "問題文がここに入ります。",
    choices: ["選択肢A", "選択肢B", "選択肢C", "選択肢D"],
    answerIndex: 2,
  },
];

export const ACCENT = "#2F6F5E";
export const ACCENT_LIGHT = "#E7F2EE";
export const CORRECT = "#1F9D6B";
export const CORRECT_TINT = "#E3F7EE";
export const CORRECT_BORDER = "#8FDCB8";
export const INCORRECT = "#E4463C";
export const INCORRECT_TINT = "#FDEBEA";
export const INCORRECT_BORDER = "#F3AAA5";
export const BORDER = "#DADCE0";
export const TEXT_SECONDARY = "#5F6368";

// TODO: バックエンド実装後、実際の採点結果(APIレスポンス)に差し替える
// 現時点では結果画面の見た目確認用のダミーデータ
export const DUMMY_RESULT_ANSWERS: Record<number, number> = {
  1: 0, // 正解
  2: 0, // 不正解(正answerIndexは1)
  3: 2, // 正解
};
