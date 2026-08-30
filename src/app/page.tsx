import Link from "next/link";
import { AnalyzeForm } from "@/components/AnalyzeForm";

const signals = [
  ["Market", "Price, market cap, FDV and pair age"],
  ["Liquidity", "Pool depth and liquidity relative to valuation"],
  ["Activity", "Volume, buys, sells and short-term movement"],
  ["Holders", "Holder count and wallet concentration"],
  ["Security", "Honeypot flags, minting and restrictions"],
  ["Identity", "Website, X, Telegram and official links"],
];

const scoreRows = [
  ["Market health", 82],
  ["Liquidity", 76],
  ["Trading activity", 88],
  ["Holder health", 64],
  ["Contract safety", 91],
];

export default function Home() {
  return (
    <main id="main-content">
      <section className="marketing-hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="shell marketing-hero-inner">
          <div className="hero-pill">
            <span className="hero-pill-dot" />
            AI token intelligence for Base
          </div>
          <h1>
            Know what you&apos;re buying
            <span> on Base.</span>
          </h1>
          <p className="hero-lede">
            Paste any Base token contract. BaseLens investigates the market,
            liquidity, activity, holders, security and official social signals,
            then explains what matters.
          </p>
          <div className="hero-actions">
            <a href="#analyze" className="btn blue large">Analyze a token</a>
            <Link href="/compare" className="btn soft large link">Compare tokens</Link>
          </div>
          <div className="hero-proof">
            <span>No wallet required</span>
            <span>Base mainnet</span>
            <span>Evidence before AI</span>
          </div>
        </div>
      </section>

      <section id="analyze" className="product-stage">
        <div className="shell">
          <div className="analyzer-shell">
            <div className="analyzer-topbar">
              <div className="window-dots"><i /><i /><i /></div>
              <span>BaseLens Agent</span>
              <div className="live-chip"><i /> Base mainnet</div>
            </div>
            <div className="analyzer-content">
              <div className="analyzer-intro">
                <div>
                  <span className="section-kicker">Start with a contract</span>
                  <h2>Investigate a Base token in seconds.</h2>
                </div>
                <p>BaseLens checks real data first. The AI only interprets the evidence the research pipeline collects.</p>
              </div>
              <div className="hero-analyze-form">
                <AnalyzeForm />
              </div>

              <div className="mock-dashboard" aria-hidden="true">
                <div className="mock-main">
                  <div className="mock-token-head">
                    <div className="mock-token-avatar">B</div>
                    <div><b>Example Base Token</b><span>0x4200...0006</span></div>
                    <div className="mock-score"><strong>82</strong><span>/ 100</span></div>
                  </div>
                  <div className="mock-metrics">
                    <div><span>Market cap</span><b>$18.4M</b></div>
                    <div><span>Liquidity</span><b>$2.6M</b></div>
                    <div><span>24h volume</span><b>$5.1M</b></div>
                    <div><span>Holders</span><b>19,240</b></div>
                  </div>
                  <div className="mock-agent-card">
                    <div className="mock-agent-label"><i /> Agent read</div>
                    <h3>Promising profile, with holder concentration worth checking.</h3>
                    <p>Healthy liquidity and active trading support the market profile. Contract checks show no obvious sell restrictions in the available evidence.</p>
                    <div className="mock-evidence-grid">
                      <div><span>Strongest signal</span><b>Liquidity depth</b></div>
                      <div><span>Biggest risk</span><b>Top holder concentration</b></div>
                    </div>
                  </div>
                </div>
                <aside className="mock-side">
                  <span className="section-kicker">Signal score</span>
                  {scoreRows.map(([name, score]) => (
                    <div className="mock-score-row" key={name}>
                      <div><span>{name}</span><b>{score}</b></div>
                      <div className="mock-bar"><i style={{ width: `${score}%` }} /></div>
                    </div>
                  ))}
                  <div className="confidence-card"><span>Confidence</span><b>High</b><p>Most core data sources returned usable evidence.</p></div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="story-section">
        <div className="shell story-grid">
          <div className="story-copy">
            <span className="section-kicker">Built like an investigator</span>
            <h2>It does more than summarize a token page.</h2>
            <p>BaseLens separates data collection, deterministic scoring and AI interpretation. That makes the result easier to inspect and harder for the model to invent.</p>
            <Link href="/how-it-works" className="text-link">See how the agent works <span>→</span></Link>
          </div>
          <div className="workflow-stack">
            <div className="workflow-card active"><span>01</span><div><b>Observe</b><p>Validate the Base contract and collect available market, liquidity, holder and security evidence.</p></div></div>
            <div className="workflow-card"><span>02</span><div><b>Analyze</b><p>Normalize the data and calculate measurable health scores before the model is called.</p></div></div>
            <div className="workflow-card"><span>03</span><div><b>Decide</b><p>The agent weighs the evidence, gives a verdict and explains the strongest signal and biggest risk.</p></div></div>
          </div>
        </div>
      </section>

      <section className="signals-section">
        <div className="shell">
          <div className="section-heading centered">
            <span className="section-kicker">Signal coverage</span>
            <h2>One contract. Six different angles.</h2>
            <p>Each area adds a different piece of evidence to the final BaseLens view.</p>
          </div>
          <div className="signal-grid">
            {signals.map(([title, description], index) => (
              <article className="signal-card" key={title}>
                <span className="signal-number">0{index + 1}</span>
                <div className="signal-icon"><i /></div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="compare-promo">
        <div className="shell compare-promo-inner">
          <div>
            <span className="section-kicker light">Compare mode</span>
            <h2>Two tokens look good? Put them side by side.</h2>
            <p>Compare up to five Base contracts through the same research pipeline, then let the agent rank the strongest profile.</p>
          </div>
          <Link href="/compare" className="btn white large link">Compare tokens</Link>
        </div>
      </section>
    </main>
  );
}
