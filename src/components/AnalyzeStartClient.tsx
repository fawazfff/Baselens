"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SUPPORTED_CHAINS } from "@/lib/chains";

const MODULES = [
  ["ai", "Agent explanation", "Turn the checks into a short explanation without changing the underlying numbers."],
  ["onchain", "Token & contract", "Confirm the contract, token details and selected network."],
  ["market", "Market & liquidity", "Check price, market cap, liquidity, volume and recent trading."],
  ["holders", "Holders", "Look for concentration in the largest wallets when holder data is available."],
  ["security", "Contract checks", "Look for restrictions, taxes, ownership controls and known honeypot signals."],
] as const;

export function AnalyzeStartClient() {
  const router = useRouter();
  const [mode, setMode] = useState<"single" | "compare">("single");
  const [contract, setContract] = useState("");
  const [chain, setChain] = useState("base");
  const [selected, setSelected] = useState<string[]>(MODULES.map(([id]) => id));
  const [error, setError] = useState("");
  const allSelected = selected.length === MODULES.length;

  function toggle(id: string) { setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]); }
  function start() {
    if (!selected.length) { setError("Choose at least one check."); return; }
    if (mode === "compare") { router.push(`/compare?modules=${selected.join(",")}`); return; }
    const value = contract.trim();
    if (!/^0x[a-fA-F0-9]{40}$/.test(value)) { setError("That address does not look complete. EVM token contracts start with 0x and contain 40 hexadecimal characters after it."); return; }
    router.push(`/analyze/${value}?chain=${chain}&modules=${selected.join(",")}`);
  }

  return <div className="research-launcher">
    <div className="mode-switch" role="tablist" aria-label="Research mode"><button className={mode === "single" ? "active" : ""} onClick={() => setMode("single")}>Analyze one token</button><button className={mode === "compare" ? "active" : ""} onClick={() => setMode("compare")}>Compare tokens</button></div>
    <div className="launcher-copy"><span>Token research</span><h1>{mode === "single" ? "Check a token before you make a decision." : "Compare tokens using the same checks."}</h1><p>{mode === "single" ? "Choose the network, paste the token contract and BaseLens will gather the evidence it can find." : "Compare 2 to 5 EVM tokens. Each token keeps its own network, so you can compare across chains."}</p></div>
    {mode === "single" && <><div className="launcher-contract"><label htmlFor="launcher-chain">Network</label><select id="launcher-chain" className="input" value={chain} onChange={(e)=>setChain(e.target.value)}>{SUPPORTED_CHAINS.map((item)=><option key={item.key} value={item.key}>{item.shortName} · {item.family}</option>)}</select></div><div className="launcher-contract"><label htmlFor="launcher-contract">Token contract</label><input id="launcher-contract" value={contract} onChange={(e) => { setContract(e.target.value); setError(""); }} placeholder="0x..." spellCheck={false} autoComplete="off" aria-invalid={Boolean(error)}/></div></>}
    <div className="module-grid">{MODULES.map(([id,title,description])=>{const checked=selected.includes(id);return <button type="button" key={id} className={`module-option ${checked ? "selected" : ""}`} aria-pressed={checked} onClick={()=>toggle(id)}><span className="module-check" aria-hidden="true">{checked ? "✓" : ""}</span><div><b>{title}</b><p>{description}</p></div></button>})}</div>
    <div className="launcher-actions"><button className="select-all" onClick={()=>setSelected(allSelected ? [] : MODULES.map(([id])=>id))}>{allSelected ? "Clear all" : "Select all"}</button><span className="module-count">{selected.length} of {MODULES.length} checks selected</span><button className="btn blue launcher-primary" onClick={start}>{mode === "single" ? "Analyze token" : "Open comparison"} <span>→</span></button></div>{error&&<div className="launcher-error" role="alert">{error}</div>}
  </div>;
}
