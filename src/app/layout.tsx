import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./product.css";
import "./research.css";
import "./polish.css";
import { Nav, Footer } from "@/components/Nav";
import { PageUtilities } from "@/components/SiteChrome";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = { title: "BaseLens | Research Base tokens before you trade", description: "An AI research agent for Base tokens. Investigate market activity, liquidity, holders, contract risk and social signals from one contract." };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" suppressHydrationWarning><body className={`${geist.variable} ${geistMono.variable}`}><a className="skip-link" href="#main-content">Skip to content</a><PageUtilities/><Nav />{children}<Footer /></body></html>;
}
