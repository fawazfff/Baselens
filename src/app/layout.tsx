import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./product.css";
import "./research.css";
import "./polish.css";
import { Nav, Footer } from "@/components/Nav";
import { PageUtilities } from "@/components/SiteChrome";

const SITE_URL = "https://baselens-git-main-fawaz-ibrahims-projects.vercel.app";
const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "BaseLens | Research Base tokens before you trade", template: "%s | BaseLens" },
  description: "Research Base tokens using live market, liquidity, holder, contract and social evidence with explainable AI analysis.",
  applicationName: "BaseLens",
  category: "finance",
  openGraph: { title: "BaseLens | Research Base tokens before you trade", description: "Investigate Base tokens using live evidence and explainable AI analysis.", type: "website", siteName: "BaseLens", url: SITE_URL },
  twitter: { card: "summary_large_image", title: "BaseLens | Research Base tokens before you trade", description: "Investigate Base tokens using live evidence and explainable AI analysis." },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "BaseLens",
  url: SITE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: "A Base token research application that combines market, liquidity, holder, contract and available social evidence with deterministic scoring and AI-assisted explanation.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: ["Base token analysis", "Token comparison", "Liquidity research", "Holder analysis", "Contract security signals", "Explainable AI research"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" suppressHydrationWarning><body className={`${geist.variable} ${geistMono.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/><a className="skip-link" href="#main-content">Skip to content</a><PageUtilities/><Nav />{children}<Footer /></body></html>;
}
