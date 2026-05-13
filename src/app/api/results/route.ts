import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    let finalScore = 0;

    // AI
    if (body.booth === "AI") {
      finalScore = (body.score || 0) * 1000 - body.duration;
    }

    // DEVOPS
    if (body.booth === "DEVOPS") {
      finalScore = (body.score || 0) * 100 - body.duration;
    }

    // NETWORK
    if (body.booth === "NETWORK") {
      finalScore = (body.connectedPins || 0) * 1000 - body.duration;
    }

    const result = await prisma.result.create({
      data: {
        name: body.name,

        booth: body.booth,

        timerMode: body.timerMode,

        duration: body.duration,

        countdownStart: body.countdownStart,

        score: body.score,

        connectedPins: body.connectedPins,

        finalScore,
      },
    });

    return NextResponse.json(result);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
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
