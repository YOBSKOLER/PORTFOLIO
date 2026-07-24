import { NextResponse } from "next/server";
import { educationData } from "@/lib/data";

const education = educationData.map((e, i) => ({ ...e, _id: `edu-${i}` }));

export async function GET() {
  return NextResponse.json(education);
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json(
    { ...body, _id: `edu-${Date.now()}` },
    { status: 201 },
  );
}
