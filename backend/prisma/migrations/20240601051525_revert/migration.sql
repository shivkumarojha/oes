/*
  Warnings:

  - A unique constraint covering the columns `[testQuestionId]` on the table `Options` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Options_testQuestionId_key" ON "Options"("testQuestionId");
