import type { Metadata } from "next";
import { AnalyzeStartClient } from "@/components/AnalyzeStartClient";
import { TrendingBase } from "@/components/TrendingBase";

export const metadata:Metadata={title:"Analyze a Base token",description:"Paste a Base token contract and investigate market activity, liquidity, holders, contract risk and available social evidence."};

export default function AnalyzeStartPage() {
  return (
    <main className="research-start-page" id="main-content">
      <div className="shell research-start-shell">
        <div className="research-start-kicker">BaseLens Agent</div>
        <AnalyzeStartClient />
        <TrendingBase />
        <p className="research-disclaimer">BaseLens grades the available evidence. It does not predict returns or tell you what to buy.</p>
      </div>
    </main>
  );
}
