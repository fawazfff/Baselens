import Link from "next/link";
import { AnalyzeForm } from "@/components/AnalyzeForm";

const checks = [
  ["Market", "Price, market cap, FDV and token age"],
  ["Liquidity", "Pool depth and liquidity-to-market-cap ratio"],
  ["Trading", "Volume, buys, sells and short-term changes"],
  ["Holders", "Holder count and top-wallet concentration"],
  ["Contract", "Verification, minting, ownership and restrictions"],
  ["Social", "Official website and discovered social profiles"],
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="shell">
          <div className="eyebrow">Base mainnet · Token intelligence agent</div>
          <h1>Know what you’re buying on Base.</h1>
          <p>
            Paste a Base token contract. BaseLens checks the market, liquidity,
            trading activity, holders, contract risk and official social links,
            then explains what actually stands out.
          </p>
          <AnalyzeForm />
          <div className="hero-actions">
            <Link href="/compare" className="btn ghost link">
              Compare tokens
            </Link>
            <span className="small">No wallet connection required.</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="eyebrow">How the agent works</div>
          <h2 className="section-title">Evidence first. AI second.</h2>
          <p className="section-copy">
            The model does not invent token stats. BaseLens gathers live evidence,
            calculates transparent scores, then asks the agent to interpret only
            what was actually found.
          </p>
          <div className="grid3">
            <div className="feature">
              <span className="num">01 · OBSERVE</span>
              <h3>Investigate the contract</h3>
              <p>Confirm it on Base and collect available DEX, holder, contract and security data.</p>
            </div>
            <div className="feature">
              <span className="num">02 · ANALYZE</span>
              <h3>Score the signals</h3>
              <p>Measure liquidity, activity, concentration, safety, social presence and momentum with deterministic logic.</p>
            </div>
            <div className="feature">
              <span className="num">03 · EXPLAIN</span>
              <h3>Show what matters</h3>
              <p>Turn the evidence into a readable verdict, strongest signal, biggest risk and clear next checks.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section panel-bg">
        <div className="shell">
          <div className="eyebrow">Research coverage</div>
          <h2 className="section-title">One contract. Multiple lenses.</h2>
          <div className="intelgrid">
            {checks.map(([title, description]) => (
              <div className="intel" key={title}>
                <b>{title}</b>
                <span>{description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
