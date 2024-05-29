/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userName]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Admin_userName_key" ON "Admin"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userName_key" ON "Student"("userName");
