import { NextResponse } from "next/server";

type Pair = {
  chainId?: string; url?: string;
  baseToken?: { address?: string; name?: string; symbol?: string };
  priceUsd?: string; txns?: { h24?: { buys?: number; sells?: number } };
  volume?: { h24?: number }; priceChange?: { h24?: number }; liquidity?: { usd?: number };
  marketCap?: number; fdv?: number; info?: { imageUrl?: string };
};
type Boost = { chainId?: string; tokenAddress?: string; amount?: number; totalAmount?: number };
function score(pair: Pair, boost=0){const v=pair.volume?.h24??0,l=pair.liquidity?.usd??0,t=(pair.txns?.h24?.buys??0)+(pair.txns?.h24?.sells??0);return Math.log10(v+1)*28+Math.log10(l+1)*20+Math.log10(t+1)*18+Math.log10(boost+1)*8;}
export async function GET(){try{
 const boostRes=await fetch("https://api.dexscreener.com/token-boosts/top/v1",{next:{revalidate:120}}); if(!boostRes.ok) throw new Error("DexScreener discovery unavailable");
 const boosts=(await boostRes.json()) as Boost[]; const base=boosts.filter(x=>x.chainId==="base"&&x.tokenAddress).slice(0,12);
 const results=await Promise.all(base.map(async item=>{try{const r=await fetch(`https://api.dexscreener.com/token-pairs/v1/base/${item.tokenAddress}`,{next:{revalidate:120}});if(!r.ok)return null;const pairs=(await r.json()) as Pair[];const pair=pairs.filter(p=>p.chainId==="base"&&p.baseToken?.address?.toLowerCase()===item.tokenAddress?.toLowerCase()).sort((a,b)=>(b.liquidity?.usd??0)-(a.liquidity?.usd??0))[0];return pair?{pair,boost:item.totalAmount??item.amount??0}:null;}catch{return null;}}));
 const tokens=results.filter((x):x is {pair:Pair;boost:number}=>Boolean(x)).map(({pair,boost})=>({address:pair.baseToken!.address!,name:pair.baseToken?.name??"Unknown token",symbol:pair.baseToken?.symbol??"?",image:pair.info?.imageUrl??null,priceUsd:Number(pair.priceUsd||0)||null,change24h:pair.priceChange?.h24??null,volume24h:pair.volume?.h24??null,liquidity:pair.liquidity?.usd??null,marketCap:pair.marketCap??pair.fdv??null,trades24h:(pair.txns?.h24?.buys??0)+(pair.txns?.h24?.sells??0),pairUrl:pair.url??null,activityScore:score(pair,boost)})).sort((a,b)=>b.activityScore-a.activityScore).slice(0,8);
 return NextResponse.json({tokens,updatedAt:new Date().toISOString(),methodology:"Ranked from DexScreener-discovered Base tokens using recent volume, liquidity and transaction activity. This is discovery, not a BaseLens recommendation."});
}catch(error){return NextResponse.json({tokens:[],error:error instanceof Error?error.message:"Trending data unavailable"},{status:502});}}
