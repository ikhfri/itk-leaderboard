import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    if (body.booth === "ALL") {
      await prisma.result.deleteMany();
    } else {
      await prisma.result.deleteMany({
        where: {
          booth: body.booth,
        },
      });
    }

    return NextResponse.json({
      success: true,
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed clear data",
      },
      {
        status: 500,
      },
    );
  }
}
