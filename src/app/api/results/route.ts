import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    let finalScore = body.finalScore || 0;

    // fallback calculation
    if (!finalScore) {
      // AI
      if (body.booth === "AI") {
        finalScore = (body.score || 0) * 1000 - body.duration;
      }

      // DEVOPS DOCKERFILE
      if (body.booth === "DEVOPS" && body.challenge === "DOCKERFILE") {
        finalScore = (body.score || 0) * 100 - body.duration;
      }

      // DEVOPS EMOJI
      if (body.booth === "DEVOPS" && body.challenge === "EMOJI") {
        finalScore = (body.score || 0) * 1000 - body.duration;
      }

      // NETWORK
      if (body.booth === "NETWORK") {
        finalScore = (body.connectedPins || 0) * 1000 - body.duration;
      }
    }

    const result = await prisma.result.create({
      data: {
        name: body.name,

        booth: body.booth,

        challenge: body.challenge,

        timerMode: body.timerMode,

        duration: body.duration,

        countdownStart: body.countdownStart,

        score: body.score,

        connectedPins: body.connectedPins,

        totalQuestions: body.totalQuestions,

        correctAnswers: body.correctAnswers,

        finalScore,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Failed save result",
      },
      {
        status: 500,
      },
    );
  }
}
