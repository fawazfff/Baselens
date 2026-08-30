import { AnalyzeForm } from "@/components/AnalyzeForm";

const checks = [
  ["Market", "Price, market cap, FDV, pair age"],
  ["Liquidity", "Pool depth, liquidity relative to valuation"],
  ["Flow", "Volume, buys, sells, short-term movement"],
  ["Holders", "Holder count, top-wallet concentration"],
  ["Contract", "Honeypot flags, minting, blacklist, restrictions"],
  ["Identity", "Website, X, Telegram and discovered official links"],
];

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero">
        <div className="shell hero-layout">
          <div className="hero-copy">
            <div className="eyebrow">Base mainnet research</div>
            <h1>Check the contract, not the timeline.</h1>
            <p>
              BaseLens investigates what sits behind a Base token: liquidity,
              trading activity, holder concentration and contract risk. The agent
              explains the evidence after the numbers are collected.
            </p>
          </div>
          <div className="hero-command">
            <div className="command-label">
              <span>contract lookup</span>
              <span>chain 8453</span>
            </div>
            <AnalyzeForm />
          </div>
        </div>
      </section>

      <section className="section panel-bg">
        <div className="shell pipeline-layout">
          <div className="pipeline-intro">
            <div className="eyebrow">Research pipeline</div>
            <h2 className="section-title">Numbers first. Interpretation after.</h2>
            <p className="section-copy">
              The model never gets permission to make up market data. It only sees
              a compact evidence set produced by the research pipeline.
            </p>
          </div>
          <div className="pipeline-list">
            <article className="pipeline-row">
              <span className="num">01</span>
              <div><h3>Observe</h3><p>Validate the contract and collect available market, liquidity, holder and security data.</p></div>
            </article>
            <article className="pipeline-row offset">
              <span className="num">02</span>
              <div><h3>Score</h3><p>Run deterministic checks across seven measurable areas before the AI is called.</p></div>
            </article>
            <article className="pipeline-row">
              <span className="num">03</span>
              <div><h3>Interpret</h3><p>Explain the strongest signal, biggest risk, confidence and what deserves another look.</p></div>
            </article>
          </div>
        </div>
      </section>

      <section className="section coverage-section">
        <div className="shell coverage-layout">
          <div>
            <div className="eyebrow">Signal coverage</div>
            <h2 className="section-title">Six ways to inspect one contract.</h2>
          </div>
          <div className="coverage-list">
            {checks.map(([title, description], index) => (
              <div className="coverage-row" key={title}>
                <span className="coverage-index">0{index + 1}</span>
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
