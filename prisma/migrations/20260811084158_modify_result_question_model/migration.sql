/*
  Warnings:

  - You are about to drop the `ResultQuestion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ResultQuestion" DROP CONSTRAINT "ResultQuestion_choice_id_fkey";

-- DropForeignKey
ALTER TABLE "ResultQuestion" DROP CONSTRAINT "ResultQuestion_result_id_fkey";

-- DropTable
DROP TABLE "ResultQuestion";

-- CreateTable
CREATE TABLE "result_questions" (
    "id" SERIAL NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "result_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,

    CONSTRAINT "result_questions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "result_questions_result_id_question_id_key" ON "result_questions"("result_id", "question_id");

-- AddForeignKey
ALTER TABLE "result_questions" ADD CONSTRAINT "result_questions_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "results"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result_questions" ADD CONSTRAINT "result_questions_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
