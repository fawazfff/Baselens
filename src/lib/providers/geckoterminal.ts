import { num } from "@/lib/utils";

type GeckoTokenResponse = {
  data?: {
    attributes?: {
      price_usd?: string | number | null;
      market_cap_usd?: string | number | null;
      fdv_usd?: string | number | null;
      total_reserve_in_usd?: string | number | null;
      normalized_total_supply?: string | number | null;
      volume_usd?: { h24?: string | number | null };
      coingecko_coin_id?: string | null;
    };
  };
};

export async function getGeckoTerminalData(address: string) {
  const response = await fetch(
    `https://api.geckoterminal.com/api/v2/networks/base/tokens/${address}`,
    {
      next: { revalidate: 60 },
      headers: { Accept: "application/json;version=20230302" },
      signal: AbortSignal.timeout(8000),
    },
  );

  if (!response.ok) throw new Error(`GeckoTerminal returned ${response.status}`);
  const json = (await response.json()) as GeckoTokenResponse;
  const a = json.data?.attributes;
  if (!a) return null;

  return {
    priceUsd: num(a.price_usd),
    marketCap: num(a.market_cap_usd),
    fdv: num(a.fdv_usd),
    liquidityUsd: num(a.total_reserve_in_usd),
    totalSupply: num(a.normalized_total_supply),
    volume24h: num(a.volume_usd?.h24),
    coinGeckoId: a.coingecko_coin_id ?? null,
  };
}
