import Link from "next/link";
import { AnalyzeForm } from "@/components/AnalyzeForm";

const researchRows = [
  ["Market", "Price, market cap, FDV, pair age"],
  ["Liquidity", "Pool depth and valuation ratio"],
  ["Activity", "Volume, buys, sells, movement"],
  ["Holders", "Count and concentration"],
  ["Security", "Restrictions, taxes, minting, honeypot flags"],
  ["Identity", "Website and official social links"],
];

export default function Home() {
  return (
    <main id="main-content">
      <section className="home-hero">
        <div className="home-grid" aria-hidden="true" />
        <div className="shell home-hero-inner">
          <p className="hero-meta">Base mainnet · token research agent</p>
          <h1>
            Look before
            <br />
            you <span>ape.</span>
          </h1>
          <p className="hero-copy">
            Paste a Base token contract. BaseLens checks the market, liquidity,
            holders and contract risk before the agent tells you what actually
            stands out.
          </p>
          <div className="hero-form-wrap">
            <AnalyzeForm />
          </div>
          <div className="hero-utility">
            <span>Chain 8453</span>
            <span>No wallet required</span>
            <Link href="/compare">Compare tokens →</Link>
          </div>
        </div>
      </section>

      <section className="product-window-section">
        <div className="shell">
          <div className="product-window">
            <div className="product-window-bar">
              <div className="window-left">
                <span className="window-mark" />
                <b>BaseLens</b>
                <span>Example analysis</span>
              </div>
              <div className="window-status"><i /> Base mainnet</div>
            </div>

            <div className="product-preview">
              <aside className="preview-rail">
                <span className="rail-label">Research trace</span>
                <div className="rail-step active"><i /> Observe</div>
                <div className="rail-step"><i /> Score</div>
                <div className="rail-step"><i /> Interpret</div>
                <div className="rail-line" />
                <p>Only collected evidence reaches the agent.</p>
              </aside>

              <div className="preview-body">
                <header className="token-head">
                  <div>
                    <span className="preview-kicker">Token overview</span>
                    <h2>Example Base Token</h2>
                    <code>0x4200...0006</code>
                  </div>
                  <div className="agent-score">
                    <span>Agent score</span>
                    <strong>82</strong>
                    <small>/100</small>
                  </div>
                </header>

                <div className="metric-strip">
                  <div><span>Price</span><b>$0.085</b></div>
                  <div><span>Market cap</span><b>$18.4M</b></div>
                  <div><span>Liquidity</span><b>$2.6M</b></div>
                  <div><span>24h volume</span><b>$5.1M</b></div>
                </div>

                <div className="preview-analysis">
                  <div className="agent-summary">
                    <span className="preview-kicker">Agent read</span>
                    <h3>Healthy market profile. Holder concentration deserves another look.</h3>
                    <p>
                      Liquidity is strong relative to valuation and trading remains active.
                      No obvious sell restriction appears in the available contract evidence.
                    </p>
                    <div className="summary-points">
                      <div><span>Strongest signal</span><b>Liquidity depth</b></div>
                      <div><span>Biggest risk</span><b>Holder concentration</b></div>
                    </div>
                  </div>

                  <div className="signal-readout">
                    <div className="signal-line"><span>Market health</span><b>82</b></div>
                    <div className="signal-line"><span>Liquidity health</span><b>76</b></div>
                    <div className="signal-line"><span>Trading activity</span><b>88</b></div>
                    <div className="signal-line"><span>Holder health</span><b>64</b></div>
                    <div className="signal-line"><span>Contract safety</span><b>91</b></div>
                    <div className="confidence-line"><span>Confidence</span><b>High</b></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="editorial-section">
        <div className="shell editorial-grid">
          <div className="editorial-copy">
            <p className="section-label">Why BaseLens</p>
            <h2>The agent does not get to invent the numbers.</h2>
            <p>
              BaseLens separates collection, scoring and interpretation. Market and
              security data come from external evidence. Deterministic checks run
              next. The model only explains the result after that.
            </p>
            <Link href="/how-it-works" className="inline-link">How the agent works →</Link>
          </div>

          <div className="process-list">
            <div className="process-row">
              <span>01</span>
              <div><b>Observe</b><p>Validate the contract and gather whatever evidence is actually available.</p></div>
            </div>
            <div className="process-row">
              <span>02</span>
              <div><b>Analyze</b><p>Normalize the data and score measurable signals without using an LLM.</p></div>
            </div>
            <div className="process-row">
              <span>03</span>
              <div><b>Explain</b><p>Give the agent the compact evidence set and ask it to explain the trade-offs.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="research-section">
        <div className="shell research-layout">
          <div className="research-heading">
            <p className="section-label">Research coverage</p>
            <h2>Six checks. One contract.</h2>
          </div>
          <div className="research-table">
            {researchRows.map(([title, description], index) => (
              <div className="research-row" key={title}>
                <span>0{index + 1}</span>
                <b>{title}</b>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="compare-band">
        <div className="shell compare-band-inner">
          <div>
            <p>Compare mode</p>
            <h2>Put two Base tokens under the same lens.</h2>
          </div>
          <Link href="/compare" className="compare-link">Open compare →</Link>
        </div>
      </section>
    </main>
  );
}
