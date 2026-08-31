import type { Metadata } from "next";
import { CompareClient } from "@/components/CompareClient";
export const metadata:Metadata={title:"Compare Base tokens",description:"Compare multiple Base tokens using the same market, liquidity, holder, security and agent scoring framework."};
export default function Page(){return <main id="main-content"><CompareClient/></main>}
