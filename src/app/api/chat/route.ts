import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK = "http://cloud01.fabricasrl.com.ar:5678/webhook/chatbot";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "message requerido" }, { status: 400 });
    }

    const upstream = await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: sessionId || "anon", message }),
    });

    const data = await upstream.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[chat proxy error]", err);
    return NextResponse.json(
      { reply: "El asistente no está disponible en este momento. Comunicate con nosotros por teléfono o email.", intent: "SOPORTE", human_handoff: true, suggestions: [] },
      { status: 200 }
    );
  }
}
