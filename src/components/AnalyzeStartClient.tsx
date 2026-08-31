"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const MODULES = [
  ["ai", "AI Agent Analysis", "Interpret the evidence, score the profile and explain the trade-offs."],
  ["onchain", "On-chain Data", "Confirm the Base contract and inspect token and pair metadata."],
  ["market", "Market & Liquidity", "Price, market cap, liquidity, volume, momentum and trading flow."],
  ["holders", "Holder Analysis", "Holder count, top-wallet concentration and distribution risk."],
  ["security", "Security Scan", "Contract restrictions, taxes, ownership and honeypot signals."],
  ["social", "Social & X", "Official links and available public social evidence. No invented sentiment."],
] as const;

export function AnalyzeStartClient() {
  const router = useRouter();
  const [mode, setMode] = useState<"single" | "compare">("single");
  const [contract, setContract] = useState("");
  const [selected, setSelected] = useState<string[]>(MODULES.map(([id]) => id));
  const [error, setError] = useState("");
  const allSelected = selected.length === MODULES.length;

  function toggle(id: string) { setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]); }
  function start() {
    if (!selected.length) { setError("Choose at least one research module."); return; }
    if (mode === "compare") { router.push(`/compare?modules=${selected.join(",")}`); return; }
    const value = contract.trim();
    if (!/^0x[a-fA-F0-9]{40}$/.test(value)) { setError("That does not look like a valid EVM contract address. Paste a Base token contract beginning with 0x."); return; }
    router.push(`/analyze/${value}?modules=${selected.join(",")}`);
  }

  return <div className="research-launcher">
    <div className="mode-switch" role="tablist" aria-label="Research mode"><button className={mode === "single" ? "active" : ""} onClick={() => setMode("single")}>Analyze one token</button><button className={mode === "compare" ? "active" : ""} onClick={() => setMode("compare")}>Compare tokens</button></div>
    <div className="launcher-copy"><span>Choose your research</span><h1>{mode === "single" ? "What should BaseLens investigate?" : "Compare Base tokens through the same research pipeline."}</h1><p>{mode === "single" ? "Paste one Base contract, choose the evidence you care about, and let the agent research it." : "Compare 2 to 5 contracts across the same market, holder, security and social evidence."}</p></div>
    {mode === "single" && <div className="launcher-contract"><label htmlFor="launcher-contract">Base token contract</label><input id="launcher-contract" value={contract} onChange={(e) => { setContract(e.target.value); setError(""); }} placeholder="0x..." spellCheck={false} autoComplete="off" aria-invalid={Boolean(error)}/></div>}
    <div className="module-grid">{MODULES.map(([id,title,description])=>{const checked=selected.includes(id);return <button type="button" key={id} className={`module-option ${checked ? "selected" : ""}`} aria-pressed={checked} onClick={()=>toggle(id)}><span className="module-check" aria-hidden="true">{checked ? "✓" : ""}</span><div><b>{title}</b><p>{description}</p></div></button>})}</div>
    <div className="launcher-actions"><button className="select-all" onClick={()=>setSelected(allSelected ? [] : MODULES.map(([id])=>id))}>{allSelected ? "Clear all" : "Select all"}</button><span className="module-count">{selected.length} of {MODULES.length} checks selected</span><button className="btn blue launcher-primary" onClick={start}>{mode === "single" ? "Start research" : "Open comparison"} <span>→</span></button></div>{error&&<div className="launcher-error" role="alert">{error}</div>}
  </div>;
}
