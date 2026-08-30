"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AnalyzeForm() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function analyze() {
    const contract = value.trim();
    if (!/^0x[a-fA-F0-9]{40}$/.test(contract)) {
      setError("That does not look like a Base token contract.");
      return;
    }
    router.push(`/analyze/${contract}`);
  }

  return (
    <div className="contract-form">
      <label className="input-label" htmlFor="token-contract">
        Contract address
      </label>
      <div className="searchbar">
        <span className="input-prefix" aria-hidden="true">⌕</span>
        <input
          id="token-contract"
          className="input"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setError("");
          }}
          onKeyDown={(event) => event.key === "Enter" && analyze()}
          placeholder="0x..."
          spellCheck={false}
          autoComplete="off"
          aria-describedby={error ? "contract-error" : "contract-help"}
        />
        <button className="btn blue analyze-button" onClick={analyze}>
          Analyze
          <span aria-hidden="true">→</span>
        </button>
      </div>
      {error ? (
        <div id="contract-error" className="error" role="alert">{error}</div>
      ) : (
        <p id="contract-help" className="form-help">Base mainnet ERC-20 contract</p>
      )}
    </div>
  );
}
