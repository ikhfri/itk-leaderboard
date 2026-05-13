-- CreateEnum
CREATE TYPE "BoothType" AS ENUM ('AI', 'DEVOPS', 'NETWORK');

-- CreateEnum
CREATE TYPE "TimerMode" AS ENUM ('STOPWATCH', 'COUNTDOWN', 'QUIZ');

-- CreateTable
CREATE TABLE "Result" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "booth" "BoothType" NOT NULL,
    "challenge" TEXT NOT NULL,
    "timerMode" "TimerMode" NOT NULL,
    "duration" INTEGER NOT NULL,
    "countdownStart" INTEGER,
    "score" INTEGER,
    "connectedPins" INTEGER,
    "totalQuestions" INTEGER,
    "correctAnswers" INTEGER,
    "finalScore" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);
