/*
  Warnings:

  - A unique constraint covering the columns `[categoryId]` on the table `SelectTestCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SelectTestCategory_categoryId_key" ON "SelectTestCategory"("categoryId");
