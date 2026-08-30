import { NextRequest, NextResponse } from "next/server";
import { analyzeTokenData } from "@/lib/analyzer";
import { runComparisonAgent, runTokenAgent } from "@/lib/agent";
import type { TokenAnalysis } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const contracts = Array.from(
      new Set(
        (body.contracts || [])
          .map((value: unknown) => String(value).trim())
          .filter(Boolean)
      )
    ) as string[];

    if (contracts.length < 2 || contracts.length > 5) {
      return NextResponse.json(
        { error: "Enter between 2 and 5 unique Base token addresses." },
        { status: 400 }
      );
    }

    const settled = await Promise.allSettled(contracts.map(analyzeTokenData));
    const errors: Array<{ contract: string; error: string }> = [];
    const items: TokenAnalysis[] = [];

    settled.forEach((result, index) => {
      if (result.status === "fulfilled") {
        items.push(result.value);
      } else {
        errors.push({
          contract: contracts[index],
          error:
            result.reason instanceof Error
              ? result.reason.message
              : "Analysis failed",
        });
      }
    });

    if (items.length < 2) {
      return NextResponse.json(
        { error: "At least two valid Base tokens are required.", errors },
        { status: 400 }
      );
    }

    const individual = await Promise.all(
      items.map(async (data) => {
        try {
          return { data, agent: await runTokenAgent(data) };
        } catch {
          return { data, agent: null };
        }
      })
    );

    let comparison = null;
    try {
      comparison = await runComparisonAgent(items);
    } catch {
      comparison = null;
    }

    return NextResponse.json({ items: individual, comparison, errors });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Comparison failed" },
      { status: 400 }
    );
  }
}
