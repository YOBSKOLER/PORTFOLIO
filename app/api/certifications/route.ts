import { NextResponse } from "next/server";
import { certifications } from "@/lib/data";

const certs = certifications.map((c, i) => ({
  ...c,
  _id: `cert-${i}`,
  image: "",
  logo: c.logo ?? "",
}));

export async function GET() {
  return NextResponse.json(certs);
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json(
    { ...body, _id: `cert-${Date.now()}` },
    { status: 201 },
  );
}
