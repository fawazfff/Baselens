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
      setError("Enter a valid 0x Base token contract address.");
      return;
    }
    router.push(`/analyze/${contract}`);
  }

  return (
    <div>
      <label className="input-label" htmlFor="token-contract">
        Token contract
      </label>
      <div className="searchbar">
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
        <button className="btn blue" onClick={analyze}>
          Run analysis
        </button>
      </div>
      {error ? (
        <div id="contract-error" className="error" role="alert">
          {error}
        </div>
      ) : (
        <p id="contract-help" className="form-help">
          Base mainnet only. No wallet connection required.
        </p>
      )}
    </div>
  );
}
