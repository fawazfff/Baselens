import OpenAI from "openai";
import { NextResponse } from "next/server";
import { analyzeTokenData } from "@/lib/analyzer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const question = String(body?.question || "").trim();
    const contract = String(body?.contract || "").trim();
    if (!question) return NextResponse.json({ error: "Ask a question about this token." }, { status: 400 });
    if (question.length > 500) return NextResponse.json({ error: "Keep follow-up questions under 500 characters." }, { status: 400 });
    if (!/^0x[a-fA-F0-9]{40}$/.test(contract)) return NextResponse.json({ error: "A valid Base token contract is required." }, { status: 400 });
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: "Agent follow-up is temporarily unavailable." }, { status: 503 });

    // Never trust analysis evidence supplied by the browser. Rebuild normalized evidence server-side.
    const data = await analyzeTokenData(contract);
    const evidence = {
      contract: data.contract, chain: data.chain, token: data.token, market: data.market,
      liquidity: data.liquidity, trading: data.trading, holders: data.holders,
      security: data.security, social: data.social, scores: data.scores,
      confidence: data.confidence, sources: data.sources, fetchedAt: data.fetchedAt,
    };
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5-mini",
      input: [
        { role: "system", content: "You are BaseLens, an evidence-grounded Base token research agent. Answer only from the supplied normalized server-side evidence. Do not invent live data, social sentiment, wallet labels or statistics. Distinguish missing evidence from detected risk. Clearly say when evidence is unavailable. Do not tell the user to buy or sell and do not predict returns. Explain trade-offs in plain language and keep the answer concise." },
        { role: "user", content: JSON.stringify({ question, evidence }) },
      ],
    });
    return NextResponse.json({ answer: response.output_text || "I could not produce an answer from the available evidence.", evidenceFetchedAt: data.fetchedAt });
  } catch {
    return NextResponse.json({ error: "The follow-up agent could not answer right now." }, { status: 500 });
  }
}
