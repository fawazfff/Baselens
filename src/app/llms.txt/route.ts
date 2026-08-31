export function GET(){const text=`# BaseLens

> BaseLens is a research application for ERC-20 tokens on Base mainnet.

BaseLens collects available market, liquidity, trading, holder, contract-security and public social evidence. Deterministic calculations produce category scores and an overall research score. An AI agent interprets the normalized evidence and explains trade-offs; it does not fetch or invent live token statistics.

## Main pages
- /analyze — analyze a Base token contract and discover tokens with notable DEX activity
- /compare — compare Base tokens using the same scoring framework
- /how-it-works — agent architecture and research flow
- /methodology — deterministic scoring methodology
- /privacy — privacy information

## Important limitations
BaseLens is a research tool, not financial advice. A score does not predict future returns. Missing data lowers confidence and is kept separate from detected risk. Critical information should be verified at the original source.
`;
return new Response(text,{headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"public, max-age=3600"}})}
