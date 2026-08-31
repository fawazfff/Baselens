import Link from "next/link";

const demoContract = "0xac1bd2486aaf3b5c0fc3fd868558b082a531b2b4";

export default function Home() {
  return (
    <main id="main-content" className="product-home">
      <section className="product-hero">
        <div className="product-grid" aria-hidden="true" />
        <div className="shell product-hero-inner">
          <div className="product-eyebrow"><span /> Base mainnet token research</div>
          <h1>Look before<br />you <em>ape.</em></h1>
          <p>BaseLens researches the contract behind a Base token, checks the signals that matter, then explains what looks strong, what looks risky, and what is still unknown.</p>
          <div className="product-actions">
            <Link className="product-primary" href="/analyze">Analyze a token <span>→</span></Link>
            <Link className="product-secondary" href={`/analyze/${demoContract}`}>Open demo</Link>
          </div>
          <div className="product-proof"><span>No account</span><i /><span>No wallet</span><i /><span>Base mainnet</span></div>
        </div>
      </section>

      <section className="product-preview-section">
        <div className="shell product-preview-wrap">
          <div className="product-preview-bar"><span>Example research workspace</span><b>Evidence first · Agent explained</b></div>
          <div className="product-preview">
            <aside>
              <div className="preview-token"><div>B</div><span><b>BRETT</b><small>Base token</small></span></div>
              <nav><strong>Overview</strong><span>Market</span><span>Holders</span><span>Security</span><span>Social</span></nav>
              <div className="preview-status"><i /> Research complete</div>
            </aside>
            <div className="preview-main">
              <header><div><small>BASELENS SCORE</small><strong>76<span>/100</span></strong><em>Promising profile</em></div><div className="preview-agent"><small>AGENT VERDICT</small><p>Liquidity and contract safety are the strongest areas. Holder concentration deserves another look.</p></div></header>
              <div className="preview-metrics"><div><span>Liquidity</span><b>88</b></div><div><span>Safety</span><b>91</b></div><div><span>Holders</span><b>61</b></div><div><span>Social</span><b>72</b></div></div>
              <div className="preview-evidence"><div><small>STRONGEST SIGNAL</small><b>Deep liquidity relative to valuation</b></div><div><small>BIGGEST RISK</small><b>Concentrated top-wallet ownership</b></div><div><small>CONFIDENCE</small><b>High · 84%</b></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-story">
        <div className="shell story-grid">
          <div className="story-heading"><span>One contract. Several checks.</span><h2>Research the token from more than one angle.</h2><p>Choose the investigation you need, or run everything together. BaseLens keeps missing data separate from actual risk.</p></div>
          <div className="story-list">
            <article><span>01</span><div><h3>Market & on-chain</h3><p>Price, market cap, liquidity, trading flow, pair age and holder structure.</p></div></article>
            <article><span>02</span><div><h3>Security</h3><p>Honeypot signals, restrictions, taxes, ownership, minting and contract verification.</p></div></article>
            <article><span>03</span><div><h3>Social & identity</h3><p>Official website, X, Telegram, Farcaster and the social evidence available for the token.</p></div></article>
            <article><span>04</span><div><h3>Agent interpretation</h3><p>A deterministic score first. Then the agent explains the evidence, confidence and trade-offs.</p></div></article>
          </div>
        </div>
      </section>

      <section className="agent-loop-section">
        <div className="shell agent-loop-grid">
          <div><span className="section-kicker">Built as an agent</span><h2>It researches before it answers.</h2></div>
          <div className="agent-loop"><div><b>Observe</b><span>Collect live evidence</span></div><i>→</i><div><b>Score</b><span>Run deterministic checks</span></div><i>→</i><div><b>Interpret</b><span>Explain the signals</span></div></div>
        </div>
      </section>

      <section className="product-final-cta">
        <div className="shell final-cta-inner"><div><span>BaseLens Agent</span><h2>Research the contract.<br />Then make your own call.</h2></div><div className="product-actions"><Link className="product-primary" href="/analyze">Analyze a token <span>→</span></Link><Link className="product-secondary" href="/compare">Compare tokens</Link></div></div>
      </section>
    </main>
  );
}
