/*
  Warnings:

  - You are about to drop the `settings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "settings" DROP CONSTRAINT "settings_user_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_notification_enabled" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "settings";

-- CreateTable
CREATE TABLE "results" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "drill_id" INTEGER NOT NULL,

    CONSTRAINT "results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultChoice" (
    "id" SERIAL NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "result_id" INTEGER NOT NULL,
    "choice_id" INTEGER NOT NULL,

    CONSTRAINT "ResultChoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_drill_id_fkey" FOREIGN KEY ("drill_id") REFERENCES "drills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultChoice" ADD CONSTRAINT "ResultChoice_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "results"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultChoice" ADD CONSTRAINT "ResultChoice_choice_id_fkey" FOREIGN KEY ("choice_id") REFERENCES "question_choices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
