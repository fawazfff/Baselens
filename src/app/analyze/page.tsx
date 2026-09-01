import type { Metadata } from "next";
import { AnalyzeStartClient } from "@/components/AnalyzeStartClient";
import { TrendingBase } from "@/components/TrendingBase";
export const metadata:Metadata={title:"Analyze an EVM token",description:"Choose a supported EVM network, paste a token contract and check its market, liquidity, holders and contract risks.",alternates:{canonical:"/analyze"}};
export default function AnalyzeStartPage(){return <main className="research-start-page" id="main-content"><div className="shell research-start-shell"><div className="research-start-kicker">BaseLens token research</div><AnalyzeStartClient/><TrendingBase/><p className="research-disclaimer">BaseLens summarizes available evidence. It does not predict returns or tell you what to buy.</p></div></main>}
