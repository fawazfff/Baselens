# BaseLens

BaseLens is an AI-powered Base mainnet token intelligence and comparison agent built for the Orion Agents Hackathon AI Agent Track.

Instead of asking an LLM to guess what is happening with a token, BaseLens gathers real evidence first. The application validates the contract on Base, collects market and security data, calculates deterministic scores, and only then asks OpenAI to interpret the evidence.

## Agent loop

**Observe → Analyze → Reason → Decide → Explain**

1. **Observe**: Base RPC, DexScreener, GoPlus and optional Etherscan V2 gather contract, market, liquidity, trading, holder, security and social information.
2. **Analyze**: deterministic code calculates Market Health, Liquidity Health, Trading Activity, Holder Health, Contract Safety, Social Presence and Momentum.
3. **Reason**: OpenAI receives only compact normalized evidence and the calculated scores.
4. **Decide**: the agent produces a structured verdict and, during comparisons, a relative ranking.
5. **Explain**: BaseLens shows positive signals, risk signals, confidence and questions worth investigating without exposing private chain-of-thought.

## Data providers

| Provider | Purpose | Key required? |
| --- | --- | --- |
| Base RPC | Base contract validation and ERC-20 metadata | No for the public endpoint. A dedicated RPC is recommended for production. |
| DexScreener | DEX pair, price, liquidity, volume, transactions, price change and discovered social links | No |
| GoPlus | Token security and holder signals | No for basic public access; optional access token supported |
| Etherscan API V2 | Additional contract verification metadata | Yes, optional |
| OpenAI | Server-side evidence interpretation and comparison reasoning | Yes |

Missing provider data is represented as unavailable. It is never replaced with invented statistics.

## Routes

- `/` - contract search and product overview
- `/analyze/[contract]` - live token intelligence report
- `/compare` - compare 2 to 5 Base tokens through the same analysis pipeline
- `/how-it-works` - judge-friendly agent architecture explanation
- `/methodology` - deterministic scoring and confidence methodology

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set environment variables in `.env.local`. Never commit real API keys.

```text
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5-mini
ETHERSCAN_API_KEY=
BASE_RPC_URL=https://mainnet.base.org
GOPLUS_ACCESS_TOKEN=
```

## Vercel

Import `fawazfff/Baselens` into Vercel and add `OPENAI_API_KEY` and `ETHERSCAN_API_KEY` under Project Settings → Environment Variables. Add a production `BASE_RPC_URL` when available. Do not prefix private variables with `NEXT_PUBLIC_`.

## Cost controls

BaseLens strips raw provider responses before calling OpenAI, uses deterministic code for numeric scoring, calls the model once per individual analysis, and keeps a short server-side cache for repeated analyses. Market/provider data can still render when OpenAI is unavailable.

## Safety and limitations

BaseLens is a research tool, not financial advice. A high score does not mean a token is safe or that its price will increase. Provider coverage varies between tokens, so confidence is reported separately from detected risk.
