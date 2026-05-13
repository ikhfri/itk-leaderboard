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

  const results = await prisma.result.findMany({
    where: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      booth: booth as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      challenge: params.challenge as any,
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
