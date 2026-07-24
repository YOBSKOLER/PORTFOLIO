import { NextResponse } from "next/server";

const messages: unknown[] = [];

export async function GET() {
  return NextResponse.json(messages);
}

export async function POST(req: Request) {
  const body = (await req.json()) as {
    name: string;
    email: string;
    message: string;
  };
  const msg = {
    ...body,
    _id: `msg-${Date.now()}`,
    read: false,
    createdAt: new Date().toISOString(),
  };
  messages.push(msg);

  // Email via Resend si la clé existe
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: process.env.ADMIN_EMAIL!,
        subject: `📩 Nouveau message de ${body.name}`,
        html: `
          <div style="font-family:sans-serif;background:#0a0e1a;color:#e2e8f0;padding:32px;border-radius:16px;max-width:600px">
            <h1 style="color:#a78bfa">Nouveau message reçu</h1>
            <p><strong>De :</strong> ${body.name}</p>
            <p><strong>Email :</strong> ${body.email}</p>
            <p><strong>Message :</strong></p>
            <div style="background:#111827;padding:16px;border-radius:8px">${body.message}</div>
            <a href="mailto:${body.email}" style="display:inline-block;margin-top:16px;background:#7c3aed;color:white;padding:12px 24px;border-radius:8px;text-decoration:none">Répondre</a>
          </div>
        `,
      });
    } catch (err) {
      console.error("Email error:", err);
    }
  }

  return NextResponse.json(msg, { status: 201 });
}
