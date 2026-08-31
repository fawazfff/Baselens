import type { Metadata } from "next";
import { AnalysisClient } from "@/components/AnalysisClient";
type Props={params:Promise<{contract:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const{contract}=await params;const short=`${contract.slice(0,6)}…${contract.slice(-4)}`;return{title:`Token analysis ${short}`,description:`BaseLens research report for Base token contract ${short}, including market, liquidity, holder, security and agent evidence.`,alternates:{canonical:`/analyze/${contract}`}}}
export default async function Page({params}:Props){const{contract}=await params;return <main id="main-content"><AnalysisClient contract={contract}/></main>}
