import { NextResponse } from "next/server";

const posts: unknown[] = [];

export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const body = (await req.json()) as Record<string, unknown>;
  const slug = (body.title as string)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const post = {
    ...body,
    _id: `post-${Date.now()}`,
    slug,
    createdAt: new Date().toISOString(),
  };
  posts.push(post);
  return NextResponse.json(post, { status: 201 });
}
