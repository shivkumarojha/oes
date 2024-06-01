/*
  Warnings:

  - You are about to drop the column `paymentAmount` on the `EnrollForTest` table. All the data in the column will be lost.
  - You are about to drop the column `paymentDate` on the `EnrollForTest` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `EnrollForTest` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `EnrollForTest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EnrollForTest" DROP COLUMN "paymentAmount",
DROP COLUMN "paymentDate",
DROP COLUMN "paymentMethod",
DROP COLUMN "paymentStatus";

-- AlterTable
ALTER TABLE "TestName" ADD COLUMN     "scheduledAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "enrolledId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "testId" INTEGER NOT NULL,
    "paymentIntentId" TEXT NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "paymentAmount" INTEGER NOT NULL,
    "paymentDate" TIMESTAMP(3),

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentIntentId_key" ON "Order"("paymentIntentId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_enrolledId_fkey" FOREIGN KEY ("enrolledId") REFERENCES "EnrollForTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_testId_fkey" FOREIGN KEY ("testId") REFERENCES "TestName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
