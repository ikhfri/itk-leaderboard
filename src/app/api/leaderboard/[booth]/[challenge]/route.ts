/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function GET(
  req: Request,

  context: {
    params: Promise<{
      booth: string;
      challenge: string;
    }>;
  },
) {
  const params = await context.params;

  const booth = params.booth.toUpperCase();

  const challenge = params.challenge.toUpperCase();

  const results = await prisma.result.findMany({
    where: {
      booth: booth as any,

      challenge,
    },

    orderBy: [
      {
        finalScore: "desc",
      },
    ],

    take: 10,
  });

  return NextResponse.json(results);
}
