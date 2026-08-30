import Link from "next/link";
import { AnalyzeForm } from "@/components/AnalyzeForm";

export default function Home() {
  return (
    <main id="main-content">
      <section className="reference-hero" id="analyze">
        <div className="reference-grid" aria-hidden="true">
          <i className="float-square s1" /><i className="float-square s2" /><i className="float-square s3" /><i className="float-square s4" />
        </div>
        <div className="shell reference-hero-inner">
          <div className="reference-pill"><span>＋</span> AI-POWERED TOKEN INTELLIGENCE ON BASE</div>
          <h1>Check the contract,<br />not the <span>timeline.</span></h1>
          <p>BaseLens is your AI research agent for Base tokens.<br />Real data. Clear signals. Smarter decisions.</p>
          <div className="reference-search"><AnalyzeForm /></div>
        </div>
      </section>

      <section className="dashboard-showcase">
        <div className="shell">
          <div className="desktop-showcase-only">
            <div className="showcase-window">
              <aside className="showcase-sidebar">
                <div className="side-brand"><span className="mini-lens">b</span><b>BaseLens</b></div>
                <nav>
                  <span className="active">▦ <b>Dashboard</b></span>
                  <span>⌕ Analyze</span>
                  <span>⌘ Compare</span>
                  <span>☆ Watchlist</span>
                  <span>♧ Alerts</span>
                  <span>⌘ API</span>
                  <span>◷ History</span>
                  <span>▧ Docs</span>
                </nav>
                <div className="base-side-card"><b>Built on Base</b><p>Secure. Fast. Low fees.</p><a>Learn more →</a></div>
                <div className="wallet-chip">◉ 0xFawaz...69f7⌄</div>
              </aside>

              <div className="showcase-main">
                <div className="showcase-tabs"><span>‹ Dashboard</span><b>✦ AI Agent Analysis</b><span>⌘ On-chain Data</span><span>♢ Security Scanning</span><span>♧ Social Signals</span><span>◉ Liquidity</span></div>
                <div className="showcase-content">
                  <div className="showcase-title"><h2>Token Overview</h2><button>☆ Add to Watchlist</button></div>
                  <div className="token-summary">
                    <div className="token-identity"><div className="token-avatar">B</div><div><h3>BRETT <small>●</small></h3><p>Brett (Base)</p><code>0x532f...aee8</code></div></div>
                    <div className="score-card"><span>✦ Agent Score</span><div><strong>86</strong><small>/100</small></div><em>Strong</em><i className="score-arc" /></div>
                    <div className="verdict-card"><span>✦ AI Verdict</span><p>Strong community traction and healthy liquidity. No critical red flags detected. Proceed with caution.</p><a>View full analysis →</a></div>
                  </div>

                  <div className="showcase-metrics">
                    <div><span>Market Cap</span><b>$498.12M</b><em>▲ 12.45%</em></div>
                    <div><span>Price</span><b>$0.08521</b><em>▲ 8.32%</em></div>
                    <div><span>Liquidity</span><b>$23.47M</b><em>▲ 6.21%</em></div>
                    <div><span>Holders</span><b>42,381</b><em>▲ 9.11%</em></div>
                    <div><span>24h Volume</span><b>$45.12M</b><em>▲ 15.23%</em></div>
                  </div>

                  <div className="showcase-bottom">
                    <article><h4>Security Scan</h4><p className="green">No critical issues</p><ul><li>● Contract verified</li><li>● No mint function</li><li>● No blacklist function</li><li>● Ownership renounced</li></ul><a>View full report →</a></article>
                    <article><h4>Liquidity Health</h4><div className="liquidity-wrap"><div className="liquidity-ring"><b>92%</b><span>Healthy</span></div><div><p>Locked</p><b>$21.41M</b><small>91.2%</small><p>Unlocked</p><b>$2.06M</b><small>8.8%</small></div></div><a>View liquidity →</a></article>
                    <article><h4>Top Signals</h4><ul className="signals-list"><li>◆ Strong holder growth <em>▲ 18.7%</em></li><li>◆ High social activity <em>▲ 24.3%</em></li><li>◆ DEX liquidity increasing <em>▲ 9.8%</em></li><li>◆ No major sell pressure <small>Neutral</small></li></ul><a>View all signals →</a></article>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mobile-showcase-only" aria-label="Example BaseLens mobile analysis">
            <div className="mobile-demo-top">
              <div className="mobile-demo-token"><div className="token-avatar">B</div><div><span>Base token</span><h3>BRETT</h3><code>0x532f...aee8</code></div></div>
              <div className="mobile-demo-score"><span>Agent score</span><strong>86</strong><small>/100</small><em>Strong</em></div>
            </div>
            <div className="mobile-demo-verdict"><span>AI verdict</span><p>Healthy liquidity and activity. Holder concentration is the main thing to inspect next.</p></div>
            <div className="mobile-demo-metrics"><div><span>Market cap</span><b>$498.12M</b></div><div><span>Liquidity</span><b>$23.47M</b></div><div><span>24h volume</span><b>$45.12M</b></div></div>
            <div className="mobile-demo-flags"><span><i className="ok" /> Contract verified</span><span><i className="ok" /> No honeypot flag</span><span><i className="warn" /> Holder concentration</span></div>
          </div>
        </div>
      </section>

      <section className="reference-how">
        <div className="shell reference-how-grid">
          <div><div className="reference-pill small"><span>＋</span> AI RESEARCH AGENT</div><h2>How BaseLens works</h2></div>
          <p>Our AI agent analyzes market and on-chain evidence to deliver clear, actionable insights without inventing token data.</p>
        </div>
      </section>
    </main>
  );
}
