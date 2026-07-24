import { NextResponse } from "next/server";
import { professionalProjects, personalProjects } from "@/lib/data";

let projects = [
  ...professionalProjects.map((p, i) => ({
    ...p,
    _id: `pro-${i}`,
    type: "professional",
    image: "",
  })),
  ...personalProjects.map((p, i) => ({
    ...p,
    _id: `per-${i}`,
    type: "personal",
    image: "",
  })),
];

export async function GET() {
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newProject = { ...body, _id: `proj-${Date.now()}` };
  projects = [...projects, newProject];
  return NextResponse.json(newProject, { status: 201 });
}
