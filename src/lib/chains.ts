export type SupportedChainKey =
  | "ethereum"
  | "base"
  | "arbitrum"
  | "optimism"
  | "polygon"
  | "bsc"
  | "avalanche"
  | "linea"
  | "scroll"
  | "zksync"
  | "blast"
  | "mantle";

export type SupportedChain = {
  key: SupportedChainKey;
  id: number;
  name: string;
  shortName: string;
  family: "Ethereum L1" | "Ethereum L2" | "EVM";
  dexScreenerId: string;
  geckoTerminalId: string;
  coinGeckoPlatformId: string;
  explorer: string;
  rpcEnv: string;
  rpcFallback: string;
};

export const SUPPORTED_CHAINS: SupportedChain[] = [
  { key:"ethereum", id:1, name:"Ethereum", shortName:"Ethereum", family:"Ethereum L1", dexScreenerId:"ethereum", geckoTerminalId:"eth", coinGeckoPlatformId:"ethereum", explorer:"https://etherscan.io", rpcEnv:"ETHEREUM_RPC_URL", rpcFallback:"https://ethereum-rpc.publicnode.com" },
  { key:"base", id:8453, name:"Base", shortName:"Base", family:"Ethereum L2", dexScreenerId:"base", geckoTerminalId:"base", coinGeckoPlatformId:"base", explorer:"https://basescan.org", rpcEnv:"BASE_RPC_URL", rpcFallback:"https://mainnet.base.org" },
  { key:"arbitrum", id:42161, name:"Arbitrum One", shortName:"Arbitrum", family:"Ethereum L2", dexScreenerId:"arbitrum", geckoTerminalId:"arbitrum", coinGeckoPlatformId:"arbitrum-one", explorer:"https://arbiscan.io", rpcEnv:"ARBITRUM_RPC_URL", rpcFallback:"https://arb1.arbitrum.io/rpc" },
  { key:"optimism", id:10, name:"OP Mainnet", shortName:"Optimism", family:"Ethereum L2", dexScreenerId:"optimism", geckoTerminalId:"optimism", coinGeckoPlatformId:"optimistic-ethereum", explorer:"https://optimistic.etherscan.io", rpcEnv:"OPTIMISM_RPC_URL", rpcFallback:"https://mainnet.optimism.io" },
  { key:"polygon", id:137, name:"Polygon PoS", shortName:"Polygon", family:"EVM", dexScreenerId:"polygon", geckoTerminalId:"polygon_pos", coinGeckoPlatformId:"polygon-pos", explorer:"https://polygonscan.com", rpcEnv:"POLYGON_RPC_URL", rpcFallback:"https://polygon-bor-rpc.publicnode.com" },
  { key:"bsc", id:56, name:"BNB Smart Chain", shortName:"BNB Chain", family:"EVM", dexScreenerId:"bsc", geckoTerminalId:"bsc", coinGeckoPlatformId:"binance-smart-chain", explorer:"https://bscscan.com", rpcEnv:"BSC_RPC_URL", rpcFallback:"https://bsc-rpc.publicnode.com" },
  { key:"avalanche", id:43114, name:"Avalanche C-Chain", shortName:"Avalanche", family:"EVM", dexScreenerId:"avalanche", geckoTerminalId:"avax", coinGeckoPlatformId:"avalanche", explorer:"https://snowtrace.io", rpcEnv:"AVALANCHE_RPC_URL", rpcFallback:"https://avalanche-c-chain-rpc.publicnode.com" },
  { key:"linea", id:59144, name:"Linea", shortName:"Linea", family:"Ethereum L2", dexScreenerId:"linea", geckoTerminalId:"linea", coinGeckoPlatformId:"linea", explorer:"https://lineascan.build", rpcEnv:"LINEA_RPC_URL", rpcFallback:"https://rpc.linea.build" },
  { key:"scroll", id:534352, name:"Scroll", shortName:"Scroll", family:"Ethereum L2", dexScreenerId:"scroll", geckoTerminalId:"scroll", coinGeckoPlatformId:"scroll", explorer:"https://scrollscan.com", rpcEnv:"SCROLL_RPC_URL", rpcFallback:"https://rpc.scroll.io" },
  { key:"zksync", id:324, name:"zkSync Era", shortName:"zkSync", family:"Ethereum L2", dexScreenerId:"zksync", geckoTerminalId:"zksync", coinGeckoPlatformId:"zksync", explorer:"https://era.zksync.network", rpcEnv:"ZKSYNC_RPC_URL", rpcFallback:"https://mainnet.era.zksync.io" },
  { key:"blast", id:81457, name:"Blast", shortName:"Blast", family:"Ethereum L2", dexScreenerId:"blast", geckoTerminalId:"blast", coinGeckoPlatformId:"blast", explorer:"https://blastscan.io", rpcEnv:"BLAST_RPC_URL", rpcFallback:"https://rpc.blast.io" },
  { key:"mantle", id:5000, name:"Mantle", shortName:"Mantle", family:"Ethereum L2", dexScreenerId:"mantle", geckoTerminalId:"mantle", coinGeckoPlatformId:"mantle", explorer:"https://mantlescan.xyz", rpcEnv:"MANTLE_RPC_URL", rpcFallback:"https://rpc.mantle.xyz" },
];

export const DEFAULT_CHAIN_KEY: SupportedChainKey = "base";

export function getChain(input?: string | number | null): SupportedChain {
  const value = String(input ?? DEFAULT_CHAIN_KEY).toLowerCase();
  return SUPPORTED_CHAINS.find((chain) => chain.key === value || String(chain.id) === value) ?? SUPPORTED_CHAINS[1];
}

export function getRpcUrl(chain: SupportedChain) {
  return process.env[chain.rpcEnv] || chain.rpcFallback;
}
