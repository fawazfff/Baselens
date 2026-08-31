import { NextResponse } from "next/server";

type Pair = {
  chainId?: string;
  url?: string;
  pairAddress?: string;
  baseToken?: { address?: string; name?: string; symbol?: string };
  quoteToken?: { symbol?: string };
  priceUsd?: string;
  txns?: { h24?: { buys?: number; sells?: number } };
  volume?: { h24?: number };
  priceChange?: { h24?: number };
  liquidity?: { usd?: number };
  marketCap?: number;
  fdv?: number;
  info?: { imageUrl?: string };
};

type Boost = { chainId?: string; tokenAddress?: string; amount?: number; totalAmount?: number };

function score(pair: Pair, boost = 0) {
  const volume = pair.volume?.h24 ?? 0;
  const liquidity = pair.liquidity?.usd ?? 0;
  const trades = (pair.txns?.h24?.buys ?? 0) + (pair.txns?.h24?.sells ?? 0);
  return Math.log10(volume + 1) * 28 + Math.log10(liquidity + 1) * 20 + Math.log10(trades + 1) * 18 + Math.log10(boost + 1) * 8;
}

export async function GET() {
  try {
    const boostRes = await fetch("https://api.dexscreener.com/token-boosts/top/v1", { next: { revalidate: 120 } });
    if (!boostRes.ok) throw new Error("DexScreener discovery unavailable");
    const boosts = (await boostRes.json()) as Boost[];
    const base = boosts.filter((item) => item.chainId === "base" && item.tokenAddress).slice(0, 18);
    const addresses = [...new Set(base.map((item) => item.tokenAddress!))].slice(0, 18);
    if (!addresses.length) return NextResponse.json({ tokens: [], updatedAt: new Date().toISOString() });

    const pairRes = await fetch(`https://api.dexscreener.com/tokens/v1/base/${addresses.join(",")}`, { next: { revalidate: 120 } });
    if (!pairRes.ok) throw new Error("DexScreener market data unavailable");
    const pairs = (await pairRes.json()) as Pair[];
    const boostMap = new Map(base.map((item) => [item.tokenAddress?.toLowerCase(), item.totalAmount ?? item.amount ?? 0]));
    const best = new Map<string, Pair>();
    for (const pair of pairs) {
      const address = pair.baseToken?.address?.toLowerCase();
      if (!address || pair.chainId !== "base") continue;
      const current = best.get(address);
      if (!current || (pair.liquidity?.usd ?? 0) > (current.liquidity?.usd ?? 0)) best.set(address, pair);
    }

    const tokens = [...best.values()].map((pair) => ({
      address: pair.baseToken?.address,
      name: pair.baseToken?.name ?? "Unknown token",
      symbol: pair.baseToken?.symbol ?? "?",
      image: pair.info?.imageUrl ?? null,
      priceUsd: Number(pair.priceUsd || 0) || null,
      change24h: pair.priceChange?.h24 ?? null,
      volume24h: pair.volume?.h24 ?? null,
      liquidity: pair.liquidity?.usd ?? null,
      marketCap: pair.marketCap ?? pair.fdv ?? null,
      trades24h: (pair.txns?.h24?.buys ?? 0) + (pair.txns?.h24?.sells ?? 0),
      pairUrl: pair.url ?? null,
      activityScore: score(pair, boostMap.get(pair.baseToken?.address?.toLowerCase()) ?? 0),
    })).sort((a,b) => b.activityScore - a.activityScore).slice(0, 8);

    return NextResponse.json({ tokens, updatedAt: new Date().toISOString(), methodology: "Ranked from DexScreener-discovered Base tokens using recent volume, liquidity and transaction activity. This is discovery, not a BaseLens recommendation." });
  } catch (error) {
    return NextResponse.json({ tokens: [], error: error instanceof Error ? error.message : "Trending data unavailable" }, { status: 502 });
  }
}
