import OpenAI from "openai";
import { NextResponse } from "next/server";
import { analyzeTokenData } from "@/lib/analyzer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const question = String(body?.question || "").trim();
    const contract = String(body?.contract || "").trim();
    const chain = String(body?.chain || "base").trim();
    if (!question) return NextResponse.json({ error: "Ask a question about this token." }, { status: 400 });
    if (question.length > 500) return NextResponse.json({ error: "Keep the question under 500 characters." }, { status: 400 });
    if (!/^0x[a-fA-F0-9]{40}$/.test(contract)) return NextResponse.json({ error: "A valid EVM token contract is required." }, { status: 400 });
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: "The follow-up agent is temporarily unavailable." }, { status: 503 });

    const data = await analyzeTokenData(contract, chain);
    const evidence = { contract:data.contract, chain:data.chain, token:data.token, market:data.market, liquidity:data.liquidity, trading:data.trading, holders:data.holders, security:data.security, scores:data.scores, confidence:data.confidence, sources:data.sources, fetchedAt:data.fetchedAt };
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5-mini",
      input: [
        { role: "system", content: "You are BaseLens, a token research assistant for both beginners and experienced crypto users. Answer only from the evidence supplied by the server. Write like a knowledgeable person explaining the result to a friend: plain, direct and specific. Start with the answer, not a generic introduction. Use ordinary words before specialist terms. If you must use a term such as liquidity, FDV, holder concentration, mintable or honeypot, explain what it means in the same sentence. Do not use hype, slogans, dramatic warnings, canned headings, repetitive summaries, em dashes, or phrases such as 'in the dynamic world of', 'it is important to note', 'delve', 'landscape', 'robust', 'seamless', 'game-changing', 'unlock', 'leverage', 'crucial', 'testament', 'underscores', or 'stands out'. Do not invent statistics, project claims, social sentiment or wallet labels. Missing evidence means 'we do not have enough data for that check', not that the token is dangerous. Clearly separate a detected problem from missing information. Never tell the user to buy or sell and never predict returns. When useful, end with one practical thing the user should verify next. Keep the answer short unless the user asks for detail." },
        { role: "user", content: JSON.stringify({ question, evidence }) },
      ],
    });
    return NextResponse.json({ answer: response.output_text || "I could not answer that from the evidence available for this token.", evidenceFetchedAt: data.fetchedAt });
  } catch {
    return NextResponse.json({ error: "The follow-up agent could not answer right now." }, { status: 500 });
  }
}
