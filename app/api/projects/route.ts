import { NextResponse } from "next/server";
import { professionalProjects, personalProjects } from "@/lib/data";

export async function GET() {
  const projects = [
    ...professionalProjects.map((p, i) => ({
      ...p,
      _id: `pro-${i}`,
      type: "professional" as const,
    })),
    ...personalProjects.map((p, i) => ({
      ...p,
      _id: `per-${i}`,
      type: "personal" as const,
    })),
  ];
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json(
    { ...body, _id: `proj-${Date.now()}` },
    { status: 201 },
  );
}
