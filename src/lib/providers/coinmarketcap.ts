import { num } from "@/lib/utils";

type CmcTokenDetail = {
  p?: string | number | null;
  mcap?: string | number | null;
  fdv?: string | number | null;
  cs?: string | number | null;
  lmc?: string | number | null;
  ltcs?: string | number | null;
  cid?: number | null;
};

export async function getCoinMarketCapData(address: string) {
  const url = new URL("https://pro-api.coinmarketcap.com/public-api/v1/dex/token");
  url.searchParams.set("platform", "base");
  url.searchParams.set("address", address);

  const response = await fetch(url, {
    next: { revalidate: 60 },
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) throw new Error(`CoinMarketCap returned ${response.status}`);
  const json = await response.json() as { data?: CmcTokenDetail } & CmcTokenDetail;
  const data = (json.data ?? json) as CmcTokenDetail;

  const listingMarketCap = num(data.lmc);
  const dexMarketCap = num(data.mcap);
  const listingCirculatingSupply = num(data.ltcs);
  const circulatingSupply = num(data.cs);

  return {
    marketCap: listingMarketCap ?? dexMarketCap,
    circulatingSupply: listingCirculatingSupply ?? circulatingSupply,
    fdv: num(data.fdv),
    priceUsd: num(data.p),
    coinMarketCapId: data.cid ?? null,
    usesListingMarketCap: listingMarketCap !== null,
  };
}
