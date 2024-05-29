-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SUPER');

-- CreateEnum
CREATE TYPE "TestType" AS ENUM ('FREE', 'PAID', 'ONE_TIME_ONLY');

-- CreateEnum
CREATE TYPE "Answer" AS ENUM ('A', 'B', 'C', 'D');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'NET_BANKING', 'PAYPAL', 'UPI', 'WALLET', 'OTHER');

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(200) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "userName" VARCHAR(50) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "profilePic" TEXT,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestCategory" (
    "id" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "TestCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestName" (
    "id" SERIAL NOT NULL,
    "testName" TEXT NOT NULL,
    "testPrice" INTEGER NOT NULL,
    "testTime" INTEGER NOT NULL,
    "visibility" BOOLEAN NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "testType" "TestType" NOT NULL,

    CONSTRAINT "TestName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestQuestion" (
    "id" SERIAL NOT NULL,
    "testName" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "answer" "Answer" NOT NULL,

    CONSTRAINT "TestQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Options" (
    "id" SERIAL NOT NULL,
    "testQuestionId" INTEGER NOT NULL,
    "option1" TEXT NOT NULL,
    "option2" TEXT NOT NULL,
    "option3" TEXT NOT NULL,
    "option4" TEXT NOT NULL,

    CONSTRAINT "Options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(200) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "userName" VARCHAR(50) NOT NULL,
    "profilePic" TEXT,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectTestCategory" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "category" INTEGER NOT NULL,

    CONSTRAINT "SelectTestCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnrollForTest" (
    "id" SERIAL NOT NULL,
    "testId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "paymentAmount" DOUBLE PRECISION NOT NULL,
    "paymentDate" TIMESTAMP(3),
    "testType" "TestType" NOT NULL,

    CONSTRAINT "EnrollForTest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Options_testQuestionId_key" ON "Options"("testQuestionId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- AddForeignKey
ALTER TABLE "TestName" ADD CONSTRAINT "TestName_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestName" ADD CONSTRAINT "TestName_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TestCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestQuestion" ADD CONSTRAINT "TestQuestion_testName_fkey" FOREIGN KEY ("testName") REFERENCES "TestName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Options" ADD CONSTRAINT "Options_testQuestionId_fkey" FOREIGN KEY ("testQuestionId") REFERENCES "TestQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelectTestCategory" ADD CONSTRAINT "SelectTestCategory_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrollForTest" ADD CONSTRAINT "EnrollForTest_testId_fkey" FOREIGN KEY ("testId") REFERENCES "TestName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrollForTest" ADD CONSTRAINT "EnrollForTest_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TestCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrollForTest" ADD CONSTRAINT "EnrollForTest_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
