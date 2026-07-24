import { NextResponse } from "next/server";

const socials = {
  github: "https://github.com/YOBSKOLER",
  linkedin: "",
  twitter: "",
  email: "yobskoler9@gmail.com",
  phone: "",
};

export async function GET() {
  return NextResponse.json(socials);
}

export async function PUT(req: Request) {
  const body = await req.json();
  Object.assign(socials, body);
  return NextResponse.json(socials);
}
