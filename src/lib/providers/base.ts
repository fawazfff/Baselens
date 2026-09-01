import { createPublicClient, http, erc20Abi, getAddress, isAddress } from "viem";
import { getChain, getRpcUrl, type SupportedChain } from "@/lib/chains";

export async function inspectEvmToken(input: string, chainInput?: string | number | null) {
  if (!isAddress(input)) throw new Error("That is not a valid EVM contract address.");
  const chain = getChain(chainInput);
  const address = getAddress(input);
  const client = createPublicClient({ transport: http(getRpcUrl(chain), { timeout: 8000 }) });
  const code = await client.getCode({ address });
  if (!code || code === "0x") throw new Error(`No contract exists at this address on ${chain.name}. Check the network and address.`);

  const r = await Promise.allSettled([
    client.readContract({ address, abi: erc20Abi, functionName: "name" }),
    client.readContract({ address, abi: erc20Abi, functionName: "symbol" }),
    client.readContract({ address, abi: erc20Abi, functionName: "decimals" }),
    client.readContract({ address, abi: erc20Abi, functionName: "totalSupply" }),
  ]);
  if (r[0].status === "rejected" && r[1].status === "rejected" && r[2].status === "rejected") {
    throw new Error(`This contract on ${chain.name} does not appear to expose standard ERC-20 token metadata.`);
  }
  const decimals = r[2].status === "fulfilled" ? Number(r[2].value) : null;
  const raw = r[3].status === "fulfilled" ? r[3].value : null;
  const totalSupply = raw !== null && decimals !== null ? Number(raw) / 10 ** decimals : null;
  return { address, chain, name:r[0].status === "fulfilled" ? String(r[0].value) : null, symbol:r[1].status === "fulfilled" ? String(r[1].value) : null, decimals, totalSupply:Number.isFinite(totalSupply) ? totalSupply : null };
}

// Temporary compatibility export while the rest of the app migrates to explicit network selection.
export async function inspectBaseToken(input: string) { return inspectEvmToken(input, "base"); }
export type { SupportedChain };
