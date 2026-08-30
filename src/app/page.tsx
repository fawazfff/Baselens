import Link from "next/link";
import { AnalyzeForm } from "@/components/AnalyzeForm";

const checks = [
  ["MARKET", "Price · Market cap · FDV · Pair age"],
  ["LIQUIDITY", "Pool depth · Liquidity / market cap"],
  ["FLOW", "Volume · Buys · Sells · Momentum"],
  ["HOLDERS", "Holder count · Top-wallet concentration"],
  ["SECURITY", "Honeypot · Mint · Blacklist · Restrictions"],
  ["IDENTITY", "Website · X · Telegram · Official links"],
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="shell">
          <div className="eyebrow">BASE / MAINNET / TOKEN RESEARCH</div>
          <h1>Investigate a token before the trade.</h1>
          <p>
            Drop in a Base contract address. BaseLens pulls together market structure,
            liquidity, trading flow, holder concentration and contract risk, then an
            AI agent explains the signals without inventing the numbers.
          </p>
          <AnalyzeForm />
          <div className="hero-actions">
            <Link href="/compare" className="btn ghost link">Compare 2–5 tokens</Link>
            <span className="small">Base mainnet only · No wallet required</span>
          </div>
        </div>
      </section>

      <section className="section panel-bg">
        <div className="shell">
          <div className="eyebrow">RESEARCH PIPELINE</div>
          <h2 className="section-title">The agent reads evidence, not vibes.</h2>
          <div className="grid3">
            <div className="feature">
              <span className="num">01 / OBSERVE</span>
              <h3>Collect live signals</h3>
              <p>Validate the Base contract and query available market, liquidity, holder and security sources.</p>
            </div>
            <div className="feature">
              <span className="num">02 / SCORE</span>
              <h3>Run deterministic checks</h3>
              <p>Score seven measurable areas before any AI interpretation happens.</p>
            </div>
            <div className="feature">
              <span className="num">03 / INTERPRET</span>
              <h3>Explain the profile</h3>
              <p>The agent receives normalized evidence and returns strengths, risks, confidence and what to investigate next.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="eyebrow">SIGNAL COVERAGE</div>
          <h2 className="section-title">Six views of the same contract.</h2>
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
