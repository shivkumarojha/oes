/*
  Warnings:

  - A unique constraint covering the columns `[categoryName]` on the table `TestCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TestCategory_categoryName_key" ON "TestCategory"("categoryName");
