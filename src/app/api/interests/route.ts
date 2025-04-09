import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parentId = searchParams.get("parentId");

  const whereClause = parentId ? { parentId } : { parentId: null };

  const interests = await prisma.interest.findMany({
    where: whereClause,
    orderBy: { name: "asc" },
  });

  return NextResponse.json(interests);
}

