import { NextResponse } from "next/server";
import { skillsData } from "@/lib/data";

const skills = skillsData.map((s, i) => ({ ...s, _id: `skill-${i}` }));

export async function GET() {
  return NextResponse.json(skills);
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json(
    { ...body, _id: `skill-${Date.now()}` },
    { status: 201 },
  );
}
