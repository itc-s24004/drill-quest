/*
  Warnings:

  - You are about to drop the `ResultChoice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ResultChoice" DROP CONSTRAINT "ResultChoice_choice_id_fkey";

-- DropForeignKey
ALTER TABLE "ResultChoice" DROP CONSTRAINT "ResultChoice_result_id_fkey";

-- DropTable
DROP TABLE "ResultChoice";

-- CreateTable
CREATE TABLE "ResultQuestion" (
    "id" SERIAL NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "result_id" INTEGER NOT NULL,
    "choice_id" INTEGER NOT NULL,

    CONSTRAINT "ResultQuestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResultQuestion" ADD CONSTRAINT "ResultQuestion_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "results"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultQuestion" ADD CONSTRAINT "ResultQuestion_choice_id_fkey" FOREIGN KEY ("choice_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
