# BaseLens

AI-powered Base mainnet token intelligence and comparison agent built for the Orion Agents Hackathon AI Agent Track.

## Pipeline
Real data sources → normalized token information → deterministic scoring → OpenAI agent analysis → human-readable evidence and verdict.

## Providers
- Base RPC: contract validation and ERC-20 metadata
- DexScreener: market, liquidity, trading and social metadata
- GoPlus: security and holder signals
- Etherscan API V2: optional contract verification
- OpenAI: server-side interpretation only

## Setup
`npm install` then copy `.env.example` to `.env.local`. Set `OPENAI_API_KEY`. For richer verification set `ETHERSCAN_API_KEY`. Never commit real keys.

## Routes
`/`, `/analyze/[contract]`, `/compare`, `/how-it-works`, `/methodology`

BaseLens is a research tool, not financial advice.
