"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { FullAnalysis } from "@/lib/types";
import { fmtMoney } from "@/lib/utils";

const show = (value: unknown, suffix = "") =>
  value === null || value === undefined
    ? "Unavailable"
    : `${typeof value === "number" ? value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : value}${suffix}`;

const shortAddress = (value: string) => `${value.slice(0, 6)}...${value.slice(-4)}`;

export function AnalysisClient({ contract }: { contract: string }) {
  const [result, setResult] = useState<FullAnalysis | null>(null);
  const [error, setError] = useState("");
  const [stage, setStage] = useState(0);

  const stages = [
    "Checking contract",
    "Finding market data",
    "Inspecting liquidity",
    "Checking holders",
    "Running security checks",
    "Agent interpreting evidence",
  ];

  useEffect(() => {
    const timer = setInterval(() => setStage((current) => Math.min(current + 1, stages.length - 1)), 760);

    fetch("/api/analyze", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ contract }),
    })
      .then(async (response) => {
        const json = await response.json();
        if (!response.ok) throw new Error(json.error || "Analysis failed");
        setResult(json);
      })
      .catch((reason) => setError(reason.message))
      .finally(() => clearInterval(timer));

    return () => clearInterval(timer);
  }, [contract]);

  if (error) {
    return (
      <main className="shell analysis-error-page">
        <div className="analysis-error-card">
          <span>Analysis stopped</span>
          <h1>We could not inspect that contract.</h1>
          <p>{error}</p>
          <Link className="btn blue link" href="/">Try another contract</Link>
        </div>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="analysis-loading">
        <div className="shell analysis-loading-inner">
          <div className="analysis-loader-mark"><i /></div>
          <span className="loading-kicker">BaseLens research agent</span>
          <h1>{stages[stage]}</h1>
          <div className="loading-track">
            {stages.map((item, index) => (
              <div key={item} className={index <= stage ? "done" : ""}>
                <i />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  const { data, agent, agentError } = result;
  const scoreRows = [
    ["Market", data.scores.marketHealth],
    ["Liquidity", data.scores.liquidityHealth],
    ["Activity", data.scores.tradingActivity],
    ["Holders", data.scores.holderHealth],
    ["Safety", data.scores.contractSafety],
    ["Social", data.scores.socialPresence],
    ["Momentum", data.scores.momentum],
  ] as const;

  const metrics = [
    ["Price", fmtMoney(data.market.priceUsd)],
    ["Market cap", fmtMoney(data.market.marketCap)],
    ["Liquidity", fmtMoney(data.liquidity.usd)],
    ["24h volume", fmtMoney(data.trading.volume24h)],
    ["24h change", show(data.trading.change24h, "%")],
  ];

  const securityChecks = [
    ["Contract verified", data.security.verified],
    ["Honeypot detected", data.security.honeypot === null ? null : !data.security.honeypot],
    ["Can buy", data.security.cannotBuy === null ? null : !data.security.cannotBuy],
    ["Can sell", data.security.cannotSellAll === null ? null : !data.security.cannotSellAll],
    ["Ownership renounced", data.security.renouncedOwnership],
  ] as const;

  return (
    <main className="analysis-app">
      <div className="shell analysis-app-shell">
        <div className="analysis-toolbar">
          <Link href="/" className="analysis-back">← New analysis</Link>
          <div className="analysis-toolbar-center">
            <span>AI analysis</span><span>On-chain data</span><span>Security</span><span>Liquidity</span>
          </div>
          <Link href="/compare" className="analysis-compare">Compare</Link>
        </div>

        <section className="analysis-token-header">
          <div className="analysis-token-identity">
            <div className="analysis-token-logo">
              {data.token.logo ? <img src={data.token.logo} alt="" /> : <span>{data.token.symbol?.slice(0, 1) || "B"}</span>}
            </div>
            <div>
              <span className="analysis-overline">Token overview · Base</span>
              <h1>{data.token.name || "Unknown token"} <small>{data.token.symbol ? `$${data.token.symbol}` : ""}</small></h1>
              <code>{data.contract}</code>
            </div>
          </div>
          <div className="analysis-score-block">
            <span>Agent score</span>
            <div><strong>{data.scores.overall}</strong><small>/100</small></div>
            <em>{agent?.verdict || "Unavailable"}</em>
          </div>
        </section>

        <section className="analysis-metric-row">
          {metrics.map(([label, value]) => (
            <div key={label}><span>{label}</span><b>{value}</b></div>
          ))}
        </section>

        <div className="analysis-grid">
          <div className="analysis-main-column">
            <section className="research-card agent-verdict-card">
              <header><div><span className="analysis-overline">Agent verdict</span><h2>{agent?.summary || "Agent analysis temporarily unavailable"}</h2></div><span className="confidence-badge">{data.confidence.level} confidence</span></header>
              <p>{agent?.scoreInterpretation || agentError || "The deterministic research result is still available below."}</p>
              <div className="verdict-pair">
                <div><span>Strongest signal</span><b>{agent?.strongestPositiveSignal || "Available market evidence"}</b></div>
                <div><span>Biggest risk</span><b>{agent?.biggestRisk || data.security.warnings[0] || "Insufficient risk data"}</b></div>
              </div>
            </section>

            <div className="analysis-two-col">
              <section className="research-card security-card">
                <header><div><span className="analysis-overline">Security scan</span><h3>{data.security.level === "low" ? "No critical issue detected" : `${data.security.level} risk profile`}</h3></div></header>
                <div className="security-check-list">
                  {securityChecks.map(([label, state]) => (
                    <div key={label} className={state === false ? "risk" : state === null ? "unknown" : "ok"}>
                      <i>{state === false ? "!" : state === null ? "?" : "✓"}</i><span>{label}</span><b>{state === null ? "Unavailable" : state ? "Pass" : "Flag"}</b>
                    </div>
                  ))}
                </div>
                {(data.security.buyTaxPercent !== null || data.security.sellTaxPercent !== null) && (
                  <div className="tax-row"><span>Buy tax <b>{show(data.security.buyTaxPercent, "%")}</b></span><span>Sell tax <b>{show(data.security.sellTaxPercent, "%")}</b></span></div>
                )}
              </section>

              <section className="research-card liquidity-card">
                <header><div><span className="analysis-overline">Liquidity health</span><h3>{data.scores.liquidityHealth}/100</h3></div></header>
                <div className="liquidity-gauge"><div style={{ "--score": `${data.scores.liquidityHealth * 3.6}deg` } as React.CSSProperties}><span>{data.scores.liquidityHealth}%</span></div></div>
                <dl><div><dt>Liquidity</dt><dd>{fmtMoney(data.liquidity.usd)}</dd></div><div><dt>Liquidity / market cap</dt><dd>{data.liquidity.toMarketCapRatio === null ? "Unavailable" : `${(data.liquidity.toMarketCapRatio * 100).toFixed(1)}%`}</dd></div></dl>
              </section>
            </div>

            <section className="research-card signal-table-card">
              <header><div><span className="analysis-overline">Trading activity</span><h3>Market flow by window</h3></div></header>
              <div className="signal-table-wrap">
                <table className="signal-table">
                  <thead><tr><th>Window</th><th>Volume</th><th>Change</th><th>Buys</th><th>Sells</th></tr></thead>
                  <tbody>
                    <tr><td>1 hour</td><td>{fmtMoney(data.trading.volume1h)}</td><td>{show(data.trading.change1h, "%")}</td><td>{show(data.trading.buys1h)}</td><td>{show(data.trading.sells1h)}</td></tr>
                    <tr><td>6 hours</td><td>{fmtMoney(data.trading.volume6h)}</td><td>{show(data.trading.change6h, "%")}</td><td>{show(data.trading.buys6h)}</td><td>{show(data.trading.sells6h)}</td></tr>
                    <tr><td>24 hours</td><td>{fmtMoney(data.trading.volume24h)}</td><td>{show(data.trading.change24h, "%")}</td><td>{show(data.trading.buys24h)}</td><td>{show(data.trading.sells24h)}</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="research-card holder-card">
              <header><div><span className="analysis-overline">Holder distribution</span><h3>{show(data.holders.count)} holders</h3></div><span>Top 10: {show(data.holders.top10Percent, "%")}</span></header>
              {data.holders.top.length ? (
                <div className="holder-list">
                  {data.holders.top.slice(0, 5).map((holder, index) => (
                    <div key={`${holder.address}-${index}`}><span>#{index + 1}</span><code>{shortAddress(holder.address)}</code><b>{holder.percent.toFixed(2)}%</b></div>
                  ))}
                </div>
              ) : <p className="empty-copy">Holder-level data is unavailable for this token.</p>}
            </section>
          </div>

          <aside className="analysis-side-column">
            <section className="research-card scorecard-card">
              <header><span className="analysis-overline">Signal score</span></header>
              {scoreRows.map(([label, score]) => (
                <div className="app-score-row" key={label}>
                  <div><span>{label}</span><b>{score}</b></div>
                  <div><i style={{ width: `${score}%` }} /></div>
                </div>
              ))}
            </section>

            <section className="research-card confidence-card-real">
              <span className="analysis-overline">Confidence</span>
              <strong>{data.confidence.score}%</strong>
              <b>{data.confidence.level}</b>
              <p>{agent?.confidenceExplanation || `Missing domains: ${data.confidence.missingDomains.join(", ") || "none"}.`}</p>
            </section>

            <section className="research-card source-card">
              <header><span className="analysis-overline">Data sources</span></header>
              {data.sources.map((source) => (
                <div className="app-source-row" key={source.name}>
                  <i className={source.ok ? "live" : "missing"} />
                  <div><b>{source.name}</b><span>{source.note || (source.ok ? "Evidence collected" : "Unavailable")}</span></div>
                </div>
              ))}
            </section>

            <section className="research-card quick-facts-card">
              <header><span className="analysis-overline">Research details</span></header>
              <dl>
                <div><dt>DEX</dt><dd>{data.market.dex || "Unavailable"}</dd></div>
                <div><dt>Pair age</dt><dd>{data.token.ageHours === null ? "Unavailable" : `${(data.token.ageHours / 24).toFixed(1)} days`}</dd></div>
                <div><dt>Top holder</dt><dd>{show(data.holders.topHolderPercent, "%")}</dd></div>
                <div><dt>Buy / sell</dt><dd>{show(data.trading.buySellRatio24h)}</dd></div>
              </dl>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
