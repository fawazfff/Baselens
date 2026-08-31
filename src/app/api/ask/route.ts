import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const question = String(body?.question || "").trim();
    const evidence = body?.evidence;
    if (!question) return NextResponse.json({ error: "Ask a question about this token." }, { status: 400 });
    if (!evidence) return NextResponse.json({ error: "Token evidence is required." }, { status: 400 });
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: "Agent follow-up is temporarily unavailable." }, { status: 503 });

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5-mini",
      input: [
        {
          role: "system",
          content: "You are BaseLens, an evidence-grounded Base token research agent. Answer only from the supplied normalized token evidence. Do not invent live data, social sentiment, wallet labels or statistics. Clearly say when evidence is unavailable. Do not tell the user to buy or sell and do not predict returns. Explain trade-offs in plain language and keep the answer concise.",
        },
        { role: "user", content: JSON.stringify({ question, evidence }) },
      ],
    });

    return NextResponse.json({ answer: response.output_text || "I could not produce an answer from the available evidence." });
  } catch {
    return NextResponse.json({ error: "The follow-up agent could not answer right now." }, { status: 500 });
  }
}
