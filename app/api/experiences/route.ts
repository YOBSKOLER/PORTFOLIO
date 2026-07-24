import { NextResponse } from "next/server";
import { experienceData } from "@/lib/data";

const experiences = experienceData.map((e, i) => ({ ...e, _id: `exp-${i}` }));

export async function GET() {
  return NextResponse.json(experiences);
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json(
    { ...body, _id: `exp-${Date.now()}` },
    { status: 201 },
  );
}
